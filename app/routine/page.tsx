import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RoutineBuilderPage from '@/components/RoutineBuilderPage'

export const metadata: Metadata = {
  title: 'Routine Builder',
  description: 'Bouw een persoonlijke huidverzorgingsroutine in 3 stappen. Gepersonaliseerd advies op basis van jouw huidtype.',
}

export default function RoutinePage() {
  return (
    <>
      <Navbar />
      <RoutineBuilderPage />
      <Footer />
    </>
  )
}
