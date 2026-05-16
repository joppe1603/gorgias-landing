'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Ingredient } from '@/lib/products'

export default function IngredientsAccordion({
  keyIngredients,
  allIngredients,
}: {
  keyIngredients: Ingredient[]
  allIngredients: string
}) {
  const [open, setOpen] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)

  return (
    <div>
      <div className="space-y-1 mb-8">
        {keyIngredients.map((ing, i) => (
          <div
            key={ing.name}
            className={`rounded-2xl overflow-hidden border transition-colors duration-200 ${
              open === i
                ? 'border-[#C9A96E]/30 bg-[#FDFAF5]'
                : 'border-stone-100 bg-white hover:border-stone-200'
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-[1.1rem] text-left"
            >
              <div className="flex items-center gap-3.5">
                {ing.pct ? (
                  <span className="text-[10px] font-bold bg-[#FDF8F0] text-[#C9A96E] border border-[#C9A96E]/20 px-2.5 py-1 rounded-full shrink-0 tabular-nums">
                    {ing.pct}
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]/50 shrink-0 ml-1" />
                )}
                <span className="text-[14px] font-semibold text-[#1A1A1A] leading-snug">
                  {ing.name}
                </span>
              </div>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.18 }}
                className="text-xl font-light text-stone-300 shrink-0 leading-none"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 pt-3 text-[14px] text-[#6B6560] leading-relaxed font-light border-t border-[#C9A96E]/10">
                    {ing.benefit}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Full INCI list */}
      <button
        onClick={() => setShowAll(!showAll)}
        className="flex items-center gap-2 text-[12px] text-[#9A9590] font-medium hover:text-[#C9A96E] transition-colors"
      >
        <motion.span
          animate={{ rotate: showAll ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          ↓
        </motion.span>
        {showAll ? 'Verberg volledige ingrediëntenlijst' : 'Toon volledige ingrediëntenlijst (INCI)'}
      </button>

      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-[#FAF8F5] rounded-xl p-5 border border-stone-100">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A9590] mb-3">
                INCI — Volledige ingrediëntenlijst
              </p>
              <p className="text-[11px] text-[#9A9590] leading-loose font-light">
                {allIngredients}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
