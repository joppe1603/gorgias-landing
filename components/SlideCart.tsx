'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'

const FREE_SHIPPING_THRESHOLD = 75

// Routine suggestion pool — suggest first product not yet in cart
const ROUTINE_SUGGESTIONS = [
  {
    slug: 'quiet-cleanser',
    name: 'Quiet Cleanser',
    price: 38,
    size: '150ml',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=80&fit=crop',
  },
  {
    slug: 'reset-serum',
    name: 'Reset Serum',
    price: 58,
    size: '30ml',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80&fit=crop',
  },
  {
    slug: 'soft-barrier-cream',
    name: 'Soft Barrier Cream',
    price: 48,
    size: '50ml',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&q=80&fit=crop',
  },
]

export default function SlideCart() {
  const { state, dispatch, total, itemCount } = useCart()
  const { isOpen, items } = state

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const suggestion = ROUTINE_SUGGESTIONS.find(
    (s) => !items.some((item) => item.slug === s.slug)
  )

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total)
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const freeShipping = total >= FREE_SHIPPING_THRESHOLD

  const shippingCost = freeShipping ? 0 : 4.99
  const orderTotal = total + shippingCost

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => dispatch({ type: 'CLOSE' })}
            className="fixed inset-0 bg-black/45 backdrop-blur-[3px] z-[90]"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 340, mass: 0.9 }}
            className="fixed right-0 top-0 bottom-0 z-[100] w-full max-w-[420px] bg-white flex flex-col shadow-[−24px_0_80px_rgba(0,0,0,0.12)]"
            aria-label="Winkelwagen"
            role="dialog"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 shrink-0">
              <div className="flex items-center gap-3">
                <h2
                  className="text-[1.3rem] font-semibold text-[#1A1A1A] leading-none"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Winkelwagen
                </h2>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-5 h-5 rounded-full bg-[#C9A96E] text-white text-[10px] font-bold flex items-center justify-center tabular-nums"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </div>
              <button
                onClick={() => dispatch({ type: 'CLOSE' })}
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Sluit winkelwagen"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M2 2l11 11M13 2L2 13"/>
                </svg>
              </button>
            </div>

            {/* ── Items ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
                  <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center mb-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </div>
                  <p className="text-[#1A1A1A] font-semibold mb-2 text-[15px]">Je winkelwagen is leeg</p>
                  <p className="text-[13px] text-[#9A9590] font-light mb-7 leading-relaxed">
                    Begin met de drie producten van de LUMÉ routine.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => dispatch({ type: 'CLOSE' })}
                    className="btn-gold px-7 py-3 rounded-xl text-sm font-medium"
                  >
                    Bekijk producten
                  </Link>
                </div>
              ) : (
                <div className="px-6 pt-2">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.slug}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 24, transition: { duration: 0.18 } }}
                        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-4 py-5 border-b border-stone-50 last:border-0"
                      >
                        {/* Image */}
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={() => dispatch({ type: 'CLOSE' })}
                          className="shrink-0"
                        >
                          <div className="relative w-[68px] h-[68px] rounded-xl overflow-hidden bg-[#FAF8F5]">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="68px"
                            />
                          </div>
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-[13px] font-semibold text-[#1A1A1A] leading-snug">{item.name}</p>
                            <p className="text-[13px] font-semibold text-[#1A1A1A] shrink-0 tabular-nums">
                              €{item.price * item.quantity}
                            </p>
                          </div>
                          <p className="text-[11px] text-[#9A9590] mb-3">{item.size}</p>

                          {/* Qty + remove */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { slug: item.slug, qty: item.quantity - 1 } })}
                                className="w-8 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-base cursor-pointer"
                                aria-label="Minder"
                              >
                                −
                              </button>
                              <span className="w-7 text-center text-[12px] font-semibold text-[#1A1A1A] tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { slug: item.slug, qty: item.quantity + 1 } })}
                                className="w-8 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors text-base cursor-pointer"
                                aria-label="Meer"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.slug })}
                              className="text-[11px] text-stone-400 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              Verwijder
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* ── Footer ── */}
            {items.length > 0 && (
              <div className="shrink-0 border-t border-stone-100 px-6 pt-5 pb-6 space-y-4 bg-white">

                {/* Free shipping progress */}
                <div>
                  <p className="text-[11px] text-[#9A9590] mb-2">
                    {freeShipping ? (
                      <span className="text-[#C9A96E] font-semibold">✓ Gratis verzending inbegrepen</span>
                    ) : (
                      <>Nog <span className="font-semibold text-[#1A1A1A]">€{remaining}</span> van gratis verzending</>
                    )}
                  </p>
                  <div className="h-[3px] bg-stone-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#C9A96E] rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Routine suggestion */}
                {suggestion && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FAF8F5] rounded-xl p-3.5 border border-stone-100"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9A9590] mb-2.5">
                      Compleet je routine
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        <Image
                          src={suggestion.image}
                          alt={suggestion.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-[#1A1A1A] truncate">{suggestion.name}</p>
                        <p className="text-[11px] text-[#9A9590]">€{suggestion.price} · {suggestion.size}</p>
                      </div>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'ADD_ITEM',
                            payload: {
                              slug: suggestion.slug,
                              name: suggestion.name,
                              price: suggestion.price,
                              image: suggestion.image,
                              size: suggestion.size,
                            },
                          })
                        }
                        className="text-[11px] font-semibold text-[#C9A96E] border border-[#C9A96E]/30 px-3 py-1.5 rounded-lg hover:bg-[#FDF8F0] transition-colors shrink-0 cursor-pointer"
                      >
                        + Voeg toe
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Totals */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#9A9590]">Subtotaal</span>
                    <span className="font-semibold text-[#1A1A1A] tabular-nums">€{total}</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#9A9590]">Verzending</span>
                    <span className={freeShipping ? 'text-[#C9A96E] font-semibold' : 'text-[#1A1A1A]'}>
                      {freeShipping ? 'Gratis' : '€4,99'}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button className="btn-gold w-full py-[1.05rem] rounded-2xl font-medium text-[15px] cursor-pointer tracking-[0.01em]">
                  Afrekenen · €{freeShipping ? total : orderTotal.toFixed(2).replace('.', ',')}
                </button>

                <button
                  onClick={() => dispatch({ type: 'CLOSE' })}
                  className="w-full text-center text-[12px] text-[#9A9590] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  Verder winkelen
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
