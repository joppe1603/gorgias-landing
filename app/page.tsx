import PageEntrance from '@/components/PageEntrance'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import FeaturedProducts from '@/components/FeaturedProducts'
import RoutinePreview from '@/components/RoutinePreview'
import UGCReviews from '@/components/UGCReviews'
import PhilosophyPreview from '@/components/PhilosophyPreview'
import ClosingCTA from '@/components/ClosingCTA'
import Footer from '@/components/Footer'
import StickyCart from '@/components/StickyCart'

export default function Home() {
  return (
    <PageEntrance>
      <Navbar />
      <Hero />
      <TrustStrip />
      <FeaturedProducts />
      <RoutinePreview />
      <UGCReviews />
      <PhilosophyPreview />
      <ClosingCTA />
      <Footer />
      <StickyCart />
    </PageEntrance>
  )
}
