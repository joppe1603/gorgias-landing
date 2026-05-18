import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0F0E0C] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none"
        aria-hidden
        style={{
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none mix-blend-overlay" aria-hidden>
        <filter id="grain-404">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-404)" />
      </svg>

      <div className="relative text-center max-w-lg">
        {/* 404 numeral */}
        <p
          className="font-semibold leading-none mb-8 select-none"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(7rem, 20vw, 14rem)',
            background: 'linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(232,201,138,0.25) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </p>

        {/* Divider */}
        <div
          className="mx-auto mb-8"
          style={{
            height: '1px',
            width: '80px',
            background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent)',
          }}
        />

        <h1
          className="text-white font-semibold leading-tight mb-4"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          }}
        >
          Deze pagina bestaat niet.
        </h1>

        <p className="text-stone-500 font-light text-[15px] leading-relaxed mb-10">
          De pagina die je zoekt is verplaatst, verwijderd of heeft nooit bestaan.<br />
          Geen zorgen — je vindt alles vanaf hier.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-[13px] font-medium border border-[#C9A96E]/30 text-[#C9A96E] hover:border-[#C9A96E]/60 hover:bg-[#C9A96E]/5 transition-all duration-200"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M10 6H2M6 2L2 6l4 4" />
            </svg>
            Terug naar home
          </Link>
          <Link
            href="/launch"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-medium text-stone-500 hover:text-stone-300 transition-colors"
          >
            Bekijk de lancering
          </Link>
        </div>
      </div>
    </main>
  )
}
