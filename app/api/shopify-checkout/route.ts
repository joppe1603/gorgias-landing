import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const linesJson = formData.get('lines') as string

    if (!linesJson) {
      return NextResponse.redirect(new URL('/', req.url), 303)
    }

    const lines = JSON.parse(linesJson)

    const storeUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!

    const res = await fetch(storeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        query: `mutation cartCreate($lines: [CartLineInput!]!) {
          cartCreate(input: { lines: $lines }) {
            cart { checkoutUrl }
            userErrors { message }
          }
        }`,
        variables: { lines },
      }),
    })

    const json = await res.json()
    const checkoutUrl = json.data?.cartCreate?.cart?.checkoutUrl

    if (!checkoutUrl) {
      const errMsg = JSON.stringify(json.errors ?? json.data?.cartCreate?.userErrors ?? json)
      console.error('Shopify checkout: no checkoutUrl:', errMsg)
      return new Response(`<h2>Checkout fout</h2><pre>${errMsg}</pre>`, {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      })
    }

    // Route via storefront hash so theme.liquid can forward without URL encoding issues
    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    const bridgeUrl = `https://${storeDomain}/#mauyi-checkout:${checkoutUrl}`
    return NextResponse.redirect(bridgeUrl, 303)
  } catch (err) {
    const errMsg = String(err)
    console.error('Shopify checkout error:', errMsg)
    return new Response(`<h2>Checkout fout (exception)</h2><pre>${errMsg}</pre>`, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    })
  }
}
