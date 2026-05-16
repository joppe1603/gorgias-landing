'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const HEADER_TOP = 'top-[104px]'

const shopColumns = [
  {
    title: 'Producten',
    links: [
      { label: 'Serums',        href: '#shop', desc: 'Gerichte actieve stoffen voor elk huidprobleem' },
      { label: 'Moisturizers',  href: '#shop', desc: 'Huidbarrière-eerste hydratatieformules' },
      { label: 'Reinigers',     href: '#shop', desc: 'Zachte dagelijkse & dubbele reiniging' },
    ],
  },
  {
    title: 'Meer',
    links: [
      { label: 'Oogverzorging',  href: '#shop', desc: 'Gerichte behandelingen voor het ooggebied' },
      { label: 'Gezichtsoliën',  href: '#shop', desc: 'Voedzame plantaardige mengsels' },
      { label: 'Cadeausets',     href: '#shop', desc: 'Samengestelde routines, prachtig verpakt' },
    ],
  },
  {
    title: 'Populair',
    links: [
      { label: 'Radiance Serum',      href: '/products/radiance-serum',     desc: 'Onze #1 bestseller' },
      { label: 'The Glow Ritual',     href: '/products/the-glow-ritual',    desc: 'Volledige routinebundel' },
      { label: 'Sensitive Skin Edit', href: '/products/sensitive-skin-edit', desc: 'Bakuchiol + barrièreherstel' },
    ],
  },
]

const collectionColumns = [
  {
    title: 'Per Edit',
    links: [
      { label: 'The Glow Edit',   href: '#shop', desc: 'Vitamine C & verheldering' },
      { label: 'Anti-Aging',      href: '#shop', desc: 'Retinol-gestuurde routines' },
      { label: 'Travel Minis',    href: '#shop', desc: '15ml handbagage sets' },
    ],
  },
  {
    title: 'Per Huidtype',
    links: [
      { label: 'Gevoelige huid',      href: '#shop', desc: 'Bakuchiol, geen irritatie' },
      { label: 'Droge & uitgedroogde huid', href: '#shop', desc: 'Drievoudig HA, ceramiden' },
      { label: 'Vette & gemengde huid',     href: '#shop', desc: 'Niacinamide balancerend' },
    ],
  },
  {
    title: 'Nieuw',
    links: [
      { label: 'Lentecollectie',    href: '#shop', desc: 'Nieuwste aankomsten' },
      { label: 'Beperkte edities',  href: '#shop', desc: 'Zolang de voorraad strekt' },
      { label: 'Bestsellers',       href: '#shop', desc: 'Favorieten van de community' },
    ],
  },
]

