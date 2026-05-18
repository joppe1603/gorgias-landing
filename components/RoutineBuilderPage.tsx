'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'
import { getProduct } from '@/lib/products'

type Step = 'type' | 'concern' | 'simplicity' | 'result'

const skinTypes = [
  { value: 'dry', label: 'Droog', desc: 'Voelt strak aan, schilferig' },
  { value: 'oily', label: 'Vet', desc: 'Glanst snel, grote poriën' },
  { value: 'combo', label: 'Gemengd', desc: 'T-zone vet, wangen normaal' },
  { value: 'sensitive', label: 'Gevoelig', desc: 'Snel rood of geïrriteerd' },
  { value: 'normal', label: 'Normaal', desc: 'Geen extreme klachten' },
]

const concerns = [
  { value: 'aging', label: 'Fijne lijntjes' },
  { value: 'pigment', label: 'Donkere vlekken' },
  { value: 'texture', label: 'Ongelijke textuur' },
  { value: 'barrier', label: 'Snel geïrriteerd' },
  { value: 'dull', label: 'Doffe huid' },
  { value: 'pores', label: 'Grote poriën' },
]

const simplicityOptions = [
  { value: 'minimal', label: 'Zo minimaal mogelijk', desc: '1–2 producten' },
  { value: 'simple', label: 'Eenvoudig', desc: '3 producten, elke dag' },
  { value: 'thorough', label: 'Volledig', desc: 'AM + PM routine' },
]

type Answers = {
  type: string
  concern: string[]
  simplicity: string
}

type RoutineResult = {
  headline: string
  subline: string
  products: { name: string; slug: string; role: string; price: string }[]
  note: string
}

function getResult(answers: Answers): RoutineResult {
  const { type, concern, simplicity } = answers

  if (type === 'sensitive' || concern.includes('barrier')) {
    return {
      headline: 'Zachte reset voor gevoelige huid.',
      subline: 'Geen agressieve actieven. Barrièreherstel eerst.',
      products: [
        { name: 'Quiet Cleanser', slug: 'quiet-cleanser', role: 'Stap 01 — Reinigen', price: '€38' },
        { name: 'Soft Barrier Cream', slug: 'soft-barrier-cream', role: 'Stap 02 — Herstellen', price: '€48' },
      ],
      note: 'Wacht 4 weken voor je actieve stoffen introduceert. Je barrière herstelt zichzelf als je het de ruimte geeft.',
    }
  }

  if (simplicity === 'minimal') {
    return {
      headline: 'Één product. Grote impact.',
      subline: 'Het meest effectieve startpunt voor jouw huid.',
      products: [
        { name: 'Reset Serum', slug: 'reset-serum', role: 'Multitasker — Morning & Evening', price: '€58' },
      ],
      note: 'Het Reset Serum combineert Retinol, Niacinamide en Hyaluronzuur. Effectief als op zichzelf staand product.',
    }
  }

  if (concern.includes('aging') || concern.includes('pigment')) {
    return {
      headline: 'Gerichte anti-aging routine.',
      subline: 'Klinisch bewezen voor verlichting en celvernieuwing.',
      products: [
        { name: 'Quiet Cleanser', slug: 'quiet-cleanser', role: 'Stap 01 — Reinigen', price: '€38' },
        { name: 'Reset Serum', slug: 'reset-serum', role: 'Stap 02 — Behandelen', price: '€58' },
        { name: 'Soft Barrier Cream', slug: 'soft-barrier-cream', role: 'Stap 03 — Beschermen', price: '€48' },
      ],
      note: 'Gebruik het Reset Serum aanvankelijk 2–3x per week en bouw op naar dagelijks gebruik over 4–6 weken.',
    }
  }

  return {
    headline: 'Jouw complete 3-stappen routine.',
    subline: 'Consistentie wint van complexiteit.',
    products: [
      { name: 'Quiet Cleanser', slug: 'quiet-cleanser', role: 'Stap 01 — Reinigen', price: '€38' },
      { name: 'Reset Serum', slug: 'reset-serum', role: 'Stap 02 — Behandelen', price: '€58' },
      { name: 'Soft Barrier Cream', slug: 'soft-barrier-cream', role: 'Stap 03 — Beschermen', price: '€48' },
    ],
    note: 'Deze routine is geschikt voor de meeste huidtypes. 30 dagen garantie — geen vragen.',
  }
}

