'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const footerLinks = {
  Product: [
    'Features',
    'Integrations',
    'Pricing',
    'Changelog',
    'Status',
    'Security',
  ],
  Company: [
    'About us',
    'Careers',
    'Press',
    'Partners',
    'Contact',
    'Blog',
  ],
  Resources: [
    'Help Center',
    'Documentation',
    'API Reference',
    'Community',
    'Webinars',
    'Case Studies',
  ],
  Legal: [
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy',
    'GDPR',
    'DPA',
  ],
}

const socialLinks = [
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
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
    <footer className="bg-gray-950 text-white">
      {/* CTA Banner */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to transform your support?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Join 17,000+ ecommerce brands. Start your free 7-day trial — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="btn-orange px-8 py-4 rounded-2xl font-semibold text-base w-full sm:w-auto text-center"
              >
                Start free trial
              </a>
              <a
                href="#"
                className="px-8 py-4 rounded-2xl font-semibold text-base border-2 border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-all w-full sm:w-auto text-center"
              >
                Book a demo
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-[#FF4F00] rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z" fill="white" fillOpacity="0.9"/>
                  <circle cx="9" cy="9" r="2.5" fill="white"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">gorgias</span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The customer experience platform built for ecommerce. Support more customers,
              automate more tickets, and grow more revenue.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">Stay up to date</p>
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
                  You&apos;re subscribed! Thanks.
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4F00] transition-colors min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF4F00] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e64600] transition-colors shrink-0"
                  >
                    Subscribe
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
                  className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
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
                      className="text-sm text-gray-400 hover:text-white transition-colors"
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
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Gorgias, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Cookies</Link>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm text-gray-500">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
