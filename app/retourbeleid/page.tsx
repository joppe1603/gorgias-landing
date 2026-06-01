import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Retourbeleid | MAUYI',
  description: 'Informatie over retourneren, ruilen en terugbetalingen bij MAUYI.',
  robots: { index: false, follow: false },
}

const lastUpdated = '21 mei 2026'

export default function RetourbeleidPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FAF8F5] min-h-screen">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 py-20">

          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Juridisch</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-4"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Retourbeleid
            </h1>
            <p className="text-[#9A9590] text-sm font-light">
              Laatst bijgewerkt: {lastUpdated}
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-14" />

          <div className="prose prose-stone max-w-none space-y-10 text-[15px] leading-[1.85] text-[#4A4540]">

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">1. Herroepingsrecht</h2>
              <p>
                Als consument heb je het recht om je bestelling binnen <strong className="text-[#1A1A1A] font-medium">14 dagen</strong> na ontvangst zonder opgave van reden te annuleren. Na annulering heb je nogmaals 14 dagen om het product retour te sturen.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">2. Voorwaarden retour</h2>
              <ul className="mt-3 space-y-2 list-none pl-0">
                {[
                  'Het product is ongeopend en in originele staat.',
                  'Het product is in de originele verpakking.',
                  'De verzegeling is niet verbroken.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Om hygiënische redenen kunnen geopende huidverzorgingsproducten niet worden geretourneerd, tenzij het product defect is.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">3. Retour aanmelden</h2>
              <p>
                Stuur een e-mail naar{' '}
                <a href="mailto:hello@mauyi.nl" className="text-[#C9A96E] underline underline-offset-2">hello@mauyi.nl</a>{' '}
                met je ordernummer en reden van retour. Wij sturen je vervolgens de retourinstructies toe.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">4. Terugbetaling</h2>
              <p>
                Na ontvangst en controle van het geretourneerde product betalen wij het aankoopbedrag binnen <strong className="text-[#1A1A1A] font-medium">14 dagen</strong> terug via de originele betaalmethode. Retourkosten zijn voor rekening van de klant, tenzij het product defect of fout geleverd is.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">5. Defect of verkeerd product</h2>
              <p>
                Is er iets mis met je bestelling? Neem binnen 7 dagen na ontvangst contact op via{' '}
                <a href="mailto:hello@mauyi.nl" className="text-[#C9A96E] underline underline-offset-2">hello@mauyi.nl</a>.
                Wij lossen het op — retourkosten zijn dan voor onze rekening.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">6. Contact</h2>
              <p>
                Voor vragen over retourneren kun je ons bereiken via{' '}
                <a href="mailto:hello@mauyi.nl" className="text-[#C9A96E] underline underline-offset-2">hello@mauyi.nl</a>.
                Wij reageren binnen 2 werkdagen.
              </p>
            </section>

          </div>

          <div className="mt-16 pt-8 border-t border-stone-200">
            <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-[#9A9590] hover:text-[#C9A96E] transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M10 6H2M6 2L2 6l4 4" />
              </svg>
              Terug naar home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
