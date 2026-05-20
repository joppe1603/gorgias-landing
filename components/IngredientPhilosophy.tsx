'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const ingredients = [
  {
    name: 'Retinol 0.3%',
    category: 'Celvernieuwing',
    description:
      'De gouden standaard in dermatologie — ingezet op de drempel van effectiviteit. Gebufferd door niacinamide zodat klinische resultaten niet ten koste gaan van draagbaarheid.',
    detail: 'Celomloop · textuurverbetering · fijne lijntjes',
  },
  {
    name: 'Bakuchiol',
    category: 'Plantaardig alternatief',
    description:
      'Spiegelt het werkingsmechanisme van retinol op receptor-niveau — zonder de irritatie. Samen met retinol versterken ze elkaar in een formule die geen compromissen sluit.',
    detail: 'Anti-inflammatoir · antioxidant · synergistisch',
  },
  {
    name: 'Niacinamide 10%',
    category: 'Barrièreherstel',
    description:
      'Op klinische dosis ingezet als buffer én actief. Vermindert roodheid, reguleert sebumproductie en versterkt de huidbarrière — precies waar retinol haar het meest nodig heeft.',
    detail: 'Barrièreversterking · sebumregulatie · kalmering',
  },
  {
    name: 'Hyaluronzuurcomplex',
    category: 'Multi-gewicht hydratatie',
    description:
      'Drie molecuulgewichten die samenwerken — van oppervlaktehydratatie tot diep in de dermis. Geen vulstof. Actieve ondersteuning voor een formule die de huid intensief werkt.',
    detail: 'Laag · middel · hoog molecuulgewicht',
  },
]

export default function IngredientPhilosophy() {
  return (
    <section className="bg-[#0F0E0C] py-28 lg:py-36 overflow-hidden relative">

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.016] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(to right, #C9A96E 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-5 h-px bg-[#C9A96E]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">
              Formuleringsfilosofie
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="text-white leading-[1.06] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', fontWeight: 600 }}
          >
            Elk ingrediënt
            <br />
            <span className="text-stone-500 font-normal italic">heeft een reden.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="text-stone-500 text-[16px] font-light leading-[1.8]"
          >
            Reset Serum bevat geen vulstoffen, geen parfum, geen marketingingrediënten.
            Alleen wat werkt — op de concentratie waarop het werkt.
          </motion.p>
        </div>

        {/* Ingredient grid */}
        <div className="grid sm:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0F0E0C] p-8 lg:p-10 group hover:bg-[#131109] transition-colors duration-400"
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C9A96E] mb-2.5">
                    {ing.category}
                  </p>
                  <h3 className="text-[1.35rem] font-semibold text-white tracking-[-0.01em] leading-tight">
                    {ing.name}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#C9A96E]/18 flex items-center justify-center shrink-0 group-hover:border-[#C9A96E]/40 transition-colors duration-300 mt-0.5">
                  <span className="text-[#C9A96E] text-[11px] font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-stone-400 text-[14px] font-light leading-[1.8] mb-6">
                {ing.description}
              </p>

              {/* Details */}
              <p className="text-[11px] text-stone-600 font-medium tracking-wide border-t border-white/[0.05] pt-5">
                {ing.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/ingredients"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-stone-500 hover:text-[#C9A96E] transition-colors duration-200"
          >
            Alle ingrediënten & de wetenschappelijke onderbouwing
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
