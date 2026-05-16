'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WaitlistForm({ source = 'launch' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Vul een geldig e-mailadres in.')
      return
    }

    setLoading(true)

    // Store in localStorage so we remember across reloads
    try {
      const existing = JSON.parse(localStorage.getItem('lume_waitlist') || '[]') as string[]
      if (!existing.includes(trimmed)) {
        existing.push(trimmed)
        localStorage.setItem('lume_waitlist', JSON.stringify(existing))
      }
    } catch {
      // ignore storage errors
    }

    // Simulate async submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 700)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF8F5] border border-stone-200 rounded-2xl px-7 py-6 text-center"
        >
          <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center mx-auto mb-4">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M3 9l4 4 8-8" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-[15px] font-semibold text-[#1A1A1A] mb-1">Je staat op de lijst.</p>
          <p className="text-[13px] text-[#9A9590] font-light">
            We sturen je een persoonlijk bericht zodra de eerste batch beschikbaar is. Geen spam, geen verplichting.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          noValidate
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.nl"
              required
              aria-label="E-mailadres voor wachtlijst"
              className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-gold shrink-0 px-6 py-3.5 rounded-xl text-[14px] font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
            >
              {loading ? (
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".2"/>
                  <path d="M12 3a9 9 0 019 9"/>
                </svg>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Schrijf me in
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-2 text-[12px] text-red-500 font-light">{error}</p>
          )}

          <p className="mt-3 text-[11px] text-[#9A9590] font-light">
            Geen verplichting. Geen spam. Je kunt je altijd uitschrijven.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
