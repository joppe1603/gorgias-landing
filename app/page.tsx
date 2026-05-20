import PageEntrance from '@/components/PageEntrance'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HeroProductSpotlight from '@/components/HeroProductSpotlight'
import WhyResetExists from '@/components/WhyResetExists'
import IngredientPhilosophy from '@/components/IngredientPhilosophy'
import UGCReviews from '@/components/UGCReviews'
import EditorialQuote from '@/components/EditorialQuote'
import FounderNote from '@/components/FounderNote'
import EditorialTexture from '@/components/EditorialTexture'
import ClosingCTA from '@/components/ClosingCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <PageEntrance>
      <Navbar />
      <Hero />
      <HeroProductSpotlight />
      <WhyResetExists />
      <IngredientPhilosophy />
      <UGCReviews />
      <EditorialQuote
        quote="Huidverzorging hoeft niet ingewikkeld te zijn. Het hoeft alleen eerlijk te zijn."
        attribution="MAUYI · Oprichtingsmanifest"
        variant="light"
        size="md"
      />
      <FounderNote />
      <EditorialTexture />
      <ClosingCTA />
      <Footer />
    </PageEntrance>
  )
}
