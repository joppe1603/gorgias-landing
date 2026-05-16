'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    label: 'Reinigen',
    product: 'Quiet Cleanser',
    time: '60 sec',
    note: 'Verwijdert zonder te verstoren.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12c0-4 3-8 8-8s8 4 8 8-3 8-8 8"/>
        <path d="M12 6v3M9 8l1.5 1.5"/>
      </svg>
    ),
  },
  {
    number: '02',
    label: 'Reset',
    product: 'Reset Serum',
    time: '90 sec',
    note: 'Laat intrekken. Niet wrijven.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6M12 3v4M8 7h8l1 10a3 3 0 01-3 3H8a3 3 0 01-3-3L6 7z"/>
      </svg>
    ),
  },
  {
    number: '03',
    label: 'Beschermen',
    product: 'Soft Barrier Cream',
    time: '30 sec',
    note: 'Sluit alles in. Altijd.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-5 8-10V6l-8-3-8 3v6c0 5 8 10 8 10z"/>
      </svg>
    ),
  },
]

export default function RoutinePreview() {
  return (
    <section className="py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="divider-stone absolute top-0 left-0 right-0" />
      <div className="divider-stone absolute bottom-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label">De methode</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="text-5xl sm:text-6xl font-semibold text-[#1A1A1A] leading-[1.05]"
            >
              3 stappen.
              <br />
              <span className="text-[#9A9590] font-normal italic">Elke dag.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-[#6B6560] text-lg leading-relaxed max-w-sm font-light"
          >
            Consistentie wint van complexiteit. Dit is de enige routine die je nodig hebt.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Connector line between steps (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 right-0 w-1 h-px bg-stone-200 translate-x-full z-10" style={{ width: 'calc(var(--spacing-1) * 1)' }} />
              )}

              <div className="bg-white rounded-2xl p-10 h-full border border-transparent hover:border-stone-200 transition-colors duration-300">
                {/* Number */}
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A96E] block mb-8">{step.number}</span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] flex items-center justify-center text-[#C9A96E] mb-8 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Label */}
                <h3 className="text-3xl font-semibold text-[#1A1A1A] mb-2">{step.label}</h3>
                <p className="text-sm font-medium text-[#C9A96E] mb-3 uppercase tracking-wide">{step.product}</p>
                <p className="text-[#6B6560] text-sm leading-relaxed">{step.note}</p>

                {/* Time */}
                <div className="mt-8 flex items-center gap-2 text-xs text-stone-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  {step.time}
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
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <Link href="/routine" className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium text-[15px]">
            Bouw mijn persoonlijke routine
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4"/>
            </svg>
          </Link>
          <Link href="/shop" className="text-sm text-[#6B6560] hover:text-[#C9A96E] transition-colors font-medium">
            Of bekijk alle producten →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
