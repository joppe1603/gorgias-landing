'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const RITUAL_IMAGE = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=900&q=85&fit=crop'

const steps = [
  {
    num: '01',
    label: 'Reinig zachtjes',
    copy: 'Verwijder de dag. Niet de barrière.',
  },
  {
    num: '02',
    label: 'Activeer',
    copy: "Reset Serum. Eén druppel, 's nachts, op droge huid.",
  },
  {
    num: '03',
    label: 'Herstel',
    copy: 'Laat werken. Slaap. Herhaal.',
  },
]

export default function RitualSection() {
  return (
    <section className="relative bg-[#0F0E0C] overflow-hidden">
      {/* Ambient gold orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          right: '-10%',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-5%',
          left: '-8%',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grain overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.028] pointer-events-none mix-blend-overlay"
        aria-hidden
      >
        <filter id="grain-ritual">
          <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-ritual)" />
      </svg>

      <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-[52%_48%]">

        {/* ── LEFT: Ritual content ── */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-20 lg:py-28">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-5 h-px bg-[#C9A96E]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">
              Avondritueel
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-semibold text-white leading-[1.05] tracking-[-0.02em] mb-4"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)' }}
          >
            Tien minuten<br />
            voor een huid die<br />
            <span style={{
              background: 'linear-gradient(135deg, #C9A96E 0%, #E8C98A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              rust vindt.
            </span>
          </motion.h2>

          {/* Emotion subline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="text-stone-500 text-[16px] font-light italic leading-relaxed mb-12"
          >
            Ontworpen voor trage routines.<br />
            Niet voor resultaten — voor het gevoel.
          </motion.p>

          {/* Ritual steps */}
          <div className="space-y-0 mb-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-5 py-5 border-b border-white/[0.06] last:border-b-0"
              >
                {/* Number */}
                <span
                  className="shrink-0 font-semibold leading-none mt-0.5"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    background: 'linear-gradient(135deg, #C9A96E 0%, #E8C98A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {step.num}
                </span>

                {/* Vertical rule */}
                <div className="shrink-0 w-px h-full min-h-[2rem] bg-[#C9A96E]/20 self-stretch" />

                {/* Content */}
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-stone-300 mb-1">
                    {step.label}
                  </p>
                  <p className="text-stone-500 text-[14px] font-light italic leading-relaxed">
                    &ldquo;{step.copy}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="/launch?source=ritual-section#waitlist"
              className="inline-flex items-center gap-2.5 text-[13px] font-medium text-[#C9A96E] border border-[#C9A96E]/30 hover:border-[#C9A96E]/60 hover:bg-[#C9A96E]/5 px-5 py-3 rounded-xl transition-all duration-200"
            >
              Word als eerste uitgenodigd
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: Editorial image ── */}
        <div className="relative hidden lg:block min-h-[640px]">
          <motion.div
            initial={{ scale: 1.04, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={RITUAL_IMAGE}
              alt="Avondritueel — Reset Serum nachtelijk herstel"
              fill
              className="object-cover"
              sizes="48vw"
            />

            {/* Dark vignette left-to-right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E0C] via-[#0F0E0C]/20 to-transparent" />
            {/* Dark vignette bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0C]/50 via-transparent to-transparent" />

            {/* Floating sensory card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-10 right-8 left-8"
            >
              <div className="bg-[#0F0E0C]/80 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/8 max-w-[240px] ml-auto">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">
                  Eerste laag van rust
                </p>
                <p className="text-stone-400 text-[12px] font-light italic leading-relaxed">
                  Retinol werkt 's nachts, terwijl je slaapt. Niet overdag.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
