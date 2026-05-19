'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Wanneer zie ik iets?',
    a: 'Na 2–4 weken merk je verbetering in hydratatie en textuur. Fine lines en egale huidtint verbeteren na 4–8 weken consistent gebruik. Huid vernieuwt zich elke 28 dagen — geef het die tijd.',
  },
  {
    q: 'Ik heb gevoelige huid. Kan ik MAUYI gebruiken?',
    a: 'Ja. Onze formules zijn parfumvrij, alcoholvrij en zonder agressieve conserveringsmiddelen. De Radiance Serum gebruikt een geleidelijk afgiftesysteem — effectief, maar zachter dan standaard retinol. 91% van klanten met gevoelige huid rapporteert geen irritatie. Twijfel je? Begin met de Sensitive Skin Edit.',
  },
  {
    q: 'Moet ik mijn hele routine vervangen?',
    a: 'Nee. MAUYI integreert in elke bestaande routine. Doe de quiz als je niet zeker weet welk product bij jou past. Maar eerlijk: de meeste klanten eindigen toch met alleen MAUYI.',
  },
  {
    q: 'Hoe werkt de 30-dagen garantie?',
    a: 'Niet tevreden na 30 dagen? Stuur het terug, je krijgt alles terug. Geen vragen, geen gedoe. We geloven in onze formules — dus het risico is voor ons.',
  },
  {
    q: 'Is MAUYI vegan en cruelty-free?',
    a: '100% vegan, gecertificeerd cruelty-free, zonder dierlijke ingrediënten. Verpakking is 92% recyclebaar. Alle INCI-ingrediënten staan op elke productpagina — we verbergen niets.',
  },
  {
    q: 'Hoe gebruik ik het?',
    a: "Ochtend: cleanser → Radiance Serum → moisturizer → SPF. Avond: cleanser → Radiance Serum (2–3x/week als beginner, dagelijks als gevorderd) → Overnight Oil. Dat is het. Geen 12 stappen.",
  },
  {
    q: 'Veilig tijdens zwangerschap?',
    a: 'Retinol wordt afgeraden tijdens de zwangerschap. Onze andere producten zijn veilig. Overleg altijd met je arts. Voor zwangere klanten raden we de Sensitive Skin Edit aan — met bakuchiol als retinol-alternatief.',
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
            Vragen
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">
            Goede vraag.
            <br />
            <span className="gradient-text">Eerlijk antwoord.</span>
          </h2>
          <p className="text-lg text-[#6B6560]">
            Geen verkooppraat. Gewoon wat je moet weten.
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
