import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ShopPage from '@/components/ShopPage'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'De volledige LUMÉ collectie. Quiet Cleanser, Reset Serum, Soft Barrier Cream en meer.',
}

export default function Shop() {
  return (
    <>
      <Navbar />
      <ShopPage />
      <Footer />
    </>
  )
}
