import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { WaitlistEntry } from '@/lib/supabase/client'

export async function GET(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error, count } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    entries: data as WaitlistEntry[],
    total: count ?? 0,
  })
}
