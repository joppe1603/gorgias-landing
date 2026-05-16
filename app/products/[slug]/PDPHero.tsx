'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import type { Product } from '@/lib/products'
import { useCart } from '@/contexts/CartContext'

function Stars({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 16 16" fill={i <= Math.round(rating) ? '#C9A96E' : '#E5E7EB'} aria-hidden>
            <path d="M8 1L9.8 5.5H15L10.8 8.5L12.5 13L8 10L3.5 13L5.2 8.5L1 5.5H6.2L8 1Z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-semibold text-[#1A1A1A] tabular-nums">{rating}</span>
      <span className="text-sm text-[#9A9590]">({count.toLocaleString('nl-NL')})</span>
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function PDPHero({ product }: { product: Product }) {
  const imageRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  const { dispatch } = useCart()
  const [added, setAdded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  const allImages = [product.heroImage, ...(product.textureImages ?? [])]

  function handleAddToCart() {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.heroImage,
        size: product.size,
      },
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  function handleGalleryScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const index = Math.round(el.scrollLeft / el.clientWidth)
    setActiveSlide(index)
  }

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[54%_46%] gap-10 lg:gap-16 items-start">

          {/* ── LEFT: Images ── */}
          <div>

            {/* Mobile swipe gallery — hidden on desktop */}
            <div className="lg:hidden -mx-6 mb-8">
              <div
                ref={galleryRef}
                onScroll={handleGalleryScroll}
                className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-6 pb-1 scrollbar-hide"
                style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
              >
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/5] rounded-3xl overflow-hidden shrink-0 bg-stone-100 shadow-sm"
                    style={{ width: 'calc(100vw - 3rem)', scrollSnapAlign: 'center' }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} — foto ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={i === 0}
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    {/* Emotion badge on first slide */}
                    {i === 0 && (product.emotion || product.tagline) && (
                      <div className="absolute bottom-5 left-5 right-5">
                        <div className="bg-[#0F0E0C]/88 backdrop-blur-md rounded-2xl px-4 py-3.5 border border-white/8">
                          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C9A96E] mb-1.5">
                            LUMÉ — standpunt
                          </p>
                          <p className="text-[13px] font-light text-stone-200 italic leading-relaxed">
                            {product.emotion || product.tagline}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Dot indicators */}
              {allImages.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-3 px-6">
                  {allImages.map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-full transition-all duration-300 ${
                        i === activeSlide
                          ? 'w-4 h-1.5 bg-[#C9A96E]'
                          : 'w-1.5 h-1.5 bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop cinematic image — hidden on mobile */}
            <div ref={imageRef} className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image frame */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_8px_64px_rgba(0,0,0,0.09)] bg-stone-100">
                  <motion.div style={{ y: imageY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                    <Image
                      src={product.heroImage}
                      alt={`${product.name} — LUMÉ`}
                      fill
                      className="object-cover"
                      sizes="54vw"
                      priority
                    />
                  </motion.div>

                  {/* Grain overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-[0.032] pointer-events-none mix-blend-multiply" aria-hidden>
                    <filter id="grain-hero">
                      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
                      <feColorMatrix type="saturate" values="0"/>
                    </filter>
                    <rect width="100%" height="100%" filter="url(#grain-hero)" />
                  </svg>

                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  {/* Floating emotion badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-6 left-6 right-6"
                  >
                    <div className="bg-[#0F0E0C]/88 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/8">
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C9A96E] mb-2">
                        LUMÉ — standpunt
                      </p>
                      <p className="text-sm font-light text-stone-200 italic leading-relaxed">
                        {product.emotion || product.tagline}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Floating key ingredient chip */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -top-3 -right-4 bg-white rounded-2xl shadow-lg border border-stone-100/90 px-4 py-3 max-w-[180px]"
                >
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#9A9590] mb-1.5">
                    Werkzaam actief
                  </p>
                  <p className="text-sm font-semibold text-[#1A1A1A] leading-tight">
                    {product.keyIngredients[0].name}
                  </p>
                  {product.keyIngredients[0].pct && (
                    <p className="text-xs text-[#C9A96E] font-medium mt-0.5">
                      {product.keyIngredients[0].pct}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: Product info ── */}
          <div className="lg:pt-6 space-y-0">

            {/* Badge label */}
            <motion.div {...fadeUp(0.15)} className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="section-label">{product.badge}</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              {...fadeUp(0.22)}
              className="text-[clamp(2.4rem,4.5vw,3.8rem)] font-semibold text-[#1A1A1A] leading-[1.0] tracking-[-0.02em] mb-4"
            >
              {product.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p {...fadeUp(0.30)} className="text-lg text-[#9A9590] font-light italic leading-relaxed mb-7">
              {product.tagline}
            </motion.p>

            {/* Rating */}
            <motion.div {...fadeUp(0.36)} className="mb-7">
              <Stars rating={product.rating} count={product.reviewCount} />
            </motion.div>

            {/* Price */}
            <motion.div {...fadeUp(0.42)} className="mb-7">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-[2.4rem] font-semibold text-[#1A1A1A] leading-none">€{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-stone-300 line-through">€{product.originalPrice}</span>
                    <span className="text-xs font-semibold text-[#C9A96E] bg-[#FDF8F0] border border-[#C9A96E]/20 px-2.5 py-1 rounded-full">
                      −€{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-[#9A9590] font-medium tracking-wide">{product.size} · Incl. BTW · Gratis verzending boven €50</p>
            </motion.div>

            {/* Description */}
            <motion.p {...fadeUp(0.48)} className="text-[#5C5754] leading-relaxed mb-6 text-[15px] font-light">
              {product.description}
            </motion.p>

            {/* Texture note */}
            {product.textureNote && (
              <motion.div
                {...fadeUp(0.52)}
                className="mb-7 flex items-start gap-3 bg-[#FAF8F5] rounded-xl px-4 py-3.5 border border-stone-100"
              >
                <div className="w-1 h-full bg-[#C9A96E] rounded-full shrink-0 mt-0.5 self-stretch min-h-[2rem]" />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9A9590] mb-1">Textuur</p>
                  <p className="text-[13px] text-[#6B6560] font-light leading-relaxed">{product.textureNote}</p>
                </div>
              </motion.div>
            )}

            {/* Benefits */}
            <motion.div {...fadeUp(0.56)} className="grid grid-cols-2 gap-2 mb-8">
              {product.benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-2.5 bg-[#FAF8F5] rounded-xl p-3 border border-stone-100">
                  <span className="text-[15px] leading-none mt-0.5 shrink-0">{b.icon}</span>
                  <div>
                    <p className="text-[11px] font-semibold text-[#1A1A1A] mb-0.5 leading-tight">{b.title}</p>
                    <p className="text-[10px] text-[#9A9590] leading-snug">{b.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Delivery + stock micro-row */}
            <motion.div {...fadeUp(0.59)} className="flex items-center justify-between mb-5 px-0.5">
              <span className="flex items-center gap-1.5 text-[12px] text-[#6B6560]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="1" y="3" width="15" height="13" rx="1"/>
                  <path d="M16 8h4l3 5v3h-7V8z"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                Morgen in huis · bestel vóór 23:00
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-[#9A9590]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                Nog 12 stuks
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.62)} id="product-hero-cta" className="space-y-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="btn-gold w-full py-[1.05rem] rounded-2xl font-medium text-[15px] cursor-pointer tracking-[0.01em] relative overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                        <path d="M2.5 7.5L6 11L12.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Toegevoegd aan winkelwagen
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.22 }}
                    >
                      In winkelwagen · €{product.price}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button className="w-full py-[0.95rem] rounded-2xl font-light text-[13px] border border-stone-200 text-[#6B6560] hover:border-[#C9A96E] hover:text-[#C9A96E] cursor-pointer transition-all duration-200">
                Koop nu, betaal later via Klarna
              </button>
            </motion.div>

            {/* Trust row */}
            <motion.div
              {...fadeUp(0.68)}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 border-t border-stone-100"
            >
              {['30 dagen garantie', 'Gratis retour', '100% vegan', 'Parfumvrij'].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[11px] text-[#9A9590]">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                    <circle cx="5.5" cy="5.5" r="5" stroke="#C9A96E" strokeWidth="1"/>
                    <path d="M3.5 5.5l1.2 1.2L7.5 4" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
