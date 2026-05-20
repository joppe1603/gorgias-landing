'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
const footerLinks: Record<string, { label: string; href: string }[]> = {
  'Ontdekken': [
    { label: 'Waarom MAUYI',    href: '/why-lume' },
    { label: 'Wetenschap',     href: '/science' },
    { label: 'Filosofie',      href: '/philosophy' },
    { label: 'Ingrediënten',   href: '/ingredients' },
    { label: 'FAQ',            href: '/faq' },
  ],
  'Producten': [
    { label: 'Reset Serum',        href: '/products/reset-serum' },
    { label: 'Lancering volgen',   href: '/launch' },
  ],
  'Juridisch': [
    { label: 'Privacybeleid',      href: '/privacy' },
    { label: 'Voorwaarden',        href: '/privacy#voorwaarden' },
    { label: 'Cookiebeleid',       href: '/privacy#cookies' },
    { label: 'Contact',            href: 'mailto:hello@mauyi.nl' },
  ],
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lumeskincare',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@mauyi',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const lastSubmit = useRef(0)

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (Date.now() - lastSubmit.current < 2000) return
    lastSubmit.current = Date.now()

    if (!email) return
    setStatus('loading')

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase(), source: 'footer-newsletter' }),
    })

    if (!res.ok) {
      setStatus('error')
      return
    }

    setStatus('done')
    setEmail('')
  }

  return (
    <footer id="footer" className="bg-[#0F0E0C] text-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Pre-launch CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[#C9A96E]/20 bg-gradient-to-br from-[#1A1710] via-[#0F0E0C] to-black px-6 py-14 sm:px-12 sm:py-16 text-center shadow-[0_0_80px_rgba(201,169,110,0.12)]"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.18),transparent_65%)]" />
          <div className="relative">
            <div className="flex items-center justify-center gap-2.5 mb-5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" aria-hidden />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Pre-launch · Wachtlijst open</p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Eerste batch.<br />Beperkte oplage.
            </h2>
            <p className="text-stone-400 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-light">
              Reset Serum is bijna klaar. Schrijf je in en ontvang als eerste een persoonlijk bericht — geen hype, geen kortingen. Gewoon eerlijk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/launch#waitlist"
                className="btn-gold px-8 py-4 rounded-2xl font-semibold text-base w-full sm:w-auto text-center"
              >
                Zet me op de wachtlijst
              </Link>
              <Link
                href="/launch"
                className="px-8 py-4 rounded-2xl font-semibold text-base border border-stone-700 text-stone-300 hover:border-[#C9A96E]/40 hover:text-[#C9A96E] transition-all w-full sm:w-auto text-center"
              >
                Volg het proces →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">

          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden className="transition-transform duration-300 group-hover:rotate-12">
                <circle cx="15" cy="15" r="13" fill="#C9A96E"/>
                <circle cx="19" cy="15" r="10" fill="#0F0E0C"/>
                <circle cx="15" cy="15" r="13" fill="url(#footerLogoGloss)" fillOpacity="0.12"/>
                <defs>
                  <radialGradient id="footerLogoGloss" cx="35%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="white"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0"/>
                  </radialGradient>
                </defs>
              </svg>
              <span className="text-2xl font-semibold tracking-[0.18em] text-white font-[family-name:var(--font-cormorant)] leading-none">MAUYI</span>
            </Link>

            <p className="text-stone-400 text-sm leading-relaxed mb-6 font-light">
              MAUYI is een Nederlands huidverzorgingsmerk geformuleerd op wetenschap. Eerlijk over wat werkt, eerlijk over wat nog komt.
            </p>

            {/* Waitlist signup in footer */}
            <div>
              <p className="text-[12px] font-semibold text-stone-300 mb-3 uppercase tracking-wider">Word als eerste op de hoogte</p>
              {status === 'done' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-[#C9A96E] text-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <circle cx="7" cy="7" r="6" fill="rgba(201,169,110,0.15)"/>
                    <path d="M4 7L6 9L10 5" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Je staat op de lijst.
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jouw@email.com"
                    required
                    disabled={status === 'loading'}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C9A96E]/60 transition-colors min-w-0 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    aria-label="Inschrijven voor wachtlijst"
                    className="bg-[#C9A96E] hover:bg-[#D4B47A] text-[#1A1A1A] px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shrink-0 disabled:opacity-60"
                  >
                    {status === 'loading' ? '...' : 'OK'}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-[11px] mt-1.5 font-light">Er ging iets mis. Probeer het opnieuw.</p>
              )}
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 bg-white/5 hover:bg-[#C9A96E]/15 rounded-xl flex items-center justify-center text-stone-500 hover:text-[#C9A96E] transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500 mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-[#C9A96E] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-600 font-light">
            © {new Date().getFullYear()} MAUYI B.V. · Gemaakt in Nederland
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-stone-600 hover:text-stone-400 transition-colors">Privacy</Link>
            <Link href="/privacy#voorwaarden" className="text-sm text-stone-600 hover:text-stone-400 transition-colors">Voorwaarden</Link>
            <Link href="/privacy#cookies" className="text-sm text-stone-600 hover:text-stone-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
