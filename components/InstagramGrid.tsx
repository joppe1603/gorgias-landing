'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const posts = [
  { src: '/reset-serum-new.jpg', caption: 'Reset Serum — nachtelijk herstel' },
  { src: '/reset-serum-2.jpg', caption: 'Textuur die je voelt' },
  { src: '/reset-serum-3.jpg', caption: 'Formulering op basis van wetenschap' },
  { src: '/reset-serum-4.jpg', caption: 'Klinisch gedoseerd' },
  { src: '/reset-serum-new.jpg', caption: 'Eén serum. Elke nacht.' },
  { src: '/reset-serum-2.jpg', caption: 'Stille luxe. Echte resultaten.' },
]

export default function InstagramGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label">@mauyi</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="text-4xl sm:text-5xl font-semibold text-[#1A1A1A] leading-[1.05]"
            >
              Volg het proces.
              <br />
              <span className="text-[#9A9590] font-normal italic">Van lab tot leven.</span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="https://instagram.com/lumeskincare"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 btn-outline px-5 py-2.5 rounded-xl text-sm font-medium"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
            Volg op Instagram
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/lumeskincare"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100"
            >
              <Image
                src={post.src}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <svg
                  width="22" height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-hidden
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-6 text-center">
          <a
            href="https://instagram.com/lumeskincare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline px-5 py-2.5 rounded-xl text-sm font-medium"
          >
            Volg op Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
