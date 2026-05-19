'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)

  const CODE = 'MAUYI15'

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('lume-popup-dismissed')) return

    // Show after 6 seconds
    const t = setTimeout(() => setVisible(true), 6000)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem('lume-popup-dismissed', '1')
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setDone(true)
    sessionStorage.setItem('lume-popup-dismissed', '1')
  }

  const copyCode = () => {
    navigator.clipboard.writeText(CODE).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors z-10"
                aria-label="Sluiten"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="#6B6560" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Top banner */}
              <div className="bg-[#1A1A1A] px-6 py-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                    backgroundSize: '180px',
                  }}
                />
                {/* Crescent decoration */}
                <div className="flex items-center gap-3 mb-2">
                  <svg width="28" height="28" viewBox="0 0 30 30" fill="none" aria-hidden>
                    <circle cx="15" cy="15" r="13" fill="#C9A96E"/>
                    <circle cx="19" cy="15" r="10" fill="#1A1A1A"/>
                  </svg>
                  <span className="text-[#C9A96E] text-xs font-bold tracking-[0.2em] uppercase">MAUYI</span>
                </div>
                <p className="text-white text-2xl font-bold leading-snug">
                  15% korting
                  <br />
                  <span className="text-[#C9A96E]">op je eerste bestelling</span>
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                <AnimatePresence mode="wait">
                  {!done ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-[#6B6560] text-sm mb-5">
                        Meld je aan voor onze nieuwsbrief en ontvang exclusieve skincare tips, productlanceringen en 15% korting op je eerste order.
                      </p>

                      <form onSubmit={submit} className="space-y-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jouw@email.com"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-[#1A1A1A] text-sm placeholder:text-stone-400 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-all"
                        />
                        <button
                          type="submit"
                          className="w-full btn-gold py-3 text-sm"
                        >
                          Claim mijn 15% korting ✨
                        </button>
                      </form>

                      <p className="text-[10px] text-stone-400 text-center mt-3 leading-relaxed">
                        Geen spam. Alleen de goede dingen. Je kunt je altijd afmelden.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-2"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#C9A96E]/15 flex items-center justify-center mx-auto mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12L10 17L19 7" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-[#1A1A1A] font-bold text-lg mb-1">Welkom bij MAUYI ✨</p>
                      <p className="text-[#6B6560] text-sm mb-6">Gebruik deze code bij checkout:</p>

                      <button
                        onClick={copyCode}
                        className="relative w-full bg-[#1A1A1A] text-white rounded-xl py-3 px-4 font-mono text-lg font-bold tracking-[0.15em] hover:bg-[#2A2A2A] transition-colors"
                      >
                        {CODE}
                        <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-normal font-sans transition-all ${copied ? 'text-green-400' : 'text-stone-400'}`}>
                          {copied ? '✓ Gekopieerd!' : 'Klik om te kopiëren'}
                        </span>
                      </button>

                      <button
                        onClick={dismiss}
                        className="mt-4 w-full btn-ghost py-3 text-sm"
                      >
                        Shop nu →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Trust strip */}
              <div className="px-6 pb-5 flex items-center justify-center gap-4 text-[10px] text-stone-400">
                <span>🔒 Veilig betalen</span>
                <span>·</span>
                <span>🌿 100% vegan</span>
                <span>·</span>
                <span>↩ 30 dagen retour</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
