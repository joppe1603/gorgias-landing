import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Gorgias — Customer Experience Platform for Ecommerce',
  description:
    'Gorgias is the #1 customer support helpdesk for ecommerce. Automate 60% of your support tickets and grow revenue from every interaction.',
  keywords: 'customer support, helpdesk, ecommerce, automation, Shopify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
