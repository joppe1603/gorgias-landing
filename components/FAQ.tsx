'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Wanneer zie ik resultaten?',
    a: 'De meeste klanten zien na 2–4 weken een verbetering in hydratatie en textuur. Klinisch bewezen resultaten in fine lines en evenness zijn zichtbaar na 4–8 weken consistent gebruik. Huid vernieuwt zich elke 28 dagen — geef je routine de tijd.',
  },
  {
    q: 'Is LUMÉ geschikt voor gevoelige huid?',
    a: 'Ja. Onze formules zijn ontwikkeld zonder parfum, alcoholen en agressieve conserveringsmiddelen. De Retinol Serum gebruikt een microgestuurd afgiftesysteem dat effectief is maar minder irriterend dan traditionele retinol. Meer dan 91% van klanten met gevoelige huid rapporteert geen irritatie.',
  },
  {
    q: 'Kan ik LUMÉ combineren met mijn huidige routine?',
    a: 'Absoluut. LUMÉ producten zijn ontworpen om samen te werken, maar integreren ook naadloos met andere producten. Gebruik onze quiz om te zien welke stap het beste bij jou past — of bouw je volledige routine op met The Glow Ritual.',
  },
  {
    q: 'Hoe werkt de 30-dagen garantie?',
    a: 'Als je na 30 dagen niet tevreden bent, stuur je je bestelling terug voor een volledige terugbetaling — geen vragen gesteld. Wij geloven zo sterk in onze formules dat we het risico volledig op ons nemen.',
  },
  {
    q: 'Is LUMÉ vegan en cruelty-free?',
    a: 'Ja, 100%. LUMÉ is gecertificeerd vegan, cruelty-free en bevat geen dierlijke ingrediënten. Onze verpakking is 92% recyclebaar. We zijn transparant over elke ingredient en de herkomst ervan.',
  },
  {
    q: 'Hoe vaak moet ik de producten gebruiken?',
    a: 'De Cleanser gebruik je ochtend en avond. De Radiance Serum gebruik je \'s ochtends onder SPF. De Retinol Serum gebruik je \'s avonds 2–3x per week (beginners) tot dagelijks (gevorderd). De Overnight Oil sluit je avondroutine af. Zie onze Routine sectie voor het exacte schema.',
  },
  {
    q: 'Zijn de ingrediënten veilig tijdens de zwangerschap?',
    a: 'Retinol wordt afgeraden tijdens de zwangerschap. Onze andere producten — de Cleanser, Radiance Serum en Overnight Oil — zijn veilig in gebruik. We raden altijd aan om met je arts te overleggen. Neem contact met ons op voor gepersonaliseerd advies.',
  },
]

function Item({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-stone-100 last:border-none">
      <button
        className="w-full text-left flex items-center justify-between gap-4 py-5 group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`text-base font-semibold transition-colors duration-200 ${isOpen ? 'text-[#C9A96E]' : 'text-[#1A1A1A] group-hover:text-[#C9A96E]'}`}>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200 ${
            isOpen ? 'border-[#C9A96E] bg-[#C9A96E] text-white' : 'border-stone-200 text-stone-400 group-hover:border-[#C9A96E] group-hover:text-[#C9A96E]'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[#6B6560] text-sm leading-relaxed pb-5 pr-10">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-28 bg-white scroll-mt-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] px-4 py-1.5 rounded-full mb-4">
            Veelgestelde vragen
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">
            Alles wat je wil weten
            <br />
            <span className="gradient-text">over LUMÉ</span>
          </h2>
          <p className="text-lg text-[#6B6560]">
            Staat je vraag er niet bij? Stuur ons een bericht via de chat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-stone-100 shadow-sm px-8 py-2"
        >
          {faqs.map((faq, i) => (
            <Item
              key={faq.q}
              faq={faq}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <p className="text-[#6B6560] mb-4">Nog vragen? Wij zijn er voor je.</p>
          <a
            href="mailto:hello@lume.com"
            className="inline-flex items-center gap-2 text-[#C9A96E] font-semibold hover:underline underline-offset-4"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12v9H2V4zm0 0l6 5 6-5" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            hello@lume.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
