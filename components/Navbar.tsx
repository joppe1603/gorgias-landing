'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'

const shopColumns = [
  {
    title: 'Producten',
    links: [
      { label: 'Quiet Cleanser',      href: '/products/quiet-cleanser',      desc: 'Stap 01 — Zachte dagelijkse reiniger' },
      { label: 'Reset Serum',         href: '/products/reset-serum',          desc: 'Stap 02 — Bestseller · Retinol + Niacinamide' },
      { label: 'Soft Barrier Cream',  href: '/products/soft-barrier-cream',   desc: 'Stap 03 — Barrièreherstel & hydratatie' },
    ],
  },
  {
    title: 'Bundels',
    links: [
      { label: 'The Glow Ritual',     href: '/products/the-glow-ritual',     desc: 'Volledige 3-stappen routine · Bespaar €45' },
      { label: 'Sensitive Skin Edit', href: '/products/sensitive-skin-edit', desc: 'Bakuchiol · Geschikt voor gevoelige huid' },
      { label: 'Travel Kit',          href: '/products/travel-kit',           desc: '15ml minis · Handbagage formaat' },
    ],
  },
  {
    title: 'Alle producten',
    links: [
      { label: 'Bekijk alles',        href: '/shop',            desc: 'Volledige productcollectie' },
      { label: 'Bestsellers',         href: '/shop?filter=bestsellers', desc: 'Meest geliefd door onze community' },
      { label: 'Routine Builder',     href: '/routine',         desc: 'Vind de routine voor jouw huid' },
    ],
  },
]

const exploreLinks = [
  { label: 'Filosofie',       href: '/philosophy',    desc: 'Waarom minder meer is' },
  { label: 'Ingrediënten',    href: '/ingredients',   desc: 'Wat werkt. En waarom.' },
  { label: 'Journal',         href: '/journal',       desc: 'Editoriaal & wetenschap' },
  { label: 'Community',       href: '/community',     desc: 'Verhalen van echte mensen' },
  { label: 'FAQ',             href: '/faq',           desc: 'Goede vragen. Eerlijke antwoorden.' },
]

