import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import SiteChrome from '@/components/SiteChrome'
import Providers from '@/components/Providers'
import CookieBanner from '@/components/CookieBanner'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
})

const BASE_URL = 'https://lume-skincare.nl'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'LUMÉ — Huidverzorging geformuleerd op wetenschap | Pre-launch',
    template: '%s | LUMÉ Skincare',
  },
  description:
    'LUMÉ — huidverzorging geformuleerd op wetenschap. Pre-launch: schrijf je in voor de wachtlijst en ontvang als eerste toegang tot Reset Serum.',
  keywords: [
    'huidverzorging', 'serum', 'retinol', 'hyaluronzuur', 'clean beauty',
    'LUMÉ', 'skincare Nederland', 'vitamine C serum', 'bakuchiol', 'gezichtscrème',
  ],
  authors: [{ name: 'LUMÉ B.V.', url: BASE_URL }],
  creator: 'LUMÉ B.V.',
  publisher: 'LUMÉ B.V.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: BASE_URL,
    siteName: 'LUMÉ Skincare',
    title: 'LUMÉ — Huidverzorging geformuleerd op wetenschap | Pre-launch',
    description:
      'LUMÉ — huidverzorging geformuleerd op wetenschap. Pre-launch: schrijf je in voor de wachtlijst.',
    images: [
      {
        url: '/quiet-cleanser.jpg',
        width: 1200,
        height: 630,
        alt: 'LUMÉ Premium Skincare producten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUMÉ — Pre-launch | Huidverzorging op wetenschap',
    description: 'Huidverzorging geformuleerd op wetenschap. Wachtlijst open — schrijf je in.',
    images: ['/quiet-cleanser.jpg'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LUMÉ',
  url: BASE_URL,
  description: 'Premium Nederlands huidverzorgingsmerk gebouwd op klinische wetenschap.',
  contactPoint: { '@type': 'ContactPoint', email: 'hello@lume-skincare.nl', contactType: 'customer service' },
  sameAs: ['https://www.instagram.com/lumeskincare', 'https://www.tiktok.com/@lumeskincare'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SiteChrome />
        <Providers>
          {children}
        </Providers>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
