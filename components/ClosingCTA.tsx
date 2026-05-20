'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ClosingCTA() {
  return (
    <section className="relative bg-[#0A0908] py-32 overflow-hidden">

      {/* Grain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.032] pointer-events-none mix-blend-overlay"
        aria-hidden
      >
        <filter id="grain-cta">
          <feTurbulence type="fractalNoise" baseFrequency="0.74" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-cta)" />
      </svg>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,169,110,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xs h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.35), transparent)',
        }}
        aria-hidden
      />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo mark */}
          <div className="flex items-center justify-center mb-12">
            <svg width="28" height="28" viewBox="0 0 30 30" fill="none" aria-hidden>
              <circle cx="15" cy="15" r="13" fill="#C9A96E" fillOpacity="0.15" />
              <circle cx="15" cy="15" r="13" stroke="#C9A96E" strokeOpacity="0.3" strokeWidth="0.8" />
              <circle cx="19" cy="15" r="9" fill="#C9A96E" fillOpacity="0.08" />
            </svg>
          </div>

          <h2
            className="text-white leading-[1.06] tracking-[-0.025em] mb-7"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.4rem)', fontWeight: 600 }}
          >
            De eerste batch
            <br />
            <span className="text-stone-500 font-normal italic">is bijna klaar.</span>
          </h2>

          <p className="text-stone-500 text-[16px] font-light leading-[1.8] mb-14 max-w-lg mx-auto">
            Kleine oplage. Geen hype. Alleen mensen die écht willen weten wat Reset Serum doet voor hun huid.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/launch?source=closing-cta#waitlist"
              className="btn-gold inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-medium text-[15px] w-full sm:w-auto justify-center"
            >
              Zet me op de lijst
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/products/reset-serum"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-[15px] text-stone-400 border border-white/10 hover:border-[#C9A96E]/30 hover:text-[#C9A96E] transition-all duration-300 w-full sm:w-auto justify-center"
            >
              Meer over Reset Serum
            </Link>
          </div>

          <p className="text-[11px] text-stone-600 mt-10 font-medium tracking-[0.14em] uppercase">
            Jij hoort als eerste.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
