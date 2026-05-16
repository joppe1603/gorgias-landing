import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JournalPageContent from '@/components/JournalPageContent'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Editoriaal over huidverzorging, ingrediënten, routines en intentionele schoonheid.',
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
