'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Is dit veilig voor gevoelige huid?',
    a: 'Ja. De formule is ontworpen met gevoelige huid als uitgangspunt. De laagste effectieve retinolconcentratie (0.3%) wordt gebufferd door niacinamide, waardoor irritatie sterk vermindert. Begin met 2–3 avonden per week.',
  },
  {
    q: "Kan ik dit combineren met vitamine C of SPF?",
    a: "Gebruik vitamine C 's ochtends, dit serum 's avonds. SPF overdag is verplicht — retinol maakt de huid tijdelijk iets gevoeliger voor zon. Combineer dit niet met andere retinol- of exfoliërende producten.",
  },
  {
    q: 'Hoe snel zie ik resultaat?',
    a: 'De eerste veranderingen in textuur zijn merkbaar na 3–4 weken bij consistent gebruik. Significant verschil in huidtoon, fijnere lijntjes en kleinere poriën is zichtbaar na 8–12 weken. Retinol werkt geleidelijk — dat is het bewijs dat het echt werkt.',
  },
  {
    q: 'Wat als mijn huid reageert?',
    a: 'Lichte warmte, strakheid of een tijdelijke droogheid zijn normaal in de eerste weken — de huid went. Verlaag de frequentie naar 2 avonden per week. Bij aanhoudende irritatie, stop het gebruik en neem contact op via hallo@lume.nl.',
  },
  {
    q: 'Is dit geschikt tijdens zwangerschap of borstvoeding?',
    a: 'Retinol wordt niet aanbevolen tijdens zwangerschap of borstvoeding. De Soft Barrier Cream en Quiet Cleanser zijn wel veilig te gebruiken. Bij twijfel, bespreek het met je huisarts of gynaecoloog.',
  },
  {
    q: 'Hoe bewaar ik dit product?',
    a: 'Bewaar op een koele, droge plek uit direct zonlicht. Niet in de badkamer — vochtige omgevingen tasten de stabiliteit van retinol aan. Houdbaar tot de datum op de bodem van de verpakking.',
  },
]

export default function PDPFaq({ productName }: { productName: string }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-px bg-[#C9A96E]" />
          <span className="section-label">Vragen</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-3 leading-tight">
          Vragen over{' '}
          <span
            className="font-normal italic text-[#9A9590]"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {productName}.
          </span>
        </h2>

        <p className="text-[15px] text-[#9A9590] font-light mb-12">
          Eerlijke antwoorden op de meest gestelde vragen.
        </p>

        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i} className={i > 0 ? 'border-t border-stone-100' : ''}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
              >
                <span
                  className={`text-[14px] font-medium leading-snug transition-colors duration-200 ${
                    open === i ? 'text-[#1A1A1A]' : 'text-[#5C5754] group-hover:text-[#1A1A1A]'
                  }`}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="shrink-0 text-[#C9A96E] mt-0.5"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                    <path d="M7.5 3v9M3 7.5h9"/>
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[13px] text-[#6B6560] font-light leading-relaxed border-t border-stone-50 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[12px] text-[#9A9590] font-light">
          Andere vraag?{' '}
          <a href="mailto:hallo@lume.nl" className="text-[#C9A96E] hover:underline underline-offset-3">
            hallo@lume.nl
          </a>
        </p>
      </div>
    </section>
  )
}
