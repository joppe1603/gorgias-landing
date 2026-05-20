'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0908]">

      {/* Grain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.038] pointer-events-none mix-blend-overlay z-10"
        aria-hidden
      >
        <filter id="grain-hero">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-hero)" />
      </svg>

      {/* Ambient warm glow */}
      <div
        className="absolute top-1/4 -left-32 w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,110,0.042) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
        aria-hidden
      />

      {/* Full-bleed product image — right panel desktop */}
      <div className="absolute inset-y-0 right-0 w-[55%] hidden lg:block z-0">
        <Image
          src="/reset-serum-new.jpg"
          alt="MAUYI Reset Serum"
          fill
          className="object-cover object-center"
          sizes="55vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908] via-[#0A0908]/52 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908]/55 via-transparent to-[#0A0908]/22" />
      </div>

      {/* Mobile image — top */}
      <div className="absolute inset-x-0 top-0 h-[44vh] lg:hidden z-0">
        <Image
          src="/reset-serum-new.jpg"
          alt="MAUYI Reset Serum"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908]/25 via-[#0A0908]/55 to-[#0A0908]" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-44 pb-28 lg:py-0">
        <div className="max-w-[500px]">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-white leading-[1.02] tracking-[-0.03em] mb-6"
            style={{
              fontSize: 'clamp(3.2rem, 7vw, 5.8rem)',
              fontWeight: 600,
              fontFamily: 'var(--font-cormorant)',
            }}
          >
            Huid die
            <br />
            <em
              style={{
                background: 'linear-gradient(135deg, #C9A96E 0%, #E8C98A 55%, #C9A96E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'italic',
              }}
            >
              rust vindt.
            </em>
          </motion.h1>

          {/* Subline — formula credentials */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-stone-500 font-light leading-[1.8] mb-12 tracking-wide"
            style={{ fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)', letterSpacing: '0.06em' }}
          >
            RETINOL 0.3% · BAKUCHIOL · NIACINAMIDE 10% · HYALURONZUUR · PANTHENOL
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/products/reset-serum"
              className="btn-gold inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-[14px] tracking-[0.04em]"
            >
              Reset Serum
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/launch#waitlist"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-[14px] text-stone-400 border border-white/10 hover:border-[#C9A96E]/35 hover:text-[#C9A96E] transition-all duration-300 tracking-[0.02em]"
            >
              Word als eerste uitgenodigd
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-[#C9A96E]/35 to-transparent"
        />
      </motion.div>
    </section>
  )
}
