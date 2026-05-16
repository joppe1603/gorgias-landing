'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Option = { label: string; emoji: string; value: string }
type Question = { id: string; question: string; options: Option[] }

const questions: Question[] = [
  {
    id: 'concern',
    question: 'Wat is uw grootste huidprobleem?',
    options: [
      { label: 'Fijne lijntjes & veroudering', emoji: '⏳', value: 'ageing' },
      { label: 'Doffe & ongelijkmatige huid',  emoji: '✨', value: 'dull' },
      { label: 'Roodheid & gevoeligheid',       emoji: '🌿', value: 'sensitive' },
      { label: 'Vette huid & puistjes',         emoji: '💧', value: 'oily' },
    ],
  },
  {
    id: 'type',
    question: 'Hoe voelt uw huid aan het einde van de ochtend?',
    options: [
      { label: 'Strak & droog',              emoji: '🏜️', value: 'dry' },
      { label: 'Comfortabel',                emoji: '😊', value: 'normal' },
      { label: 'Glanzend in de T-zone',      emoji: '🌟', value: 'combo' },
      { label: 'Glanzend over het geheel',   emoji: '💦', value: 'oily' },
    ],
  },
  {
    id: 'experience',
    question: 'Hoe vertrouwd bent u met actieve stoffen zoals retinol?',
    options: [
      { label: 'Complete beginner',          emoji: '🌱', value: 'beginner' },
      { label: 'Eerder gebruikt',            emoji: '📚', value: 'intermediate' },
      { label: 'Regelmatige retinolgebruiker', emoji: '🔬', value: 'advanced' },
      { label: 'Liever alleen natuurlijk',   emoji: '🌿', value: 'natural' },
    ],
  },
]

type Result = {
  headline: string
  description: string
  products: string[]
  cta: string
}

function getResult(answers: Record<string, string>): Result {
  const { concern, experience } = answers
  if (experience === 'natural' || concern === 'sensitive') {
    return {
      headline: 'The Sensitive Skin Edit',
      description: 'Uw huid heeft zachte, wetenschappelijk onderbouwde verzorging nodig zonder irritatie. Bakuchiol geeft u retinolachtige resultaten — zonder gevoeligheid.',
      products: ['Bakuchiol Serum', 'Barrier Restore Cream'],
      cta: 'Shop Sensitive Skin Edit — €89',
    }
  }
  if (concern === 'ageing' && experience !== 'beginner') {
    return {
      headline: 'The Glow Ritual',
      description: 'Uw huid is klaar voor de volledige LUMÉ power stack. Retinol + Vitamine C + drievoudig HA — zichtbare transformatie in 28 dagen.',
      products: ['Radiance Serum', 'Deep Moisture Cream', 'Overnight Renewal Oil'],
      cta: 'Shop The Glow Ritual — €129',
    }
  }
  if (concern === 'dull') {
    return {
      headline: 'Radiance Serum',
      description: 'Vitamine C 15% + Niacinamide 5% pakt ongelijkmatige huidtint en dofheid aan. Uw #1 ochtendstap voor instant glow.',
      products: ['Radiance Serum', 'Deep Moisture Cream'],
      cta: 'Shop Radiance Serum — €58',
    }
  }
  return {
    headline: 'The Glow Ritual',
    description: 'De complete LUMÉ routine dekt elk huidprobleem — reinigen, behandelen en beschermen. Niet voor niets de meest populaire.',
    products: ['Radiance Serum', 'Deep Moisture Cream', 'Overnight Renewal Oil'],
    cta: 'Shop The Glow Ritual — €129',
  }
}

export default function SkincareQuiz() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone]       = useState(false)

  const current = questions[step]
  const result  = done ? getResult(answers) : null
  const progress = ((step) / questions.length) * 100

  const choose = (value: string) => {
    const updated = { ...answers, [current.id]: value }
    setAnswers(updated)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setDone(true)
    }
  }

  const reset = () => { setStep(0); setAnswers({}); setDone(false) }

  return (
    <section id="quiz" className="py-28 bg-white scroll-mt-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#FDF8F0]/70 to-transparent rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] px-4 py-1.5 rounded-full mb-4">
            Persoonlijk voor jou
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">
            Vind jouw
            <br />
            <span className="gradient-text">perfecte match</span>
          </h2>
          <p className="text-lg text-[#6B6560]">3 vragen. Directe aanbeveling.</p>
        </motion.div>

        {/* Quiz card */}
        <div className="relative bg-white rounded-3xl border border-stone-100 shadow-xl overflow-hidden">
          {/* Progress bar */}
          {!done && (
            <div className="h-1 bg-stone-100">
              <motion.div
                className="h-full bg-[#C9A96E] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          )}

          <div className="p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Step counter */}
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">
                    {step + 1} / {questions.length}
                  </p>

                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-7 leading-snug">
                    {current.question}
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {current.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => choose(opt.value)}
                        className="group flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-stone-100 hover:border-[#C9A96E] hover:bg-[#FDF8F0] text-center cursor-pointer transition-all duration-200"
                      >
                        <span className="text-2xl">{opt.emoji}</span>
                        <span className="text-sm font-semibold text-stone-700 group-hover:text-[#C9A96E] leading-snug transition-colors">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="mt-6 text-sm text-stone-400 hover:text-stone-600 cursor-pointer transition-colors flex items-center gap-1"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M13 8H3M7 4L3 8l4 4"/>
                      </svg>
                      Terug
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-center mb-7">
                    <div className="w-14 h-14 rounded-full bg-[#FDF8F0] flex items-center justify-center mx-auto mb-4">
                      <svg width="28" height="28" viewBox="0 0 30 30" fill="none" aria-hidden>
                        <circle cx="15" cy="15" r="13" fill="#C9A96E"/>
                        <circle cx="19" cy="15" r="10" fill="#FAF8F5"/>
                      </svg>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Uw perfecte match</p>
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">{result!.headline}</h3>
                    <p className="text-sm text-[#6B6560] leading-relaxed max-w-sm mx-auto">{result!.description}</p>
                  </div>

                  {/* Products included */}
                  <div className="bg-[#FAF8F5] rounded-2xl p-5 mb-6">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-400 mb-3">Bevat</p>
                    <ul className="space-y-2">
                      {result!.products.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-sm text-stone-700">
                          <div className="w-4 h-4 rounded-full bg-white border border-[#C9A96E]/30 flex items-center justify-center shrink-0">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                              <path d="M1.5 4L3 5.5L6.5 2" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#shop"
                    className="btn-gold block w-full py-4 rounded-2xl font-semibold text-sm text-center cursor-pointer transition-all mb-4"
                  >
                    {result!.cta}
                  </a>

                  <button
                    type="button"
                    onClick={reset}
                    className="w-full text-sm text-stone-400 hover:text-stone-600 cursor-pointer transition-colors py-2"
                  >
                    Quiz opnieuw doen
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
