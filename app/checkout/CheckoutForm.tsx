'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

const FREE_SHIPPING = 75

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, form, total: orderTotal }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Er is iets misgegaan. Probeer het opnieuw.')
        setLoading(false)
        return
      }

      // Redirect to Mollie checkout page
      window.location.href = data.checkoutUrl
    } catch {
      setError('Er is iets misgegaan. Probeer het opnieuw.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#9A9590] mb-6">Je winkelwagen is leeg.</p>
          <Link href="/shop" className="btn-gold px-8 py-3 rounded-xl text-[14px] font-semibold">
            Bekijk producten
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="bg-white border-b border-stone-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-[1.4rem] font-semibold text-[#1A1A1A] tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-cormorant)' }}>
            MAUYI
          </Link>
          <Link href="/shop" className="text-[12px] text-[#9A9590] hover:text-[#1A1A1A] transition-colors">
            ← Verder winkelen
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_380px] gap-10 items-start">

        {/* LEFT: Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Contact */}
          <section className="bg-white rounded-2xl border border-stone-100 p-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A9590] mb-5">
              Contactgegevens
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-[#5C5754] mb-1.5">E-mailadres</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="naam@voorbeeld.nl"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] transition-colors bg-white"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#5C5754] mb-1.5">Volledige naam</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Voor- en achternaam"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] transition-colors bg-white"
                />
              </div>
            </div>
          </section>

          {/* Shipping address */}
          <section className="bg-white rounded-2xl border border-stone-100 p-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A9590] mb-5">
              Bezorgadres
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-[1fr_100px] gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#5C5754] mb-1.5">Straatnaam</label>
                  <input
                    name="street"
                    type="text"
                    required
                    value={form.street}
                    onChange={handleChange}
                    placeholder="Straatnaam"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#5C5754] mb-1.5">Huisnr.</label>
                  <input
                    name="houseNumber"
                    type="text"
                    required
                    value={form.houseNumber}
                    onChange={handleChange}
                    placeholder="12A"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] transition-colors bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#5C5754] mb-1.5">Postcode</label>
                  <input
                    name="zipCode"
                    type="text"
                    required
                    value={form.zipCode}
                    onChange={handleChange}
                    placeholder="1234 AB"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] transition-colors bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#5C5754] mb-1.5">Stad</label>
                  <input
                    name="city"
                    type="text"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Amsterdam"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] transition-colors bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#5C5754] mb-1.5">Land</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] transition-colors bg-white"
                >
                  <option value="NL">Nederland</option>
                  <option value="BE">België</option>
                  <option value="DE">Duitsland</option>
                  <option value="FR">Frankrijk</option>
                </select>
              </div>
            </div>
          </section>

          {/* Payment method info */}
          <section className="bg-white rounded-2xl border border-stone-100 p-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A9590] mb-5">
              Betaalmethode
            </h2>
            <div className="flex items-center gap-3 text-[13px] text-[#5C5754]">
              <div className="flex gap-2">
                {['iDEAL', 'Mastercard', 'Visa', 'PayPal', 'Klarna'].map((m) => (
                  <span key={m} className="bg-[#FAF8F5] border border-stone-100 rounded-lg px-2.5 py-1 text-[11px] font-medium text-[#9A9590]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[12px] text-[#9A9590] mt-3 font-light">
              Je kiest je betaalmethode op de volgende pagina via Mollie.
            </p>
          </section>

          {error && (
            <p className="text-red-500 text-[13px] bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-[1.1rem] rounded-2xl font-semibold text-[15px] tracking-[0.01em] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Bezig met laden...' : `Doorgaan naar betalen · €${orderTotal.toFixed(2).replace('.', ',')}`}
          </button>

          <p className="text-center text-[11px] text-[#9A9590]">
            Beveiligd via Mollie · SSL versleuteld · iDEAL & creditcard
          </p>
        </form>

        {/* RIGHT: Order summary */}
        <aside className="bg-white rounded-2xl border border-stone-100 p-6 sticky top-6">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A9590] mb-5">
            Jouw bestelling
          </h2>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.slug} className="flex gap-3 items-center">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C9A96E] text-white text-[9px] font-bold flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{item.name}</p>
                  <p className="text-[11px] text-[#9A9590]">{item.size}</p>
                </div>
                <p className="text-[13px] font-semibold text-[#1A1A1A] tabular-nums shrink-0">
                  €{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-100 pt-4 space-y-2.5">
            <div className="flex justify-between text-[13px]">
              <span className="text-[#9A9590]">Subtotaal</span>
              <span className="font-medium text-[#1A1A1A]">€{total}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#9A9590]">Verzending</span>
              <span className={total >= FREE_SHIPPING ? 'text-[#C9A96E] font-medium' : 'text-[#1A1A1A]'}>
                {total >= FREE_SHIPPING ? 'Gratis' : '€4,99'}
              </span>
            </div>
            <div className="flex justify-between text-[15px] font-semibold text-[#1A1A1A] pt-2 border-t border-stone-100">
              <span>Totaal</span>
              <span>€{orderTotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
            {['30 dagen retourrecht', '100% vegan & parfumvrij', 'Veilig betalen via Mollie'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[11px] text-[#9A9590]">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <circle cx="5.5" cy="5.5" r="5" stroke="#C9A96E" strokeWidth="1"/>
                  <path d="M3.5 5.5l1.2 1.2L7.5 4" stroke="#C9A96E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}
