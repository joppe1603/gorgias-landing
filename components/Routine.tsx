'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

const amSteps = [
  {
    step: '01',
    time: 'Ochtend',
    name: 'Reinigen',
    product: 'Gentle Foam Cleanser',
    tip: 'Gebruik lauwwarm water — nooit heet. Minimaal 60 seconden.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12c0-4 3-8 8-8s8 4 8 8-3 8-8 8"/>
        <path d="M12 4v4M8 8l2 2M16 8l-2 2"/>
      </svg>
    ),
  },
  {
    step: '02',
    time: 'Ochtend',
    name: 'Serum',
    product: 'Radiance Serum',
    tip: '3–4 druppels. Druk zachtjes aan — niet wrijven. Laat 60 seconden intrekken.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6M12 3v4M8 7h8l1 10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3L6 7h12"/>
      </svg>
    ),
  },
  {
    step: '03',
    time: 'Ochtend',
    name: 'Hydrateren + SPF',
    product: 'Deep Moisture Cream',
    tip: 'Eindig altijd met SPF 30+ in de ochtend. Ononderhandelbaar.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    ),
  },
]

const pmSteps = [
  {
    step: '01',
    time: 'Avond',
    name: 'Dubbel reinigen',
    product: 'Balm → Foam Cleanser',
    tip: 'Begin met een op olie gebaseerde balsem om SPF en make-up op te lossen.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3C12 3 5 10 5 15a7 7 0 0 0 14 0C19 10 12 3 12 3Z"/>
        <path d="M12 12v3M10 14h4"/>
      </svg>
    ),
  },
  {
    step: '02',
    time: 'Avond',
    name: 'Retinol Serum',
    product: 'Radiance Serum',
    tip: 'Begin 2x per week. Bouw langzaam op om irritatie te vermijden.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2Z"/>
      </svg>
    ),
  },
  {
    step: '03',
    time: 'Avond',
    name: 'Nacht-olie',
    product: 'Overnight Renewal Oil',
    tip: 'Uw huid herstelt zichzelf \'s nachts. Sluit vocht in met 2 druppels.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
      </svg>
    ),
  },
]

function RoutineStep({
  step, time, name, product, tip, icon, accent, delay,
}: {
  step: string; time: string; name: string; product: string; tip: string; icon: ReactNode; accent: string; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl border border-stone-100 p-6 shadow-sm card-hover"
    >
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${accent}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{step}</span>
            <div className="h-px flex-1 bg-stone-100" />
          </div>
          <h3 className="text-lg font-bold text-[#1A1A1A] leading-tight mb-0.5">{name}</h3>
          <p className="text-xs font-semibold text-[#C9A96E] mb-3 uppercase tracking-wide">{product}</p>
          <p className="text-sm text-[#6B6560] leading-relaxed">{tip}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-6 right-6 h-px bg-[#C9A96E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  )
}

export default function Routine() {
  return (
    <section id="routine" className="py-28 bg-[#FAF8F5] scroll-mt-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] px-4 py-1.5 rounded-full mb-4">
            Jouw dagelijkse ritueel
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-5 leading-tight">
            Ochtend & Avond
            <br />
            <span className="gradient-text">in 3 stappen</span>
          </h2>
          <p className="text-lg text-[#6B6560] max-w-xl mx-auto">
            Consistentie wint van complexiteit. Dit is de exacte routine die in 28 dagen resultaten levert.
          </p>
        </motion.div>

        {/* AM / PM grid */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* AM */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-9 h-9 rounded-full bg-[#FDF8F0] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">AM</p>
                <p className="text-sm font-semibold text-[#1A1A1A]">Ochtendroutine</p>
              </div>
            </motion.div>
            <div className="space-y-4">
              {amSteps.map((s, i) => (
                <RoutineStep key={s.name} {...s} accent="bg-[#FDF8F0] text-[#C9A96E]" delay={i * 0.1} />
              ))}
            </div>
          </div>

          {/* PM */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">PM</p>
                <p className="text-sm font-semibold text-[#1A1A1A]">Avondroutine</p>
              </div>
            </motion.div>
            <div className="space-y-4">
              {pmSteps.map((s, i) => (
                <RoutineStep key={s.name} {...s} accent="bg-indigo-50 text-indigo-500" delay={i * 0.1 + 0.15} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a href="#shop" className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm cursor-pointer">
            Shop de volledige routine
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
