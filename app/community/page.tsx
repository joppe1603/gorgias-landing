import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CommunityPageContent from '@/components/CommunityPageContent'

export const metadata: Metadata = {
  title: 'Community',
  description: 'Echte mensen. Echte huid. Verhalen en ervaringen van de MAUYI community.',
}

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <CommunityPageContent />
      <Footer />
    </>
  )
}
