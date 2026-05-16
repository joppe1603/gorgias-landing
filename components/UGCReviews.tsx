'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Sample tester experiences — pre-launch feedback from early formula testers
const ugcCards = [
  {
    type: 'text',
    quote: 'Na 4 weken echt zichtbaar verschil in textuur. Ik had het niet verwacht maar het werkt gewoon.',
    author: 'Sophie van den Berg',
    location: 'Amsterdam',
    skin: 'Droge huid · 4 weken',
    initials: 'SV',
    color: '#d4a5a5',
    product: 'Reset Serum',
    rating: 5,
  },
  {
    type: 'photo-text',
    quote: 'Gevoelige huid, altijd bang voor retinol. Dit is de eerste formule die ik dagelijks gebruik zonder problemen.',
    author: 'Emma Clarke',
    location: 'London',
    skin: 'Gevoelige huid · 6 weken',
    initials: 'EC',
    color: '#b5c4a5',
    product: 'Reset Serum',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=70&fit=crop&crop=face',
  },
  {
    type: 'text',
    quote: '3 maanden verder. Mijn vriendinnen vragen wat ik doe. Eerlijk antwoord: minder dan vroeger.',
    author: 'Lisa Müller',
    location: 'Berlijn',
    skin: 'Gemengde huid · 12 weken',
    initials: 'LM',
    color: '#a5b5d4',
    product: 'The Glow Ritual',
    rating: 5,
  },
  {
    type: 'photo-text',
    quote: 'Mijn barrière was kapot van te veel scrubben. Na 8 weken LUMÉ voelt mijn huid eindelijk normaal.',
    author: 'Hannah Park',
    location: 'Seoul',
    skin: 'Gevoelige huid · 8 weken',
    initials: 'HP',
    color: '#c4b5a5',
    product: 'Soft Barrier Cream',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=70&fit=crop&crop=face',
  },
  {
    type: 'text',
    quote: 'Ik word wakker en mijn huid ziet er al goed uit. De overnight olie doet echt iets.',
    author: 'Fleur de Jong',
    location: 'Utrecht',
    skin: 'Vette huid · 3 weken',
    initials: 'FJ',
    color: '#d4c4a5',
    product: 'Reset Serum',
    rating: 5,
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

export default function UGCReviews() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-[#C9A96E]" />
            <span className="section-label">Sample testers</span>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="text-5xl sm:text-6xl font-semibold text-[#1A1A1A] leading-[1.05]"
            >
              Echte huid.
              <br />
              <span className="text-[#9A9590] font-normal italic">Geen filters.</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-medium text-[#9A9590] bg-[#FAF8F5] border border-stone-100 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                Ervaringen van sample testers · Pre-launch formule
              </span>
            </motion.div>
          </div>
        </div>

        {/* UGC Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {ugcCards.map((card, i) => (
            <motion.div
              key={card.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="break-inside-avoid"
            >
              <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-100 hover:border-stone-200 transition-colors duration-200">
                {/* Photo if available */}
                {card.image && (
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-5 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt={`Review van ${card.author}`}
                      className="w-full h-full object-cover object-top"
                      style={{ filter: 'saturate(0.85) contrast(1.02)' }}
                    />
                    {/* Subtle grain overlay on photo */}
                    <div
                      className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: '64px 64px',
                      }}
                    />
                  </div>
                )}

                {/* Stars */}
                <div className="mb-4">
                  <Stars count={card.rating} />
                </div>

                {/* Quote */}
                <p className="text-[#1A1A1A] text-sm leading-relaxed mb-5">&ldquo;{card.quote}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: card.color }}
                  >
                    {card.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#1A1A1A]">{card.author}</p>
                    <p className="text-xs text-[#9A9590] truncate">{card.location} · {card.skin}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium text-[#C9A96E] bg-[#FDF8F0] px-2 py-0.5 rounded-full border border-[#C9A96E]/15 whitespace-nowrap">
                    {card.product}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link href="/launch#waitlist" className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-sm">
            Word als eerste uitgenodigd
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 6h8M6 2l4 4-4 4"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
