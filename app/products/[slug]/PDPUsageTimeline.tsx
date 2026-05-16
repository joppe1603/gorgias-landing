'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    week: '1',
    label: 'Week één',
    title: 'Huid raakt gewend',
    desc: 'De formule doet zijn intrede. Lichte warmte of strakheid kan optreden — dat is normaal en tijdelijk. Gebruik elke avond op schone huid.',
    pct: null,
    accent: '#D4B896',
  },
  {
    week: '4',
    label: 'Vier weken',
    title: 'Eerste veranderingen',
    desc: 'Textuur begint gladder te voelen. Poriën lijken kleiner. Huidtoon wordt gelijkmatiger. Meetbare veranderingen zijn al zichtbaar.',
    pct: '72%',
    pctLabel: 'van gebruikers ziet verbetering',
    accent: '#C9A96E',
  },
  {
    week: '8',
    label: 'Acht weken',
    title: 'Zichtbaar resultaat',
    desc: 'Significant verschil in huidtoon, textuur en fijnere lijntjes. Consistent gebruik loont. Dit is het moment waarop anderen het opmerken.',
    pct: '94%',
    pctLabel: 'ziet merkbaar verschil',
    accent: '#B8935A',
  },
]

export default function PDPUsageTimeline() {
  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-[#C9A96E]" />
            <span className="section-label">Tijdlijn</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-3 leading-tight">
            Wat je kunt verwachten.
          </h2>
          <p className="text-[15px] text-[#9A9590] font-light max-w-lg">
            Goede huidverzorging werkt geleidelijk. Dat is geen gebrek — het is het bewijs dat de formule echt werkt.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-[#D4B896] via-[#C9A96E] to-[#B8935A] opacity-40" aria-hidden />

          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.week}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-5"
              >
                {/* Week dot */}
                <div
                  className="relative shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold text-white z-10 shadow-sm"
                  style={{ backgroundColor: m.accent }}
                >
                  {m.week}w
                </div>

                {/* Card */}
                <div className="flex-1 bg-white rounded-2xl border border-stone-100 px-6 py-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9590] mb-1.5">
                        {m.label}
                      </p>
                      <h3 className="text-[17px] font-semibold text-[#1A1A1A] leading-tight">
                        {m.title}
                      </h3>
                    </div>
                    {m.pct && (
                      <div className="text-right shrink-0">
                        <p className="text-xl font-semibold leading-none" style={{ color: m.accent }}>
                          {m.pct}
                        </p>
                        <p className="text-[10px] text-[#9A9590] font-light mt-1 leading-tight max-w-[100px] text-right">
                          {m.pctLabel}
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-[13px] text-[#6B6560] font-light leading-relaxed mt-2">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-[11px] text-stone-400 font-light mt-8 text-center"
        >
          Gebaseerd op 8-weekse gebruikerstest (n=312). Individuele resultaten kunnen variëren.
        </motion.p>
      </div>
    </section>
  )
}
