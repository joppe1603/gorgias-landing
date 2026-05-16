'use client'

import { motion } from 'framer-motion'

const rowA = [
  { name: 'VOGUE',           style: 'font-black tracking-[0.25em]' },
  { name: 'ELLE',            style: 'font-black tracking-[0.35em]' },
  { name: 'ALLURE',          style: 'font-bold tracking-[0.2em]' },
  { name: 'COSMOPOLITAN',    style: 'font-semibold tracking-[0.15em] text-sm' },
  { name: 'BYRDIE',          style: 'font-bold tracking-[0.2em]' },
  { name: 'INTO THE GLOSS',  style: 'font-medium tracking-[0.12em] text-sm' },
  { name: 'REFINERY29',      style: 'font-bold tracking-[0.15em]' },
  { name: "HARPER'S BAZAAR", style: 'font-semibold tracking-[0.12em] text-sm' },
]

const rowB = [
  { name: 'THE SUNDAY TIMES', style: 'font-semibold tracking-[0.12em] text-sm' },
  { name: 'GLAMOUR',          style: 'font-bold tracking-[0.2em]' },
  { name: "WOMEN'S HEALTH",   style: 'font-bold tracking-[0.15em]' },
  { name: 'GOOP',             style: 'font-black tracking-[0.3em]' },
  { name: 'WWD',              style: 'font-black tracking-[0.35em]' },
  { name: 'BEAUTY BAY',       style: 'font-bold tracking-[0.18em]' },
  { name: 'NET-A-PORTER',     style: 'font-semibold tracking-[0.12em] text-sm' },
  { name: 'TATLER',           style: 'font-bold tracking-[0.22em]' },
]

const doubled = <T,>(arr: T[]) => [...arr, ...arr]

function MarqueeRow({ items, reverse }: { items: typeof rowA; reverse?: boolean }) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
      <div
        className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ width: 'max-content' }}
      >
        {doubled(items).map((brand, idx) => (
          <div
            key={`${brand.name}-${idx}-${reverse ? 'r' : 'f'}`}
            className="flex items-center justify-center mx-10 cursor-default group"
          >
            <span
              className={`text-base grayscale opacity-40 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-90 group-hover:text-[#C9A96E] text-stone-700 ${brand.style}`}
            >
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LogoCarousel() {
  return (
    <section id="press" className="border-y border-stone-100 py-12 overflow-hidden" style={{ background: '#FAF8F5' }}>
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold uppercase tracking-[0.25em] text-stone-400"
        >
          Verschenen in
        </motion.p>
      </div>

      <div className="space-y-8">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </section>
  )
}
