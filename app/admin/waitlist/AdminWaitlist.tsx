'use client'

import { useState } from 'react'
import type { WaitlistEntry } from '@/lib/supabase/client'

type TaskStatus = 'idle' | 'loading' | 'done' | 'error'
interface TaskState { status: TaskStatus; message?: string }

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso))
}

function downloadCSV(entries: WaitlistEntry[]) {
  const header = 'E-mail,Bron,Product,Datum'
  const rows = entries.map((e) =>
    [`"${e.email}"`, `"${e.source ?? ''}"`, `"${e.product_slug ?? ''}"`, `"${formatDate(e.created_at)}"`].join(',')
  )
  const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `mauyi-wachtlijst-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

const EMAIL_TASKS = [
  {
    id: 'launch',
    label: 'Lancerings-e-mail',
    desc: 'Verstuur de launch-aankondiging naar alle wachtlijst-inschrijvingen die hem nog niet hebben ontvangen.',
    badge: 'Wachtlijst',
    badgeClass: 'bg-[#FDF8F0] text-[#C9A96E] border-[#C9A96E]/20',
    btnLabel: 'Verstuur nu',
  },
  {
    id: 'tips',
    label: 'Dag-2 gebruikstips',
    desc: 'Verstuur 5 gebruikstips naar klanten met een betaalde bestelling van exact 2 dagen geleden.',
    badge: 'Bestellingen',
    badgeClass: 'bg-stone-50 text-stone-500 border-stone-200',
    btnLabel: 'Verstuur nu',
  },
  {
    id: 'tracking',
    label: 'Track & Trace',
    desc: 'Haal tracking codes op via MyParcel en stuur verzend-e-mails naar klanten zonder bevestiging.',
    badge: 'Bestellingen',
    badgeClass: 'bg-stone-50 text-stone-500 border-stone-200',
    btnLabel: 'Controleer nu',
  },
  {
    id: 'reviews',
    label: 'Review verzoek (dag 14)',
    desc: 'Vraag een review aan klanten met een bestelling van precies 14 dagen geleden.',
    badge: 'Bestellingen',
    badgeClass: 'bg-stone-50 text-stone-500 border-stone-200',
    btnLabel: 'Verstuur nu',
  },
  {
    id: 'winback',
    label: 'Nabestelling (dag 30)',
    desc: 'Herinner klanten met een bestelling van 30 dagen geleden aan het nabestellen.',
    badge: 'Bestellingen',
    badgeClass: 'bg-stone-50 text-stone-500 border-stone-200',
    btnLabel: 'Verstuur nu',
  },
  {
    id: 'lowstock',
    label: 'Lage voorraad check',
    desc: 'Controleer de voorraad van alle producten en stuur een interne melding bij lage stock.',
    badge: 'Voorraad',
    badgeClass: 'bg-red-50 text-red-500 border-red-100',
    btnLabel: 'Controleer nu',
  },
]

export default function AdminWaitlist() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [total, setTotal] = useState(0)
  const [taskStates, setTaskStates] = useState<Record<string, TaskState>>({})

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/admin/waitlist', { headers: { 'x-admin-password': password } })
    if (res.status === 401) { setError('Verkeerd wachtwoord.'); setLoading(false); return }
    if (!res.ok) { setError('Er ging iets mis.'); setLoading(false); return }
    const data = await res.json()
    setEntries(data.entries)
    setTotal(data.total)
    setAuthed(true)
    setLoading(false)
  }

  async function runTask(taskId: string) {
    setTaskStates(prev => ({ ...prev, [taskId]: { status: 'loading' } }))
    try {
      const res = await fetch('/api/admin/run-cron', {
        method: 'POST',
        headers: { 'x-admin-password': password, 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskId }),
      })
      const data = await res.json()
      if (!res.ok) {
        setTaskStates(prev => ({ ...prev, [taskId]: { status: 'error', message: data.error ?? 'Er ging iets mis.' } }))
      } else {
        setTaskStates(prev => ({ ...prev, [taskId]: { status: 'done', message: data.message } }))
      }
    } catch {
      setTaskStates(prev => ({ ...prev, [taskId]: { status: 'error', message: 'Netwerkfout.' } }))
    }
  }

  function resetTask(taskId: string) {
    setTaskStates(prev => ({ ...prev, [taskId]: { status: 'idle' } }))
  }

  // ── PASSWORD GATE ──────────────────────────────────────────────────────
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
            <h1 className="text-3xl font-semibold text-[#1A1A1A] leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
              MAUYI Admin
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
            <button type="submit" disabled={loading} className="btn-gold w-full py-3.5 rounded-xl text-[14px] font-semibold disabled:opacity-60">
              {loading ? 'Laden...' : 'Doorgaan'}
            </button>
            {error && <p className="text-[12px] text-red-400 text-center font-light">{error}</p>}
          </form>
        </div>
      </div>
    )
  }

  // ── DASHBOARD ──────────────────────────────────────────────────────────
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
            <h1 className="text-xl font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-cormorant)' }}>
              MAUYI Admin
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-3xl font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-cormorant)' }}>{total}</p>
              <p className="text-[11px] text-[#9A9590] font-light">wachtlijst</p>
            </div>
            {entries.length > 0 && (
              <button
                onClick={() => downloadCSV(entries)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 hover:border-[#C9A96E]/40 text-[12px] font-medium text-[#6B6560] hover:text-[#C9A96E] transition-all"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                CSV
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 space-y-12">

        {/* ── E-MAIL TAKEN ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A9590]">E-mail taken</p>
            <div className="flex-1 h-px bg-stone-100" />
            <p className="text-[11px] text-[#C8C4BF]">Dagelijks automatisch om 10:00 — of handmatig hieronder</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EMAIL_TASKS.map((task) => {
              const state = taskStates[task.id] ?? { status: 'idle' }
              return (
                <div key={task.id} className="bg-white rounded-2xl border border-stone-100 p-5 flex flex-col gap-4">
                  <div>
                    <span className={`inline-block text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border mb-2 ${task.badgeClass}`}>
                      {task.badge}
                    </span>
                    <p className="text-[14px] font-semibold text-[#1A1A1A] mb-1">{task.label}</p>
                    <p className="text-[12px] text-[#9A9590] leading-relaxed font-light">{task.desc}</p>
                  </div>

                  <div className="mt-auto">
                    {state.status === 'idle' && (
                      <button
                        onClick={() => runTask(task.id)}
                        className="btn-gold inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z"/>
                        </svg>
                        {task.btnLabel}
                      </button>
                    )}

                    {state.status === 'loading' && (
                      <span className="text-[12px] text-[#9A9590] animate-pulse">Bezig...</span>
                    )}

                    {state.status === 'done' && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                            <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
                              <path d="M2 6l3 3 5-5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-[12px] text-emerald-700 font-medium">{state.message}</span>
                        </div>
                        <button onClick={() => resetTask(task.id)} className="text-[11px] text-[#C8C4BF] hover:text-[#9A9590] underline transition-colors">
                          Opnieuw
                        </button>
                      </div>
                    )}

                    {state.status === 'error' && (
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] text-red-500">{state.message}</span>
                        <button onClick={() => resetTask(task.id)} className="text-[11px] text-[#C8C4BF] hover:text-[#9A9590] underline transition-colors">
                          Opnieuw
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── WACHTLIJST ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A9590]">Wachtlijst inschrijvingen</p>
            <div className="flex-1 h-px bg-stone-100" />
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-100">
              <p className="text-[#9A9590] font-light text-[15px]">Nog geen aanmeldingen.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-100">
                      <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9A9590]">E-mail</th>
                      <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9A9590]">Bron</th>
                      <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9A9590]">Product</th>
                      <th className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9A9590]">Datum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, i) => (
                      <tr key={entry.id} className={`border-b border-stone-50 last:border-0 hover:bg-[#FAF8F5] transition-colors ${i === 0 ? 'bg-[#FDF8F0]' : ''}`}>
                        <td className="px-5 py-3.5 font-medium text-[#1A1A1A] text-[13px]">
                          {entry.email}
                          {i === 0 && (
                            <span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-[#C9A96E] bg-[#FDF8F0] border border-[#C9A96E]/15 px-1.5 py-0.5 rounded-full">Nieuw</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-[#6B6560] text-[13px] font-light">{entry.source ?? '—'}</td>
                        <td className="px-5 py-3.5 text-[#6B6560] text-[13px] font-light">{entry.product_slug ?? '—'}</td>
                        <td className="px-5 py-3.5 text-[#9A9590] text-[12px] font-light whitespace-nowrap">{formatDate(entry.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
