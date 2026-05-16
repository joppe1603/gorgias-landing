import type { Metadata } from 'next'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LaunchContent from './LaunchContent'

export const metadata: Metadata = {
  title: 'Pre-launch — Schrijf je in | LUMÉ',
  description: 'LUMÉ Reset Serum is in voorbereiding. Schrijf je in voor de wachtlijst en ontvang als eerste toegang tot de eerste batch.',
}

export default function LaunchPage() {
  return (
    <>
      <Navbar />
      <Suspense>
        <LaunchContent />
      </Suspense>
      <Footer />
    </>
  )
}
