'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  {
    label: 'Producten & Ingrediënten',
    faqs: [
      {
        q: 'Wanneer zie ik iets?',
        a: 'Na 2–4 weken merk je verbetering in hydratatie en textuur. Fine lines en egale huidtint verbeteren na 4–8 weken consistent gebruik. Huid vernieuwt zich elke 28 dagen — geef het die tijd.',
      },
      {
        q: 'Ik heb gevoelige huid. Kan ik LUMÉ gebruiken?',
        a: 'Ja. Onze formules zijn parfumvrij, alcoholvrij en zonder agressieve conserveringsmiddelen. Het Reset Serum gebruikt een geleidelijk afgiftesysteem — effectief, maar zachter dan standaard retinol. 91% van klanten met gevoelige huid rapporteert geen irritatie. Twijfel je? Begin met de Sensitive Skin Edit met bakuchiol.',
      },
      {
        q: 'Wat is het verschil tussen retinol en bakuchiol?',
        a: 'Retinol (vitamine A-derivaat) stimuleert celvernieuwing en collageenproductie — klinisch goed bewezen, maar kan in de beginfase irritatie veroorzaken. Bakuchiol is een plantaardig alternatief dat vergelijkbare resultaten geeft zonder de bekende bijwerkingen. Geschikt voor gevoelige huid en tijdens de zwangerschap.',
      },
      {
        q: 'Moet ik mijn hele routine vervangen?',
        a: 'Nee. LUMÉ integreert in elke bestaande routine. Doe de quiz als je niet zeker weet welk product bij jou past. Maar eerlijk: de meeste klanten eindigen toch met alleen LUMÉ.',
      },
    ],
  },
  {
    label: 'Bestellen & Levering',
    faqs: [
      {
        q: 'Hoe werkt de 30-dagen garantie?',
        a: 'Niet tevreden na 30 dagen? Stuur het terug, je krijgt alles terug. Geen vragen, geen gedoe. We geloven in onze formules — dus het risico is voor ons.',
      },
      {
        q: 'Wanneer ontvang ik mijn bestelling?',
        a: 'Bestellingen geplaatst voor 15:00 worden dezelfde dag verstuurd. Bezorgtijd in Nederland: 1–2 werkdagen. België en Duitsland: 2–4 werkdagen. Internationaal: 5–10 werkdagen.',
      },
      {
        q: 'Is verzending gratis?',
        a: 'Gratis verzending in Nederland bij bestellingen boven €50. Bij bestellingen onder €50 rekenen we €3,95 verzendkosten. Belgische en internationale bestellingen: kosten variëren per land.',
      },
    ],
  },
  {
    label: 'Duurzaamheid & Veiligheid',
    faqs: [
      {
        q: 'Is LUMÉ vegan en cruelty-free?',
        a: '100% vegan, gecertificeerd cruelty-free, zonder dierlijke ingrediënten. Verpakking is 92% recyclebaar. Alle INCI-ingrediënten staan op elke productpagina — we verbergen niets.',
      },
      {
        q: 'Veilig tijdens zwangerschap?',
        a: 'Retinol wordt afgeraden tijdens de zwangerschap. Onze andere producten zijn veilig. Overleg altijd met je arts. Voor zwangere klanten raden we de Sensitive Skin Edit aan — met bakuchiol als retinol-alternatief.',
      },
      {
        q: 'Hoe bewaar ik mijn producten?',
        a: 'Op een koele, droge plek, uit direct zonlicht. Het Reset Serum bewaar je bij voorkeur in de koelkast of in een donkere lade voor een langere houdbaarheid. Na opening: gebruik binnen 6 maanden.',
      },
    ],
  },
  {
    label: 'Gebruik & Routine',
    faqs: [
      {
        q: 'Hoe gebruik ik de producten?',
        a: 'Ochtend: Quiet Cleanser → Reset Serum → Soft Barrier Cream → SPF. Avond: Quiet Cleanser → Reset Serum (2–3x/week als beginner, dagelijks als gevorderd) → Soft Barrier Cream of Overnight Oil. Dat is het.',
      },
      {
        q: 'Kan ik het Reset Serum dagelijks gebruiken?',
        a: 'Begin 2–3x per week. Bouw in 4–6 weken op naar dagelijks gebruik. Dit geeft je huid de tijd om te wennen aan retinol zonder irritatie. Als je huid goed reageert, kun je overgaan naar dagelijks gebruik.',
      },
    ],
  },
]

function Item({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-stone-100 last:border-none">
      <button
        className="w-full text-left flex items-start justify-between gap-4 py-5 group cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`text-base font-medium transition-colors duration-200 leading-snug ${isOpen ? 'text-[#C9A96E]' : 'text-[#1A1A1A] group-hover:text-[#C9A96E]'}`}>
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200 ${
            isOpen ? 'border-[#C9A96E] bg-[#C9A96E] text-white' : 'border-stone-200 text-stone-400 group-hover:border-[#C9A96E] group-hover:text-[#C9A96E]'
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 2V8M2 5H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[#6B6560] text-sm leading-relaxed pb-5 pr-10 font-light">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPageContent() {
  const [openMap, setOpenMap] = useState<Record<string, number | null>>({})

  const toggle = (cat: string, i: number) => {
    setOpenMap(prev => ({ ...prev, [cat]: prev[cat] === i ? null : i }))
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#FAF8F5] pt-16 pb-20 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label">Veelgestelde vragen</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#1A1A1A] leading-[1.05] mb-4">
              Goede vraag.
              <br />
              <span className="text-[#9A9590] font-normal italic">Eerlijk antwoord.</span>
            </h1>
            <p className="text-[#6B6560] text-lg font-light leading-relaxed">
              Geen verkooppraat. Gewoon wat je moet weten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ categories */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-6">{cat.label}</h2>
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm px-8 py-2">
                  {cat.faqs.map((faq, fi) => (
                    <Item
                      key={faq.q}
                      faq={faq}
                      isOpen={openMap[cat.label] === fi}
                      onToggle={() => toggle(cat.label, fi)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <p className="text-[#6B6560] mb-4 font-light">Nog vragen? We zijn er voor je.</p>
            <a
              href="mailto:hello@lume-skincare.nl"
              className="inline-flex items-center gap-2 text-[#C9A96E] font-medium hover:underline underline-offset-4"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12v9H2V4zm0 0l6 5 6-5" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              hello@lume-skincare.nl
            </a>
          </motion.div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-16 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-sm text-stone-400 mb-6 uppercase tracking-widest font-bold">Misschien ook interessant</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Ingrediënten & Wetenschap', href: '/ingredients' },
              { label: 'Routine Builder', href: '/routine' },
              { label: 'Onze Filosofie', href: '/philosophy' },
            ].map(l => (
              <Link key={l.label} href={l.href} className="btn-outline inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
