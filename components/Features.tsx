'use client'

import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TabId = 'Actieven' | 'Botanicals' | 'Resultaten'

type Feature = {
  icon: ReactNode
  color: string
  title: string
  description: string
  points: string[]
}

const activesFeatures: Feature[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
      </svg>
    ),
    color: 'bg-[#FDF8F0] text-[#C9A96E]',
    title: 'Retinol 0.3%',
    description: 'Klinisch bewezen effectief tegen fijne lijntjes en het verbeteren van huidtextuur in 4–8 weken consistent gebruik.',
    points: ['Versnelt celvernieuwing', 'Stimuleert collageenproductie', '0.3% — effectief, niet irriterend'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>
      </svg>
    ),
    color: 'bg-blue-50 text-blue-600',
    title: 'Hyaluronzuur Complex',
    description: 'Drievoudig HA trekt vocht aan in alle huidlagen voor een volle, stralende huid gedurende de hele dag.',
    points: ['3 molecuulgewichten', '72u hydratatiebehoud', 'Geschikt voor alle huidtypen'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2Z"/>
      </svg>
    ),
    color: 'bg-purple-50 text-purple-600',
    title: 'Niacinamide 10%',
    description: 'Verheldert, verfijnt poriën en versterkt de huidbarrière — de multitasker die elke routine nodig heeft.',
    points: ['Vermindert hyperpigmentatie', 'Verfijnt poriën', 'Anti-inflammatoir'],
  },
]

const botanicalsFeatures: Feature[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 7 7 3 3 3c0 5 3 9 9 9ZM12 12c0-5 5-9 9-9-1 5-4 9-9 9Z"/>
      </svg>
    ),
    color: 'bg-green-50 text-green-600',
    title: 'Bakuchiol',
    description: 'Het plantaardige retinol-alternatief. Geeft retinol-achtige resultaten zonder roodheid, schilfering of zonsgevoeligheid.',
    points: ['Veilig voor gevoelige huid', 'Geen zonsgevoeligheid', 'Zwangerschapsvriendelijk alternatief'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z"/>
        <path d="M12 6v6M8 10c1 2 2 3 4 4 2-1 3-2 4-4"/>
      </svg>
    ),
    color: 'bg-teal-50 text-teal-600',
    title: 'Zeewier Extract',
    description: 'Rijk aan jodium en sporenmineralen, zeewier reguleert talgproductie en kalmeert reactieve, geïrriteerde huid.',
    points: ['Reguleert talgproductie', 'Mineralenrijke hydratatie', 'Kalmeert reactieve huid'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    color: 'bg-rose-50 text-rose-500',
    title: 'Rozenbottelolie',
    description: 'Rijk aan van nature aanwezige vitamine A en C, vervaagt littekens en egaliseerd de huidtint bij consistent gebruik.',
    points: ['Vervaagt littekens & donkere vlekken', 'Vitamines A, C & E', 'Licht, niet vettig'],
  },
]

const resultsFeatures: Feature[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
    color: 'bg-[#FDF8F0] text-[#C9A96E]',
    title: '28 Dagen Zichtbaar Resultaat',
    description: 'Echte resultaten, geen beloften. Klinische gebruikersstudies tonen zichtbare verbeteringen in huidtextuur en -tint binnen 28 dagen.',
    points: ['Klinisch getest protocol', 'Zichtbare gladheid in 4 weken', '94% rapporteert meer zelfvertrouwen'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2Z"/>
      </svg>
    ),
    color: 'bg-amber-50 text-amber-600',
    title: '12.400+ Vijfsterrenbeoordelingen',
    description: '94% van de MAUYI-klanten zegt dat hun huid er zichtbaar beter uitziet na 6 weken consistent gebruik.',
    points: ['4.9/5 gemiddelde score', 'Alleen geverifieerde aankopen', 'Wereldwijde community van 12k+'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    color: 'bg-indigo-50 text-indigo-600',
    title: 'Dermatoloog Goedgekeurd',
    description: 'Elke MAUYI-formule wordt ontwikkeld in samenwerking met dermatologen en getest onder klinisch toezicht vóór lancering.',
    points: ['Onafhankelijk panel getest', 'Allergie & irritatie gescreend', 'INCI-conforme formules'],
  },
]

const sets: Record<TabId, Feature[]> = {
  Actieven:    activesFeatures,
  Botanicals: botanicalsFeatures,
  Resultaten:    resultsFeatures,
}

const tabs: TabId[] = ['Actieven', 'Botanicals', 'Resultaten']

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden:   { opacity: 0, y: 36 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Features() {
  const [tab, setTab] = useState<TabId>('Actieven')

  return (
    <section id="features" className="py-28 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] px-4 py-1.5 rounded-full mb-4">
            De MAUYI formule
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-5 leading-tight">
            Ingrediënten die
            <br />
            <span className="gradient-text">écht werken</span>
          </h2>
          <p className="text-lg text-[#6B6560] max-w-2xl mx-auto leading-relaxed">
            Wij gebruiken geen vullers. Elk ingrediënt in MAUYI is gekozen op basis van klinisch bewijs en huidcompatibiliteit.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-6 sm:px-8 py-2.5 rounded-full text-sm font-semibold border cursor-pointer transition-all ${
                tab === t
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-[#C9A96E] hover:text-[#C9A96E]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sets[tab].map((feature) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="group relative rounded-2xl p-[1px] overflow-hidden bg-stone-100"
              >
                <div className="feature-card-glow absolute inset-0 rounded-2xl pointer-events-none" />
                <div className="relative bg-white rounded-[15px] border border-stone-100 p-7 shadow-sm h-full card-hover">
                  <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-200`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">{feature.title}</h3>
                  <p className="text-[#6B6560] text-sm leading-relaxed mb-5">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-stone-600">
                        <div className="w-4 h-4 rounded-full bg-[#FDF8F0] flex items-center justify-center shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                            <path d="M1.5 4L3 5.5L6.5 2" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A96E] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14"
        >
          <a href="#shop" className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm cursor-pointer transition-all">
            Bekijk alle producten
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
