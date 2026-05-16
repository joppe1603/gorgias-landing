'use client'

import { motion } from 'framer-motion'

const badges = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    label: 'Dermatoloog getest',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C12 22 3 17 3 10a9 9 0 0118 0c0 7-9 12-9 12z"/>
        <circle cx="12" cy="10" r="2"/>
      </svg>
    ),
    label: 'Parfumvrij',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    label: 'Cruelty-free',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6M12 3v4M8 7h8l1 10a3 3 0 01-3 3H8a3 3 0 01-3-3L6 7h12"/>
      </svg>
    ),
    label: 'Klinisch geformuleerd',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 7 7 3 3 3c0 5 3 9 9 9ZM12 12c0-5 5-9 9-9-1 5-4 9-9 9Z"/>
      </svg>
    ),
    label: '100% vegan',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2Z"/>
      </svg>
    ),
    label: 'Non-comedogeen',
  },
]

export default function TrustStrip() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#FAF8F5] border-y border-stone-200/60 py-5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-[#6B6560]">
              <span className="text-[#C9A96E]">{badge.icon}</span>
              <span className="text-[11px] font-medium tracking-wide whitespace-nowrap">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
