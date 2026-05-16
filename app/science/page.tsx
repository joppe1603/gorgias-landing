import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScienceContent from './ScienceContent'

export const metadata: Metadata = {
  title: 'Wetenschap | LUMÉ — Hoe we formuleren',
  description: 'Hoe LUMÉ formuleert. De wetenschap achter onze ingrediënten, onze testmethodes en waarom elke concentratie een bewuste keuze is.',
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
