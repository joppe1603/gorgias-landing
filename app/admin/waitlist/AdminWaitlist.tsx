'use client'

import { useState } from 'react'
import type { WaitlistEntry } from '@/lib/supabase/client'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

export default function AdminWaitlist() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [total, setTotal] = useState(0)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/waitlist', {
      headers: { 'x-admin-password': password },
    })

    if (res.status === 401) {
      setError('Verkeerd wachtwoord.')
      setLoading(false)
      return
    }

    if (!res.ok) {
      setError('Er ging iets mis. Probeer opnieuw.')
      setLoading(false)
      return
    }

    const data = await res.json()
    setEntries(data.entries)
    setTotal(data.total)
    setAuthed(true)
    setLoading(false)
  }

  // ── PASSWORD GATE ─────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Admin</span>
              <div className="w-5 h-px bg-[#C9A96E]" />
            </div>
            <h1
              className="text-3xl font-semibold text-[#1A1A1A] leading-tight"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              LUMÉ Wachtlijst
            </h1>
            <p className="text-[13px] text-[#9A9590] mt-2 font-light">Voer het wachtwoord in om door te gaan.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wachtwoord"
              autoFocus
              required
              className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 rounded-xl text-[14px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Laden...' : 'Doorgaan'}
            </button>
            {error && (
              <p className="text-[12px] text-red-400 text-center font-light">{error}</p>
            )}
          </form>
        </div>
      </div>
    )
  }

  // ── DASHBOARD ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 px-6 sm:px-10 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-px bg-[#C9A96E]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Admin</span>
            </div>
            <h1
              className="text-xl font-semibold text-[#1A1A1A]"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              LUMÉ Wachtlijst
            </h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {total}
            </p>
            <p className="text-[11px] text-[#9A9590] font-light">aanmeldingen totaal</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10">
        {entries.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#9A9590] font-light text-[15px]">Nog geen aanmeldingen.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100">
                    <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9A9590]">
                      E-mail
                    </th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9A9590]">
                      Bron
                    </th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9A9590]">
                      Product
                    </th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9A9590]">
                      Datum
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, i) => (
                    <tr
                      key={entry.id}
                      className={`border-b border-stone-50 last:border-0 transition-colors hover:bg-[#FAF8F5] ${
                        i === 0 ? 'bg-[#FDF8F0]' : ''
                      }`}
                    >
                      <td className="px-5 py-3.5 font-medium text-[#1A1A1A] text-[13px]">
                        {entry.email}
                        {i === 0 && (
                          <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-[#C9A96E] bg-[#FDF8F0] border border-[#C9A96E]/15 px-1.5 py-0.5 rounded-full">
                            Nieuw
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-[#6B6560] text-[13px] font-light">
                        {entry.source ?? '—'}
                      </td>
                      <td className="px-5 py-3.5 text-[#6B6560] text-[13px] font-light">
                        {entry.product_slug ?? '—'}
                      </td>
                      <td className="px-5 py-3.5 text-[#9A9590] text-[12px] font-light whitespace-nowrap">
                        {formatDate(entry.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
