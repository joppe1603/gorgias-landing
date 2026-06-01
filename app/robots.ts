import type { MetadataRoute } from 'next'

const BASE_URL = 'https://mauyi.nl'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/thanks', '/unsubscribe', '/api/', '/checkout', '/order-confirmed'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
