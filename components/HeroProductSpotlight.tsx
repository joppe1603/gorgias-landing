'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const reasons = [
  {
    ingredient: 'Retinol 0.3%',
    effect: 'Versnelt celvernieuwing — fijnere textuur, minder oneffenheden.',
  },
  {
    ingredient: 'Niacinamide 10%',
    effect: 'Reguleert talgproductie, verkleint de zichtbaarheid van poriën.',
  },
  {
    ingredient: 'Hyaluronzuurcomplex',
    effect: 'Trekt vocht aan en houdt het vast — ook tijdens retinolgebruik.',
  },
]

const HERO_IMAGE = '/reset-serum.jpg'

export default function HeroProductSpotlight() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-[46%_54%]">

        {/* ── LEFT: Editorial image panel ── */}
        <div className="relative hidden lg:block min-h-[660px] overflow-hidden">
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGE}
              alt="MAUYI Reset Serum — Night Reset Ritual"
              fill
              className="object-cover"
              sizes="46vw"
            />

            {/* Editorial grading */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/8" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0C]/60 via-[#0F0E0C]/10 to-transparent" />

            {/* Grain texture */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.032] pointer-events-none mix-blend-overlay" aria-hidden>
              <filter id="grain-spot">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
                <feColorMatrix type="saturate" values="0"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#grain-spot)" />
            </svg>

            {/* Top badge row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute top-8 left-8 flex flex-col gap-2"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C9A96E] bg-[#0F0E0C]/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#C9A96E]/30">
                Editor&apos;s Choice · 2026
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white bg-[#0F0E0C]/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/12">
                #1 Bestseller
              </span>
            </motion.div>

            {/* Bottom review card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute bottom-8 left-8 right-8"
            >
              <div className="bg-[#0F0E0C]/88 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">
                  Formule · Pre-launch
                </p>
                <p className="text-stone-300 text-[13px] font-light italic leading-relaxed">
                  Retinol 0.3% gebufferd door Niacinamide 10% — ontworpen voor gevoelige huid die ook wil werken met actieve stoffen.
                </p>
                <p className="text-stone-600 text-[11px] mt-2">Kleine eerste batch in voorbereiding.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT: Conversion content ── */}
        <div className="flex items-center px-6 sm:px-8 lg:px-14 py-20 lg:py-24 bg-white">
          <div className="w-full max-w-[480px] lg:max-w-none">

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="section-label">Meest geliefd · Night Reset Ritual</span>
            </motion.div>

            {/* Product name */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.6rem,4.5vw,3.8rem)] font-semibold text-[#1A1A1A] leading-[1.0] tracking-[-0.022em] mb-4"
            >
              Reset Serum
            </motion.h2>

            {/* Emotion line */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-[17px] text-[#9A9590] font-light italic leading-relaxed mb-8"
            >
              Eén serum voor een huid die de dag heeft meegemaakt. Retinol, niacinamide, hyaluronzuur — in één stabiele formule.
            </motion.p>

            {/* Why it works */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="space-y-2.5 mb-8"
            >
              {reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#FAF8F5] rounded-xl px-4 py-3 border border-stone-100">
                  <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9A96E] mt-[7px]" />
                  <p className="text-[13px] text-[#5C5754] font-light leading-snug">
                    <span className="font-semibold text-[#1A1A1A]">{r.ingredient}</span>
                    {' — '}
                    {r.effect}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Price row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex items-baseline gap-3 mb-2"
            >
              <span className="text-[2.2rem] font-semibold text-[#1A1A1A] leading-none">€58</span>
              <span className="text-sm text-[#9A9590]">30ml · incl. BTW</span>
            </motion.div>

            {/* Pre-launch badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.26 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-medium text-[#9A9590] bg-[#FAF8F5] border border-stone-100 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                Kleine eerste batch in voorbereiding · Pre-launch
              </span>
            </motion.div>

            {/* CTA block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="space-y-3 mb-6"
            >
              <Link
                href="/launch?source=homepage-spotlight#waitlist"
                className="btn-gold w-full py-[1.05rem] rounded-2xl font-medium text-[15px] tracking-[0.01em] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-transform"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Word als eerste uitgenodigd
              </Link>

              <Link
                href="/products/reset-serum"
                className="w-full py-[0.9rem] rounded-2xl font-light text-[13px] border border-stone-200 text-[#6B6560] hover:border-[#C9A96E]/40 hover:text-[#C9A96E] transition-all duration-200 flex items-center justify-center gap-2"
              >
                Alles over dit product
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 6h8M6 2l4 4-4 4"/>
                </svg>
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="flex flex-wrap gap-x-5 gap-y-1.5"
            >
              {['30 dagen garantie', 'Gratis retour', 'Gevoelige huid veilig', 'Parfumvrij'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-[11px] text-[#9A9590]">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                    <circle cx="4.5" cy="4.5" r="4" stroke="#C9A96E" strokeWidth="0.8"/>
                    <path d="M2.5 4.5l1.2 1.2L6.5 3" stroke="#C9A96E" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
