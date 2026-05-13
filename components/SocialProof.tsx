'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

function AnimatedNumber({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
}: {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { damping: 30, stiffness: 60 })
  const display = useTransform(spring, (v) =>
    Math.floor(v).toLocaleString()
  )

  useEffect(() => {
    if (inView) {
      motionVal.set(target)
    }
  }, [inView, motionVal, target])

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}

const stats = [
  {
    value: 17000,
    suffix: '+',
    label: 'Brands worldwide',
    description: 'From startups to enterprise ecommerce brands trust Gorgias to run their support.',
    icon: '🌍',
    color: 'from-orange-50 to-white',
    accent: 'text-[#FF4F00]',
  },
  {
    value: 60,
    suffix: '%',
    label: 'Tickets automated',
    description: 'On average, Gorgias customers automate 60% of their incoming support volume.',
    icon: '⚡',
    color: 'from-blue-50 to-white',
    accent: 'text-blue-600',
  },
  {
    value: 3,
    prefix: '$',
    suffix: 'B+',
    label: 'Revenue driven',
    description: 'Gorgias has helped brands generate over $3B in revenue through support interactions.',
    icon: '💰',
    color: 'from-green-50 to-white',
    accent: 'text-green-600',
  },
  {
    value: 2,
    prefix: '<',
    suffix: 'h',
    label: 'Avg. first response',
    description: 'Teams on Gorgias respond to customers in under 2 hours on average.',
    icon: '⏱️',
    color: 'from-purple-50 to-white',
    accent: 'text-purple-600',
  },
]

const testimonials = [
  {
    quote: "Gorgias completely transformed how we handle customer support. We went from overwhelmed to automated in just 2 weeks.",
    author: "Sarah Mitchell",
    role: "Head of CX, Glamnetic",
    avatar: 'SM',
    color: 'bg-pink-400',
    rating: 5,
  },
  {
    quote: "We reduced our first response time by 80% and our team actually enjoys working in Gorgias — it just makes sense.",
    author: "James Park",
    role: "Support Lead, MVMT Watches",
    avatar: 'JP',
    color: 'bg-blue-500',
    rating: 5,
  },
  {
    quote: "The Shopify integration is unbelievable. We edit orders, issue refunds, and close tickets without ever leaving the app.",
    author: "Anya Torres",
    role: "Operations Manager, Brooklinen",
    avatar: 'AT',
    color: 'bg-purple-500',
    rating: 5,
  },
]

export default function SocialProof() {
  return (
    <section className="py-28 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#FF4F00] bg-orange-50 px-4 py-1.5 rounded-full mb-4">
            Proven results
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Numbers that speak
            <br />
            <span className="gradient-text">for themselves</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Join thousands of brands that have transformed their customer experience with Gorgias.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`bg-gradient-to-b ${stat.color} rounded-2xl border border-gray-100 p-7 text-center group card-hover`}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className={`text-4xl sm:text-5xl font-black mb-2 ${stat.accent}`}>
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <p className="font-semibold text-gray-800 text-sm mb-2">{stat.label}</p>
              <p className="text-xs text-gray-500 leading-relaxed hidden sm:block">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm card-hover"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FF4F00">
                    <path d="M8 1L9.8 5.5H15L10.8 8.5L12.5 13L8 10L3.5 13L5.2 8.5L1 5.5H6.2L8 1Z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl border border-gray-100 p-8 flex flex-wrap items-center justify-center gap-8 shadow-sm"
        >
          {[
            { label: 'Shopify App Store', value: '4.4 ★', color: 'text-yellow-500' },
            { label: 'G2 Leader', value: '#1 Rated', color: 'text-[#FF4F00]' },
            { label: 'Capterra Score', value: '4.6 / 5', color: 'text-blue-500' },
            { label: 'SOC 2 Type II', value: 'Certified', color: 'text-green-600' },
            { label: 'GDPR', value: 'Compliant', color: 'text-purple-600' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="h-10 w-px bg-gray-100 hidden sm:block first:hidden" />
              <div className="text-center">
                <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                <p className="text-xs text-gray-400 font-medium">{item.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
