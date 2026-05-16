import PageEntrance from '@/components/PageEntrance'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import HeroProductSpotlight from '@/components/HeroProductSpotlight'
import UGCReviews from '@/components/UGCReviews'
import PhilosophyPreview from '@/components/PhilosophyPreview'
import FounderNote from '@/components/FounderNote'
import ClosingCTA from '@/components/ClosingCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <PageEntrance>
      <Navbar />
      <Hero />
      <TrustStrip />
      <HeroProductSpotlight />
      <UGCReviews />
      <PhilosophyPreview />
      <FounderNote />
      <ClosingCTA />
      <Footer />
    </PageEntrance>
  )
}
