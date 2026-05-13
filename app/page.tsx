import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LogoCarousel from '@/components/LogoCarousel'
import Features from '@/components/Features'
import SocialProof from '@/components/SocialProof'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogoCarousel />
      <Features />
      <SocialProof />
      <Pricing />
      <Footer />
    </main>
  )
}
