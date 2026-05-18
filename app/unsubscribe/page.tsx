'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type State = 'idle' | 'loading' | 'done' | 'error'

export default function UnsubscribePage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const e = searchParams.get('email')
    if (e) setEmail(decodeURIComponent(e))
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')
    setState('loading')

    const res = await fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setState('error')
      setErrorMsg(data.error ?? 'Er ging iets mis. Probeer het opnieuw.')
      return
    }

    setState('done')
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#FAF8F5] min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">

          {state === 'done' ? (
            <>
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9A9590" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h1
                className="text-3xl font-semibold text-[#1A1A1A] mb-3"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Uitgeschreven.
              </h1>
              <p className="text-[14px] text-[#9A9590] font-light mb-8">
                Je e-mailadres is verwijderd van de wachtlijst. Je ontvangt geen berichten meer van ons.
              </p>
              <Link
                href="/"
                className="text-[13px] text-[#C9A96E] underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Terug naar home
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-5 h-px bg-[#C9A96E]/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Wachtlijst</span>
                <div className="w-5 h-px bg-[#C9A96E]/40" />
              </div>
              <h1
                className="text-3xl font-semibold text-[#1A1A1A] mb-3"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Uitschrijven
              </h1>
              <p className="text-[14px] text-[#9A9590] font-light mb-8">
                Vul je e-mailadres in om je uit te schrijven van de LUMÉ wachtlijst.
              </p>

              <form onSubmit={handleSubmit} className="text-left">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  required
                  disabled={state === 'loading'}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-colors disabled:opacity-60 mb-3"
                />
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="w-full bg-[#1A1A1A] text-white rounded-xl px-4 py-3.5 text-[14px] font-semibold disabled:opacity-60 hover:bg-[#2A2A2A] transition-colors"
                >
                  {state === 'loading' ? 'Bezig...' : 'Uitschrijven bevestigen'}
                </button>
                {errorMsg && (
                  <p className="mt-2 text-[12px] text-red-400 font-light">{errorMsg}</p>
                )}
              </form>

              <p className="mt-6 text-[12px] text-[#9A9590] font-light">
                Na uitschrijven ontvang je geen berichten meer van LUMÉ.
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
