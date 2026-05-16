import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhyLumeContent from './WhyLumeContent'

export const metadata: Metadata = {
  title: 'Waarom LUMÉ | Huidverzorging zonder compromis',
  description: 'LUMÉ bestaat omdat de huidverzorgingsindustrie te ingewikkeld is geworden. Lees onze filosofie, onze principes en wat we bewust weglaten.',
}

export default function WhyLumePage() {
  return (
    <>
      <Navbar />
      <WhyLumeContent />
      <Footer />
    </>
  )
}
