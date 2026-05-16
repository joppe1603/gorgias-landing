'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ClosingCTA() {
  return (
    <section className="py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="divider-stone absolute top-0 left-0 right-0" />

      {/* Ambient warmth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#FAF0DC]/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Divider mark */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-10 h-px bg-stone-300" />
            <svg width="16" height="16" viewBox="0 0 30 30" fill="none" aria-hidden>
              <circle cx="15" cy="15" r="13" fill="#C9A96E"/>
              <circle cx="19" cy="15" r="10" fill="#FAF8F5"/>
            </svg>
            <div className="w-10 h-px bg-stone-300" />
          </div>

          <h2 className="text-5xl sm:text-6xl font-semibold text-[#1A1A1A] leading-[1.05] mb-6">
            Start met drie producten.
            <br />
            <span className="text-[#9A9590] font-normal italic">Niet meer.</span>
          </h2>

          <p className="text-[#6B6560] text-lg leading-relaxed mb-12 font-light max-w-xl mx-auto">
            Risicovrij. 30 dagen. Gratis verzending boven €50. Als je huid er niet beter uitziet, krijg je alles terug — geen vragen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="btn-gold inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-medium text-[15px] w-full sm:w-auto justify-center">
              Shop nu
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4"/>
              </svg>
            </Link>
            <Link href="/routine" className="btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium text-[15px] w-full sm:w-auto justify-center">
              Doe de huidtest
            </Link>
          </div>

          <p className="text-xs text-[#9A9590] mt-8 font-medium tracking-wide uppercase">
            30 dagen garantie · Gratis retour · Geen abonnement
          </p>
        </motion.div>
      </div>
    </section>
  )
}
