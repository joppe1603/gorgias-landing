'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'

export default function StickyProductBar({
  slug,
  name,
  price,
  originalPrice,
  image,
  size,
  availability,
  shopifyVariantId,
}: {
  slug: string
  name: string
  price: number
  originalPrice?: number
  image: string
  size: string
  availability?: 'available' | 'pre-launch' | 'sample'
  shopifyVariantId?: string
}) {
  const [visible, setVisible] = useState(false)
  const [added, setAdded] = useState(false)
  const { dispatch } = useCart()
  const isAvailable = availability === 'available'

  useEffect(() => {
    const hero = document.getElementById('product-hero-cta')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  function handleAddToCart() {
    dispatch({
      type: 'ADD_ITEM',
      payload: { slug, name, price, image, size, shopifyVariantId },
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="fixed bottom-0 left-0 right-0 z-[80] pointer-events-none"
        >
          <div className="max-w-3xl mx-auto px-4 pb-4 pointer-events-auto">
            <div className="bg-[#1A1A1A] text-white rounded-2xl border border-white/10 shadow-2xl px-5 py-3.5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{name}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#C9A96E] font-bold">€{price}</span>
                  {originalPrice && (
                    <span className="text-stone-500 text-xs line-through">€{originalPrice}</span>
                  )}
                  {isAvailable && (
                    <span className="text-stone-400 text-xs">· Gratis verzending</span>
                  )}
                </div>
              </div>

              {isAvailable ? (
                <button
                  onClick={handleAddToCart}
                  className="btn-gold shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all min-w-[140px] text-center"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center gap-1.5"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Toegevoegd
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.18 }}
                      >
                        In winkelwagen
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ) : (
                <Link
                  href={`/launch?source=sticky-bar&product=${slug}#waitlist`}
                  className="btn-gold shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold min-w-[160px] text-center flex items-center justify-center gap-2"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Schrijf je in
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
