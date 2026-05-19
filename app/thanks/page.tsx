import type { Metadata } from 'next'
import ThanksContent from './ThanksContent'

export const metadata: Metadata = {
  title: 'Je staat op de lijst — MAUYI',
  description: 'Je inschrijving is ontvangen. We nemen contact op zodra de eerste batch beschikbaar is.',
  robots: { index: false, follow: false },
}

export default function ThanksPage() {
  return <ThanksContent />
}
