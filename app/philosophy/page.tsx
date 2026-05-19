import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PhilosophyPageContent from '@/components/PhilosophyPageContent'

export const metadata: Metadata = {
  title: 'Filosofie',
  description: 'Waarom minder skincare beter werkt. De overtuigingen en principes achter MAUYI.',
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
