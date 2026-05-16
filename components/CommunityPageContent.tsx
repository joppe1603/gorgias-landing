'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const reviews = [
  {
    quote: 'Na 4 weken echt zichtbaar verschil in textuur. Ik had het niet verwacht maar het werkt gewoon.',
    author: 'Sophie van den Berg', location: 'Amsterdam', skin: 'Droge huid', weeks: '4 weken',
    product: 'Reset Serum', initials: 'SV', color: '#d4a5a5', rating: 5, verified: true,
  },
  {
    quote: 'Gevoelige huid, altijd bang voor retinol. Dit is de eerste formule die ik dagelijks gebruik zonder problemen.',
    author: 'Emma Clarke', location: 'London', skin: 'Gevoelige huid', weeks: '6 weken',
    product: 'Reset Serum', initials: 'EC', color: '#b5c4a5', rating: 5, verified: true,
  },
  {
    quote: '3 maanden verder. Mijn vriendinnen vragen wat ik doe. Eerlijk antwoord: minder dan vroeger.',
    author: 'Lisa Müller', location: 'Berlijn', skin: 'Gemengde huid', weeks: '12 weken',
    product: 'The Glow Ritual', initials: 'LM', color: '#a5b5d4', rating: 5, verified: true,
  },
  {
    quote: 'Mijn barrière was kapot van te veel scrubben. Na 8 weken LUMÉ voelt mijn huid eindelijk normaal.',
    author: 'Hannah Park', location: 'Seoul', skin: 'Gevoelige huid', weeks: '8 weken',
    product: 'Sensitive Skin Edit', initials: 'HP', color: '#c4b5a5', rating: 5, verified: true,
  },
  {
    quote: 'Ik word wakker en mijn huid ziet er al goed uit. Dat was eerder nooit zo.',
    author: 'Fleur de Jong', location: 'Utrecht', skin: 'Vette huid', weeks: '3 weken',
    product: 'Reset Serum', initials: 'FJ', color: '#d4c4a5', rating: 5, verified: true,
  },
  {
    quote: 'Ik had een kast vol producten. Nu 3. Mijn huid ziet er beter uit en ik snap eindelijk wat ik gebruik.',
    author: 'Julia Rossi', location: 'Milaan', skin: 'Normale huid', weeks: '5 weken',
    product: 'The Glow Ritual', initials: 'JR', color: '#a5d4c4', rating: 5, verified: true,
  },
  {
    quote: 'Poriën veel minder zichtbaar na 5 weken. Ik gebruik het nu als basis en bouw niets meer bovenop.',
    author: 'Noor Bakker', location: 'Rotterdam', skin: 'Gemengde huid', weeks: '5 weken',
    product: 'Reset Serum', initials: 'NB', color: '#d4a5c4', rating: 5, verified: true,
  },
  {
    quote: 'Op impuls besteld, geen verwachtingen. Nu kan ik niet meer zonder. Het serum is gewoon goed.',
    author: 'Charlotte Webb', location: 'Manchester', skin: 'Droge huid', weeks: '10 weken',
    product: 'Reset Serum', initials: 'CW', color: '#c4d4a5', rating: 5, verified: true,
  },
  {
    quote: 'Dermatologisch geteste producten en geen parfum. Eindelijk een merk dat begrijpt wat gevoelige huid nodig heeft.',
    author: 'Anna Kowalski', location: 'Warschau', skin: 'Gevoelige huid', weeks: '7 weken',
    product: 'Sensitive Skin Edit', initials: 'AK', color: '#a5c4d4', rating: 5, verified: true,
  },
]

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#C9A96E" aria-hidden>
          <path d="M6 1L7.4 4.3H11L8.2 6.5L9.2 10L6 8L2.8 10L3.8 6.5L1 4.3H4.6L6 1Z"/>
        </svg>
      ))}
    </div>
  )
}

export default function CommunityPageContent() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0F0E0C] pt-16 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A96E 1px, transparent 1px)', backgroundSize: '48px 48px' }}
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#C9A96E]/40" />
              <span className="section-label" style={{ color: '#C9A96E' }}>Community</span>
              <div className="w-6 h-px bg-[#C9A96E]/40" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-white leading-[1.05] mb-5">
              Echte mensen.
              <br />
              <span className="text-stone-500 font-normal italic">Echte huid.</span>
            </h1>
            <p className="text-stone-400 text-lg font-light leading-relaxed mb-8">
              Geverifieerde aankopen. Geen geselecteerde uitzonderingen. Geen betaalde reviews.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-3xl font-semibold text-[#C9A96E] font-[family-name:var(--font-cormorant)]">4.9</p>
                <Stars />
                <p className="text-stone-500 text-xs mt-1">Gemiddelde score</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-3xl font-semibold text-white font-[family-name:var(--font-cormorant)]">12.400+</p>
                <p className="text-stone-500 text-xs mt-1.5">Geverifieerde reviews</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-3xl font-semibold text-white font-[family-name:var(--font-cormorant)]">94%</p>
                <p className="text-stone-500 text-xs mt-1.5">Zou het aanbevelen</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews masonry */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {reviews.map((r, i) => (
              <motion.div
                key={r.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="break-inside-avoid"
              >
                <div className="bg-[#FAF8F5] rounded-2xl border border-stone-100 p-6 hover:border-stone-200 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <Stars count={r.rating} />
                    {r.verified && (
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                        ✓ Geverifieerd
                      </span>
                    )}
                  </div>

                  <p className="text-[#1A1A1A] text-sm leading-relaxed mb-5 font-light">&ldquo;{r.quote}&rdquo;</p>

                  <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: r.color }}
                    >
                      {r.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#1A1A1A]">{r.author}</p>
                      <p className="text-xs text-[#9A9590] truncate">{r.location} · {r.skin} · {r.weeks}</p>
                    </div>
                    <span className="shrink-0 text-[10px] font-medium text-[#C9A96E] bg-[#FDF8F0] px-2 py-0.5 rounded-full border border-[#C9A96E]/15 whitespace-nowrap">
                      {r.product}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UGC CTA */}
      <section className="py-20 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Deel jouw verhaal.
            </h2>
            <p className="text-[#6B6560] font-light mb-8 leading-relaxed">
              Gebruik je LUMÉ? Tag ons op Instagram (@lumeskincare) of stuur een mail. We publiceren echte ervaringen — geen gefilterde foto&apos;s, geen geselecteerde uitzonderingen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.instagram.com/lumeskincare"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                @lumeskincare
              </a>
              <Link href="/shop" className="btn-outline inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-sm">
                Probeer LUMÉ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
