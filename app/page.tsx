import PageEntrance from '@/components/PageEntrance'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import HeroProductSpotlight from '@/components/HeroProductSpotlight'
import RitualSection from '@/components/RitualSection'
import UGCReviews from '@/components/UGCReviews'
import PhilosophyPreview from '@/components/PhilosophyPreview'
import EditorialQuote from '@/components/EditorialQuote'
import FounderNote from '@/components/FounderNote'
import ClosingCTA from '@/components/ClosingCTA'
import Footer from '@/components/Footer'
import InstagramGrid from '@/components/InstagramGrid'

export default function Home() {
  return (
    <PageEntrance>
      <Navbar />
      <Hero />
      <TrustStrip />
      <HeroProductSpotlight />
      <RitualSection />
      <UGCReviews />
      <PhilosophyPreview />
      <EditorialQuote
        quote="Huidverzorging hoeft niet ingewikkeld te zijn. Het hoeft alleen eerlijk te zijn."
        attribution="LUMÉ · Oprichtingsmanifest"
        variant="light"
        size="md"
      />
      <FounderNote />
      <InstagramGrid />
      <ClosingCTA />
      <Footer />
    </PageEntrance>
  )
}
