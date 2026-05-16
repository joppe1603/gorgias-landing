'use client'

import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'

export default function PDPWhyThisWorks({ product }: { product: Product }) {
  const ingredients = product.keyIngredients.slice(0, 3)
  if (ingredients.length < 2) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-[#C9A96E]" />
            <span className="section-label">Wetenschap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-3 leading-tight">
            Waarom dit werkt.
            <br />
            <span
              className="font-normal italic text-[#9A9590]"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Niet wat je verwacht.
            </span>
          </h2>

          <p className="text-[15px] text-[#9A9590] font-light mb-12 max-w-xl">
            Elk ingrediënt heeft een specifieke functie. Ze werken samen — dat is het verschil met andere formules.
          </p>

          {/* Ingredient cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-100 flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9A9590]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {ing.pct && (
                    <span className="text-[11px] font-bold text-[#C9A96E] bg-[#FDF8F0] border border-[#C9A96E]/15 px-2 py-0.5 rounded-full">
                      {ing.pct}
                    </span>
                  )}
                </div>

                <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3 leading-tight">
                  {ing.name}
                </h3>

                <p className="text-[13px] text-[#6B6560] font-light leading-relaxed flex-1">
                  {ing.benefit}
                </p>

                <div className="mt-5 h-px bg-gradient-to-r from-[#C9A96E]/30 to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Synergy bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#0F0E0C] rounded-2xl px-7 py-6 flex items-start gap-4"
          >
            <div className="text-[#C9A96E] shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 3h6M12 3v4M8 7h8l1 10a3 3 0 01-3 3H8a3 3 0 01-3-3L6 7z"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E] mb-2">
                Formule synergie
              </p>
              <p className="text-stone-300 text-[14px] font-light leading-relaxed">
                De ingrediënten in {product.name} zijn niet willekeurig gekozen — ze versterken elkaar.
                Wat irriterend kan zijn, wordt gebufferd. Wat droogt, wordt aangevuld.
                Dat is waarom de formule effectief is, ook voor gevoelige huid.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
