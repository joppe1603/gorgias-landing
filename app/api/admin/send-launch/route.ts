import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

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

  const BATCH_SIZE = 100
  let sent = 0

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE)

    const emails = batch.map((entry) => ({
      from: process.env.RESEND_FROM_EMAIL!,
      to: entry.email,
      subject: 'Reset Serum is nu verkrijgbaar — jij was er als eerste bij.',
      html: `
        <!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;background:#0F0E0C;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F0E0C;padding:40px 20px;">
            <tr><td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#0F0E0C;border-radius:16px;overflow:hidden;border:1px solid rgba(201,169,110,0.2);">

                <!-- Header -->
                <tr><td style="padding:48px 40px 40px;text-align:center;border-bottom:1px solid rgba(201,169,110,0.12);">
                  <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#C9A96E;font-weight:700;">MAUYI</p>
                  <h1 style="margin:0;font-size:32px;font-weight:600;color:#FAF8F5;font-family:Georgia,serif;line-height:1.15;letter-spacing:-0.01em;">
                    Het is zover.
                  </h1>
                  <p style="margin:16px 0 0;font-size:15px;color:rgba(250,248,245,0.5);font-weight:300;line-height:1.6;">
                    Je stond op de wachtlijst — en nu is het moment.
                  </p>
                </td></tr>

                <!-- Body -->
                <tr><td style="padding:40px;">

                  <div style="height:1px;background:linear-gradient(to right,transparent,rgba(201,169,110,0.4),transparent);margin-bottom:36px;"></div>

                  <p style="margin:0 0 12px;font-size:22px;font-weight:600;color:#FAF8F5;font-family:Georgia,serif;line-height:1.3;">
                    Reset Serum is nu verkrijgbaar.
                  </p>
                  <p style="margin:0 0 28px;font-size:14px;color:rgba(250,248,245,0.55);line-height:1.75;font-weight:300;">
                    Als een van de eerste mensen op onze wachtlijst heb jij nu exclusieve toegang.
                    De eerste batch is beperkt — wees er snel bij voordat de voorraad op is.
                  </p>

                  <!-- Product highlight -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;background:rgba(201,169,110,0.05);border:1px solid rgba(201,169,110,0.15);border-radius:12px;">
                    <tr><td style="padding:24px 28px;">
                      <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#C9A96E;">Reset Serum</p>
                      <p style="margin:0 0 12px;font-size:16px;font-weight:600;color:#FAF8F5;font-family:Georgia,serif;">Jouw dagelijkse reset, in één flesje.</p>
                      <p style="margin:0;font-size:13px;color:rgba(250,248,245,0.5);line-height:1.7;font-weight:300;">
                        Geformuleerd voor zichtbaar resultaat. Dagelijks gebruik. 30 ml.
                      </p>
                    </td></tr>
                  </table>

                  <!-- CTA -->
                  <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                    <tr><td style="border-radius:12px;background:linear-gradient(135deg,#C9A96E,#e8c98a);">
                      <a href="${BASE_URL}/shop" style="display:inline-block;padding:16px 36px;color:#0F0E0C;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.02em;border-radius:12px;">
                        Bestel nu →
                      </a>
                    </td></tr>
                  </table>

                  <div style="height:1px;background:linear-gradient(to right,transparent,rgba(201,169,110,0.2),transparent);margin-bottom:32px;"></div>

                  <p style="margin:0;font-size:12px;color:rgba(250,248,245,0.3);line-height:1.7;font-style:italic;">
                    Vragen? Stuur een bericht naar
                    <a href="mailto:hello@mauyi.nl" style="color:#C9A96E;text-decoration:none;">hello@mauyi.nl</a>
                  </p>
                </td></tr>

                <!-- Footer -->
                <tr><td style="padding:24px 40px;text-align:center;border-top:1px solid rgba(201,169,110,0.12);">
                  <p style="margin:0 0 8px;font-size:11px;color:rgba(250,248,245,0.25);">MAUYI Skincare · mauyi.nl</p>
                  <a href="${BASE_URL}/unsubscribe?email=" style="font-size:10px;color:rgba(250,248,245,0.2);text-decoration:none;">Afmelden</a>
                </td></tr>

              </table>
            </td></tr>
          </table>
        </body></html>
      `,
    }))

    await resend.batch.send(emails)

    const ids = batch.map((e) => e.id)
    await supabase.from('waitlist').update({ launch_email_sent: true }).in('id', ids)

    sent += batch.length
  }

  return NextResponse.json({ sent, message: `${sent} e-mails verstuurd.` })
}
