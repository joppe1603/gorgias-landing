import type { Metadata } from 'next'
import CheckoutForm from './CheckoutForm'

export const metadata: Metadata = {
  title: 'Afrekenen | LUMÉ',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <CheckoutForm />
}
