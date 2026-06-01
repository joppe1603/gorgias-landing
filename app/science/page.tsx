import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScienceContent from './ScienceContent'

export const metadata: Metadata = {
  title: 'Wetenschap — Hoe MAUYI Formuleert',
  description: 'De wetenschap achter MAUYI huidverzorging. Waarom retinol 0.3%, niacinamide 10% en bakuchiol samen werken — en waarom elke concentratie een bewuste, klinisch onderbouwde keuze is.',
}

export default function SciencePage() {
  return (
    <>
      <Navbar />
      <ScienceContent />
      <Footer />
    </>
  )
}