const mobileLinkVariants = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function MegaMenuPanel({ columns }: { columns: typeof shopColumns }) {
  return (
    <div className="rounded-2xl border border-stone-100 bg-white shadow-2xl shadow-stone-200/60 p-8 grid grid-cols-3 gap-8 min-w-[640px]">
      {columns.map((col) => (
        <div key={col.title}>
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">{col.title}</p>
          <ul className="space-y-3">
            {col.links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="block group rounded-xl px-2 py-1 -mx-2 hover:bg-gold-50 cursor-pointer transition-all"
                >
                  <span className="text-sm font-semibold text-stone-900 group-hover:text-[#C9A96E] transition-colors">
                    {l.label}
                  </span>
                  <span className="block text-xs text-stone-500 mt-0.5 leading-snug">{l.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  type MobileItem =
    | { kind: 'heading'; label: string }
    | { kind: 'link'; label: string; href: string; desc?: string }

  const mobileItems: MobileItem[] = [
    { kind: 'heading', label: 'Shop' },
    ...shopColumns.flatMap((c) => c.links.map((l) => ({ kind: 'link' as const, ...l }))),
    { kind: 'heading', label: 'Collecties' },
    ...collectionColumns.flatMap((c) => c.links.map((l) => ({ kind: 'link' as const, ...l }))),
    { kind: 'link', label: 'Ingrediënten', href: '#features' },
    { kind: 'link', label: 'Over ons',     href: '#' },
    { kind: 'link', label: 'Duurzaamheid', href: '#' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Announcement bar — dark luxury */}
        <div className="flex items-center justify-center gap-2 bg-[#1A1A1A] text-white text-xs sm:text-sm font-medium py-2.5 px-4 text-center">
          <span>✨ Gratis verzending bij bestellingen boven €50 · Gebruik code <strong>LUMÉ10</strong> voor 10% korting op je eerste bestelling</span>
        </div>

        <nav
          className={`transition-all duration-300 border-b ${
            scrolled
              ? 'bg-white/96 backdrop-blur-md shadow-sm border-stone-100'
              : 'bg-white/80 backdrop-blur-sm border-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <Link href="/#hero" className="flex items-center gap-2.5 shrink-0 cursor-pointer group">
                {/* Crescent mark — "lume" = light in Italian */}
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden className="transition-transform duration-300 group-hover:rotate-12">
                  <circle cx="15" cy="15" r="13" fill="#C9A96E"/>
                  <circle cx="19" cy="15" r="10" fill="#FAF8F5"/>
                  <circle cx="15" cy="15" r="13" fill="url(#navLogoGloss)" fillOpacity="0.15"/>
                  <defs>
                    <radialGradient id="navLogoGloss" cx="35%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="white"/>
                      <stop offset="100%" stopColor="white" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                </svg>
                <span className="text-2xl font-semibold tracking-[0.18em] text-[#1A1A1A] font-[family-name:var(--font-cormorant)] leading-none">LUMÉ</span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-1">
                {/* Shop mega */}
                <div className="relative group">
                  <button type="button" className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-[#C9A96E] hover:bg-gold-50 rounded-lg cursor-pointer transition-all flex items-center gap-1">
                    Shop
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50" aria-hidden>
                      <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <MegaMenuPanel columns={shopColumns} />
                  </div>
                </div>

                {/* Collections mega */}
                <div className="relative group">
                  <button type="button" className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-[#C9A96E] hover:bg-gold-50 rounded-lg cursor-pointer transition-all flex items-center gap-1">
                    Collecties
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50" aria-hidden>
                      <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <MegaMenuPanel columns={collectionColumns} />
                  </div>
                </div>

                <Link href="#features"    className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-[#C9A96E] hover:bg-gold-50 rounded-lg cursor-pointer transition-all">Ingrediënten</Link>
                <Link href="#"            className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-[#C9A96E] hover:bg-gold-50 rounded-lg cursor-pointer transition-all">Over ons</Link>
                <Link href="#"            className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-[#C9A96E] hover:bg-gold-50 rounded-lg cursor-pointer transition-all">Duurzaamheid</Link>
              </div>

              {/* CTAs */}
              <div className="hidden md:flex items-center gap-3">
                <Link href="#" className="px-4 py-2 text-sm font-semibold text-stone-700 hover:text-[#C9A96E] cursor-pointer transition-all">
                  Inloggen
                </Link>
                <Link href="#shop" className="btn-gold px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all">
                  Nu kopen
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer transition-all"
                aria-label={mobileOpen ? 'Menu sluiten' : 'Menu openen'}
                aria-expanded={mobileOpen}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  {mobileOpen ? (
                    <><path d="M4 4L18 18"/><path d="M18 4L4 18"/></>
                  ) : (
                    <><path d="M3 7h16"/><path d="M3 11h16"/><path d="M3 15h16"/></>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-[104px]" aria-hidden />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed ${HEADER_TOP} left-0 right-0 z-40 bg-white border-b border-stone-100 shadow-xl md:hidden overflow-hidden`}
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="px-4 py-4 max-h-[min(70vh,560px)] overflow-y-auto"
            >
              {mobileItems.map((entry, i) => {
                if (entry.kind === 'heading') {
                  return (
                    <motion.p key={`${entry.label}-${i}`} variants={mobileLinkVariants} className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-4 first:mt-0 mb-2">
                      {entry.label}
                    </motion.p>
                  )
                }
                return (
                  <motion.div key={`${entry.label}-${i}`} variants={mobileLinkVariants}>
                    <Link href={entry.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-stone-800 hover:text-[#C9A96E] hover:bg-gold-50 rounded-xl cursor-pointer transition-all">
                      {entry.label}
                      {entry.desc && <span className="block text-xs text-stone-500 font-normal mt-0.5">{entry.desc}</span>}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div variants={mobileLinkVariants} className="pt-3 border-t border-stone-100 mt-2 flex flex-col gap-2">
                <Link href="#" onClick={() => setMobileOpen(false)} className="block text-center py-2 text-sm font-semibold text-stone-700 cursor-pointer transition-all">Inloggen</Link>
                <Link href="#shop" onClick={() => setMobileOpen(false)} className="btn-gold block text-center py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all">Nu kopen</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
