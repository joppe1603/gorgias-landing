import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IngredientsPageContent from '@/components/IngredientsPageContent'

export const metadata: Metadata = {
  title: 'Ingrediënten & Wetenschap',
  description: 'Wat werkt en waarom. De wetenschap achter elk MAUYI ingrediënt — zonder marketing.',
}

export default function IngredientsPage() {
  return (
    <>
      <Navbar />
      <IngredientsPageContent />
      <Footer />
    </>
  )
}
