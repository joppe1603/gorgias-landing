'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Target launch date — update when confirmed
const LAUNCH_DATE = new Date('2026-09-01T09:00:00+02:00')

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const diff = LAUNCH_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[72px] sm:w-[88px] h-[80px] sm:h-[96px] overflow-hidden rounded-2xl bg-[#1A1710] border border-[#C9A96E]/15 flex items-center justify-center shadow-[inset_0_1px_0_rgba(201,169,110,0.08)]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute text-[2.2rem] sm:text-[2.8rem] font-semibold text-white tabular-nums"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
        {/* Subtle shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent pointer-events-none" />
      </div>
      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-stone-600">{label}</p>
    </div>
  )
}

export default function LaunchCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft())
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const launched = timeLeft && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <section className="py-20 bg-[#0F0E0C]">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#C9A96E]/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">
              Verwachte lancering
            </span>
            <div className="w-8 h-px bg-[#C9A96E]/40" />
          </div>

          <p className="text-stone-500 text-[13px] font-light mb-10">
            1 september 2026 — onder voorbehoud van testresultaten.
          </p>

          {launched ? (
            <p className="text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Het is zover.
            </p>
          ) : timeLeft ? (
            <div className="flex items-start justify-center gap-3 sm:gap-5">
              <Digit value={timeLeft.days} label="dagen" />

              <span className="text-[#C9A96E]/40 text-3xl font-light mt-4" aria-hidden>:</span>

              <Digit value={timeLeft.hours} label="uur" />

              <span className="text-[#C9A96E]/40 text-3xl font-light mt-4" aria-hidden>:</span>

              <Digit value={timeLeft.minutes} label="min" />

              <span className="text-[#C9A96E]/40 text-3xl font-light mt-4" aria-hidden>:</span>

              <Digit value={timeLeft.seconds} label="sec" />
            </div>
          ) : (
            // SSR placeholder — avoids hydration mismatch
            <div className="flex items-start justify-center gap-3 sm:gap-5 opacity-0 select-none" aria-hidden>
              {['--', '--', '--', '--'].map((v, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-[72px] sm:w-[88px] h-[80px] sm:h-[96px] rounded-2xl bg-[#1A1710] border border-[#C9A96E]/15" />
                  <p className="text-[9px] uppercase tracking-[0.22em] text-stone-600">{v}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
