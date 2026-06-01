import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { renderWaitlistEmail } from '@/emails/WaitlistConfirmation'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.mauyi.nl'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM = process.env.RESEND_FROM_EMAIL ?? 'MAUYI <noreply@mauyi.nl>'

// Legacy fallback — kept for reference, no longer used
function confirmationEmail(email: string): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Je staat op de MAUYI wachtlijst</title>
</head>
<body style="margin:0;padding:0;background:#FAF8F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #E8E4DF;">

          <!-- Header -->
          <tr>
            <td style="background:#0F0E0C;padding:36px 40px;text-align:center;">
              <p style="margin:0;font-size:22px;font-weight:600;letter-spacing:0.18em;color:#ffffff;">MAUYI</p>
              <p style="margin:8px 0 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.22em;color:#C9A96E;">Pre-launch · Wachtlijst</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 20px;font-size:26px;font-weight:600;color:#1A1A1A;line-height:1.2;">
                Je staat op de lijst.
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#5C5754;line-height:1.75;font-weight:300;">
                Bedankt voor je aanmelding. Wanneer de eerste batch van het Reset Serum klaar is, ontvang je als eerste een persoonlijk bericht — vóór iedereen die later aanmeldt.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#5C5754;line-height:1.75;font-weight:300;">
                Geen hype, geen kortingen, geen dagelijkse mails. Alleen één eerlijk bericht op het moment dat het er is.
              </p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="height:1px;background:linear-gradient(90deg,transparent,#E8E4DF,transparent);"></td>
                </tr>
              </table>

              <!-- What's next -->
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#9A9590;">Wat nu?</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ['Sample testing loopt', 'We testen de formule met een kleine groep. Resultaten volgen op week 2, 4 en 8.'],
                  ['Dermatoloog review', 'Eindformule wordt onafhankelijk beoordeeld op veiligheid.'],
                  ['Eerste batch productie', 'Jij ontvangt als eerste een uitnodiging.'],
                ].map(([title, desc]) => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #F0EDE9;">
                    <p style="margin:0 0 3px;font-size:13px;font-weight:600;color:#1A1A1A;">${title}</p>
                    <p style="margin:0;font-size:12px;color:#9A9590;font-weight:300;line-height:1.6;">${desc}</p>
                  </td>
                </tr>`).join('')}
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="https://mauyi.nl/launch" style="display:inline-block;background:#C9A96E;color:#1A1A1A;font-size:14px;font-weight:600;padding:14px 32px;border-radius:14px;text-decoration:none;">
                      Volg het proces →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #F0EDE9;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;color:#9A9590;font-weight:300;">
                Je ontvangt dit bericht omdat je je hebt aangemeld via mauyi.nl.
              </p>
              <p style="margin:0;font-size:11px;color:#C9A96E;">
                <a href="https://mauyi.nl/privacy" style="color:#C9A96E;text-decoration:underline;">Privacybeleid</a>
                &nbsp;·&nbsp;
                <a href="https://mauyi.nl/unsubscribe?email=${encodeURIComponent(email)}" style="color:#9A9590;text-decoration:underline;">Uitschrijven</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  let body: { email?: string; source?: string; productSlug?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = (body.email ?? '').trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Ongeldig e-mailadres.' }, { status: 400 })
  }

  // Insert to Supabase
  const { error: dbError } = await supabase.from('waitlist').insert({
    email,
    source: body.source ?? 'unknown',
    product_slug: body.productSlug ?? null,
  })

  const isDuplicate = dbError?.code === '23505'
  if (dbError && !isDuplicate) {
    console.error('[waitlist/route] Supabase error:', dbError.code, dbError.message)
    return NextResponse.json({ error: 'Database fout.' }, { status: 500 })
  }

  // Send confirmation email (skip for duplicate registrations)
  if (!isDuplicate && resend) {
    try {
      const html = await renderWaitlistEmail(BASE_URL, email)
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: 'Je staat op de MAUYI wachtlijst',
        html,
      })
    } catch (emailError) {
      // Don't fail the request if email sending fails — the signup succeeded
      console.error('[waitlist/route] Resend error:', emailError)
    }
  }

  return NextResponse.json({ ok: true, duplicate: isDuplicate })
}
