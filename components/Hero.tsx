'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Ambient blob */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="hero-blob absolute top-0 left-1/4 w-[700px] h-[600px] rounded-[50%]" />
        <div className="dot-pattern absolute inset-0 opacity-30" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-0">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-center min-h-[80vh]">

          {/* LEFT — COPY */}
          <div className="max-w-2xl">

            {/* Label */}
            <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label">LUMÉ — Huidverzorging</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.08)}
              className="text-[clamp(3rem,7vw,6rem)] font-semibold leading-[1.03] tracking-[-0.025em] text-[#1A1A1A] mb-8"
            >
              Huidverzorging
              <br />
              <span className="text-[#9A9590] font-normal italic">zonder het spektakel.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p {...fadeUp(0.16)} className="text-xl text-[#6B6560] leading-relaxed mb-12 max-w-lg font-light">
              Drie producten. Klinisch bewezen. Elke dag klaar in minder dan drie minuten — voor mensen die genoeg hebben van ingewikkelde routines.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.24)} className="flex flex-wrap gap-4 mb-14">
              <Link
                href="/shop"
                className="btn-gold inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-medium text-[15px]"
              >
                Shop de routine
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4"/>
                </svg>
              </Link>
              <Link
                href="/routine"
                className="btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium text-[15px]"
              >
                Bouw mijn routine
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div {...fadeUp(0.32)} className="flex flex-wrap items-center gap-5">
              {[
                { label: '30 dagen garantie', sub: 'Geen vragen gesteld' },
                { label: 'Parfumvrij', sub: 'Geschikt voor gevoelige huid' },
                { label: 'Pre-launch', sub: 'Eerste batch in voorbereiding' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  {i > 0 && <div className="w-px h-7 bg-stone-200" />}
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">{item.label}</p>
                    <p className="text-xs text-[#9A9590] mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — PRODUCT VISUAL */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex justify-end"
          >
            {/* Main product image */}
            <div className="relative">
              {/* Subtle background shape */}
              <div className="absolute -inset-8 bg-[#F5EFE6] rounded-[32px] opacity-60" />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="w-[380px] h-[480px] rounded-[24px] overflow-hidden relative shadow-[0_32px_80px_rgba(0,0,0,0.12)]">
                  <Image
                    src="/reset-serum.jpg"
                    alt="LUMÉ Reset Serum"
                    fill
                    className="object-cover"
                    sizes="380px"
                    priority
                  />
                  {/* Subtle tone overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/25 via-transparent to-transparent" />

                  {/* Product label */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3.5 border border-stone-100/80">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-0.5">Reset Serum · 30ml</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#1A1A1A]">€58 · Gratis verzending</p>
                        <Link href="/products/reset-serum" className="text-[10px] font-bold text-[#C9A96E] hover:underline underline-offset-2">
                          Bekijk →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating ingredient note */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -left-14 top-1/3 bg-white rounded-2xl shadow-lg border border-stone-100 px-4 py-3"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Hoofdingredient</p>
                  <p className="text-sm font-semibold text-[#1A1A1A]">Retinol 0.3%</p>
                  <p className="text-xs text-[#6B6560]">+ Niacinamide 10%</p>
                </motion.div>

                {/* Floating skin badge */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -right-10 top-1/4 bg-[#0F0E0C] rounded-2xl px-4 py-3"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A96E] mb-1">Alle huidtypes</p>
                  <p className="text-xs text-stone-300">Parfumvrij · Vegan</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F5] to-transparent pointer-events-none" />
    </section>
  )
}
