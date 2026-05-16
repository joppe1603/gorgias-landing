'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    quote: 'Mijn huid is compleet getransformeerd. Na 4 weken zag ik al verschil in mijn textuur en glow.',
    author: 'Sophie van den Berg',
    location: 'Amsterdam',
    skin: 'Droge huid',
    weeks: '4 weken',
    rating: 5,
    product: 'Radiance Serum',
    verified: true,
    initials: 'SV',
    color: 'bg-rose-400',
  },
  {
    quote: 'Eindelijk een retinol die niet irriteert. Mijn gevoeligheidsproblemen zijn verdwenen en mijn huid ziet er jaren jonger uit.',
    author: 'Emma Clarke',
    location: 'London',
    skin: 'Gevoelige huid',
    weeks: '6 weken',
    rating: 5,
    product: 'Retinol Serum',
    verified: true,
    initials: 'EC',
    color: 'bg-amber-500',
  },
  {
    quote: 'Ik gebruik LUMÉ nu 3 maanden en mijn vriendinnen vragen constant wat ik doe. Absolute game changer.',
    author: 'Lisa Müller',
    location: 'Berlijn',
    skin: 'Gemengde huid',
    weeks: '12 weken',
    rating: 5,
    product: 'The Glow Ritual',
    verified: true,
    initials: 'LM',
    color: 'bg-indigo-400',
  },
  {
    quote: 'De cleanser is de zachtste die ik ooit heb gebruikt. Mijn barrière is eindelijk hersteld na jaren van te veel exfoliëren.',
    author: 'Hannah Park',
    location: 'Seoul / Amsterdam',
    skin: 'Gevoelige huid',
    weeks: '8 weken',
    rating: 5,
    product: 'Gentle Foam Cleanser',
    verified: true,
    initials: 'HP',
    color: 'bg-teal-500',
  },
  {
    quote: 'Het nachtserum is pure magie. Ik word wakker met de meest plompe, stralende huid van mijn leven.',
    author: 'Fleur de Jong',
    location: 'Utrecht',
    skin: 'Vette huid',
    weeks: '3 weken',
    rating: 5,
    product: 'Overnight Oil',
    verified: true,
    initials: 'FJ',
    color: 'bg-purple-400',
  },
  {
    quote: 'LUMÉ heeft me omgezet van een 10-stappen routine naar 3 producten. Mijn huid heeft er nooit beter uitgezien, eerlijk gezegd.',
    author: 'Julia Rossi',
    location: 'Milaan',
    skin: 'Normale huid',
    weeks: '5 weken',
    rating: 5,
    product: 'The Glow Ritual',
    verified: true,
    initials: 'JR',
    color: 'bg-emerald-500',
  },
  {
    quote: 'De Niacinamide 10% heeft mijn poriën letterlijk onzichtbaar gemaakt. Ik ben zo blij dat ik dit heb geprobeerd.',
    author: 'Noor Bakker',
    location: 'Rotterdam',
    skin: 'Gemengde huid',
    weeks: '5 weken',
    rating: 5,
    product: 'Radiance Serum',
    verified: true,
    initials: 'NB',
    color: 'bg-pink-400',
  },
  {
    quote: 'Op impuls besteld en nu ben ik voor altijd geabonneerd. Het hyaluronzuurcomplex is ongeëvenaard.',
    author: 'Charlotte Webb',
    location: 'Manchester',
    skin: 'Droge huid',
    weeks: '10 weken',
    rating: 5,
    product: 'Radiance Serum',
    verified: true,
    initials: 'CW',
    color: 'bg-orange-400',
  },
]

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#C9A96E" aria-hidden>
          <path d="M7 1L8.6 4.8H13L9.7 7.5L11 11.5L7 9L3 11.5L4.3 7.5L1 4.8H5.4L7 1Z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ r, className = '' }: { r: typeof reviews[0]; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-stone-100 p-6 shadow-sm shrink-0 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <Stars count={r.rating} />
        {r.verified && (
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor"><path d="M4.5 0L5.5 3.5H9L6.3 5.5L7.3 9L4.5 7L1.7 9L2.7 5.5L0 3.5H3.5L4.5 0Z"/></svg>
            Geverifieerd
          </span>
        )}
      </div>

      <p className="text-[#1A1A1A] text-sm leading-relaxed mb-5">&ldquo;{r.quote}&rdquo;</p>

      <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
        <div className={`w-9 h-9 ${r.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {r.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#1A1A1A] truncate">{r.author}</p>
          <p className="text-xs text-[#6B6560] truncate">{r.location} · {r.skin}</p>
        </div>
        <div className="ml-auto shrink-0">
          <span className="text-[10px] text-[#C9A96E] font-medium bg-[#FDF8F0] px-2 py-0.5 rounded-full whitespace-nowrap">
            {r.product}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  const [featured, setFeatured] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const pausedRef = useRef(false)

  // Auto-scroll ticker
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let pos = 0
    const speed = 0.5

    const tick = () => {
      if (!pausedRef.current) {
        pos += speed
        if (pos >= track.scrollWidth / 2) pos = 0
        track.style.transform = `translateX(-${pos}px)`
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  // Auto-cycle featured review
  useEffect(() => {
    const id = setInterval(() => setFeatured((f) => (f + 1) % reviews.length), 5000)
    return () => clearInterval(id)
  }, [])

  const fr = reviews[featured]

  return (
    <section id="reviews" className="py-28 overflow-hidden scroll-mt-28" style={{ background: '#0F0E0C' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#C9A96E]/10 px-4 py-1.5 rounded-full mb-4">
            12.400+ reviews
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Klanten aan het woord
          </h2>
          <p className="text-lg text-stone-400 max-w-md mx-auto">
            Geverifieerde reviews van echte klanten. Geen filters.
          </p>
        </motion.div>

        {/* Featured review (cycles) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={featured}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-4 relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex gap-1 mb-5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeatured(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === featured ? 'w-8 bg-[#C9A96E]' : 'w-4 bg-white/20'}`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>

            <Stars count={fr.rating} />
            <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed mt-4 mb-6">
              &ldquo;{fr.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 ${fr.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                {fr.initials}
              </div>
              <div>
                <p className="text-white font-semibold">{fr.author}</p>
                <p className="text-stone-400 text-sm">{fr.location} · {fr.skin} · {fr.weeks}</p>
              </div>
              {fr.verified && (
                <span className="ml-auto text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                  ✓ Geverifieerd
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Aggregate score */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 py-4"
        >
          <div className="text-center">
            <p className="text-4xl font-black text-[#C9A96E]">4.9</p>
            <Stars />
            <p className="text-stone-500 text-xs mt-1">Gemiddelde score</p>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <p className="text-4xl font-black text-white">12.4k</p>
            <p className="text-stone-500 text-xs mt-1">Geverifieerde reviews</p>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <p className="text-4xl font-black text-white">94%</p>
            <p className="text-stone-500 text-xs mt-1">Zou het aanbevelen</p>
          </div>
        </motion.div>
      </div>

      {/* Infinite scroll ticker */}
      <div
        className="relative"
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        <div className="flex" ref={trackRef} style={{ width: 'max-content' }}>
          {/* Doubled for seamless loop */}
          {[...reviews, ...reviews].map((r, i) => (
            <ReviewCard
              key={i}
              r={r}
              className="w-[min(88vw,340px)] mx-3"
            />
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0F0E0C] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0F0E0C] to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
