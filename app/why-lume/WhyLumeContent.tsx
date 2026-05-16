'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const leaveOutItems = [
  { name: 'Parfum & geurstoffen', reason: 'Veelvoorkomende oorzaak van contactallergie en barrier-beschadiging.' },
  { name: 'Alcohol denat.', reason: 'Droogt de huid uit en tast de huidbarrière aan bij dagelijks gebruik.' },
  { name: 'SLS / SLES', reason: 'Agressieve tensiden die de barrièrefunctie verstoren, ook bij lage concentraties.' },
  { name: 'Synthetische kleurstoffen', reason: 'Geen functie voor de huid. Verhogen irritatierisico onnodig.' },
  { name: 'Siliconen als vulstof', reason: 'We gebruiken alleen functionele siliconen — geen coating die de huid maskeert.' },
  { name: 'Parabenen', reason: 'Vervangen door stabielere, huid-vriendelijkere conserveringsmiddelen.' },
  { name: 'Overlappende claims', reason: "Geen product belooft 'alles'. Elk product heeft één duidelijke functie." },
  { name: 'Onnodige extracten', reason: 'Geen lijsten met obscure planten die niets klinisch bewijzen.' },
]

const principles = [
  {
    number: '01',
    title: 'Barrière-eerst',
    body: 'Een gezonde huidbarrière is de basis van alles. Geen enkele actieve stof werkt goed als de barrier beschadigd is. We formuleren altijd met barrière-ondersteuning als fundament.',
  },
  {
    number: '02',
    title: 'Minder is meer',
    body: 'Een te lange routine schaadt de huid vaker dan het helpt. We ontwerpen producten die overbodig maken wat de industrie altijd wil verkopen.',
  },
  {
    number: '03',
    title: 'Klinisch of niets',
    body: 'Als een ingrediënt geen klinisch bewijs heeft op de concentratie die we gebruiken, staat het er niet in. Geen modewoorden, geen placebo-formules.',
  },
  {
    number: '04',
    title: 'Eerlijkheid over snelheid',
    body: 'Resultaten kosten tijd. We communiceren eerlijk over wat je kunt verwachten — en wanneer. Geen valse beloftes, geen retoucheerde before-afters.',
  },
]

export default function WhyLumeContent() {
  return (
    <main>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="bg-[#0F0E0C] relative overflow-hidden min-h-[60vh] flex items-center">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full max-w-md bg-gradient-to-r from-transparent via-[#C9A96E]/35 to-transparent" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #C9A96E 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#C9A96E]/50" />
              <span className="section-label text-[#C9A96E]">Waarom LUMÉ bestaat</span>
              <div className="w-8 h-px bg-[#C9A96E]/50" />
            </div>

            <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-semibold text-white leading-[1.05] tracking-[-0.022em] mb-8">
              De huidverzorgingsindustrie
              <br />
              is te ingewikkeld geworden.
              <br />
              <span className="text-stone-500 font-normal italic">Wij niet.</span>
            </h1>

            <p className="text-stone-400 text-lg leading-relaxed max-w-2xl mx-auto font-light">
              LUMÉ begon met één observatie: mensen kopen te veel, zien te weinig resultaat, en vertrouwen zichzelf niet meer. We bouwen ons merk op één principe — elk product moet zo goed zijn dat het de rest overbodig maakt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OORSPRONG ───────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="section-label">Het begin</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-8 leading-tight">
              Een observatie,
              <br />
              <span className="font-normal italic text-[#9A9590]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                geen toevalligheid.
              </span>
            </h2>

            <div className="space-y-5 text-[16px] text-[#5C5754] leading-[1.85] font-light">
              <p>
                LUMÉ is niet geboren uit een marketingstrategie. Het begon met een simpele vraag: waarom kopen mensen twaalf huidverzorgingsproducten, en ziet hun huid er toch niet beter uit?
              </p>
              <p>
                Het antwoord is even simpel als onaangenaam: de industrie verkoopt complexiteit. Nieuwe actieve stoffen, nieuwe rituals, nieuwe problemen om op te lossen. En wij zijn erin meegegaan — tot onze huid uitputte.
              </p>
              <p>
                LUMÉ werkt andersom. We beginnen bij de vraag: <em>wat heeft huid echt nodig?</em> En bouwen van daaruit. Dat levert minder producten op. Maar producten die werken.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRINCIPES ───────────────────────────────────── */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div {...fadeUp(0)} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="section-label">Onze principes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight">
              Vier dingen die
              <br />
              <span className="font-normal italic text-[#9A9590]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                we nooit compromitteren.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {principles.map((p, i) => (
              <motion.div
                key={p.number}
                {...fadeUp(i * 0.08)}
                className="bg-white rounded-2xl border border-stone-100 p-8"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A96E] block mb-6">
                  {p.number}
                </span>
                <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-3">{p.title}</h3>
                <p className="text-[14px] text-[#6B6560] font-light leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAT WE WEGLATEN ─────────────────────────────── */}
      <section className="py-24 bg-[#0F0E0C]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <motion.div {...fadeUp(0)} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-[#C9A96E]/60" />
              <span className="section-label text-[#C9A96E]">Wat we weglaten</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white leading-tight mb-4">
              Geen compromissen.
              <br />
              <span className="font-normal italic text-stone-500" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Elke weglating is een keuze.
              </span>
            </h2>
            <p className="text-stone-400 text-[15px] font-light leading-relaxed max-w-xl">
              We publiceren bewust wat niet in onze producten zit — en waarom. Transparantie is geen marketing.
            </p>
          </motion.div>

          <div className="space-y-0">
            {leaveOutItems.map((item, i) => (
              <motion.div
                key={item.name}
                {...fadeUp(i * 0.05)}
                className="flex items-start gap-5 py-5 border-b border-white/6 last:border-0"
              >
                <div className="shrink-0 mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1"/>
                    <path d="M5 8h6" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-stone-200 mb-1">{item.name}</p>
                  <p className="text-[13px] text-stone-500 font-light leading-relaxed">{item.reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BELOFTE ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-stone-200" />
              <span className="section-label">Onze belofte</span>
              <div className="w-8 h-px bg-stone-200" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-6 leading-tight">
              30 dagen.
              <br />
              <span className="font-normal italic text-[#9A9590]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Geen vragen.
              </span>
            </h2>

            <p className="text-[16px] text-[#5C5754] leading-relaxed mb-10 font-light">
              Als jouw huid er na 30 dagen niet beter uitziet dan voor LUMÉ, krijg je alles terug. Geen formulieren, geen terugstuurkosten. Wij geloven in de formule — of we staan er garant voor.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="btn-gold inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-medium text-[15px]"
              >
                Bekijk de producten
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4"/>
                </svg>
              </Link>
              <Link
                href="/science"
                className="btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium text-[15px]"
              >
                Bekijk de wetenschap
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
