'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'


const exploreLinks = [
  { label: 'Filosofie',       href: '/philosophy',    desc: 'Waarom minder meer is' },
  { label: 'Waarom MAUYI',     href: '/why-lume',      desc: 'Ons verhaal & onze principes' },
  { label: 'Wetenschap',      href: '/science',       desc: 'Hoe we formuleren' },
  { label: 'Ingrediënten',    href: '/ingredients',   desc: 'Wat werkt. En waarom.' },
  { label: 'Journal',         href: '/journal',       desc: 'Editoriaal & wetenschap' },
  { label: 'Community',       href: '/community',     desc: 'Verhalen van echte mensen' },
  { label: 'FAQ',             href: '/faq',           desc: 'Goede vragen. Eerlijke antwoorden.' },
]


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
                <span className="text-xl font-medium tracking-[0.22em] text-[#1A1A1A] font-[family-name:var(--font-cormorant)] leading-none">MAUYI</span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-0.5">
                {navLink('/products/reset-serum', 'Reset Serum')}

                {/* Ontdekken mega */}
                <div className="relative group">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
                      ['/philosophy', '/why-lume', '/science', '/ingredients', '/journal', '/community', '/faq'].some(p => pathname.startsWith(p))
                        ? 'text-[#C9A96E]'
                        : 'text-stone-600 hover:text-[#C9A96E]'
                    }`}
                  >
                    Ontdekken
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40" aria-hidden>
                      <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="rounded-2xl border border-stone-100 bg-white shadow-2xl shadow-stone-200/40 p-6 grid grid-cols-2 gap-x-8 gap-y-1 min-w-[380px]">
                      <p className="col-span-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Merk & wetenschap</p>
                      {exploreLinks.map((l) => (
                        <Link
                          key={l.label}
                          href={l.href}
                          className="block group/link rounded-xl px-2 py-2 -mx-2 hover:bg-[#FAF8F5] transition-all"
                        >
                          <span className="text-sm font-medium text-stone-800 group-hover/link:text-[#C9A96E] transition-colors block">{l.label}</span>
                          <span className="text-xs text-stone-400 leading-snug block">{l.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
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
                <Link href="/launch#waitlist" className="btn-gold px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer">
                  Wachtlijst
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
      <div className="h-[64px]" aria-hidden />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-white border-b border-stone-100 shadow-xl md:hidden overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              className="px-6 py-4 max-h-[72vh] overflow-y-auto"
            >
              {/* Product */}
              <motion.p variants={mobileLinkVariants} className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2 mt-2">
                Product
              </motion.p>
              <motion.div variants={mobileLinkVariants}>
                <Link href="/products/reset-serum" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-stone-800 hover:text-[#C9A96E] hover:bg-[#FAF8F5] rounded-xl cursor-pointer transition-all">
                  Reset Serum
                  <span className="block text-xs text-stone-400 font-normal mt-0.5">Retinol 0.3% · Niacinamide 10% · Hyaluronzuur</span>
                </Link>
              </motion.div>

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
                <Link href="/launch#waitlist" onClick={() => setMobileOpen(false)} className="btn-gold block text-center py-3.5 rounded-2xl text-sm font-medium cursor-pointer">
                  Zet me op de wachtlijst
                </Link>
                <Link href="/launch" onClick={() => setMobileOpen(false)} className="btn-outline block text-center py-3 rounded-2xl text-sm font-medium cursor-pointer">
                  Over de lancering
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
