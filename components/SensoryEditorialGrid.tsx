'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const shots = [
  {
    label: 'Textuur',
    sublabel: 'Formule close-up',
    src: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80&fit=crop',
    span: 'col-span-2 row-span-2',
    tall: true,
  },
  {
    label: 'Avondritueel',
    sublabel: 'Nighttime ritual',
    src: 'https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=600&q=80&fit=crop',
    span: 'col-span-1 row-span-1',
    tall: false,
  },
  {
    label: 'Ingrediënten',
    sublabel: 'Botanische oorsprong',
    src: 'https://images.unsplash.com/photo-1546213290-e1b492ab3eee?w=600&q=80&fit=crop',
    span: 'col-span-1 row-span-1',
    tall: false,
  },
  {
    label: 'Skin close-up',
    sublabel: 'Barrièreherstel',
    src: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80&fit=crop',
    span: 'col-span-1 row-span-1',
    tall: false,
  },
  {
    label: 'Verpakking',
    sublabel: 'Studio editorial',
    src: '/quiet-cleanser.jpg',
    span: 'col-span-1 row-span-1',
    tall: false,
  },
]

export default function SensoryEditorialGrid() {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-between mb-8 lg:mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-[#C9A96E]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">
              Visuele richting
            </span>
          </div>
          <p className="hidden sm:block text-[12px] text-[#9A9590] font-light italic">
            Campagne · Pre-launch 2026
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 220px)' }}
        >
          {shots.map((shot, i) => (
            <motion.div
              key={shot.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl group ${shot.span}`}
            >
              <Image
                src={shot.src}
                alt={`${shot.label} — LUMÉ editorial`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Grading overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(15,14,12,0.55) 0%, rgba(15,14,12,0.05) 45%, transparent 100%)' }}
              />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{ filter: 'saturate(0.88) contrast(1.03)' }}
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-0.5">
                  {shot.label}
                </p>
                <p className="text-white/60 text-[11px] font-light italic">
                  {shot.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center text-[11px] text-[#9A9590] font-light italic"
        >
          Definitieve campagnebeelden worden gefotografeerd voor de lancering.
        </motion.p>
      </div>
    </section>
  )
}
