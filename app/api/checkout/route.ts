import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.mauyi.nl'

export async function POST(req: NextRequest) {
  try {
    const { items, form, total } = await req.json()

    if (!items?.length || !form?.email || !form?.name) {
      return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 })
    }

    // Save pending order to Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert({
        status: 'pending',
        email: form.email.toLowerCase().trim(),
        name: form.name.trim(),
        address: {
          street: form.street,
          houseNumber: form.houseNumber,
          zipCode: form.zipCode,
          city: form.city,
          country: form.country,
        },
        items,
        total,
      })
      .select('id')
      .single()

    if (dbError || !order) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: 'Bestelling kon niet worden opgeslagen.' }, { status: 500 })
    }

    // Create Mollie payment via direct API call (bypasses SDK ESM issues)
    const mollieBody = {
      amount: { currency: 'EUR', value: total.toFixed(2) },
      description: `MAUYI bestelling #${order.id}`,
      redirectUrl: `${BASE_URL}/order-confirmed?order_id=${order.id}`,
      webhookUrl: `${BASE_URL}/api/checkout/webhook`,
      metadata: { orderId: order.id, email: form.email },
      locale: 'nl_NL',
    }

    const mollieRes = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MOLLIE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mollieBody),
    })

    const mollieData = await mollieRes.json()

    if (!mollieRes.ok) {
      console.error('Mollie API error:', JSON.stringify(mollieData))
      return NextResponse.json({ error: 'Betaling kon niet worden aangemaakt.' }, { status: 500 })
    }

    const checkoutUrl = mollieData._links?.checkout?.href
    if (!checkoutUrl) {
      console.error('No checkout URL in Mollie response:', JSON.stringify(mollieData))
      return NextResponse.json({ error: 'Geen checkout URL ontvangen.' }, { status: 500 })
    }

    // Save Mollie payment ID to order
    await supabase
      .from('orders')
      .update({ mollie_payment_id: mollieData.id })
      .eq('id', order.id)

    return NextResponse.json({ checkoutUrl })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Er is iets misgegaan. Probeer het opnieuw.' }, { status: 500 })
  }
}
