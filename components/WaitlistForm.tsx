'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'

type SubmitState = 'idle' | 'loading' | 'error'

export default function WaitlistForm({
  source = 'launch',
  productSlug,
}: {
  source?: string
  productSlug?: string
}) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubmitState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const lastSubmitRef = useRef<number>(0)
  const router = useRouter()

  function validate(value: string): string {
    const trimmed = value.trim()
    if (!trimmed) return 'Vul een e-mailadres in.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Vul een geldig e-mailadres in.'
    return ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    // Anti-spam: debounce rapid submits (2s cooldown)
    const now = Date.now()
    if (now - lastSubmitRef.current < 2000) return
    lastSubmitRef.current = now

    const validationError = validate(email)
    if (validationError) {
      setErrorMsg(validationError)
      return
    }

    setState('loading')

    const trimmedEmail = email.trim().toLowerCase()

    const { error } = await supabase.from('waitlist').insert({
      email: trimmedEmail,
      source,
      product_slug: productSlug ?? null,
    })

    if (error) {
      console.error('[WaitlistForm] Supabase error:', error.code, error.message)
      // Postgres unique violation — email already registered, treat as success
      if (error.code === '23505') {
        redirectToThanks(trimmedEmail)
        return
      }
      setState('error')
      setErrorMsg(`Er ging iets mis. (${error.code ?? error.message})`)
      return
    }

    // Mirror to localStorage as read cache
    try {
      const existing = JSON.parse(localStorage.getItem('lume_waitlist') || '[]') as string[]
      if (!existing.includes(trimmedEmail)) {
        existing.push(trimmedEmail)
        localStorage.setItem('lume_waitlist', JSON.stringify(existing))
      }
    } catch {
      // ignore storage errors
    }

    redirectToThanks(trimmedEmail)
  }

  function redirectToThanks(email: string) {
    const params = new URLSearchParams({ source })
    if (productSlug) params.set('product', productSlug)
    // Store email briefly for personalisation on /thanks if needed
    try { sessionStorage.setItem('lume_registered_email', email) } catch { /* ignore */ }
    router.push(`/thanks?${params.toString()}`)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      noValidate
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (errorMsg) setErrorMsg('')
            if (state === 'error') setState('idle')
          }}
          placeholder="jouw@email.nl"
          required
          aria-label="E-mailadres voor wachtlijst"
          disabled={state === 'loading'}
          className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-gold shrink-0 px-6 py-3.5 rounded-xl text-[14px] font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px] active:scale-[0.97] transition-transform"
        >
          {state === 'loading' ? (
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".2"/>
              <path d="M12 3a9 9 0 019 9"/>
            </svg>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Schrijf me in
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <p className="mt-2 text-[12px] text-red-400 font-light">{errorMsg}</p>
      )}

      <p className="mt-3 text-[11px] text-[#9A9590] font-light">
        Geen verplichting. Geen spam. Je kunt je altijd uitschrijven.
      </p>
    </motion.form>
  )
}
