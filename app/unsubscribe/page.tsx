import type { Metadata } from 'next'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnsubscribeContent from './UnsubscribeContent'

export const metadata: Metadata = {
  title: 'Uitschrijven | MAUYI',
  description: 'Schrijf je uit van de MAUYI wachtlijst.',
  robots: { index: false, follow: false },
}

export default function UnsubscribePage() {
  return (
    <>
      <Navbar />
      <Suspense>
        <UnsubscribeContent />
      </Suspense>
      <Footer />
    </>
  )
}
