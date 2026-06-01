import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'MAUYI — Retinol Serum Nederland | Wetenschappelijk Geformuleerde Huidverzorging',
  description:
    'MAUYI Reset Serum: Retinol 0.3% + Niacinamide 10% + Bakuchiol in één parfumvrije formule. Wetenschappelijk geformuleerde huidverzorging voor gevoelige huid. €58, gratis verzending.',
  openGraph: {
    title: 'MAUYI — Retinol Serum Nederland | Wetenschappelijk Geformuleerde Huidverzorging',
    description:
      'Retinol 0.3% + Niacinamide 10% + Bakuchiol in één parfumvrij serum. Voor gevoelige huid. €58.',
  },
  twitter: {
    title: 'MAUYI — Retinol Serum Nederland',
    description:
      'Retinol 0.3% + Niacinamide 10% + Bakuchiol in één parfumvrij serum. Voor gevoelige huid. €58.',
  },
}

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
        quote="Eén formule. Ontworpen voor de avond. Gebouwd voor herstel."
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
