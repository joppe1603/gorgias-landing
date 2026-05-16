'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useMotionValueEvent, useSpring } from 'framer-motion'

function AnimatedNumber({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { damping: 32, stiffness: 72 })
  const [text, setText] = useState('0')

  useMotionValueEvent(spring, 'change', (v) => { setText(Math.floor(v).toLocaleString()) })
  useEffect(() => { if (inView) motionVal.set(target) }, [inView, motionVal, target])

  return <span ref={ref}>{prefix}{text}{suffix}</span>
}

const stats = [
  {
    value: 12400, suffix: '+', label: '5-sterrenbeoordelingen',
    description: 'Geverifieerde klantbeoordelingen op Trustpilot, Google en onze eigen winkel.',
    icon: '⭐', color: 'from-[#FDF8F0] to-white', accent: 'text-[#C9A96E]',
  },
  {
    value: 94, suffix: '%', label: 'zag zichtbaar resultaat',
    description: '94% van de klanten rapporteert een zichtbaar betere huid na 6 weken consistent gebruik.',
    icon: '✨', color: 'from-green-50 to-white', accent: 'text-green-600',
  },
  {
    value: 28, suffix: ' dagen', label: 'tot zichtbaar resultaat',
    description: 'Onze klinische onderzoeken tonen meetbare verbeteringen in huidtextuur in slechts 28 dagen.',
    icon: '📅', color: 'from-blue-50 to-white', accent: 'text-blue-600',
  },
  {
    value: 49, prefix: '4.', suffix: '/5', label: 'gemiddelde beoordeling',
    description: 'Consequent het hoogst beoordeeld in clean skincare in onafhankelijke reviews.',
    icon: '💛', color: 'from-amber-50 to-white', accent: 'text-[#C9A96E]',
  },
]

const testimonials = [
  {
    quote: 'Ik heb elk serum op de markt geprobeerd en niets komt in de buurt. Mijn huid is de helderste in jaren.',
    author: 'Lena B.',
    role: 'Amsterdam · Gemengde huid · 3 maanden',
    avatar: 'LB',
    color: 'bg-rose-400',
    rating: 5,
  },
  {
    quote: 'Het retinol serum is het enige dat geen irritatie heeft veroorzaakt. Mijn huidtextuur is volledig getransformeerd.',
    author: 'Maya S.',
    role: 'London · Gevoelige huid · 6 weken',
    avatar: 'MS',
    color: 'bg-amber-500',
    rating: 5,
  },
  {
    quote: 'LUMÉ heeft me omgezet van een 10-stappen routine naar 3 producten. Minder is meer en mijn huid heeft er nooit beter uitgezien.',
    author: 'Julia R.',
    role: 'Berlijn · Droge huid · 2 maanden',
    avatar: 'JR',
    color: 'bg-indigo-400',
    rating: 5,
  },
]

function TestimonialCard({ t, className = '' }: { t: (typeof testimonials)[0]; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-stone-100 p-7 shadow-sm card-hover shrink-0 snap-center ${className}`}>
      <div className="flex gap-0.5 mb-4">
        {[...Array(t.rating)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#C9A96E" aria-hidden>
            <path d="M8 1L9.8 5.5H15L10.8 8.5L12.5 13L8 10L3.5 13L5.2 8.5L1 5.5H6.2L8 1Z"/>
          </svg>
        ))}
      </div>
      <p className="text-stone-700 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}>{t.avatar}</div>
        <div>
          <p className="text-sm font-semibold text-[#1A1A1A]">{t.author}</p>
          <p className="text-xs text-[#6B6560]">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

const trustItems = [
  { label: 'Trustpilot',              value: '4.9 ★',    color: 'text-[#C9A96E]' },
  { label: '#1 Huidverzorgingsmerk NL', value: 'Top Rated', color: 'text-[#C9A96E]' },
  { label: 'Aanbevolen door Vogue',   value: 'Featured',  color: 'text-purple-600' },
  { label: 'Diervriendelijk',         value: 'Gecertificeerd', color: 'text-green-600' },
  { label: 'Clean bij Sephora',       value: 'Listed',    color: 'text-blue-600' },
]

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-28 relative overflow-hidden scroll-mt-28" style={{ background: '#FAF8F5' }}>
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
            Bewezen resultaten
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-5 leading-tight">
            Cijfers die voor
            <br />
            <span className="gradient-text">zichzelf spreken</span>
          </h2>
          <p className="text-lg text-[#6B6560] max-w-xl mx-auto">
            Sluit je aan bij duizenden klanten die hun huid hebben getransformeerd met LUMÉ.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`bg-gradient-to-b ${stat.color} rounded-2xl border border-stone-100 p-7 text-center group card-hover cursor-default`}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className={`text-4xl sm:text-5xl font-black mb-2 ${stat.accent}`}>
                <AnimatedNumber target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="font-semibold text-[#1A1A1A] text-sm mb-2">{stat.label}</p>
              <p className="text-xs text-[#6B6560] leading-relaxed hidden sm:block">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials — desktop grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hidden md:grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials — mobile scroll */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:hidden -mx-4 px-4"
        >
          <div
            className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.author} t={t} className="w-[min(88vw,340px)]" />
            ))}
          </div>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl border border-stone-100 p-8 flex flex-wrap items-center justify-center gap-8 shadow-sm"
        >
          {trustItems.map((item) => (
            <div key={item.label} className="text-center cursor-default">
              <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
              <p className="text-xs text-[#6B6560] font-medium">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
