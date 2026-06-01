import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { renderLaunchEmail } from '@/emails/LaunchEmail'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.mauyi.nl'

// Vereist: ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS launch_email_sent boolean DEFAULT false;

export async function POST(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY!)

  // Fetch all unsent waitlist entries
  const { data: entries, error } = await supabase
    .from('waitlist')
    .select('id, email')
    .eq('launch_email_sent', false)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!entries || entries.length === 0) {
    return NextResponse.json({ sent: 0, message: 'Geen nieuwe ontvangers.' })
  }

  // Pre-render the email template once for all recipients
  const html = await renderLaunchEmail(BASE_URL)

  const BATCH_SIZE = 100
  let sent = 0

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE)

    const emails = batch.map((entry) => ({
      from: process.env.RESEND_FROM_EMAIL!,
      to: entry.email,
      subject: 'Reset Serum is nu verkrijgbaar — jij was er als eerste bij.',
      html,
    }))

    await resend.batch.send(emails)

    const ids = batch.map((e) => e.id)
    await supabase.from('waitlist').update({ launch_email_sent: true }).in('id', ids)

    sent += batch.length
  }

  return NextResponse.json({ sent, message: `${sent} e-mails verstuurd.` })
}