function MegaMenuPanel({ columns }: { columns: typeof shopColumns }) {
  return (
    <div className="rounded-2xl border border-stone-100 bg-white shadow-2xl shadow-stone-200/40 p-8 grid grid-cols-3 gap-8 min-w-[640px]">
      {columns.map((col) => (
        <div key={col.title}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">{col.title}</p>
          <ul className="space-y-3">
            {col.links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="block group rounded-xl px-2 py-1.5 -mx-2 hover:bg-[#FAF8F5] transition-all">
                  <span className="text-sm font-medium text-stone-800 group-hover:text-[#C9A96E] transition-colors block">{l.label}</span>
                  <span className="text-xs text-stone-400 mt-0.5 leading-snug block">{l.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const mobileLinkVariants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { dispatch, itemCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all ${
        pathname === href
          ? 'text-[#C9A96E]'
          : 'text-stone-600 hover:text-[#C9A96E]'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Announcement */}
        <div className="flex items-center justify-center bg-[#1A1A1A] text-white text-xs font-medium py-2.5 px-4 text-center">
          <span>Gratis verzending boven €50 · Code <strong>LUMÉ10</strong> voor 10% op je eerste bestelling</span>
        </div>

        <nav className={`transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/96 backdrop-blur-md shadow-sm border-stone-100'
            : 'bg-white/85 backdrop-blur-sm border-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer group">
                <svg width="28" height="28" viewBox="0 0 30 30" fill="none" aria-hidden className="transition-transform duration-300 group-hover:rotate-12">
                  <circle cx="15" cy="15" r="13" fill="#C9A96E"/>
                  <circle cx="19" cy="15" r="10" fill="#FAFAF8"/>
                  <circle cx="15" cy="15" r="13" fill="url(#logoGloss)" fillOpacity="0.12"/>
                  <defs>
                    <radialGradient id="logoGloss" cx="35%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="white"/>
                      <stop offset="100%" stopColor="white" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                </svg>
                <span className="text-xl font-medium tracking-[0.22em] text-[#1A1A1A] font-[family-name:var(--font-cormorant)] leading-none">LUMÉ</span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-0.5">
                {/* Shop mega */}
                <div className="relative group">
                  <button type="button" className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all flex items-center gap-1 ${pathname.startsWith('/shop') || pathname.startsWith('/products') ? 'text-[#C9A96E]' : 'text-stone-600 hover:text-[#C9A96E]'}`}>
                    Shop
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40" aria-hidden>
                      <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <MegaMenuPanel columns={shopColumns} />
                  </div>
                </div>

                {navLink('/routine', 'Routine')}
                {navLink('/philosophy', 'Filosofie')}
                {navLink('/ingredients', 'Ingrediënten')}
                {navLink('/journal', 'Journal')}
              </div>

              {/* CTAs */}
              <div className="hidden md:flex items-center gap-3">
                <Link href="/community" className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-[#C9A96E] cursor-pointer transition-all">
                  Community
                </Link>
                {/* Cart icon */}
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'TOGGLE' })}
                  className="relative p-2.5 rounded-xl text-stone-600 hover:text-[#C9A96E] hover:bg-stone-50 transition-all cursor-pointer"
                  aria-label="Winkelwagen openen"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
                  </svg>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C9A96E] text-white text-[9px] font-bold flex items-center justify-center tabular-nums"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </button>
                <Link href="/shop" className="btn-gold px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer">
                  Shop
                </Link>
              </div>

              {/* Mobile burger */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer transition-all"
                aria-label={mobileOpen ? 'Sluit menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  {mobileOpen
                    ? <><path d="M4 4L18 18"/><path d="M18 4L4 18"/></>
                    : <><path d="M3 7h16"/><path d="M3 11h16"/><path d="M3 15h16"/></>}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Header spacer */}
      <div className="h-[104px]" aria-hidden />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[104px] left-0 right-0 z-40 bg-white border-b border-stone-100 shadow-xl md:hidden overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              className="px-6 py-4 max-h-[72vh] overflow-y-auto"
            >
              {/* Shop */}
              <motion.p variants={mobileLinkVariants} className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 mt-2">
                Shop
              </motion.p>
              {shopColumns.flatMap(c => c.links.slice(0, 2)).map((l) => (
                <motion.div key={l.label} variants={mobileLinkVariants}>
                  <Link href={l.href} onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-stone-800 hover:text-[#C9A96E] hover:bg-[#FAF8F5] rounded-xl cursor-pointer transition-all">
                    {l.label}
                    <span className="block text-xs text-stone-400 font-normal mt-0.5">{l.desc}</span>
                  </Link>
                </motion.div>
              ))}

              {/* Explore */}
              <motion.p variants={mobileLinkVariants} className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 mt-5">
                Ontdekken
              </motion.p>
              {exploreLinks.map((l) => (
                <motion.div key={l.label} variants={mobileLinkVariants}>
                  <Link href={l.href} onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-stone-800 hover:text-[#C9A96E] hover:bg-[#FAF8F5] rounded-xl cursor-pointer transition-all">
                    {l.label}
                    <span className="block text-xs text-stone-400 font-normal mt-0.5">{l.desc}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={mobileLinkVariants} className="pt-4 border-t border-stone-100 mt-3 flex flex-col gap-2">
                <Link href="/shop" onClick={() => setMobileOpen(false)} className="btn-gold block text-center py-3.5 rounded-2xl text-sm font-medium cursor-pointer">
                  Shop de routine
                </Link>
                <Link href="/routine" onClick={() => setMobileOpen(false)} className="btn-outline block text-center py-3 rounded-2xl text-sm font-medium cursor-pointer">
                  Bouw mijn routine
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
