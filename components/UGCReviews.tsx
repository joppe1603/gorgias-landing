'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const ugcCards = [
  {
    quote: 'Na 4 weken echt zichtbaar verschil in textuur. Ik had het niet verwacht maar het werkt gewoon.',
    author: 'Sophie van den Berg',
    location: 'Amsterdam',
    skin: 'Droge huid · 4 weken',
    initials: 'SV',
    color: '#d4a5a5',
    rating: 5,
  },
  {
    quote: 'Gevoelige huid, altijd bang voor retinol. Dit is de eerste formule die ik dagelijks gebruik zonder problemen.',
    author: 'Emma Clarke',
    location: 'London',
    skin: 'Gevoelige huid · 6 weken',
    initials: 'EC',
    color: '#b5c4a5',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=70&fit=crop&crop=face',
  },
  {
    quote: '3 maanden verder. Mijn vriendinnen vragen wat ik doe. Eerlijk antwoord: minder dan vroeger, en dit serum.',
    author: 'Lisa Müller',
    location: 'Berlijn',
    skin: 'Gemengde huid · 12 weken',
    initials: 'LM',
    color: '#a5b5d4',
    rating: 5,
  },
  {
    quote: 'Ik word wakker en mijn huid ziet er al goed uit. Reset Serum doet echt iets overnight.',
    author: 'Fleur de Jong',
    location: 'Utrecht',
    skin: 'Vette huid · 3 weken',
    initials: 'FJ',
    color: '#d4c4a5',
    rating: 5,
  },
]

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
              transition={{ duration: 0.65, delay: 0.06 }}
              className="leading-[1.05] font-semibold text-[#1A1A1A]"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}
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

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-2 xl:columns-4 gap-4 space-y-4">
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

                {/* Photo */}
                {card.image && (
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-5 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt={`Review van ${card.author}`}
                      className="w-full h-full object-cover object-top"
                      style={{ filter: 'saturate(0.82) contrast(1.02)' }}
                    />
                  </div>
                )}

                {/* Quote */}
                <p className="text-[#1A1A1A] text-[14px] leading-[1.7] mb-5">
                  &ldquo;{card.quote}&rdquo;
                </p>

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
                    <p className="text-xs text-[#9A9590] truncate">
                      {card.location} · {card.skin}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium text-[#C9A96E] bg-[#FDF8F0] px-2 py-0.5 rounded-full border border-[#C9A96E]/15 whitespace-nowrap">
                    Reset Serum
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
          <Link
            href="/launch#waitlist"
            className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-sm"
          >
            Word als eerste uitgenodigd
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
