'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const keyIngredients = [
  {
    name: 'Retinol',
    concentration: '0.3%',
    category: 'Celvernieuwing',
    mechanism: 'Bindt aan retinoïdreceptoren in de huid en verhoogt de snelheid van celvernieuwing. Stimuleert collageenproductie.',
    evidence: 'Meer dan 40 jaar klinisch onderzoek. Effectiviteit aangetoond bij huidveroudering, oneffenheden en tekstuurverbetering.',
    note: 'Gekozen concentratie: effectief zonder de hoge irritatiedrempel van hogere percentages.',
    color: '#EEF0F5',
  },
  {
    name: 'Niacinamide',
    concentration: '10%',
    category: 'Regulering & barrière',
    mechanism: 'Remt sebumaanmaak, verkleint zichtbaar de poriën, versterkt de huidbarrière en remt inflammatoire reacties.',
    evidence: "Herhaaldelijk klinisch bewezen bij poriëgrootte, talgregulatie en huidtoongelijkmatigheid. Synergie met retinol — vermindert retinol-geïnduceerde irritatie.",
    note: '10% is de drempel waarbij talgregulatie en barrière-herstel samen optimaal zijn.',
    color: '#F0EDE8',
  },
  {
    name: 'Ceramiden Complex',
    concentration: '3%',
    category: 'Barrière-herstel',
    mechanism: 'Ceramiden zijn de primaire lipiden in de huidbarrière. Ze vullen beschadigde intercellulaire ruimtes aan en reduceren transepidermaal waterverlies (TEWL).',
    evidence: 'Ceramiden worden breed erkend in de dermatologie als essentieel voor barrièreherstel — in het bijzonder bij beschadigde of gevoelige huid.',
    note: 'Combinatie van Ceramide NP, AP en EOP voor volledige barrière-reconstructie.',
    color: '#FAF8F5',
  },
  {
    name: 'Bakuchiol',
    concentration: '0.5%',
    category: 'Plantaardig retinol-alternatief',
    mechanism: 'Functioneert op dezelfde retinoïdreceptoren als retinol, maar via een ander moleculair pad. Stimuleert collageen type I, III en IV zonder klassieke retinol-bijwerkingen.',
    evidence: 'Onderzocht als mild alternatief voor retinol. Werkt via vergelijkbaar mechanisme met minder kans op irritatie — geschikt voor gevoelige huid en zwangerschap na medisch overleg.',
    note: 'Gebruikt als solo-actief in gevoelige formules, of als synergetische versterker naast retinol.',
    color: '#F5EFE6',
  },
  {
    name: 'Hyaluronzuurcomplex',
    concentration: '2%',
    category: 'Hydratatie',
    mechanism: 'Drie molecuulgewichten: hoog (oppervlak), middel (midden epidermis), laag (dieper). Elke fractie trekt en houdt vocht vast in een ander huidniveau.',
    evidence: 'Hyaluronzuur is een van de best gedocumenteerde hydratatie-ingrediënten in cosmetologie. Multi-fractie aanpak zorgt voor zowel oppervlakkige als diepere werking.',
    note: 'Multi-fractie aanpak voor aanhoudend, niet oppervlakkig hydratatie-effect.',
    color: '#EEF5F0',
  },
]

const process = [
  {
    step: '01',
    title: 'Literatuuranalyse',
    desc: 'Elk ingrediënt begint bij peer-reviewed onderzoek. We accepteren geen claims zonder klinisch bewijs bij de concentratie die we gebruiken.',
  },
  {
    step: '02',
    title: 'Formulering',
    desc: 'Compatibiliteit tussen actieve stoffen, pH-optimalisatie en stabiliteitstests zijn verplichte stappen voor elk prototype.',
  },
  {
    step: '03',
    title: 'Stabiliteitstest',
    desc: 'Alle formules worden getest op chemische stabiliteit bij verschillende temperaturen en blootstelling. Een formule die niet stabiel is, werkt niet.',
  },
  {
    step: '04',
    title: 'Gebruikerstest (8 weken)',
    desc: 'Minimaal 8 weken gebruikerstest met dermatologische evaluatie. We publiceren de testresultaten — ook als ze tegenvallen.',
  },
  {
    step: '05',
    title: 'Dermatoloog review',
    desc: 'Eindformule wordt beoordeeld op veiligheid, effectiviteit en geschiktheid voor gevoelige huid door een onafhankelijke dermatoloog.',
  },
]

