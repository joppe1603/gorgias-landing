'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StickyCart() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const shopEl = document.getElementById('shop')
    if (!shopEl) return

    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0) },
      { threshold: 0 }
    )
    observer.observe(shopEl)
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
              {/* Product info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Mini product icon */}
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 30 30" fill="none" aria-hidden>
                    <circle cx="15" cy="15" r="13" fill="#C9A96E"/>
                    <circle cx="19" cy="15" r="10" fill="#FAF8F5"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">The Glow Ritual</p>
                  <p className="text-xs text-stone-400">€129 · Bespaar €45 · Gratis verzending</p>
                </div>
              </div>

              {/* Star rating */}
              <div className="hidden sm:flex items-center gap-0.5 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 16 16" fill="#C9A96E" aria-hidden>
                    <path d="M8 1L9.8 5.5H15L10.8 8.5L12.5 13L8 10L3.5 13L5.2 8.5L1 5.5H6.2L8 1Z"/>
                  </svg>
                ))}
                <span className="text-xs text-stone-400 ml-1">4.9</span>
              </div>

              {/* CTA */}
              <a
                href="#shop"
                className="btn-gold shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all"
              >
                Nu kopen
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
