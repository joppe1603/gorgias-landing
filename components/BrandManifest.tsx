'use client'

import { motion } from 'framer-motion'

const beliefs = [
  {
    number: '01',
    title: 'Minder is meer',
    body: 'Drie goed samengestelde producten presteren altijd beter dan tien middelmatige. We optimaliseren elke formule zodat de volgende overbodig wordt.',
  },
  {
    number: '02',
    title: 'Wetenschap boven marketing',
    body: "Geen gepatenteerde namen voor gewone ingrediënten. Geen voor-en-na foto's met filters. Alleen gepubliceerde studies en eerlijke claims.",
  },
  {
    number: '03',
    title: 'Jouw huid is slim',
    body: 'Huid herstelt zichzelf als je het de juiste stoffen geeft en de rust laat. Soms is het beste advies: stop met kopen.',
  },
]

export default function BrandManifest() {
  return (
    <section className="py-28 bg-[#0F0E0C] relative overflow-hidden">
      {/* Subtle gold dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(circle, #C9A96E 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A96E] mb-6 block">
            Waarom MAUYI bestaat
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] mb-8">
            De huidverzorgingsindustrie{' '}
            <br className="hidden sm:block" />
            is te ingewikkeld geworden.{' '}
            <span className="text-stone-500">Wij niet.</span>
          </h2>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
            MAUYI begon vanuit één observatie: mensen kopen te veel en zien te weinig resultaat. We bouwen ons merk op één principe — elk product moet zo goed zijn dat het de rest overbodig maakt.
          </p>
        </motion.div>

        {/* Three beliefs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-14 border-t border-white/10">
          {beliefs.map((b, i) => (
            <motion.div
              key={b.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-bold text-[#C9A96E] tracking-[0.2em] mb-4 block">
                {b.number}
              </span>
              <h3 className="text-base font-bold text-white mb-3">{b.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
