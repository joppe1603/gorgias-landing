'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { label: 'Product', href: '#features' },
  { label: 'Integrations', href: '#' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#' },
  { label: 'Blog', href: '#' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-[#FF4F00] rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z" fill="white" fillOpacity="0.9"/>
                  <circle cx="9" cy="9" r="2.5" fill="white"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                gorgias
              </span>
            </Link>

            {/* Nav Links - center */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#FF4F00] hover:bg-orange-50 rounded-lg transition-all duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="#"
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#FF4F00] transition-colors"
              >
                Log in
              </Link>
              <Link
                href="#"
                className="btn-orange px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                Get started free
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? (
                  <>
                    <path d="M4 4 L18 18"/>
                    <path d="M18 4 L4 18"/>
                  </>
                ) : (
                  <>
                    <path d="M3 7h16"/>
                    <path d="M3 11h16"/>
                    <path d="M3 15h16"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#FF4F00] hover:bg-orange-50 rounded-xl transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <Link href="#" className="block text-center py-2 text-sm font-semibold text-gray-700">
                  Log in
                </Link>
                <Link href="#" className="btn-orange block text-center py-3 rounded-xl text-sm font-semibold">
                  Get started free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
