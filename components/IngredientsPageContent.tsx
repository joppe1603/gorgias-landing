'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const categories = ['Alle', 'Actieven', 'Botanicals', 'Barrière', 'Hydratatie']

const ingredients = [
  {
    name: 'Retinol 0.3%',
    category: 'Actieven',
    tagline: 'Goud standaard voor veroudering.',
    description: 'Retinol (vitamine A-derivaat) is een van de best gedocumenteerde actieve stoffen in de dermatologie. Op 0.3% is het effectief voor celvernieuwing en collageenstimulatie, zonder de extreme irritatie van hogere concentraties.',
    benefits: ['Versnelt celvernieuwing', 'Stimuleert collageenproductie', 'Vermindert fijne lijntjes', 'Verbetert huidtextuur'],
    studyNote: 'Klinisch bewezen effectief bij consistent gebruik van 4–8 weken.',
    usedIn: ['Reset Serum'],
    caution: 'Begin langzaam. Niet aanbevolen tijdens zwangerschap.',
    color: 'bg-amber-50',
    accentColor: 'text-amber-700',
  },
  {
    name: 'Niacinamide 10%',
    category: 'Actieven',
    tagline: 'De multitasker die elke routine nodig heeft.',
    description: 'Niacinamide (vitamine B3) verheldert, verfijnt poriën, versterkt de huidbarrière en reguleert talgproductie. Een van de weinige ingrediënten met bewijs voor meerdere huidproblemen tegelijk.',
    benefits: ['Vermindert hyperpigmentatie', 'Verfijnt poriën', 'Anti-inflammatoir', 'Versterkt huidbarrière'],
    studyNote: 'Getolereerd door vrijwel alle huidtypes, ook gevoelige huid.',
    usedIn: ['Reset Serum'],
    caution: null,
    color: 'bg-purple-50',
    accentColor: 'text-purple-700',
  },
  {
    name: 'Bakuchiol',
    category: 'Botanicals',
    tagline: 'Plantaardig retinol. Zonder de bijwerkingen.',
    description: 'Bakuchiol is een plantaard extract dat vergelijkbare resultaten geeft als retinol — celvernieuwing, anti-aging — maar zonder roodheid, schilfering of zonsgevoeligheid. Ideaal voor gevoelige huid en veilig tijdens zwangerschap.',
    benefits: ['Retinol-achtige resultaten', 'Geen irritatie', 'Geschikt voor gevoelige huid', 'Zwangerschapsveilig'],
    studyNote: 'Vergelijkingsstudies tonen gelijkwaardige resultaten met retinol bij 12 weken gebruik.',
    usedIn: ['Sensitive Skin Edit', 'Soft Barrier Cream'],
    caution: null,
    color: 'bg-green-50',
    accentColor: 'text-green-700',
  },
  {
    name: 'Hyaluronzuur Complex',
    category: 'Hydratatie',
    tagline: 'Hydratatie in drie dimensies.',
    description: 'Niet alle hyaluronzuur is hetzelfde. Onze formule gebruikt drie molecuulgewichten die elk een andere huidlaag bereiken — van de oppervlakte tot dieper in de dermis — voor 72 uur aangehouden hydratatie.',
    benefits: ['3 molecuulgewichten', '72u hydratatiebehoud', 'Alle huidtypes', 'Direct zichtbaar effect'],
    studyNote: 'Multi-moleculair HA toont significant betere resultaten dan single-molecular formulaties.',
    usedIn: ['Reset Serum', 'Soft Barrier Cream'],
    caution: null,
    color: 'bg-blue-50',
    accentColor: 'text-blue-700',
  },
  {
    name: 'Ceramiden',
    category: 'Barrière',
    tagline: 'De bouwstenen van een gezonde barrière.',
    description: 'Ceramiden maken 50% uit van de lipiden in de stratum corneum — de buitenste huidlaag. Ze houden vocht vast en beschermen tegen externe irritanten. Essentieel voor een gezonde barrièrefunctie.',
    benefits: ['Versterkt huidbarrière', 'Houdt vocht vast', 'Kalmeert geïrriteerde huid', 'Herstelt beschadigde barrière'],
    studyNote: 'Essentieel bij eczeem, rosacea en barrièrestoornis. Veilig voor alle leeftijden.',
    usedIn: ['Quiet Cleanser', 'Soft Barrier Cream'],
    caution: null,
    color: 'bg-teal-50',
    accentColor: 'text-teal-700',
  },
  {
    name: 'Vitamine C 15%',
    category: 'Actieven',
    tagline: 'Verheldering en bescherming in één.',
    description: 'Stabiele L-ascorbinezuur op 15% is de klinisch effectieve drempel voor verlichting van hyperpigmentatie, UV-schade en antioxidantwerking. Onze formule is gebufferd voor stabiliteit en tolerantie.',
    benefits: ['Vermindert donkere vlekken', 'Antioxidantbescherming', 'Stimuleert collageensynthese', 'Verheldert huidtint'],
    studyNote: 'L-ascorbinezuur boven 10% toont aantoonbare fotobescherming naast UV-filters.',
    usedIn: ['Reset Serum'],
    caution: 'Bewaar op donkere plek. Oxidatie vermindert effectiviteit.',
    color: 'bg-orange-50',
    accentColor: 'text-orange-700',
  },
  {
    name: 'Rozenbottelolie',
    category: 'Botanicals',
    tagline: 'Rijke voeding voor droge en rijpere huid.',
    description: 'Koudgeperste rozenbottelolie is rijk aan linolzuur (omega-6) en alfa-linoleenzuur (omega-3), essentieel voor huidherstel. Bevat ook van nature vitamine A en C voor een lichte retinol-achtige werking.',
    benefits: ['Vervaagt littekens & vlekken', 'Vitamines A, C & E', 'Droge & rijpere huid', 'Licht, niet vettig'],
    studyNote: 'Effectief bij postinflammatoire hyperpigmentatie bij consistent gebruik.',
    usedIn: ['Overnight Renewal Oil'],
    caution: null,
    color: 'bg-rose-50',
    accentColor: 'text-rose-700',
  },
  {
    name: 'Provitamine B5 (Panthenol)',
    category: 'Hydratatie',
    tagline: 'Kalmerend, herstellend, hydratiserend.',
    description: 'Panthenol (provitamine B5) dringt diep in de huid en wordt omgezet in pantotheenzuur — een essentieel onderdeel van de huidbarrière. Kalmeert geïrriteerde huid en versnelt het herstelproces.',
    benefits: ['Kalmeert irritatie', 'Bevordert wondgenezing', 'Diepe hydratatie', 'Versterkt barrière'],
    studyNote: 'Veelvuldig gebruikt in dermatologische behandelingen. Uitstekend veiligheidsprofiel.',
    usedIn: ['Quiet Cleanser', 'Soft Barrier Cream'],
    caution: null,
    color: 'bg-yellow-50',
    accentColor: 'text-yellow-700',
  },
]

