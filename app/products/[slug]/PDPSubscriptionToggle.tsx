'use client'

import { motion } from 'framer-motion'

type Props = {
  price: number
  isSubscription: boolean
  onChange: (val: boolean) => void
}

export default function PDPSubscriptionToggle({ price, isSubscription, onChange }: Props) {
  const discountedPrice = Math.round(price * 0.9 * 100) / 100

  return (
    <div className="mb-6">
      <div className="flex rounded-2xl border border-stone-200 overflow-hidden">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 py-3 px-4 text-left transition-all duration-200 cursor-pointer ${
            !isSubscription
              ? 'bg-[#1A1A1A] text-white'
              : 'bg-white text-[#6B6560] hover:bg-[#FAF8F5]'
          }`}
        >
          <p className="text-[12px] font-semibold">Eenmalig</p>
          <p className={`text-[11px] font-light mt-0.5 ${!isSubscription ? 'text-stone-400' : 'text-[#9A9590]'}`}>
            €{price}
          </p>
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 py-3 px-4 text-left transition-all duration-200 relative cursor-pointer ${
            isSubscription
              ? 'bg-[#1A1A1A] text-white'
              : 'bg-white text-[#6B6560] hover:bg-[#FAF8F5]'
          }`}
        >
          <div className="flex items-center gap-2">
            <p className="text-[12px] font-semibold">Maandelijks</p>
            <span className={`text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-full ${
              isSubscription ? 'bg-[#C9A96E] text-[#1A1A1A]' : 'bg-[#FDF8F0] text-[#C9A96E] border border-[#C9A96E]/30'
            }`}>
              −10%
            </span>
          </div>
          <p className={`text-[11px] font-light mt-0.5 ${isSubscription ? 'text-stone-400' : 'text-[#9A9590]'}`}>
            €{discountedPrice.toFixed(2).replace('.', ',')} / maand
          </p>
        </button>
      </div>
      {isSubscription && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-[#9A9590] font-light mt-2 text-center"
        >
          Maandelijks geleverd · Altijd pauzeerbaar · Annuleer wanneer je wilt
        </motion.p>
      )}
    </div>
  )
}
