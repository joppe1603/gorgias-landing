'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllProducts } from '@/lib/products'

interface Props {
  cartSlugs: string[]
  onAccept: (slug: string, name: string, price: number, image: string, size: string) => void
  onDecline: () => void
}

const DISCOUNT = 0.10

export default function CheckoutUpsell({ cartSlugs, onAccept, onDecline }: Props) {
  // Pick first available product not already in cart
  const upsell = getAllProducts().find(
    (p) => !p.hidden && !cartSlugs.includes(p.slug) && p.availability === 'pre-launch' && p.slug !== 'test-sample'
  )

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onDecline() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onDecline])

  if (!upsell) {
    onDecline()
    return null
  }

  const discountedPrice = upsell.price * (1 - DISCOUNT)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[#0F0E0C]/60 backdrop-blur-sm"
          onClick={onDecline}
        />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
        >
          {/* Gold top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#C9A96E] via-[#e8c98a] to-[#C9A96E]" />

          {/* Product image */}
          <div className="relative h-48 bg-[#FAF8F5]">
            <Image
              src={upsell.heroImage}
              alt={upsell.name}
              fill
              className="object-cover"
              sizes="384px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />

            {/* Discount badge */}
            <div className="absolute top-4 right-4 bg-[#C9A96E] text-white text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full shadow-lg">
              10% korting
            </div>

            {/* Close */}
            <button
              onClick={onDecline}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#5C5754] hover:bg-white transition-colors"
              aria-label="Sluiten"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M1 1l10 10M11 1L1 11"/>
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pt-5 pb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-[#C9A96E]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
                Exclusief aanbod · Alleen nu
              </span>
            </div>

            <h3 className="text-[19px] font-semibold text-[#1A1A1A] leading-tight mb-1">
              Voeg {upsell.name} toe
            </h3>
            <p className="text-[12px] text-[#9A9590] font-light mb-4 leading-relaxed">
              {upsell.tagline}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 mb-5">
              <span className="text-[22px] font-bold text-[#1A1A1A]">
                €{discountedPrice.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-[13px] text-stone-400 line-through">
                €{upsell.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-[11px] font-semibold text-[#C9A96E] bg-[#FDF8F0] px-2 py-0.5 rounded-full">
                Je bespaart €{(upsell.price * DISCOUNT).toFixed(2).replace('.', ',')}
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={() => onAccept(upsell.slug, upsell.name, discountedPrice, upsell.heroImage, upsell.size)}
              className="btn-gold w-full py-3.5 rounded-2xl font-semibold text-[14px] tracking-[0.01em] flex items-center justify-center gap-2 mb-3 active:scale-[0.99] transition-transform"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Ja, voeg toe voor €{discountedPrice.toFixed(2).replace('.', ',')}
            </button>

            <button
              onClick={onDecline}
              className="w-full py-2.5 text-[12px] text-[#9A9590] hover:text-[#5C5754] transition-colors"
            >
              Nee bedankt, doorgaan zonder korting
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
