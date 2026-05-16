'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'

const COOKIE_KEY = 'lume-cookie-consent'

export default function SiteChrome() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 35, mass: 0.2 })
  const [showTop, setShowTop] = useState(false)
  const [cookieVisible, setCookieVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !localStorage.getItem(COOKIE_KEY)) {
        setCookieVisible(true)
      }
    } catch {
      setCookieVisible(true)
    }
  }, [])

  const setConsent = (value: 'accept' | 'decline') => {
    try {
      localStorage.setItem(COOKIE_KEY, value)
    } catch {
      /* ignore */
    }
    setCookieVisible(false)
  }

  return (
    <>
      {/* Scroll progress bar — gold */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-[#C9A96E] z-[100] origin-left pointer-events-none"
        style={{ scaleX }}
        aria-hidden
      />

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Terug naar boven"
            className="fixed bottom-6 right-6 z-[90] w-12 h-12 rounded-2xl bg-white border border-stone-200 shadow-lg text-stone-500 hover:text-[#C9A96E] hover:border-[#C9A96E] cursor-pointer transition-all flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cookie toestemming */}
      <AnimatePresence>
        {cookieVisible && (
          <motion.div
            role="dialog"
            aria-label="Cookietoestemming"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-[95] p-4 sm:p-6 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto pointer-events-auto bg-[#0F0E0C] text-white rounded-2xl border border-white/10 shadow-2xl px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-sm text-stone-300 flex-1 leading-relaxed">
                We gebruiken cookies om u de beste ervaring op LUMÉ te geven. Door verder te gaan, stemt u in met ons cookiebeleid.
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setConsent('decline')}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-stone-300 border border-white/20 hover:bg-white/5 cursor-pointer transition-all"
                >
                  Weigeren
                </button>
                <button
                  type="button"
                  onClick={() => setConsent('accept')}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#C9A96E] text-white hover:bg-[#B8935A] cursor-pointer transition-all shadow-lg shadow-[#C9A96E]/20"
                >
                  Accepteren
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
