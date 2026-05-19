'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PhilosophyPreview() {
  return (
    <section className="py-28 bg-[#0F0E0C] relative overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #C9A96E 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        aria-hidden
      />

      {/* Gold radial */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-sm bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#C9A96E]/40" />
            <span className="section-label" style={{ color: '#C9A96E' }}>Waarom MAUYI bestaat</span>
            <div className="w-8 h-px bg-[#C9A96E]/40" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.08] mb-8">
            De huidverzorgingsindustrie
            <br />
            is te ingewikkeld geworden.
            <br />
            <span className="text-stone-500 font-normal italic">Wij niet.</span>
          </h2>

          {/* Body */}
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl mx-auto mb-4 font-light">
            MAUYI begon vanuit één observatie: mensen kopen te veel en zien te weinig resultaat. Skincare is een cultuur geworden — terwijl huid gewoon rust, de juiste stoffen en consistentie nodig heeft.
          </p>
          <p className="text-stone-500 text-base leading-relaxed max-w-xl mx-auto mb-14 font-light">
            Wij bouwen ons merk op één principe — elk product moet zo goed zijn dat het de rest overbodig maakt.
          </p>

          {/* CTA */}
          <Link
            href="/philosophy"
            className="inline-flex items-center gap-2.5 text-[#C9A96E] border border-[#C9A96E]/30 hover:border-[#C9A96E]/70 hover:bg-[#C9A96E]/5 transition-all duration-300 px-8 py-3.5 rounded-2xl font-medium text-sm"
          >
            Lees onze filosofie
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 6h8M6 2l4 4-4 4"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
