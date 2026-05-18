'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const STORAGE_KEY = 'lume-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      // localStorage blocked (private mode etc.)
    }
  }, [])

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, 'all') } catch { /* */ }
    setVisible(false)
  }

  function necessary() {
    try { localStorage.setItem(STORAGE_KEY, 'necessary') } catch { /* */ }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Cookie-instellingen"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[60]"
        >
          <div className="bg-[#1A1A1A] rounded-2xl px-5 py-4 border border-white/8 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            {/* Top */}
            <div className="flex items-start gap-3 mb-3">
              <div className="shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 22C12 22 3 17 3 10a9 9 0 0118 0c0 7-9 12-9 12z"/>
                  <circle cx="12" cy="10" r="2"/>
                </svg>
              </div>
              <div>
                <p className="text-white text-[13px] font-medium leading-snug mb-1">
                  Wij gebruiken cookies
                </p>
                <p className="text-stone-500 text-[12px] font-light leading-relaxed">
                  Voor analytics en een betere ervaring. Lees ons{' '}
                  <Link href="/privacy" className="text-[#C9A96E] underline underline-offset-2 hover:text-[#E8C98A] transition-colors">
                    privacybeleid
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={accept}
                className="flex-1 bg-[#C9A96E] hover:bg-[#D4B47A] text-[#1A1A1A] text-[12px] font-semibold py-2.5 rounded-xl transition-colors"
              >
                Alles accepteren
              </button>
              <button
                onClick={necessary}
                className="flex-1 border border-white/10 hover:border-white/20 text-stone-400 hover:text-stone-300 text-[12px] font-medium py-2.5 rounded-xl transition-colors"
              >
                Alleen noodzakelijk
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
