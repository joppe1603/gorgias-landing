'use client'

import { motion } from 'framer-motion'

const brands = [
  { name: 'STEVE MADDEN', style: 'font-bold tracking-widest text-gray-800' },
  { name: 'MVMT', style: 'font-black tracking-[0.3em] text-gray-700' },
  { name: 'Glamnetic', style: 'font-semibold italic text-gray-800' },
  { name: 'Timbuk2', style: 'font-bold text-gray-700' },
  { name: 'Princess Polly', style: 'font-medium tracking-wide text-gray-600' },
  { name: 'WARBY PARKER', style: 'font-bold tracking-widest text-gray-800 text-sm' },
  { name: 'Allbirds', style: 'font-semibold text-gray-700' },
  { name: 'Brooklinen', style: 'font-medium tracking-wide text-gray-600' },
]

// Duplicate for seamless loop
const allBrands = [...brands, ...brands]

export default function LogoCarousel() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold text-gray-400 uppercase tracking-widest"
        >
          Trusted by 17,000+ ecommerce brands worldwide
        </motion.p>
      </div>

      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {allBrands.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center justify-center mx-10 cursor-pointer group"
            >
              <span
                className={`text-lg transition-all duration-200 group-hover:text-[#FF4F00] opacity-50 group-hover:opacity-100 ${brand.style}`}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
