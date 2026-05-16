import PageEntrance from '@/components/PageEntrance'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LogoCarousel from '@/components/LogoCarousel'
import Features from '@/components/Features'
import BeforeAfter from '@/components/BeforeAfter'
import Routine from '@/components/Routine'
import SocialProof from '@/components/SocialProof'
import Reviews from '@/components/Reviews'
import SkincareQuiz from '@/components/SkincareQuiz'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import StickyCart from '@/components/StickyCart'
import NewsletterPopup from '@/components/NewsletterPopup'

export default function Home() {
  return (
    <PageEntrance>
      <Navbar />
      <Hero />
      <LogoCarousel />
      <Features />
      <BeforeAfter />
      <Routine />
      <SocialProof />
      <Reviews />
      <SkincareQuiz />
      <Pricing />
      <FAQ />
      <Footer />
      <StickyCart />
      <NewsletterPopup />
    </PageEntrance>
  )
}
