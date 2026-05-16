'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const footerLinks: Record<string, string[]> = {
  'Shop': [
    'Serums',
    'Moisturizers',
    'Reinigers',
    'Oogverzorging',
    'Gezichtsoliën',
    'Cadeausets',
  ],
  'Help': [
    'FAQ',
    'Verzending & retour',
    'Bestelling volgen',
    'Contact',
    'Loyaliteitsprogramma',
    'Winkelzoeker',
  ],
  'Over ons': [
    'Ons verhaal',
    'Ingrediënten',
    'Duurzaamheid',
    'Pers',
    'Vacatures',
    'Groothandel',
  ],
  'Juridisch': [
    'Privacybeleid',
    'Algemene voorwaarden',
    'Cookiebeleid',
    'GDPR',
  ],
}

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer id="footer" className="bg-[#0F0E0C] text-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[#C9A96E]/20 bg-gradient-to-br from-[#1A1710] via-[#0F0E0C] to-black px-6 py-14 sm:px-12 sm:py-16 text-center shadow-[0_0_80px_rgba(201,169,110,0.12)]"
        >
          {/* Gold radial glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.18),transparent_65%)]" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-4">Risicovrij · 30 dagen garantie</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
              Klaar om je mooiste huid te ontmoeten?
            </h2>
            <p className="text-stone-400 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Probeer LUMÉ risicovrij gedurende 30 dagen. Gratis verzending op alle bestellingen boven €50.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#shop"
                className="btn-gold px-8 py-4 rounded-2xl font-semibold text-base w-full sm:w-auto text-center cursor-pointer transition-all"
              >
                Nu kopen
              </a>
              <a
                href="#"
                className="px-8 py-4 rounded-2xl font-semibold text-base border-2 border-stone-600 text-stone-200 hover:border-[#C9A96E] hover:text-[#C9A96E] cursor-pointer transition-all w-full sm:w-auto text-center"
              >
                Doe de huidquiz →
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            {/* Logo */}
            <Link href="/#hero" className="flex items-center gap-2.5 mb-5 cursor-pointer group">
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
              <span className="text-2xl font-semibold tracking-[0.18em] text-white font-[family-name:var(--font-cormorant)] leading-none">LUMÉ</span>
            </Link>

            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              LUMÉ is een premium Nederlands huidverzorgingsmerk gebouwd op klinische wetenschap en schone ingrediënten. Zichtbare resultaten in 28 dagen — of je geld terug.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">Word lid van de LUMÉ community</p>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-green-400 text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="#22c55e" fillOpacity="0.2"/>
                    <path d="M5 8L7 10L11 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Welkom bij de LUMÉ community!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jouw@email.com"
                    required
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#C9A96E] transition-colors min-w-0"
                  />
                  <button
                    type="submit"
                    aria-label="Inschrijven voor nieuwsbrief"
                    className="bg-[#C9A96E] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#B8935A] cursor-pointer transition-all shrink-0"
                  >
                    Aanmelden
                  </button>
                </form>
              )}
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 bg-white/5 hover:bg-[#C9A96E]/20 rounded-xl flex items-center justify-center text-stone-400 hover:text-[#C9A96E] cursor-pointer transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-stone-400 hover:text-[#C9A96E] cursor-pointer transition-all"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} LUMÉ B.V. Alle rechten voorbehouden. · Gemaakt in Nederland 🇳🇱
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-stone-500 hover:text-stone-300 cursor-pointer transition-all">Privacy</Link>
            <Link href="#" className="text-sm text-stone-500 hover:text-stone-300 cursor-pointer transition-all">Voorwaarden</Link>
            <Link href="#" className="text-sm text-stone-500 hover:text-stone-300 cursor-pointer transition-all">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
