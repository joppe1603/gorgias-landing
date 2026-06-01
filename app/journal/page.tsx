import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JournalPageContent from '@/components/JournalPageContent'

export const metadata: Metadata = {
  title: 'Journal — Huidverzorging op Wetenschap',
  description: 'MAUYI Journal: eerlijke artikelen over retinol, niacinamide, bakuchiol, huidbarrière en skincare routines. Geen marketing — wel wetenschap.',
}

export default function JournalPage() {
  return (
    <>
      <Navbar />
      <JournalPageContent />
      <Footer />
    </>
  )
}
