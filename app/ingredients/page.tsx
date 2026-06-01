import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IngredientsPageContent from '@/components/IngredientsPageContent'

export const metadata: Metadata = {
  title: 'Ingrediënten & Wetenschap — Retinol, Niacinamide, Bakuchiol',
  description: 'De wetenschap achter MAUYI ingrediënten: retinol, niacinamide 10%, bakuchiol en ceramiden. Wat elk ingrediënt doet, welke concentraties werken en waarom ze samen effectiever zijn.',
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
