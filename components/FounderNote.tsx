'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function FounderNote() {
  return (
    <section className="py-24 bg-[#0F0E0C] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">

          {/* Left — label + signature */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">
                Een eerlijk verhaal
              </span>
            </div>

            <p
              className="text-[2.2rem] font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-6"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Waarom we
              <br />
              <span className="text-[#C9A96E] italic font-normal">nog niet live zijn.</span>
            </p>

            {/* Founder signature */}
            <div className="flex items-center gap-3 mt-8">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 flex items-center justify-center">
                <span className="text-[#C9A96E] text-[13px] font-bold">L</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">MAUYI</p>
                <p className="text-[11px] text-stone-500">Oprichter</p>
              </div>
            </div>
          </motion.div>

          {/* Right — note body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p
              className="text-[1.25rem] text-white leading-[1.75] font-light"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              De meeste merken lanceren zodra ze er klaar genoeg voor zijn. Wij lanceren pas als de formule er klaar voor is.
            </p>

            <p className="text-[15px] text-stone-400 leading-relaxed font-light">
              MAUYI begon met een simpele frustratie: te veel producten die mooie beloftes maken maar niet uitleggen waarom ze zouden werken — of wat er precies in zit.
            </p>

            <p className="text-[15px] text-stone-400 leading-relaxed font-light">
              Dus kozen we een andere aanpak. Geen haast. Geen hype. Elk ingrediënt gekozen op basis van klinisch onderzoek, elke concentratie bewust bepaald. De formule wordt momenteel getest door een eerste groep sample testers. We wachten op de resultaten voordat we produceren.
            </p>

            <p className="text-[15px] text-stone-400 leading-relaxed font-light">
              Dat betekent dat we nog niet live zijn. En dat is precies de bedoeling.
            </p>

            {/* Key promises */}
            <div className="border-t border-white/8 pt-6 space-y-3">
              {[
                'We publiceren testresultaten — ook als ze tegenvallen',
                'Eerste batch is beperkt. Wachtlijst leden krijgen als eerste een bericht',
                'MAUYI maakt geen medische claims. Wij verkopen cosmetica.',
              ].map((promise, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9A96E] mt-2" />
                  <p className="text-[13px] text-stone-400 font-light leading-relaxed">{promise}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/launch?source=founder-note#waitlist"
                className="inline-flex items-center gap-2.5 btn-gold px-6 py-3.5 rounded-2xl text-[14px] font-semibold"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Word als eerste uitgenodigd
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