function IngredientCard({ ing }: { ing: typeof ingredients[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`rounded-2xl border border-stone-100 overflow-hidden transition-all duration-300 ${open ? 'border-stone-200 shadow-sm' : 'hover:border-stone-200'}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full text-left p-7 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className={`inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-3 ${ing.color} ${ing.accentColor}`}>
              {ing.category}
            </div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">{ing.name}</h3>
            <p className="text-sm text-[#6B6560] italic">{ing.tagline}</p>
          </div>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.22 }}
            className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors duration-200 ${
              open ? 'border-[#C9A96E] bg-[#C9A96E] text-white' : 'border-stone-200 text-stone-400'
            }`}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 2V8M2 5H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 border-t border-stone-100 pt-6">
              <p className="text-[#6B6560] text-sm leading-relaxed mb-6 font-light">{ing.description}</p>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {ing.benefits.map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-stone-600">
                    <div className="w-4 h-4 rounded-full bg-[#FDF8F0] flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {b}
                  </div>
                ))}
              </div>

              {/* Study note */}
              <div className="bg-[#FAF8F5] rounded-xl p-4 mb-4 border border-stone-100">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Klinisch bewijs</p>
                <p className="text-sm text-[#6B6560] font-light">{ing.studyNote}</p>
              </div>

              {/* Caution */}
              {ing.caution && (
                <div className="bg-amber-50 rounded-xl p-4 mb-4 border border-amber-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">Let op</p>
                  <p className="text-sm text-amber-700 font-light">{ing.caution}</p>
                </div>
              )}

              {/* Used in */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Gebruikt in</p>
                <div className="flex flex-wrap gap-2">
                  {ing.usedIn.map(p => (
                    <span key={p} className="ingredient-pill">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function IngredientsPageContent() {
  const [activeCategory, setActiveCategory] = useState('Alle')

  const filtered = activeCategory === 'Alle'
    ? ingredients
    : ingredients.filter(i => i.category === activeCategory)

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#FAF8F5] pt-16 pb-20 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label">Ingrediënten & Wetenschap</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#1A1A1A] leading-[1.05] mb-4">
              Wat werkt.
              <br />
              <span className="text-[#9A9590] font-normal italic">En waarom.</span>
            </h1>
            <p className="text-[#6B6560] text-lg font-light leading-relaxed max-w-xl">
              Elk ingrediënt in LUMÉ is gekozen op basis van klinisch bewijs. Geen vullers. Geen gepatenteerde namen voor gewone stoffen. Geen vage claims.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Barrier education */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-[1.1] mb-5">
                Waarom minder actieve stoffen
                <br />
                <span className="text-[#9A9590] font-normal italic">beter werkt.</span>
              </h2>
              <p className="text-[#6B6560] leading-relaxed font-light mb-4">
                Een gezonde huidbarrière is de beste bescherming die je hebt. Als je te veel exfolieert, te veel actieve stoffen laagt over elkaar heen, of te snel wisselt, verstoort dat de barrière.
              </p>
              <p className="text-[#6B6560] leading-relaxed font-light">
                Het resultaat: roodheid, gevoeligheid, breakouts en paradoxaal genoeg meer huidproblemen. Onze formules zijn ontworpen om de barrière te ondersteunen — niet te omzeilen.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              {[
                { stat: '70%', label: 'van huidproblemen is barrièredisfunctie' },
                { stat: '28 dagen', label: 'is de complete celvernieuwingscyclus' },
                { stat: '3', label: 'actieve stoffen is het effectieve maximum' },
              ].map(item => (
                <div key={item.stat} className="flex items-center gap-5 bg-[#FAF8F5] rounded-2xl p-5 border border-stone-100">
                  <p className="text-3xl font-semibold text-[#C9A96E] font-[family-name:var(--font-cormorant)] shrink-0 w-24">{item.stat}</p>
                  <p className="text-sm text-[#6B6560] font-light leading-snug">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ingredient list */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {filtered.map((ing, i) => (
                <motion.div
                  key={ing.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <IngredientCard ing={ing} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Klaar om het zelf te ervaren?
            </h2>
            <p className="text-[#6B6560] mb-8 font-light">
              Vind de routine die werkt voor jouw huid.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/shop" className="btn-gold inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-sm">
                Shop de producten
              </Link>
              <Link href="/routine" className="btn-outline inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-sm">
                Bouw mijn routine
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
