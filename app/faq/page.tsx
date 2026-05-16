import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQPageContent from '@/components/FAQPageContent'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Antwoorden op de meest gestelde vragen over LUMÉ producten, ingrediënten en routines.',
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <FAQPageContent />
      <Footer />
    </>
  )
}
