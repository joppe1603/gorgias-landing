import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PhilosophyPageContent from '@/components/PhilosophyPageContent'

export const metadata: Metadata = {
  title: 'Filosofie — Waarom Minder Huidverzorging Beter Werkt',
  description: 'De filosofie achter MAUYI: minder producten, betere formuleringen. Waarom wij geloven in wetenschappelijke eenvoud boven een complexe skincare routine.',
}

export default function PhilosophyPage() {
  return (
    <>
      <Navbar />
      <PhilosophyPageContent />
      <Footer />
    </>
  )
}
