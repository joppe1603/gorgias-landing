'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function EditorialTexture() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[480px] overflow-hidden bg-[#0A0908]"
      aria-hidden={false}
    >
      {/* Parallax image */}
      <motion.div
        style={{ y }}
        className="absolute inset-[-8%] z-0"
      >
        <Image
          src="/reset-serum-4.jpg"
          alt="Reset Serum — textuur"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0A0908]/62" />
      </motion.div>

      {/* Grain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none mix-blend-overlay z-10"
        aria-hidden
      >
        <filter id="grain-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-texture)" />
      </svg>

      {/* Centered editorial line */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="origin-center mb-10 w-16"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.6), transparent)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            color: 'white',
          }}
        >
          Niet meer stappen.
          <br />
          <span style={{ color: '#C9A96E' }}>Meer herstel.</span>
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="origin-center mt-10 w-16"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.6), transparent)',
          }}
        />
      </div>
    </section>
  )
}
