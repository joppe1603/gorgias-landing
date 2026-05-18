'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
})

export default function OrderConfirmedContent() {
  const { dispatch } = useCart()
  useSearchParams() // order_id available if needed for display

  // Clear cart after successful order
  useEffect(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [dispatch])

  return (
    <main className="min-h-screen bg-[#0F0E0C] flex items-center justify-center relative overflow-hidden px-6">

      {/* Ambient orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(201,169,110,0.07) 0%, rgba(201,169,110,0.02) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </motion.div>

      {/* Film grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none mix-blend-overlay" aria-hidden>
        <filter id="grain-order">
          <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-order)" />
      </svg>

      <div className="relative z-10 max-w-lg w-full text-center">

        {/* Checkmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center mb-10"
        >
          <div className="w-16 h-16 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/8 flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
              <motion.path
                d="M5 13l5.5 5.5L21 7"
                stroke="#C9A96E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Label */}
        <motion.div {...stagger(0)} className="flex items-center justify-center gap-3 mb-7">
          <div className="w-8 h-px bg-[#C9A96E]/40" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">
            Bestelling bevestigd
          </span>
          <div className="w-8 h-px bg-[#C9A96E]/40" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...stagger(1)}
          className="text-[clamp(2.4rem,6vw,3.8rem)] font-semibold text-white leading-[1.08] tracking-[-0.022em] mb-6"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          Bedankt voor je bestelling.
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 origin-center"
          style={{ width: '48px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)' }}
        />

        {/* Body */}
        <motion.div {...stagger(3)} className="space-y-4 mb-12">
          <p className="text-[16px] text-stone-300 font-light leading-relaxed">
            Je ontvangt een bevestiging per e-mail.
          </p>
          <p className="text-[14px] text-stone-500 font-light leading-relaxed">
            Je bestelling wordt zo snel mogelijk verwerkt en verstuurd.
          </p>
          <p className="text-[13px] text-stone-600 font-light leading-relaxed italic">
            Vragen? Stuur een mail naar hello@lume-skincare.nl
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div {...stagger(5)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-gold px-7 py-3.5 rounded-2xl text-[14px] font-semibold inline-flex items-center gap-2"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M10 6H2M5 2L1 6l4 4"/>
            </svg>
            Terug naar LUMÉ
          </Link>
          <Link
            href="/shop"
            className="btn-outline px-7 py-3.5 rounded-2xl text-[14px] font-medium inline-flex items-center gap-2 border-white/15 text-stone-400 hover:border-[#C9A96E]/40 hover:text-[#C9A96E]"
          >
            Verder winkelen
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 6h8M6 2l4 4-4 4"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
