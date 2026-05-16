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
      <div className="space-y-2 mb-6">
        {keyIngredients.map((ing, i) => (
          <div key={ing.name} className="border border-stone-100 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
            >
              <div className="flex items-center gap-3">
                {ing.pct && (
                  <span className="text-xs font-bold bg-[#FDF8F0] text-[#C9A96E] px-2.5 py-0.5 rounded-full shrink-0">
                    {ing.pct}
                  </span>
                )}
                <span className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors">
                  {ing.name}
                </span>
              </div>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-stone-400 text-lg font-light shrink-0"
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
                  <p className="px-5 pb-4 text-sm text-[#6B6560] leading-relaxed">
                    {ing.benefit}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Full ingredient list toggle */}
      <button
        onClick={() => setShowAll(!showAll)}
        className="text-sm text-[#C9A96E] font-semibold hover:underline underline-offset-4 flex items-center gap-1"
      >
        {showAll ? 'Verberg volledige lijst' : 'Toon volledige ingrediëntenlijst'}
        <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.2 }}>
          ↓
        </motion.span>
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
            <p className="mt-4 text-xs text-[#6B6560] leading-loose bg-stone-50 rounded-xl p-4">
              {allIngredients}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
