'use client'

import { motion } from 'framer-motion'

const notIn = [
  'Synthetisch parfum',
  'Parabenen',
  'Siliconen',
  'Minerale oliën',
  'Sulphaten (SLS/SLES)',
  'Kunstmatige kleurstoffen',
  'Ethanolalcohol',
  'Microplastics',
]

const weDo = [
  { label: 'Retinol 0.3%', note: 'klinisch effectieve dosis' },
  { label: 'Vitamine C 15%', note: 'stabiele L-ascorbinezuur formule' },
  { label: 'Niacinamide 10%', note: 'bewezen poriënverfijner' },
  { label: 'Bakuchiol', note: 'plantaardig retinol-alternatief' },
  { label: 'Hyaluronzuur (3×)', note: 'drie molecuulgewichten' },
  { label: 'Ceramiden', note: 'barrièreherstel & hydratatie' },
]

export default function WhatWeLeaveOut() {
  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — left-aligned, not centered */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-4 block">
            Formule transparantie
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-[1.1]">
            Wat we weglaten.
            <br />
            <span className="text-stone-400 font-normal text-3xl sm:text-4xl">
              En waarom dat uitmaakt.
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* NOT in formula */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-5">
              Niet in onze formules
            </p>
            <div>
              {notIn.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3.5 py-3.5 border-b border-stone-200 last:border-none group"
                >
                  <span className="w-5 h-5 flex items-center justify-center shrink-0 rounded-full bg-stone-100">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M1 1l7 7M8 1L1 8" />
                    </svg>
                  </span>
                  <span className="text-stone-400 text-sm line-through decoration-stone-300 decoration-1">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* DO use */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-5">
              Wél in onze formules
            </p>
            <div>
              {weDo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3.5 py-3.5 border-b border-stone-200 last:border-none"
                >
                  <span className="w-5 h-5 flex items-center justify-center shrink-0 rounded-full bg-[#FDF8F0]">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 4.5L3.5 7L8 1.5" />
                    </svg>
                  </span>
                  <span className="text-[#1A1A1A] text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-stone-400 ml-auto text-right whitespace-nowrap">
                    {item.note}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <p className="mt-8 text-xs text-stone-400 leading-relaxed max-w-sm">
              Alle INCI-ingrediënten zijn openbaar beschikbaar op onze productpagina&apos;s. Geen verborgen stoffen. Nooit.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
