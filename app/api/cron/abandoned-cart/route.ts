import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Vercel cron — runs every hour
// Protected by CRON_SECRET env var
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Find pending orders older than 1 hour where we haven't sent an abandoned cart email yet
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { data: orders, error } = await supabase
    .from('orders')
    .select('id, email, name, items, total')
    .eq('status', 'pending')
    .eq('abandoned_email_sent', false)
    .lt('created_at', oneHourAgo)
    .limit(50)

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  if (!orders?.length) {
    return NextResponse.json({ sent: 0 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY!)
  let sent = 0

  for (const order of orders) {
    const items = order.items as Array<{ name: string; quantity: number; price: number }>
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: order.email,
        subject: 'Je winkelwagen wacht nog op je — MAUYI',
        html: `
          <!DOCTYPE html>
          <html lang="nl">
          <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin:0;padding:0;background:#FAF8F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5;padding:40px 20px;">
              <tr><td align="center">
                <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E8E4DF;">
                  <tr>
                    <td style="background:#0F0E0C;padding:28px 36px;text-align:center;">
                      <p style="margin:0;font-size:24px;font-weight:600;letter-spacing:0.1em;color:#FAF8F5;font-family:Georgia,serif;">MAUYI</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:36px;">
                      <p style="margin:0 0 6px;font-size:20px;font-weight:600;color:#1A1A1A;font-family:Georgia,serif;">
                        Hé ${order.name.split(' ')[0]},
                      </p>
                      <p style="margin:0 0 24px;font-size:14px;color:#5C5754;line-height:1.7;">
                        Je hebt nog producten in je winkelwagen. We bewaren ze voor je — maar niet voor altijd.
                      </p>
                      <div style="height:1px;background:linear-gradient(to right,transparent,#C9A96E,transparent);margin-bottom:24px;"></div>
                      ${items.map(item => `
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                          <tr>
                            <td style="font-size:13px;font-weight:600;color:#1A1A1A;">${item.quantity}× ${item.name}</td>
                            <td align="right" style="font-size:13px;color:#1A1A1A;">€${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        </table>
                      `).join('')}
                      <div style="height:1px;background:#E8E4DF;margin:20px 0;"></div>
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                        <tr>
                          <td style="font-size:14px;font-weight:700;color:#1A1A1A;">Totaal</td>
                          <td align="right" style="font-size:14px;font-weight:700;color:#1A1A1A;">€${Number(order.total).toFixed(2).replace('.', ',')}</td>
                        </tr>
                      </table>
                      <a href="https://mauyi.nl/checkout" style="display:block;background:#C9A96E;color:#1A1A1A;text-decoration:none;text-align:center;padding:14px 28px;border-radius:14px;font-weight:600;font-size:14px;letter-spacing:0.02em;">
                        Ga terug naar mijn winkelwagen
                      </a>
                      <p style="margin:20px 0 0;font-size:12px;color:#9A9590;text-align:center;line-height:1.6;">
                        30 dagen garantie · Gratis retour · Geen risico
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#FAF8F5;padding:18px 36px;text-align:center;border-top:1px solid #E8E4DF;">
                      <p style="margin:0;font-size:10px;color:#9A9590;">MAUYI Skincare · mauyi.nl</p>
                    </td>
                  </tr>
                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      })

      // Mark as sent
      await supabase
        .from('orders')
        .update({ abandoned_email_sent: true })
        .eq('id', order.id)

      sent++
    } catch (err) {
      console.error('Failed to send to', order.email, err)
    }
  }

  return NextResponse.json({ sent })
}
