'use client'

import { motion } from 'framer-motion'

type JournalEntry = {
  date: string
  category: string
  title: string
  body: string
  tag?: 'live' | 'recent' | null
}

const entries: JournalEntry[] = [
  {
    date: '12 mei 2026',
    category: 'Sample testing',
    tag: 'live',
    title: 'Eerste batch testers hebben hun set ontvangen.',
    body: 'Twaalf mensen. Verschillende huidtypes, leeftijden, regio\'s. Week 1 van 8. We stellen geen vragen over resultaten — nog niet. Dit is observatieweek. We volgen op week 2, 4 en 8 met een gestandaardiseerde huidevaluatie.',
  },
  {
    date: '4 mei 2026',
    category: 'Formulering',
    tag: 'recent',
    title: 'Waarom 0.3% retinol — niet meer, niet minder.',
    body: 'Retinol bestaat in concentraties van 0.025% tot 1%. We kozen 0.3% bewust: hoog genoeg voor zichtbare celvernieuwing, laag genoeg om gevoelige huid niet te overvragen. Niacinamide 10% buffert de mogelijke irritatie.',
  },
  {
    date: '22 april 2026',
    category: 'Verpakking',
    title: 'Airless pomp of druppelfles?',
    body: 'We testen beide formaten. Een airless pomp verlengt houdbaarheid en minimaliseert zuurstofcontact. Een druppelfles geeft meer doseercontrole. Reset Serum met retinol vraagt om minimale zuurstofblootstelling — dat bepaalt waarschijnlijk de keuze.',
  },
  {
    date: '10 april 2026',
    category: 'Aantekening',
    title: 'Over het tempo van lanceren.',
    body: 'Veel merken lanceren en optimaliseren achteraf. Wij optimaliseren eerst. Niet omdat we perfectionisten zijn, maar omdat een serum met retinol op dag één goed moet werken — niet pas na twee formule-updates.',
  },
]

const tagLabel: Record<NonNullable<JournalEntry['tag']>, string> = {
  live: 'Bezig',
  recent: 'Recent',
}

export default function LaunchJournal() {
  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-5 h-px bg-[#C9A96E]" />
            <span className="section-label">Launch Journal</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Wat we doen.
            <br />
            <span className="font-normal italic text-[#9A9590]">Terwijl jij wacht.</span>
          </h2>
        </motion.div>

        {/* Entries */}
        <div className="space-y-px">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-stone-100 rounded-2xl px-7 py-6 hover:border-stone-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300"
            >
              {/* Meta row */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A96E]">
                    {entry.category}
                  </span>
                  {entry.tag && (
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      entry.tag === 'live'
                        ? 'bg-[#C9A96E]/10 text-[#C9A96E] border border-[#C9A96E]/20'
                        : 'bg-stone-100 text-stone-400 border border-stone-200'
                    }`}>
                      {entry.tag === 'live' && (
                        <span className="inline-block w-1 h-1 rounded-full bg-[#C9A96E] mr-1 animate-pulse align-middle" />
                      )}
                      {tagLabel[entry.tag]}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-stone-400 font-light shrink-0">{entry.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-[16px] font-semibold text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#1A1A1A] transition-colors">
                {entry.title}
              </h3>

              {/* Body */}
              <p className="text-[13px] text-[#6B6560] font-light leading-relaxed">
                {entry.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center text-[12px] text-stone-400 font-light"
        >
          Updates worden toegevoegd naarmate het proces vordert.
        </motion.p>

      </div>
    </section>
  )
}
