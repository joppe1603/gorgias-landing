import { NextRequest, NextResponse } from 'next/server'
import { createMollieClient } from '@mollie/api-client'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData()
    const paymentId = body.get('id') as string

    if (!paymentId) {
      return NextResponse.json({ error: 'No payment ID' }, { status: 400 })
    }

    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY! })
    const payment = await mollie.payments.get(paymentId)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const status = payment.status === 'paid' ? 'paid'
      : payment.status === 'canceled' ? 'canceled'
      : payment.status === 'expired' ? 'expired'
      : payment.status === 'failed' ? 'failed'
      : 'pending'

    // Update order status
    const { data: order } = await supabase
      .from('orders')
      .update({ status })
      .eq('mollie_payment_id', paymentId)
      .select('*')
      .single()

    // Send confirmation email + create MyParcel shipment on successful payment
    if (status === 'paid' && order) {

      // ── MyParcel: create shipment ──────────────────────────────────────
      try {
        const myparcelRes = await fetch('https://api.myparcel.nl/shipments', {
          method: 'POST',
          headers: {
            'Authorization': `basic ${Buffer.from(process.env.MYPARCEL_API_KEY!).toString('base64')}`,
            'Content-Type': 'application/vnd.shipment+json;charset=utf-8',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            data: {
              shipments: [{
                recipient: {
                  cc: order.address.country || 'NL',
                  city: order.address.city,
                  street: order.address.street,
                  number: String(order.address.houseNumber),
                  postal_code: order.address.zipCode.replace(/\s/g, ''),
                  person: order.name,
                  email: order.email,
                },
                options: { package_type: 1 },
                carrier: 1, // PostNL
              }],
            },
          }),
        })

        if (myparcelRes.ok) {
          const myparcelData = await myparcelRes.json()
          const shipmentId = myparcelData?.data?.ids?.[0]?.id
          if (shipmentId) {
            await supabase
              .from('orders')
              .update({ myparcel_shipment_id: String(shipmentId) })
              .eq('id', order.id)
          }
        } else {
          console.error('MyParcel error:', await myparcelRes.text())
        }
      } catch (myparcelErr) {
        console.error('MyParcel exception:', myparcelErr)
      }

      // ── Inventory: decrement stock ────────────────────────────────────
      try {
        const orderItems = order.items as Array<{ slug: string; quantity: number }>
        for (const item of orderItems) {
          if (item.slug) {
            await supabase.rpc('decrement_inventory', { slug: item.slug, qty: item.quantity })
          }
        }
      } catch (invErr) {
        console.error('Inventory decrement error:', invErr)
      }

      // ── Waitlist: voeg klant toe aan emaillijst ───────────────────────
      try {
        await supabase
          .from('waitlist')
          .upsert({ email: order.email, source: 'checkout' }, { onConflict: 'email', ignoreDuplicates: true })
      } catch (waitlistErr) {
        console.error('Waitlist upsert error:', waitlistErr)
      }

      const resend = new Resend(process.env.RESEND_API_KEY!)
      const items = order.items as Array<{ name: string; quantity: number; price: number; size: string; slug?: string }>

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: order.email,
        subject: 'Bestellingsbevestiging — MAUYI',
        html: `
          <!DOCTYPE html>
          <html lang="nl">
          <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin:0;padding:0;background:#FAF8F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5;padding:40px 20px;">
              <tr><td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E8E4DF;">

                  <!-- Header -->
                  <tr>
                    <td style="background:#0F0E0C;padding:32px 40px;text-align:center;">
                      <p style="margin:0;font-size:26px;font-weight:600;letter-spacing:0.1em;color:#FAF8F5;font-family:Georgia,serif;">MAUYI</p>
                      <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#C9A96E;">Bestellingsbevestiging</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">
                      <p style="margin:0 0 8px;font-size:22px;font-weight:600;color:#1A1A1A;font-family:Georgia,serif;">
                        Bedankt, ${order.name.split(' ')[0]}.
                      </p>
                      <p style="margin:0 0 32px;font-size:14px;color:#9A9590;line-height:1.6;">
                        Je bestelling is ontvangen en wordt zo snel mogelijk verwerkt.
                      </p>

                      <!-- Divider -->
                      <div style="height:1px;background:linear-gradient(to right,transparent,#C9A96E,transparent);margin-bottom:32px;"></div>

                      <!-- Order items -->
                      <p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#9A9590;">
                        Jouw bestelling
                      </p>
                      ${items.map((item) => `
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                          <tr>
                            <td style="font-size:13px;font-weight:600;color:#1A1A1A;">${item.quantity}× ${item.name}</td>
                            <td align="right" style="font-size:13px;font-weight:600;color:#1A1A1A;">€${item.price * item.quantity}</td>
                          </tr>
                          <tr>
                            <td style="font-size:11px;color:#9A9590;padding-top:2px;">${item.size}</td>
                            <td></td>
                          </tr>
                        </table>
                      `).join('')}

                      <!-- Divider -->
                      <div style="height:1px;background:#E8E4DF;margin:20px 0;"></div>

                      <!-- Total -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                        <tr>
                          <td style="font-size:15px;font-weight:700;color:#1A1A1A;">Totaal betaald</td>
                          <td align="right" style="font-size:15px;font-weight:700;color:#1A1A1A;">€${Number(order.total).toFixed(2).replace('.', ',')}</td>
                        </tr>
                      </table>

                      <!-- Delivery address -->
                      <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#9A9590;">Bezorgadres</p>
                      <p style="margin:0;font-size:13px;color:#5C5754;line-height:1.7;">
                        ${order.name}<br>
                        ${order.address.street} ${order.address.houseNumber}<br>
                        ${order.address.zipCode} ${order.address.city}<br>
                        ${order.address.country === 'NL' ? 'Nederland' : order.address.country === 'BE' ? 'België' : order.address.country}
                      </p>

                      <!-- Divider -->
                      <div style="height:1px;background:linear-gradient(to right,transparent,#C9A96E,transparent);margin:32px 0;"></div>

                      <!-- Order status link -->
                      <div style="margin:32px 0 0;text-align:center;">
                        <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.mauyi.nl'}/orders/${order.id}" style="display:inline-block;background:#0F0E0C;color:#FAF8F5;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;font-size:13px;letter-spacing:0.05em;">
                          Bekijk je bestelling →
                        </a>
                      </div>

                      <!-- Divider -->
                      <div style="height:1px;background:linear-gradient(to right,transparent,#C9A96E,transparent);margin:32px 0;"></div>

                      <p style="margin:0;font-size:13px;color:#9A9590;line-height:1.7;font-style:italic;">
                        Vragen over je bestelling? Stuur een e-mail naar
                        <a href="mailto:hello@mauyi.nl" style="color:#C9A96E;text-decoration:none;">hello@mauyi.nl</a>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#FAF8F5;padding:24px 40px;text-align:center;border-top:1px solid #E8E4DF;">
                      <p style="margin:0;font-size:11px;color:#9A9590;">
                        MAUYI Skincare · mauyi.nl
                      </p>
                      <p style="margin:8px 0 0;font-size:10px;color:#C8C4BF;">
                        Geen spam. Alleen wat ertoe doet.
                      </p>
                    </td>
                  </tr>

                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
