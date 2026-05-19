import type { Metadata } from 'next'
import { Suspense } from 'react'
import OrderConfirmedContent from './OrderConfirmedContent'

export const metadata: Metadata = {
  title: 'Bestelling bevestigd — MAUYI',
  robots: { index: false, follow: false },
}

export default function OrderConfirmedPage() {
  return (
    <Suspense>
      <OrderConfirmedContent />
    </Suspense>
  )
}