export default function ScienceContent() {
  return (
    <main>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="bg-[#FAF8F5] border-b border-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="section-label">De wetenschap</span>
            </div>

            <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-semibold text-[#1A1A1A] leading-[1.05] tracking-[-0.022em] mb-7">
              Elk ingrediënt.
              <br />
              <span className="text-[#9A9590] font-normal italic">Met bewijs.</span>
            </h1>

            <p className="text-[17px] text-[#5C5754] leading-[1.8] font-light max-w-xl">
              Wij formuleren op basis van klinisch onderzoek, niet op basis van trends. Elke concentratie is een bewuste keuze. Op deze pagina leggen we uit waarom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── HOE WE FORMULEREN ────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div {...fadeUp(0)} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="section-label">Het proces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight">
              Van literatuur
              <br />
              <span className="font-normal italic text-[#9A9590]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                naar formule.
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connector */}
            <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-[#C9A96E]/20 via-[#C9A96E]/50 to-[#C9A96E]/20 hidden md:block" aria-hidden />

            <div className="space-y-6">
              {process.map((p, i) => (
                <motion.div
                  key={p.step}
                  {...fadeUp(i * 0.09)}
                  className="flex items-start gap-6"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#FAF8F5] border border-stone-200 flex items-center justify-center text-[10px] font-bold text-[#C9A96E] tracking-[0.1em] z-10">
                    {p.step}
                  </div>
                  <div className="flex-1 bg-[#FAF8F5] rounded-2xl border border-stone-100 px-6 py-5">
                    <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-2">{p.title}</h3>
                    <p className="text-[13px] text-[#6B6560] font-light leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INGREDIËNTEN DEEP DIVE ────────────────────── */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div {...fadeUp(0)} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="section-label">Werkzame stoffen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight">
              De vijf actieve stoffen
              <br />
              <span className="font-normal italic text-[#9A9590]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                die onze formules dragen.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-5">
            {keyIngredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                {...fadeUp(i * 0.08)}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden"
              >
                <div className="p-7 lg:p-9">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A9590]">
                          {ing.category}
                        </span>
                        <span className="text-[11px] font-bold text-[#C9A96E] bg-[#FDF8F0] border border-[#C9A96E]/15 px-2.5 py-0.5 rounded-full">
                          {ing.concentration}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold text-[#1A1A1A]">{ing.name}</h3>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">
                        Werking
                      </p>
                      <p className="text-[13px] text-[#5C5754] font-light leading-relaxed">
                        {ing.mechanism}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">
                        Klinisch bewijs
                      </p>
                      <p className="text-[13px] text-[#5C5754] font-light leading-relaxed">
                        {ing.evidence}
                      </p>
                    </div>
                    <div className="bg-[#FAF8F5] rounded-xl px-4 py-3.5 border border-stone-100">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A9590] mb-2">
                        Onze keuze
                      </p>
                      <p className="text-[13px] text-[#6B6560] font-light leading-relaxed italic">
                        {ing.note}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AANPAK NOOT ──────────────────────────────── */}
      <section className="py-24 bg-[#0F0E0C]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#C9A96E]/40" />
              <span className="section-label text-[#C9A96E]">Onze aanpak</span>
              <div className="w-8 h-px bg-[#C9A96E]/40" />
            </div>

            <p className="text-white text-[1.2rem] leading-[1.75] font-light mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              LUMÉ formuleert uitsluitend rond ingrediënten met een gedocumenteerde werking in de cosmetologische literatuur. We maken geen medische claims. We vertalen wetenschap naar eerlijke, effectieve huidverzorging.
            </p>

            <p className="text-stone-500 text-[13px]">
              LUMÉ producten zijn cosmetische producten — geen medische behandelingen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-5 leading-tight">
              Klaar om het zelf te ervaren?
            </h2>
            <p className="text-[16px] text-[#6B6560] font-light leading-relaxed mb-10">
              30 dagen garantie. Geen vragen. Als de formule je huid niet verbetert, krijg je alles terug.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products/reset-serum"
                className="btn-gold inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-medium text-[15px]"
              >
                Bekijk Reset Serum
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4"/>
                </svg>
              </Link>
              <Link
                href="/why-lume"
                className="btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium text-[15px]"
              >
                Waarom LUMÉ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
