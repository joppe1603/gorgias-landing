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

const BASE_URL = 'https://mauyi.nl'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'MAUYI — Huidverzorging geformuleerd op wetenschap | Pre-launch',
    template: '%s | MAUYI Skincare',
  },
  description:
    'MAUYI — huidverzorging geformuleerd op wetenschap. Pre-launch: schrijf je in voor de wachtlijst en ontvang als eerste toegang tot Reset Serum.',
  keywords: [
    'huidverzorging', 'serum', 'retinol', 'hyaluronzuur', 'clean beauty',
    'MAUYI', 'skincare Nederland', 'vitamine C serum', 'bakuchiol', 'gezichtscrème',
  ],
  authors: [{ name: 'MAUYI B.V.', url: BASE_URL }],
  creator: 'MAUYI B.V.',
  publisher: 'MAUYI B.V.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: BASE_URL,
    siteName: 'MAUYI Skincare',
    title: 'MAUYI — Huidverzorging geformuleerd op wetenschap | Pre-launch',
    description:
      'MAUYI — huidverzorging geformuleerd op wetenschap. Pre-launch: schrijf je in voor de wachtlijst.',
    images: [
      {
        url: '/quiet-cleanser.jpg',
        width: 1200,
        height: 630,
        alt: 'MAUYI Premium Skincare producten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAUYI — Pre-launch | Huidverzorging op wetenschap',
    description: 'Huidverzorging geformuleerd op wetenschap. Wachtlijst open — schrijf je in.',
    images: ['/quiet-cleanser.jpg'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MAUYI',
  url: BASE_URL,
  description: 'Premium Nederlands huidverzorgingsmerk gebouwd op klinische wetenschap.',
  contactPoint: { '@type': 'ContactPoint', email: 'hello@mauyi.nl', contactType: 'customer service' },
  sameAs: ['https://www.instagram.com/lumeskincare', 'https://www.tiktok.com/@mauyi'],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MAUYI',
  url: BASE_URL,
  description: 'Wetenschappelijk geformuleerde huidverzorging voor gevoelige huid. Retinol, Niacinamide en Bakuchiol in parfumvrije formules.',
  inLanguage: 'nl-NL',
  publisher: {
    '@type': 'Organization',
    name: 'MAUYI',
    url: BASE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
