import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.mauyi.nl'

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

async function getMyParcelBarcode(shipmentId: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.myparcel.nl/shipments/${shipmentId}`, {
      headers: {
        'Authorization': `basic ${Buffer.from(process.env.MYPARCEL_API_KEY!).toString('base64')}`,
        'Accept': 'application/json',
      },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.data?.shipments?.[0]?.barcode ?? null
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = db()
  const resend = new Resend(process.env.RESEND_API_KEY!)
  const results = { tracking: 0, reviews: 0, winback: 0, lowStock: 0 }

  // ── 1. Tracking emails ─────────────────────────────────────────────────
  const { data: toShip } = await supabase
    .from('orders')
    .select('id, email, name, myparcel_shipment_id, address')
    .eq('status', 'paid')
    .eq('tracking_email_sent', false)
    .not('myparcel_shipment_id', 'is', null)

  for (const order of toShip ?? []) {
    const barcode = await getMyParcelBarcode(order.myparcel_shipment_id)
    if (!barcode) continue

    await supabase
      .from('orders')
      .update({ tracking_code: barcode, tracking_email_sent: true })
      .eq('id', order.id)

    const trackingUrl = `https://track.postnl.nl/trace/${barcode}`
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: order.email,
      subject: 'Je MAUYI bestelling is onderweg',
      html: `
        <!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;background:#FAF8F5;font-family:-apple-system,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5;padding:40px 20px;">
            <tr><td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;border:1px solid #E8E4DF;">
                <tr><td style="background:#0F0E0C;padding:32px 40px;text-align:center;">
                  <p style="margin:0;font-size:26px;font-weight:600;letter-spacing:0.1em;color:#FAF8F5;font-family:Georgia,serif;">MAUYI</p>
                  <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C9A96E;">Je pakket is onderweg</p>
                </td></tr>
                <tr><td style="padding:40px;">
                  <p style="margin:0 0 8px;font-size:22px;font-weight:600;color:#1A1A1A;font-family:Georgia,serif;">Op weg naar jou, ${order.name.split(' ')[0]}.</p>
                  <p style="margin:0 0 32px;font-size:14px;color:#9A9590;line-height:1.6;">Je bestelling is verzonden via PostNL. Trackingcode: <strong>${barcode}</strong></p>
                  <a href="${trackingUrl}" style="display:inline-block;background:#C9A96E;color:#fff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">
                    Volg je pakket →
                  </a>
                  <p style="margin:32px 0 0;font-size:12px;color:#9A9590;">
                    ${order.address?.street} ${order.address?.houseNumber}, ${order.address?.zipCode} ${order.address?.city}
                  </p>
                </td></tr>
                <tr><td style="background:#FAF8F5;padding:24px 40px;text-align:center;border-top:1px solid #E8E4DF;">
                  <p style="margin:0;font-size:11px;color:#9A9590;">MAUYI Skincare · mauyi.nl</p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body></html>
      `,
    })
    results.tracking++
  }

  // ── 2. Review request emails (14 dagen na aankoop) ─────────────────────
  const d14start = new Date(Date.now() - 15 * 864e5).toISOString()
  const d14end = new Date(Date.now() - 14 * 864e5).toISOString()

  const { data: reviewOrders } = await supabase
    .from('orders')
    .select('id, email, name, items')
    .eq('status', 'paid')
    .eq('review_email_sent', false)
    .gte('created_at', d14start)
    .lte('created_at', d14end)

  for (const order of reviewOrders ?? []) {
    const items = order.items as Array<{ name: string; slug: string }>
    const slug = items[0]?.slug ?? ''

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: order.email,
      subject: 'Hoe bevalt je MAUYI? — Deel je ervaring',
      html: `
        <!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;background:#FAF8F5;font-family:-apple-system,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5;padding:40px 20px;">
            <tr><td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;border:1px solid #E8E4DF;">
                <tr><td style="background:#0F0E0C;padding:32px 40px;text-align:center;">
                  <p style="margin:0;font-size:26px;font-weight:600;letter-spacing:0.1em;color:#FAF8F5;font-family:Georgia,serif;">MAUYI</p>
                </td></tr>
                <tr><td style="padding:40px;">
                  <p style="margin:0 0 8px;font-size:22px;font-weight:600;color:#1A1A1A;font-family:Georgia,serif;">14 dagen verder, ${order.name.split(' ')[0]}.</p>
                  <p style="margin:0 0 24px;font-size:14px;color:#9A9590;line-height:1.6;">Hoe bevalt je huid na twee weken MAUYI? Je mening helpt anderen de juiste keuze te maken.</p>
                  <a href="${BASE_URL}/products/${slug}#reviews" style="display:inline-block;background:#C9A96E;color:#fff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">
                    Schrijf een review →
                  </a>
                </td></tr>
                <tr><td style="background:#FAF8F5;padding:24px 40px;text-align:center;border-top:1px solid #E8E4DF;">
                  <p style="margin:0;font-size:11px;color:#9A9590;">MAUYI Skincare · mauyi.nl</p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body></html>
      `,
    })
    await supabase.from('orders').update({ review_email_sent: true }).eq('id', order.id)
    results.reviews++
  }

  // ── 3. Winback emails (30 dagen na aankoop) ────────────────────────────
  const d30start = new Date(Date.now() - 31 * 864e5).toISOString()
  const d30end = new Date(Date.now() - 30 * 864e5).toISOString()

  const { data: winbackOrders } = await supabase
    .from('orders')
    .select('id, email, name')
    .eq('status', 'paid')
    .eq('winback_email_sent', false)
    .gte('created_at', d30start)
    .lte('created_at', d30end)

  for (const order of winbackOrders ?? []) {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: order.email,
      subject: 'Tijd voor nabestelling? — MAUYI',
      html: `
        <!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;background:#FAF8F5;font-family:-apple-system,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5;padding:40px 20px;">
            <tr><td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;border:1px solid #E8E4DF;">
                <tr><td style="background:#0F0E0C;padding:32px 40px;text-align:center;">
                  <p style="margin:0;font-size:26px;font-weight:600;letter-spacing:0.1em;color:#FAF8F5;font-family:Georgia,serif;">MAUYI</p>
                </td></tr>
                <tr><td style="padding:40px;">
                  <p style="margin:0 0 8px;font-size:22px;font-weight:600;color:#1A1A1A;font-family:Georgia,serif;">30 dagen. Hoe is je huid?</p>
                  <p style="margin:0 0 24px;font-size:14px;color:#9A9590;line-height:1.6;">
                    Een maand geleden ontving je je MAUYI bestelling. De meeste serums zijn na 30 dagen op — tijd voor nabestelling?
                  </p>
                  <a href="${BASE_URL}/shop" style="display:inline-block;background:#C9A96E;color:#fff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">
                    Bestel opnieuw →
                  </a>
                </td></tr>
                <tr><td style="background:#FAF8F5;padding:24px 40px;text-align:center;border-top:1px solid #E8E4DF;">
                  <p style="margin:0;font-size:11px;color:#9A9590;">MAUYI Skincare · mauyi.nl</p>
                  <a href="${BASE_URL}/unsubscribe?email=${encodeURIComponent(order.email)}" style="font-size:10px;color:#C8C4BF;text-decoration:none;">Afmelden</a>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body></html>
      `,
    })
    await supabase.from('orders').update({ winback_email_sent: true }).eq('id', order.id)
    results.winback++
  }

  // ── 4. Lage voorraad check ─────────────────────────────────────────────
  const { data: inventory } = await supabase
    .from('inventory')
    .select('product_slug, name, quantity, low_stock_threshold')

  const lowStock = (inventory ?? []).filter(i => i.quantity <= i.low_stock_threshold)

  if (lowStock.length > 0) {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_FROM_EMAIL!,
      subject: `⚠️ Lage voorraad — ${lowStock.length} product(en)`,
      html: `
        <div style="font-family:sans-serif;padding:32px;background:#FAF8F5;">
          <h2 style="color:#1A1A1A;">Lage voorraad melding</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            <tr style="background:#E8E4DF;">
              <th style="padding:8px 12px;text-align:left;font-size:12px;">Product</th>
              <th style="padding:8px 12px;text-align:left;font-size:12px;">Voorraad</th>
              <th style="padding:8px 12px;text-align:left;font-size:12px;">Drempel</th>
            </tr>
            ${lowStock.map(i => `
              <tr style="border-bottom:1px solid #E8E4DF;">
                <td style="padding:8px 12px;font-size:13px;">${i.name}</td>
                <td style="padding:8px 12px;font-size:13px;color:${i.quantity === 0 ? '#dc2626' : '#d97706'};font-weight:600;">${i.quantity}</td>
                <td style="padding:8px 12px;font-size:13px;color:#9A9590;">${i.low_stock_threshold}</td>
              </tr>
            `).join('')}
          </table>
          <p style="margin-top:24px;font-size:12px;color:#9A9590;">
            Ga naar <a href="${BASE_URL}/admin/inventory?key=${process.env.ADMIN_KEY}">admin/inventory</a> om de voorraad bij te werken.
          </p>
        </div>
      `,
    })
    results.lowStock = lowStock.length
  }

  return NextResponse.json({ ok: true, ...results })
}
