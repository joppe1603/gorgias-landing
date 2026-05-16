'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StickyProductBar({
  name,
  price,
  originalPrice,
}: {
  name: string
  price: number
  originalPrice?: number
}) {
  const [visible, setVisible] = useState(false)

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
                  <span className="text-stone-400 text-xs">· Gratis verzending</span>
                </div>
              </div>
              <button className="btn-gold shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all">
                In winkelwagen
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
