'use client'

import { motion } from 'framer-motion'

interface EditorialQuoteProps {
  quote: string
  attribution?: string
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export default function EditorialQuote({
  quote,
  attribution,
  variant = 'light',
  size = 'md',
}: EditorialQuoteProps) {
  const isDark = variant === 'dark'

  const sizeMap = {
    sm: 'text-[clamp(1.3rem,2.5vw,1.8rem)]',
    md: 'text-[clamp(1.7rem,3vw,2.6rem)]',
    lg: 'text-[clamp(2.2rem,4vw,3.4rem)]',
  }

  return (
    <section className={`relative py-20 lg:py-28 overflow-hidden ${isDark ? 'bg-[#0F0E0C]' : 'bg-[#FAF8F5]'}`}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-10 text-center">
        {/* Top gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="origin-center mb-10"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)',
          }}
        />

        {/* Quotation mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
          aria-hidden
        >
          <span
            className="font-semibold leading-none select-none"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(4rem, 8vw, 7rem)',
              lineHeight: '0.6',
              background: 'linear-gradient(135deg, #C9A96E 0%, #E8C98A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
            }}
          >
            &ldquo;
          </span>
        </motion.div>

        {/* Quote text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`font-semibold italic leading-[1.25] tracking-[-0.01em] ${sizeMap[size]} ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          {quote}
        </motion.p>

        {attribution && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-[#C9A96E]"
          >
            — {attribution}
          </motion.p>
        )}

        {/* Bottom gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="origin-center mt-10"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)',
          }}
        />
      </div>
    </section>
  )
}
