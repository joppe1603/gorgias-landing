'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import WaitlistForm from '@/components/WaitlistForm'
import WaitlistCounter from '@/components/WaitlistCounter'
import LaunchJournal from '@/components/LaunchJournal'
import SensoryEditorialGrid from '@/components/SensoryEditorialGrid'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const testingPhases = [
  {
    status: 'done',
    label: 'Afgerond',
    title: 'Literatuuronderzoek',
    desc: 'Ingrediënten geselecteerd op basis van peer-reviewed cosmetologisch onderzoek. Concentraties bepaald per werkzame drempel.',
  },
  {
    status: 'done',
    label: 'Afgerond',
    title: 'Formulering & stabiliteitstest',
    desc: 'pH-optimalisatie, ingrediëntcompatibiliteit en chemische stabiliteitstest bij verschillende temperaturen voltooid.',
  },
  {
    status: 'active',
    label: 'Bezig',
    title: 'Sample testing (8 weken)',
    desc: 'Eerste groep sample testers gebruikt de formule dagelijks. We volgen resultaten op week 2, 4 en 8 met een gestandaardiseerde huidevaluatie.',
  },
  {
    status: 'pending',
    label: 'Volgend',
    title: 'Dermatoloog review',
    desc: 'Eindformule wordt beoordeeld op veiligheid en geschiktheid voor gevoelige huid door een onafhankelijke dermatoloog.',
  },
  {
    status: 'pending',
    label: 'Volgend',
    title: 'Productie eerste batch',
    desc: 'Kleine eerste productierun. Wachtlijst leden ontvangen als eerste een persoonlijk uitnodigingsbericht.',
  },
]

const HERO_IMAGE = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=960&q=85&fit=crop'

export default function LaunchContent() {
  const searchParams = useSearchParams()
  const urlSource = searchParams.get('source')

  return (
    <main>

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="bg-[#0F0E0C] min-h-[70vh] flex items-center relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E0C] via-[#0F0E0C]/80 to-transparent" />
        </div>

        {/* Film grain */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none mix-blend-overlay" aria-hidden>
          <filter id="grain-launch">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-launch)" />
        </svg>

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Pre-launch · Reset Serum</span>
            </div>

            <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-semibold text-white leading-[1.05] tracking-[-0.022em] mb-7">
              Bijna klaar.
              <br />
              <span className="text-[#C9A96E] font-normal italic">Wil je de eerste zijn?</span>
            </h1>

            <p className="text-[17px] text-stone-400 leading-[1.8] font-light max-w-xl mb-12">
              De formule wordt getest. De eerste batch is in voorbereiding. Schrijf je in en ontvang een persoonlijk bericht zodra het zover is.
            </p>

            {/* Counter */}
            <div className="mb-6">
              <WaitlistCounter variant="hero" />
            </div>

            {/* Inline waitlist form */}
            <div id="waitlist" className="max-w-lg">
              <WaitlistForm source={urlSource ?? 'launch-hero'} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRANSPARANTIE: WAT WE NU DOEN ─────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <motion.div {...fadeUp(0)} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A9590]">Transparantie</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight">
              Waar we nu op staan.
              <br />
              <span className="font-normal italic text-[#9A9590]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Geen mooier praatje dan de werkelijkheid.
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-[#C9A96E]/60 via-[#C9A96E]/30 to-stone-200 hidden md:block" aria-hidden />

            <div className="space-y-5">
              {testingPhases.map((phase, i) => (
                <motion.div
                  key={phase.title}
                  {...fadeUp(i * 0.08)}
                  className="flex items-start gap-5"
                >
                  {/* Status dot */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 border ${
                      phase.status === 'done'
                        ? 'bg-[#C9A96E] border-[#C9A96E]'
                        : phase.status === 'active'
                        ? 'bg-white border-[#C9A96E]'
                        : 'bg-[#FAF8F5] border-stone-200'
                    }`}
                  >
                    {phase.status === 'done' ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : phase.status === 'active' ? (
                      <span className="w-3 h-3 rounded-full bg-[#C9A96E] animate-pulse" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                    )}
                  </div>

                  {/* Card */}
                  <div className={`flex-1 rounded-2xl border px-6 py-5 ${
                    phase.status === 'active'
                      ? 'bg-[#FDF8F0] border-[#C9A96E]/20'
                      : 'bg-[#FAF8F5] border-stone-100'
                  }`}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className={`text-[9px] font-bold uppercase tracking-[0.18em] ${
                        phase.status === 'done' ? 'text-[#C9A96E]'
                        : phase.status === 'active' ? 'text-[#C9A96E]'
                        : 'text-stone-400'
                      }`}>
                        {phase.label}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-2">{phase.title}</h3>
                    <p className="text-[13px] text-[#6B6560] font-light leading-relaxed">{phase.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT PREVIEW ───────────────────────────── */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp(0)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-[#C9A96E]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A9590]">Het product</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight mb-5">
                Reset Serum
                <br />
                <span className="font-normal italic text-[#9A9590]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  30ml · €58
                </span>
              </h2>
              <p className="text-[15px] text-[#5C5754] font-light leading-relaxed mb-8">
                Retinol 0.3% gebufferd door Niacinamide 10% en een Hyaluronzuurcomplex. Ontworpen voor mensen die met actieve stoffen willen werken zonder huidirritatie.
              </p>

              <div className="space-y-2.5 mb-8">
                {[
                  { name: 'Retinol 0.3%', desc: 'Celvernieuwing' },
                  { name: 'Niacinamide 10%', desc: 'Barrière & talgregulatie' },
                  { name: 'Hyaluronzuurcomplex', desc: 'Diepe hydratatie' },
                ].map((ing) => (
                  <div key={ing.name} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-stone-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0" />
                    <p className="text-[13px] text-[#1A1A1A] font-semibold">{ing.name}</p>
                    <p className="text-[13px] text-[#9A9590] font-light ml-auto">{ing.desc}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/products/reset-serum"
                className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium"
              >
                Alles over dit product
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 6h8M6 2l4 4-4 4"/>
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-[24px] overflow-hidden relative shadow-[0_24px_60px_rgba(0,0,0,0.1)]">
                <Image
                  src={HERO_IMAGE}
                  alt="LUMÉ Reset Serum"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0C]/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SENSORY EDITORIAL GRID ────────────────────── */}
      <SensoryEditorialGrid />

      {/* ── LAUNCH JOURNAL ────────────────────────────── */}
      <LaunchJournal />

      {/* ── WAITLIST BOTTOM CTA ────────────────────────── */}
      <section className="py-24 bg-[#0F0E0C]">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#C9A96E]/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Wachtlijst</span>
              <div className="w-8 h-px bg-[#C9A96E]/40" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white leading-tight mb-5">
              Wees erbij van het begin.
            </h2>
            <p className="text-[16px] text-stone-400 font-light leading-relaxed mb-10">
              Eerste batch is beperkt. Wachtlijst leden krijgen als eerste toegang — geen opruiming, geen hype. Gewoon als eerste weten dat het er is.
            </p>

            <div className="flex justify-center mb-6">
              <WaitlistCounter variant="badge" />
            </div>

            <div className="max-w-lg mx-auto">
              <WaitlistForm source="launch-bottom" />
            </div>

            <p className="text-stone-600 text-[12px] mt-8">
              LUMÉ producten zijn cosmetische producten — geen medische behandelingen.
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
