'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const cases = [
  {
    label: 'Fijne lijntjes & doffe huid',
    weeks: '6 weken',
    result: '89% vermindering van fijne lijntjes',
    person: 'Lena, 34',
    skin: 'Droge huid',
  },
  {
    label: 'Ongelijkmatige tint & vlekken',
    weeks: '4 weken',
    result: '76% verbetering van egalisatie',
    person: 'Maya, 28',
    skin: 'Gemengde huid',
  },
  {
    label: 'Roodheid & gevoeligheid',
    weeks: '8 weken',
    result: '91% vermindering van roodheid',
    person: 'Sarah, 41',
    skin: 'Gevoelige huid',
  },
]

function Slider({ idx }: { idx: number }) {
  const [pct, setPct] = useState(42)
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const update = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return
    const raw = ((clientX - rect.left) / rect.width) * 100
    setPct(Math.max(8, Math.min(92, raw)))
  }, [])

  const c = cases[idx]

  // Skin texture simulations using CSS gradients + filters
  const beforeStyle = {
    background: 'linear-gradient(135deg, #d4b8a0 0%, #c4a88e 30%, #b8987e 60%, #c9a990 100%)',
  }
  const afterStyle = {
    background: 'linear-gradient(135deg, #f5e8dc 0%, #eeddd0 30%, #f0e4d8 60%, #f7ede4 100%)',
  }

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none"
      ref={trackRef}
      onMouseDown={(e) => { setDragging(true); update(e.clientX) }}
      onMouseMove={(e) => { if (dragging) update(e.clientX) }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchStart={(e) => { setDragging(true); update(e.touches[0].clientX) }}
      onTouchMove={(e) => { if (dragging) update(e.touches[0].clientX) }}
      onTouchEnd={() => setDragging(false)}
    >
      {/* Voor (links) */}
      <div className="absolute inset-0" style={beforeStyle}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse at 40% 40%, rgba(180,140,110,0.4) 0%, transparent 70%)',
          mixBlendMode: 'multiply'
        }} />
        {/* Simulated texture overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <filter id="ba-before-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#ba-before-noise)" opacity="0.6"/>
        </svg>
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">VOOR</span>
        </div>
      </div>

      {/* Na (rechts, onthuld door clip) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)`, ...afterStyle }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse at 60% 50%, rgba(255,240,220,0.6) 0%, transparent 70%)',
        }} />
        {/* Subtle glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.15) 0%, transparent 60%)'
        }} />
        <div className="absolute bottom-4 right-4">
          <span className="bg-[#C9A96E] text-white text-xs font-bold px-3 py-1 rounded-full">NA · {c.weeks}</span>
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)] pointer-events-none"
        style={{ left: `${pct}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center gap-0.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L2 7L5 12" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 2L12 7L9 12" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Instruction hint (fades out) */}
      {pct === 42 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: dragging ? 0 : 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="bg-black/40 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            ← sleep om te vergelijken →
          </span>
        </motion.div>
      )}
    </div>
  )
}

export default function BeforeAfter() {
  const [active, setActive] = useState(0)
  const c = cases[active]

  return (
    <section id="results" className="py-28 bg-white relative overflow-hidden scroll-mt-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] px-4 py-1.5 rounded-full mb-4">
            Echte resultaten
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">
            Zie het verschil
            <br />
            <span className="gradient-text">zelf</span>
          </h2>
          <p className="text-lg text-[#6B6560] max-w-lg mx-auto">
            Sleep de slider om echte voor/na resultaten van onze klanten te zien.
          </p>
        </motion.div>

        {/* Case selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {cases.map((c, i) => (
            <button
              key={c.label}
              onClick={() => setActive(i)}
              className={`text-sm font-medium px-5 py-2 rounded-full border transition-all duration-200 ${
                active === i
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-[#6B6560] border-stone-200 hover:border-[#C9A96E] hover:text-[#C9A96E]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Slider + meta */}
        <div className="grid md:grid-cols-[1fr_280px] gap-8 items-center">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Slider idx={active} />
          </motion.div>

          {/* Result card */}
          <motion.div
            key={`card-${active}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="bg-[#FDF8F0] rounded-2xl p-6 border border-[#E8DDD0]">
              <p className="text-xs uppercase tracking-[0.15em] text-[#C9A96E] font-bold mb-2">Resultaat na {c.weeks}</p>
              <p className="text-2xl font-bold text-[#1A1A1A] leading-snug mb-4">{c.result}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center text-white text-sm font-bold">
                  {c.person.split(',')[0][0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">{c.person}</p>
                  <p className="text-xs text-[#6B6560]">{c.skin}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {['Klinisch geteste formules', 'Geen filters — echte huid', 'Geverifieerde klantfoto\'s'].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
                  <div className="w-5 h-5 rounded-full bg-[#C9A96E]/15 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <a href="#shop" className="btn-gold block text-center text-sm py-3">
              Shop de routine →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
