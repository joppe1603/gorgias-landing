import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | MAUYI',
  description: 'De algemene voorwaarden van MAUYI.',
  robots: { index: false, follow: false },
}

const lastUpdated = '21 mei 2026'

export default function VoorwaardenPage() {
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
              Algemene Voorwaarden
            </h1>
            <p className="text-[#9A9590] text-sm font-light">
              Laatst bijgewerkt: {lastUpdated}
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-14" />

          <div className="prose prose-stone max-w-none space-y-10 text-[15px] leading-[1.85] text-[#4A4540]">

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">1. Wie zijn wij</h2>
              <p>
                MAUYI B.V., gevestigd in Nederland, ingeschreven bij de Kamer van Koophandel. Bereikbaar via{' '}
                <a href="mailto:hello@mauyi.nl" className="text-[#C9A96E] underline underline-offset-2">hello@mauyi.nl</a>.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">2. Toepasselijkheid</h2>
              <p>
                Deze algemene voorwaarden zijn van toepassing op alle bestellingen die via mauyi.nl worden geplaatst. Door een bestelling te plaatsen ga je akkoord met deze voorwaarden.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">3. Bestelling en overeenkomst</h2>
              <p>
                Een overeenkomst komt tot stand op het moment dat je een orderbevestiging per e-mail ontvangt. Wij behouden het recht om een bestelling te weigeren of te annuleren, bijvoorbeeld bij uitverkoop of vermoed misbruik.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">4. Prijzen en betaling</h2>
              <p>
                Alle prijzen zijn in euro&apos;s en inclusief BTW. Wij accepteren betaling via iDEAL, creditcard en andere methoden aangeboden in de checkout. Betaling vindt direct plaats bij het plaatsen van de bestelling.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">5. Levering</h2>
              <p>
                Wij leveren binnen Nederland. Bestellingen worden verwerkt en verzonden op werkdagen. De levertijd is doorgaans 2–5 werkdagen na betaling. Zodra je bestelling is verzonden ontvang je een bevestiging per e-mail.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">6. Retour en herroeping</h2>
              <p>
                Zie ons{' '}
                <Link href="/retourbeleid" className="text-[#C9A96E] underline underline-offset-2">retourbeleid</Link>
                {' '}voor volledige informatie over retourneren en terugbetalingen.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">7. Aansprakelijkheid</h2>
              <p>
                MAUYI is niet aansprakelijk voor indirecte schade of gevolgschade. Onze aansprakelijkheid is in alle gevallen beperkt tot het bedrag van de betreffende bestelling.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">8. Intellectueel eigendom</h2>
              <p>
                Alle content op mauyi.nl — teksten, afbeeldingen, logo&apos;s en ontwerpen — is eigendom van MAUYI en mag niet worden overgenomen zonder schriftelijke toestemming.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">9. Toepasselijk recht</h2>
              <p>
                Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">10. Contact</h2>
              <p>
                Vragen over deze voorwaarden? Stuur een e-mail naar{' '}
                <a href="mailto:hello@mauyi.nl" className="text-[#C9A96E] underline underline-offset-2">hello@mauyi.nl</a>.
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
