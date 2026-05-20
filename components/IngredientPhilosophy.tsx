'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const ingredients = [
  {
    mono: 'RETINOL 0.3%',
    serif: 'Nachtherstel',
    description:
      'De gouden standaard in dermatologie — ingezet op de drempel van effectiviteit. Gebufferd door niacinamide zodat klinische resultaten niet ten koste gaan van draagbaarheid.',
  },
  {
    mono: 'BAKUCHIOL',
    serif: 'Zachter. Slimmer.',
    description:
      'Bakuchiol doet wat retinol doet, maar zonder haar compromis. Spiegelt het werkingsmechanisme op receptor-niveau — onverminderd effectief, zonder de irritatie.',
  },
  {
    mono: 'NIACINAMIDE 10%',
    serif: 'Barrièreherstel',
    description:
      'Op klinische dosis ingezet als buffer én actief. Kalmeert, versterkt de huidbarrière en reguleert sebumproductie — precies waar retinol het meest nodig heeft.',
  },
  {
    mono: 'HYALURONZUUR',
    serif: 'Diep gevoed.',
    description:
      'Drie molecuulgewichten die samenwerken van oppervlak tot dermis. Geen vulstof — actieve ondersteuning voor een formule die de huid intensief werkt.',
  },
]

export default function IngredientPhilosophy() {
  return (
    <section className="bg-[#0F0E0C] py-28 lg:py-36 overflow-hidden relative">

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(to right, #C9A96E 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="max-w-xl mb-20">
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
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              color: 'white',
            }}
            className="mb-6"
          >
            Elk ingrediënt
            <br />
            <em className="text-stone-500 font-normal">heeft een reden.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="text-stone-500 text-[15px] font-light leading-[1.85]"
          >
            Geen vulstoffen. Geen parfum. Geen marketingingrediënten.
            Alleen wat werkt — op de concentratie waarop het werkt.
          </motion.p>
        </div>

        {/* Ingredient grid */}
        <div className="grid sm:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.mono}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0F0E0C] p-8 lg:p-10 hover:bg-[#121008] transition-colors duration-500"
            >
              {/* Mono label */}
              <p
                className="text-[#C9A96E] mb-3"
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                {ing.mono}
              </p>

              {/* Cormorant serif benefit */}
              <p
                className="text-white mb-5"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                }}
              >
                {ing.serif}
              </p>

              {/* Description */}
              <p className="text-stone-500 text-[14px] font-light leading-[1.85] border-t border-white/[0.05] pt-5">
                {ing.description}
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
            className="inline-flex items-center gap-2 text-[12px] font-medium text-stone-600 hover:text-[#C9A96E] transition-colors duration-200 tracking-[0.06em] uppercase"
          >
            Alle ingrediënten & wetenschappelijke onderbouwing
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
