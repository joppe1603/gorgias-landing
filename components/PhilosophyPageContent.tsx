'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const beliefs = [
  {
    number: '01',
    title: 'Minder is meer. Altijd.',
    body: 'Drie goed samengestelde producten presteren altijd beter dan tien middelmatige. Wij optimaliseren elke formule zodat de volgende overbodig wordt. Dat is geen marketingtruc — het is de logica van huidwetenschap.',
  },
  {
    number: '02',
    title: 'Wetenschap boven marketing.',
    body: 'Geen gepatenteerde namen voor gewone ingrediënten. Geen voor-en-na foto\'s met filters. Geen influencer deals die onze formules beïnvloeden. Alleen gepubliceerde studies, eerlijke claims en transparante INCI-lijsten.',
  },
  {
    number: '03',
    title: 'Jouw huid is slim.',
    body: 'Huid herstelt zichzelf als je het de juiste stoffen geeft en rust laat. Te veel exfoliëren, te veel actieve stoffen, te veel veranderingen — dat verstoort een systeem dat eigenlijk goed werkt. Soms is het beste advies: stop met kopen.',
  },
  {
    number: '04',
    title: 'Skincare fatigue is echt.',
    body: 'In 2026 heeft de gemiddelde beauty-consument 27 producten in de badkamer. De meeste worden niet afgemaakt. De meeste zijn niet nodig. We weten wat dat kost — aan geld, aan tijd, aan mentale energie. Wij bouwen een antwoord hierop.',
  },
  {
    number: '05',
    title: 'Transparantie is niet optioneel.',
    body: 'Alle INCI-ingrediënten staan op elke productpagina. Geen verborgen stoffen. Geen vage termen als "proprietary blend". Als we een ingredient gebruiken, leggen we uit waarom. Als we er één weglaten, ook.',
  },
]

const notIn = [
  'Synthetisch parfum', 'Parabenen', 'Siliconen', 'Minerale oliën',
  'Sulphaten (SLS/SLES)', 'Kunstmatige kleurstoffen', 'Ethanolalcohol', 'Microplastics',
]

const weDo = [
  { name: 'Retinol 0.3%', note: 'klinisch effectieve dosis' },
  { name: 'Vitamine C 15%', note: 'stabiele L-ascorbinezuur formule' },
  { name: 'Niacinamide 10%', note: 'bewezen poriënverfijner' },
  { name: 'Bakuchiol', note: 'plantaardig retinol-alternatief' },
  { name: 'Hyaluronzuur (3×)', note: 'drie molecuulgewichten' },
  { name: 'Ceramiden', note: 'barrièreherstel & hydratatie' },
]

export default function PhilosophyPageContent() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0F0E0C] pt-20 pb-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A96E 1px, transparent 1px)', backgroundSize: '48px 48px' }}
          aria-hidden
        />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label" style={{ color: '#C9A96E' }}>Onze filosofie</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.03] mb-8">
              Skincare zonder
              <br />
              <span className="text-stone-500 font-normal italic">het spektakel.</span>
            </h1>
            <p className="text-stone-400 text-xl leading-relaxed max-w-2xl font-light">
              We zijn niet het eerste skincare merk. Maar we proberen het eerlijkste te zijn — over ingrediënten, resultaten en wat huid eigenlijk nodig heeft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opening manifesto */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg prose-stone max-w-none"
            style={{ fontFamily: 'var(--font-inter)', color: '#6B6560', fontWeight: 300, lineHeight: 1.8 }}
          >
            <p className="text-2xl text-[#1A1A1A] font-[family-name:var(--font-cormorant)] font-semibold leading-relaxed mb-8">
              &ldquo;De gemiddelde vrouw gebruikt 12 producten per dag. Dermatologisch onderzoek suggereert dat 3 à 4 voldoende zijn voor optimale huidgezondheid. Wat doen de andere 8?&rdquo;
            </p>
            <p className="mb-6">
              Skincare is een industrie die leeft van complexiteit. Hoe meer producten, stappen, ingrediënten en routines, hoe meer er te verkopen valt. Hoe meer jargon, hoe minder je weet wat je eigenlijk gebruikt. Hoe meer &ldquo;innovatie&rdquo;, hoe meer je voelt dat je achterloopt.
            </p>
            <p className="mb-6">
              Wij geloven dat huid eenvoud verdient. Niet goedkoop. Niet basic. Maar intentioneel samengesteld — zodat elk product zijn werk doet, en je niet de rest van de dag bezig bent met je routine.
            </p>
            <p>
              MAUYI is gebouwd als antwoord op skincare-vermoeidheid. Niet om je minder te verkopen — maar om je beter te laten kopen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5 Beliefs */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-6 h-px bg-[#C9A96E]" />
            <span className="section-label">Onze overtuigingen</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="text-4xl sm:text-5xl font-semibold text-[#1A1A1A] leading-[1.05] mb-16"
          >
            Wat we geloven.
          </motion.h2>

          <div className="space-y-0 divide-y divide-stone-200">
            {beliefs.map((b, i) => (
              <motion.div
                key={b.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="grid md:grid-cols-[120px_1fr] gap-8 py-10 group"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A96E] pt-1">{b.number}</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{b.title}</h3>
                  <p className="text-[#6B6560] leading-relaxed font-light">{b.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we leave out */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label">Formule transparantie</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1A1A1A] leading-[1.05]">
              Wat we weglaten.
              <br />
              <span className="text-stone-400 font-normal italic text-3xl sm:text-4xl">En waarom dat uitmaakt.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* NOT in */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-6">Niet in onze formules</p>
              <div>
                {notIn.map((item) => (
                  <div key={item} className="flex items-center gap-3.5 py-3.5 border-b border-stone-100 last:border-none">
                    <span className="w-5 h-5 flex items-center justify-center shrink-0 rounded-full bg-stone-100">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M1 1l6 6M7 1L1 7"/>
                      </svg>
                    </span>
                    <span className="text-stone-400 text-sm line-through decoration-stone-300 decoration-1">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DO use */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-6">Wél in onze formules</p>
              <div>
                {weDo.map((item) => (
                  <div key={item.name} className="flex items-center gap-3.5 py-3.5 border-b border-stone-100 last:border-none">
                    <span className="w-5 h-5 flex items-center justify-center shrink-0 rounded-full bg-[#FDF8F0]">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 4L3 6.5L7 1.5"/>
                      </svg>
                    </span>
                    <span className="text-[#1A1A1A] text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-stone-400 ml-auto whitespace-nowrap">{item.note}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs text-stone-400 leading-relaxed max-w-sm font-light">
                Alle INCI-ingrediënten zijn openbaar beschikbaar op onze productpagina&apos;s. Geen verborgen stoffen. Nooit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Klaar om te beginnen?
            </h2>
            <p className="text-[#6B6560] mb-8 font-light">
              Bouw een routine die past bij jouw huid. Drie stappen. Geen ruis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/routine" className="btn-gold inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-sm">
                Bouw mijn routine
              </Link>
              <Link href="/ingredients" className="btn-outline inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-sm">
                Lees over ingrediënten
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
