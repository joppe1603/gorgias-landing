const STOREFRONT_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
const PUBLIC_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': PUBLIC_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data as T
}

type CartLineInput = {
  merchandiseId: string
  quantity: number
}

type CartCreateData = {
  cartCreate: {
    cart: {
      id: string
      checkoutUrl: string
    }
    userErrors: { message: string }[]
  }
}

/**
 * Creates a Shopify cart with the given line items and returns the checkout URL.
 * merchandiseId must be a Shopify variant GID: "gid://shopify/ProductVariant/123456789"
 */
export async function createShopifyCheckout(lines: CartLineInput[]): Promise<string> {
  const data = await shopifyFetch<CartCreateData>(
    `mutation cartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          message
        }
      }
    }`,
    { lines },
  )

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message)
  }

  return data.cartCreate.cart.checkoutUrl
}
