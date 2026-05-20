'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function WhyResetExists() {
  return (
    <section className="bg-[#FAF8F5] py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left: editorial copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">
                Waarom Reset bestaat
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#1A1A1A] leading-[1.06] tracking-[-0.025em] mb-9"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', fontWeight: 600 }}
            >
              Moderne huid is
              <br />
              <span className="text-[#9A9590] font-normal italic">chronisch overprikkeld.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="space-y-5 mb-12"
            >
              <p className="text-[#6B6560] text-[16px] font-light leading-[1.8]">
                Te veel producten. Te veel actieve stoffen. Te weinig herstel. De huidverzorgingsindustrie verkoopt complexiteit — maar jouw huid vraagt om het tegenovergestelde.
              </p>
              <p className="text-[#6B6560] text-[16px] font-light leading-[1.8]">
                Reset Serum is geformuleerd als antwoord op overprikkeling. Niet om meer toe te voegen aan je routine — maar om jouw huid de ruimte te geven die ze nodig heeft om te herstellen.
              </p>
              <p className="text-[#9A9590] text-[14px] font-light leading-relaxed italic border-l-2 border-[#C9A96E]/30 pl-4">
                Klinische concentraties. Zorgvuldig gebufferd. Ontworpen voor nachtherstel.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              <Link
                href="/science"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-[#C9A96E] border-b border-[#C9A96E]/30 hover:border-[#C9A96E] pb-0.5 transition-colors duration-200"
              >
                De wetenschap achter de formule
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right: image + floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.10)]">
              <Image
                src="/reset-serum-2.jpg"
                alt="Reset Serum — huidherstel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/35 via-transparent to-transparent" />
            </div>

            {/* Floating card: left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-6 lg:-left-10 top-[28%] bg-white rounded-2xl shadow-xl border border-stone-100 px-5 py-4"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-1.5">Formule</p>
              <p className="text-[13px] font-semibold text-[#1A1A1A] leading-snug">6 actieve ingrediënten</p>
              <p className="text-[11px] text-[#9A9590] mt-0.5">Klinisch gedoseerd</p>
            </motion.div>

            {/* Floating card: right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -right-4 lg:-right-8 bottom-14 bg-[#0F0E0C] rounded-2xl px-5 py-4 max-w-[190px]"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Nachtelijk herstel</p>
              <p className="text-[12px] text-stone-300 font-light leading-relaxed italic">
                &ldquo;Retinol werkt terwijl je slaapt — niet overdag.&rdquo;
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
