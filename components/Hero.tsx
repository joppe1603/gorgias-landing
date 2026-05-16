'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const trustBadges = [
  { icon: '★', value: '4.9/5', label: '12.400 reviews' },
  { icon: '○', value: 'Parfumvrij', label: 'dermatologisch getest' },
  { icon: '↩', value: '30 dagen', label: 'volledige garantie' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white pb-0">
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#FAF0DC]/50 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — tekst */}
          <div className="text-left">
            <div className="relative mb-6">
              <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[280px]" aria-hidden>
                <div className="hero-blob w-full h-full rounded-[50%]" />
              </div>
              <motion.h1
                {...fadeUp(0.05)}
                className="relative text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.06] tracking-tight text-[#1A1A1A]"
              >
                Minder stappen.
                <br />
                <span className="gradient-text">Betere huid.</span>
              </motion.h1>
            </div>

            <motion.p {...fadeUp(0.15)} className="text-lg text-[#6B6560] max-w-lg leading-relaxed mb-10">
              LUMÉ is gemaakt voor mensen die genoeg hebben van ingewikkelde routines. Drie producten. Klinisch bewezen. Elke dag klaar in 3 minuten.
            </motion.p>

            <motion.div {...fadeUp(0.25)} className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#shop" className="btn-gold px-8 py-4 rounded-2xl font-semibold text-base text-center cursor-pointer transition-all">
                Bouw mijn routine
              </a>
              <a href="#quiz" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-[#1A1A1A] border-2 border-stone-200 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all cursor-pointer">
                Doe de huidquiz
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </a>
            </motion.div>

            {/* Vertrouwensbadges */}
            <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {trustBadges.map((b) => (
                <div key={b.label} className="flex items-center gap-2.5">
                  <span className="text-xl">{b.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A] leading-none">{b.value}</p>
                    <p className="text-xs text-[#6B6560]">{b.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — echte product foto */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="relative w-72 sm:w-80 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-stone-300/60">
                <Image
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=640&q=85&fit=crop"
                  alt="LUMÉ Radiance Serum — premium huidverzorging"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 288px, 320px"
                  priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <span className="bg-white/85 backdrop-blur-sm border border-stone-100 rounded-full px-4 py-1.5 text-xs font-semibold text-[#1A1A1A] shadow-sm">
                    €58 · Gratis verzending
                  </span>
                </div>

                <div className="absolute top-5 left-0 right-0 flex justify-center">
                  <span className="bg-[#1A1A1A]/60 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A96E] px-3 py-1 rounded-full">
                    Radiance Serum · 30ml
                  </span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -left-10 top-1/3 bg-white rounded-2xl shadow-xl border border-stone-100 px-4 py-3 min-w-[120px]"
              >
                <p className="text-xl font-black text-[#C9A96E]">28 dagen</p>
                <p className="text-xs text-[#6B6560] mt-0.5">zichtbaar resultaat</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -right-10 top-1/4 bg-white rounded-2xl shadow-xl border border-stone-100 px-4 py-3 min-w-[130px]"
              >
                <p className="text-sm font-bold text-[#1A1A1A]">Puur ✓</p>
                <p className="text-xs text-[#6B6560] mt-0.5">100% veganistische formule</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="h-28 bg-gradient-to-b from-transparent to-[#FAF8F5] mt-20" />
    </section>
  )
}