export default function RoutineBuilderPage() {
  const [step, setStep] = useState<Step>('type')
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [result, setResult] = useState<RoutineResult | null>(null)
  const [addedAll, setAddedAll] = useState(false)
  const { dispatch } = useCart()

  function addAllToCart() {
    if (!result) return
    result.products.forEach(p => {
      const full = getProduct(p.slug)
      if (full && full.availability === 'available') {
        dispatch({ type: 'ADD_ITEM', payload: { slug: full.slug, name: full.name, price: full.price, image: full.heroImage, size: full.size } })
      }
    })
    setAddedAll(true)
    setTimeout(() => setAddedAll(false), 2500)
  }

  const steps: Step[] = ['type', 'concern', 'simplicity']
  const currentStepIndex = steps.indexOf(step as 'type' | 'concern' | 'simplicity')
  const progress = ((currentStepIndex + 1) / (steps.length + 1)) * 100

  const handleType = (val: string) => {
    setAnswers(prev => ({ ...prev, type: val }))
    setStep('concern')
  }

  const handleConcern = (vals: string[]) => {
    setAnswers(prev => ({ ...prev, concern: vals }))
    setStep('simplicity')
  }

  const handleSimplicity = (val: string) => {
    const final = { ...answers, simplicity: val } as Answers
    setAnswers(final)
    setResult(getResult(final))
    setStep('result')
  }

  const reset = () => {
    setStep('type')
    setAnswers({})
    setResult(null)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#FAF8F5] pt-16 pb-20 border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label">Routine Builder</span>
              <div className="w-6 h-px bg-[#C9A96E]" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#1A1A1A] leading-[1.05] mb-4">
              3 vragen.
              <br />
              <span className="text-[#9A9590] font-normal italic">Jouw perfecte routine.</span>
            </h1>
            <p className="text-[#6B6560] font-light text-lg leading-relaxed">
              Geen complex algoritme. Eerlijk advies op basis van wat klinisch bewezen werkt voor jouw huidtype.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Builder */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Progress */}
          {step !== 'result' && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                  Vraag {currentStepIndex + 1} van {steps.length}
                </span>
                <span className="text-xs text-stone-400">{Math.round(progress)}%</span>
              </div>
              <div className="h-0.5 bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#C9A96E] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Skin type */}
            {step === 'type' && (
              <motion.div
                key="type"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-2">Wat is jouw huidtype?</h2>
                <p className="text-[#6B6560] font-light mb-8">Hoe voelt je huid aan het einde van de ochtend?</p>
                <div className="grid grid-cols-1 gap-3">
                  {skinTypes.map(t => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => handleType(t.value)}
                      className="group flex items-center justify-between p-5 bg-[#FAF8F5] hover:bg-[#F5EFE6] rounded-2xl border border-stone-100 hover:border-[#C9A96E]/40 transition-all duration-200 cursor-pointer text-left"
                    >
                      <div>
                        <p className="font-semibold text-[#1A1A1A] text-base">{t.label}</p>
                        <p className="text-sm text-[#9A9590] font-light mt-0.5">{t.desc}</p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Concerns */}
            {step === 'concern' && (
              <motion.div
                key="concern"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-2">Wat zijn jouw huidzorgen?</h2>
                <p className="text-[#6B6560] font-light mb-8">Selecteer alles wat van toepassing is.</p>
                <ConcernSelector onComplete={handleConcern} />
              </motion.div>
            )}

            {/* Step 3: Simplicity */}
            {step === 'simplicity' && (
              <motion.div
                key="simplicity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-2">Hoe uitgebreid wil je jouw routine?</h2>
                <p className="text-[#6B6560] font-light mb-8">We passen het advies hierop aan.</p>
                <div className="grid grid-cols-1 gap-3">
                  {simplicityOptions.map(o => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => handleSimplicity(o.value)}
                      className="group flex items-center justify-between p-5 bg-[#FAF8F5] hover:bg-[#F5EFE6] rounded-2xl border border-stone-100 hover:border-[#C9A96E]/40 transition-all duration-200 cursor-pointer text-left"
                    >
                      <div>
                        <p className="font-semibold text-[#1A1A1A] text-base">{o.label}</p>
                        <p className="text-sm text-[#9A9590] font-light mt-0.5">{o.desc}</p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Result */}
            {step === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Success header */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-px bg-[#C9A96E]" />
                    <span className="section-label">Jouw aanbeveling</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-[1.1] mb-2">{result.headline}</h2>
                  <p className="text-[#6B6560] font-light">{result.subline}</p>
                </div>

                {/* Product cards */}
                <div className="space-y-4 mb-8">
                  {result.products.map((p, i) => (
                    <motion.div
                      key={p.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center justify-between p-5 bg-[#FAF8F5] rounded-2xl border border-stone-100"
                    >
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-1">{p.role}</p>
                        <p className="font-semibold text-[#1A1A1A]">{p.name}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-[#1A1A1A] font-semibold font-[family-name:var(--font-cormorant)] text-xl">{p.price}</p>
                        <Link href={`/products/${p.slug}`} className="btn-gold px-4 py-2 rounded-xl text-xs font-medium">
                          Bekijk
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Note */}
                <div className="bg-[#0F0E0C] rounded-2xl p-6 mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Ons advies</p>
                  <p className="text-stone-300 text-sm leading-relaxed font-light">{result.note}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={addAllToCart}
                    className="btn-gold inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-medium flex-1 cursor-pointer"
                  >
                    {addedAll ? (
                      <>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden><path d="M2.5 7.5L6 11L12.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Toegevoegd!
                      </>
                    ) : (
                      'Voeg alles toe aan winkelwagen'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="btn-outline inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-medium text-sm cursor-pointer"
                  >
                    Opnieuw beginnen
                  </button>
                </div>

                <p className="text-center text-xs text-stone-400 mt-6 font-light">30 dagen garantie · Geen abonnement · Gratis retour</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}

function ConcernSelector({ onComplete }: { onComplete: (vals: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (val: string) => {
    setSelected(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {concerns.map(c => (
          <button
            key={c.value}
            type="button"
            onClick={() => toggle(c.value)}
            className={`p-4 rounded-2xl border text-sm font-medium text-left transition-all cursor-pointer ${
              selected.includes(c.value)
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-[#FAF8F5] text-stone-700 border-stone-100 hover:border-[#C9A96E]/40'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onComplete(selected.length ? selected : ['general'])}
        className="btn-gold w-full py-4 rounded-2xl font-medium cursor-pointer"
      >
        {selected.length > 0 ? `Verder met ${selected.length} keuze${selected.length > 1 ? 's' : ''}` : 'Sla over'}
      </button>
    </div>
  )
}
