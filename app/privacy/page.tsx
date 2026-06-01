import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Hoe MAUYI omgaat met jouw persoonsgegevens.',
  robots: { index: false, follow: false },
}

const lastUpdated = '18 mei 2026'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FAF8F5] min-h-screen">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 py-20">

          {/* Header */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Juridisch</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-4"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Privacybeleid
            </h1>
            <p className="text-[#9A9590] text-sm font-light">
              Laatst bijgewerkt: {lastUpdated}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-14" />

          {/* Content */}
          <div className="prose prose-stone max-w-none space-y-10 text-[15px] leading-[1.85] text-[#4A4540]">

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">1. Wie zijn wij</h2>
              <p>
                MAUYI B.V. (hierna: &ldquo;MAUYI&rdquo;, &ldquo;wij&rdquo;, &ldquo;ons&rdquo;) is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid. Wij zijn bereikbaar via{' '}
                <a href="mailto:hello@mauyi.nl" className="text-[#C9A96E] underline underline-offset-2">hello@mauyi.nl</a>.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">2. Welke gegevens verzamelen wij</h2>
              <p>Wij verzamelen uitsluitend de volgende gegevens:</p>
              <ul className="mt-3 space-y-2 list-none pl-0">
                {[
                  { label: 'E-mailadres', desc: 'Wanneer je je inschrijft voor de wachtlijst of nieuwsbrief.' },
                  { label: 'Herkomstpagina', desc: 'Van welke pagina je je hebt ingeschreven (bijv. "homepage" of "productpagina"), zodat wij begrijpen hoe mensen ons vinden.' },
                  { label: 'Aanmelddatum', desc: 'Het tijdstip van inschrijving.' },
                  { label: 'Cookiegegevens', desc: 'Alleen indien je daarvoor toestemming hebt gegeven. Zie sectie 6.' },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                    <span><strong className="text-[#1A1A1A] font-medium">{item.label}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Wij verzamelen <strong className="text-[#1A1A1A] font-medium">geen</strong> betaalgegevens, geen adresgegevens en geen gevoelige persoonsgegevens.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">3. Waarom verwerken wij jouw gegevens</h2>
              <p>Wij verwerken jouw e-mailadres uitsluitend voor de volgende doeleinden:</p>
              <ul className="mt-3 space-y-2 list-none pl-0">
                {[
                  'Het sturen van een persoonlijk bericht wanneer MAUYI producten beschikbaar komen (lanceringsmelding).',
                  'Het delen van relevante updates over de voortgang van de productontwikkeling, uitsluitend indien je dit verwacht op basis van je inschrijving.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Wij sturen geen ongewenste commerciële e-mails en verkopen jouw gegevens nooit aan derden.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">4. Grondslag voor verwerking</h2>
              <p>
                De verwerking van jouw e-mailadres is gebaseerd op jouw <strong className="text-[#1A1A1A] font-medium">toestemming</strong> (art. 6 lid 1 sub a AVG). Je geeft deze toestemming door je vrijwillig in te schrijven voor de wachtlijst. Je kunt deze toestemming op elk moment intrekken.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">5. Bewaartermijn</h2>
              <p>
                Wij bewaren jouw gegevens totdat de lancering van het betreffende product heeft plaatsgevonden en de wachtlijst niet langer actief is, of totdat je je afmeldt. Daarna worden jouw gegevens binnen 30 dagen verwijderd.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">6. Cookies</h2>
              <p>
                Onze website gebruikt cookies. Je kunt kiezen welke cookies je accepteert via de cookiebanner die verschijnt bij je eerste bezoek.
              </p>
              <ul className="mt-3 space-y-3 list-none pl-0">
                {[
                  { label: 'Noodzakelijke cookies', desc: 'Altijd actief. Vereist voor het correct functioneren van de website. Slaan jouw cookievoorkeur op.' },
                  { label: 'Analytische cookies', desc: 'Alleen met jouw toestemming. Helpen ons begrijpen hoe bezoekers onze website gebruiken (anoniem en geaggregeerd).' },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                    <span><strong className="text-[#1A1A1A] font-medium">{item.label}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">7. Derde partijen</h2>
              <p>
                Wij maken gebruik van <strong className="text-[#1A1A1A] font-medium">Supabase</strong> (Supabase Inc., VS) voor de opslag van wachtlijstgegevens. Supabase verwerkt gegevens in overeenstemming met de AVG en heeft standaard contractbepalingen (SCC&apos;s) getekend. Meer informatie: <a href="https://supabase.com/privacy" className="text-[#C9A96E] underline underline-offset-2" target="_blank" rel="noreferrer">supabase.com/privacy</a>.
              </p>
              <p className="mt-3">
                Wij delen jouw gegevens niet met andere derde partijen, tenzij wij daartoe wettelijk verplicht zijn.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">8. Jouw rechten</h2>
              <p>Op grond van de AVG heb je de volgende rechten:</p>
              <ul className="mt-3 space-y-2 list-none pl-0">
                {[
                  'Recht op inzage in jouw gegevens.',
                  'Recht op correctie van onjuiste gegevens.',
                  'Recht op verwijdering van jouw gegevens.',
                  'Recht op beperking van de verwerking.',
                  'Recht op overdraagbaarheid van gegevens.',
                  'Recht om bezwaar te maken tegen verwerking.',
                  'Recht om toestemming in te trekken.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Stuur een e-mail naar{' '}
                <a href="mailto:hello@mauyi.nl" className="text-[#C9A96E] underline underline-offset-2">hello@mauyi.nl</a>{' '}
                om gebruik te maken van jouw rechten. Wij reageren binnen 30 dagen.
              </p>
              <p className="mt-3">
                Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens:{' '}
                <a href="https://autoriteitpersoonsgegevens.nl" className="text-[#C9A96E] underline underline-offset-2" target="_blank" rel="noreferrer">autoriteitpersoonsgegevens.nl</a>.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">9. Beveiliging</h2>
              <p>
                Wij nemen passende technische en organisatorische maatregelen om jouw gegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik. Alle verbindingen zijn beveiligd via HTTPS.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">10. Wijzigingen</h2>
              <p>
                Wij kunnen dit privacybeleid van tijd tot tijd bijwerken. De meest recente versie staat altijd op deze pagina met de datum van de laatste wijziging.
              </p>
            </section>

          </div>

          {/* Bottom divider + back link */}
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
