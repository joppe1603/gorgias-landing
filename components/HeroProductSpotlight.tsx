'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

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

const HERO_IMAGE = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=960&q=85&fit=crop'

export default function HeroProductSpotlight() {
  const { dispatch } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        slug: 'reset-serum',
        name: 'Reset Serum',
        price: 58,
        image: HERO_IMAGE,
        size: '30ml',
      },
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

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
              alt="LUMÉ Reset Serum — Night Reset Ritual"
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
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="10" height="10" viewBox="0 0 16 16" fill="#C9A96E" aria-hidden>
                        <path d="M8 1L9.8 5.5H15L10.8 8.5L12.5 13L8 10L3.5 13L5.2 8.5L1 5.5H6.2L8 1Z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-white text-[13px] font-semibold">4.9</span>
                  <span className="text-stone-500 text-[11px]">12.400+ beoordelingen</span>
                </div>
                <p className="text-stone-300 text-[13px] font-light italic leading-relaxed">
                  &ldquo;Het eerste retinol dat ik dagelijks gebruik zonder problemen — gevoelige huid.&rdquo;
                </p>
                <p className="text-stone-600 text-[11px] mt-1.5">— Emma C. · Amsterdam · 6 weken</p>
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

            {/* Delivery line */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.26 }}
              className="text-[11px] text-[#9A9590] mb-6 flex items-center gap-1.5"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="1" y="3" width="15" height="13" rx="1"/>
                <path d="M16 8h4l3 5v3h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              Besteld vóór 23:00, morgen in huis · Gratis boven €75
            </motion.p>

            {/* CTA block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="space-y-3 mb-6"
            >
              <button
                onClick={handleAdd}
                className="btn-gold w-full py-[1.05rem] rounded-2xl font-medium text-[15px] cursor-pointer tracking-[0.01em] relative overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Toegevoegd aan winkelwagen
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      In winkelwagen · €58
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

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
