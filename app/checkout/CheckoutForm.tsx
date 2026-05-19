'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import CheckoutUpsell from '@/components/CheckoutUpsell'

const FREE_SHIPPING = 75

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="5.5" stroke="#C9A96E" strokeWidth="0.8"/>
      <path d="M3.5 6l1.5 1.5L8.5 4" stroke="#C9A96E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function CheckoutForm() {
  const { state, total } = useCart()
  const { items } = state
  const router = useRouter()

  const shippingCost = total >= FREE_SHIPPING ? 0 : 4.99
  const orderTotal = total + shippingCost

  const [form, setForm] = useState({
    email: '',
    name: '',
    street: '',
    houseNumber: '',
    zipCode: '',
    city: '',
    country: 'NL',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showUpsell, setShowUpsell] = useState(false)
  const [pendingSubmit, setPendingSubmit] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function submitToMollie(currentItems = items) {
    setError('')
    setLoading(true)
    const currentTotal = currentItems.reduce((s, i) => s + i.price * i.quantity, 0)
    const currentShipping = currentTotal >= FREE_SHIPPING ? 0 : 4.99
    const currentOrderTotal = currentTotal + currentShipping

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: currentItems, form, total: currentOrderTotal }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Er is iets misgegaan. Probeer het opnieuw.')
        setLoading(false)
        return
      }
      window.location.href = data.checkoutUrl
    } catch {
      setError('Er is iets misgegaan. Probeer het opnieuw.')
      setLoading(false)
    }
  }

  function handleUpsellAccept(slug: string, name: string, price: number, image: string, size: string) {
    setShowUpsell(false)
    const upsellItem = { slug, name, price, image, size, quantity: 1 }
    submitToMollie([...items, upsellItem])
  }

  function handleUpsellDecline() {
    setShowUpsell(false)
    submitToMollie()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setShowUpsell(true)
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A9590" strokeWidth="1.5" aria-hidden>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <p className="text-[#1A1A1A] font-semibold mb-2">Je winkelwagen is leeg</p>
          <p className="text-[#9A9590] text-[13px] mb-8">Voeg een product toe om door te gaan.</p>
          <Link href="/shop" className="btn-gold px-8 py-3 rounded-xl text-[14px] font-semibold">
            Bekijk producten
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      {/* ── Header ── */}
      <header className="bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-[1.4rem] font-semibold text-[#1A1A1A] tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            MAUYI
          </Link>

          {/* Progress steps */}
          <div className="hidden sm:flex items-center gap-2 text-[11px]">
            <span className="font-semibold text-[#C9A96E]">Gegevens</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M4 7h6M7 4l3 3-3 3" stroke="#D4CFC9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-stone-300">Betaling</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M4 7h6M7 4l3 3-3 3" stroke="#D4CFC9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-stone-300">Klaar</span>
          </div>

          <Link href="/shop" className="text-[12px] text-[#9A9590] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden><path d="M8 6H2M4 3L1 6l3 3"/></svg>
            Verder winkelen
          </Link>
        </div>

        {/* Security bar */}
        <div className="border-t border-stone-50 bg-[#FDFCFA] py-2">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-6">
            {[
              { icon: <LockIcon />, label: 'SSL versleuteld' },
              { icon: <CheckIcon />, label: 'Betaling via Mollie' },
              { icon: <CheckIcon />, label: '30 dagen retour' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[10px] text-[#9A9590]">
                <span className="text-[#C9A96E]">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main grid ── */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_360px] gap-8 items-start">

        {/* LEFT: Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* 1 — Contact */}
          <section className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-50 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C9A96E] text-white text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
              <h2 className="text-[13px] font-semibold text-[#1A1A1A]">Contactgegevens</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#5C5754] uppercase tracking-[0.08em] mb-1.5">E-mailadres</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="naam@voorbeeld.nl"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/10 transition-all bg-white"
                />
                <p className="text-[10px] text-[#9A9590] mt-1.5">Bevestiging van je bestelling wordt hierheen gestuurd</p>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#5C5754] uppercase tracking-[0.08em] mb-1.5">Volledige naam</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Voor- en achternaam"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/10 transition-all bg-white"
                />
              </div>
            </div>
          </section>

          {/* 2 — Shipping */}
          <section className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-50 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C9A96E] text-white text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
              <h2 className="text-[13px] font-semibold text-[#1A1A1A]">Bezorgadres</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-[1fr_100px] gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5C5754] uppercase tracking-[0.08em] mb-1.5">Straatnaam</label>
                  <input
                    name="street"
                    type="text"
                    required
                    value={form.street}
                    onChange={handleChange}
                    placeholder="Dorpsstraat"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/10 transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5C5754] uppercase tracking-[0.08em] mb-1.5">Huisnr.</label>
                  <input
                    name="houseNumber"
                    type="text"
                    required
                    value={form.houseNumber}
                    onChange={handleChange}
                    placeholder="12A"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/10 transition-all bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5C5754] uppercase tracking-[0.08em] mb-1.5">Postcode</label>
                  <input
                    name="zipCode"
                    type="text"
                    required
                    value={form.zipCode}
                    onChange={handleChange}
                    placeholder="1234 AB"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/10 transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5C5754] uppercase tracking-[0.08em] mb-1.5">Stad</label>
                  <input
                    name="city"
                    type="text"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Amsterdam"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/10 transition-all bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#5C5754] uppercase tracking-[0.08em] mb-1.5">Land</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/10 transition-all bg-white"
                >
                  <option value="NL">🇳🇱 Nederland</option>
                  <option value="BE">🇧🇪 België</option>
                  <option value="DE">🇩🇪 Duitsland</option>
                  <option value="FR">🇫🇷 Frankrijk</option>
                </select>
              </div>

              {/* Shipping info */}
              <div className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[12px] ${total >= FREE_SHIPPING ? 'bg-[#F0F9F4] border border-emerald-100' : 'bg-[#FAF8F5] border border-stone-100'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={total >= FREE_SHIPPING ? '#22c55e' : '#9A9590'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                {total >= FREE_SHIPPING ? (
                  <span className="text-emerald-700 font-medium">Gratis verzending inbegrepen</span>
                ) : (
                  <span className="text-[#9A9590]">Nog <span className="font-semibold text-[#1A1A1A]">€{(FREE_SHIPPING - total).toFixed(0)}</span> voor gratis verzending</span>
                )}
              </div>
            </div>
          </section>

          {/* 3 — Payment method */}
          <section className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-50 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C9A96E] text-white text-[11px] font-bold flex items-center justify-center shrink-0">3</span>
              <h2 className="text-[13px] font-semibold text-[#1A1A1A]">Betaalmethode</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2.5 mb-4">
                {/* iDEAL */}
                <div className="bg-white border border-stone-200 rounded-lg h-9 px-3 flex items-center justify-center gap-0.5 min-w-[64px]">
                  <span style={{ color: '#CC0066', fontWeight: 900, fontSize: 14, fontFamily: 'Arial Black, sans-serif', lineHeight: 1 }}>i</span>
                  <span style={{ color: '#000', fontWeight: 700, fontSize: 11, fontFamily: 'Arial, sans-serif', letterSpacing: 0 }}>DEAL</span>
                  <span style={{ color: '#CC0066', marginLeft: 2, fontSize: 18, lineHeight: 1 }}>●</span>
                </div>
                {/* Mastercard */}
                <div className="bg-white border border-stone-200 rounded-lg h-9 px-3 flex items-center justify-center min-w-[56px]">
                  <div className="relative flex items-center" style={{ width: 34, height: 22 }}>
                    <div className="absolute rounded-full bg-[#EB001B]" style={{ width: 22, height: 22, left: 0 }} />
                    <div className="absolute rounded-full bg-[#F79E1B]" style={{ width: 22, height: 22, left: 12, opacity: 0.95 }} />
                  </div>
                </div>
                {/* Visa */}
                <div className="bg-white border border-stone-200 rounded-lg h-9 px-3 flex items-center justify-center min-w-[56px]">
                  <span style={{ color: '#1A1F71', fontWeight: 900, fontStyle: 'italic', fontSize: 17, fontFamily: 'Arial Black, sans-serif', letterSpacing: -0.5 }}>VISA</span>
                </div>
                {/* PayPal */}
                <div className="bg-white border border-stone-200 rounded-lg h-9 px-3 flex items-center justify-center min-w-[64px]">
                  <span style={{ color: '#003087', fontWeight: 800, fontSize: 12, fontFamily: 'Arial, sans-serif' }}>Pay</span>
                  <span style={{ color: '#009CDE', fontWeight: 800, fontSize: 12, fontFamily: 'Arial, sans-serif' }}>Pal</span>
                </div>
                {/* Klarna */}
                <div className="rounded-lg h-9 px-3 flex items-center justify-center min-w-[64px]" style={{ backgroundColor: '#FFB3C7' }}>
                  <span style={{ color: '#17120E', fontWeight: 800, fontSize: 12, fontFamily: 'Arial, sans-serif', letterSpacing: 0.2 }}>klarna</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#9A9590]">
                <LockIcon />
                <span>Je kiest je betaalmethode op de volgende pagina. Veilig verwerkt via <span className="font-medium text-[#5C5754]">Mollie</span>.</span>
              </div>
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 text-[13px] bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5" aria-hidden>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span className="text-red-600">{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-[1.15rem] rounded-2xl font-semibold text-[15px] tracking-[0.01em] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 active:scale-[0.99] transition-transform"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25"/><path d="M21 12a9 9 0 00-9-9"/>
                </svg>
                Bezig met doorsturen…
              </>
            ) : (
              <>
                <LockIcon />
                Veilig betalen · €{orderTotal.toFixed(2).replace('.', ',')}
              </>
            )}
          </button>

          {/* Microcopy */}
          <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400">
            <span className="flex items-center gap-1"><LockIcon /> SSL beveiligd</span>
            <span>·</span>
            <span>Geen account nodig</span>
            <span>·</span>
            <span>Gratis retour</span>
          </div>
        </form>

        {/* RIGHT: Order summary */}
        <aside className="sticky top-6 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-50">
              <h2 className="text-[13px] font-semibold text-[#1A1A1A]">Jouw bestelling</h2>
              <p className="text-[11px] text-[#9A9590] mt-0.5">{items.length} {items.length === 1 ? 'product' : 'producten'}</p>
            </div>

            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0 border border-stone-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C9A96E] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{item.name}</p>
                    <p className="text-[11px] text-[#9A9590]">{item.size}</p>
                  </div>
                  <p className="text-[13px] font-semibold text-[#1A1A1A] tabular-nums shrink-0">
                    €{(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6 border-t border-stone-50 pt-4 space-y-2.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#9A9590]">Subtotaal</span>
                <span className="font-medium text-[#1A1A1A]">€{total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-[#9A9590]">Verzending</span>
                <span className={total >= FREE_SHIPPING ? 'text-emerald-600 font-medium' : 'text-[#1A1A1A] font-medium'}>
                  {total >= FREE_SHIPPING ? 'Gratis' : '€4,99'}
                </span>
              </div>
              <div className="flex justify-between text-[15px] font-bold text-[#1A1A1A] pt-3 border-t border-stone-100">
                <span>Totaal</span>
                <span>€{orderTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <p className="text-[10px] text-[#9A9590]">Inclusief BTW</p>
            </div>
          </div>

          {/* Trust card */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-3">
            {[
              '30 dagen retourrecht',
              'Gratis retour — geen gedoe',
              '100% vegan & parfumvrij',
              'Veilig betalen via Mollie',
              'Bevestiging per e-mail',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-[12px] text-[#5C5754]">
                <CheckIcon />
                {item}
              </div>
            ))}
          </div>

          {/* Mollie badge */}
          <div className="bg-[#FAF8F5] rounded-2xl border border-stone-100 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-stone-100 flex items-center justify-center shrink-0">
              <LockIcon />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#1A1A1A]">Beveiligd door Mollie</p>
              <p className="text-[10px] text-[#9A9590]">256-bit SSL encryptie · PCI DSS compliant</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Upsell popup */}
      {showUpsell && (
        <CheckoutUpsell
          cartSlugs={items.map((i) => i.slug)}
          onAccept={handleUpsellAccept}
          onDecline={handleUpsellDecline}
        />
      )}
    </main>
  )
}
