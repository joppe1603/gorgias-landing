'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import CheckoutUpsell from '@/components/CheckoutUpsell'
import { getAllProducts } from '@/lib/products'

const FREE_SHIPPING = 75
const STANDARD_SHIPPING = 4.99
type Step = 0 | 1 | 2
const STEPS = ['Winkelmand', 'Bezorging', 'Betaling'] as const

/* ─────────── Icons ─────────── */
function LockIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2"/>
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

/* ─────────── CartItem type ─────────── */
interface CartItem {
  slug: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

/* ─────────── Main component ─────────── */
export default function CheckoutForm() {
  const { state, total: cartTotal } = useCart()

  // Local cart state — initialized from global cart, editable in cart step
  const [cartItems, setCartItems] = useState<CartItem[]>(state.items)

  const [step, setStep] = useState<Step>(0)
  const [form, setForm] = useState({
    email: '',
    name: '',
    street: '',
    houseNumber: '',
    zipCode: '',
    city: '',
    country: 'NL',
  })
  const [shipMethod, setShipMethod] = useState<'standard' | 'express'>('standard')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showUpsell, setShowUpsell] = useState(false)

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const shippingCost = subtotal >= FREE_SHIPPING ? 0 : (shipMethod === 'express' ? 7.95 : STANDARD_SHIPPING)
  const orderTotal = subtotal + shippingCost

  // Single product suggestion for cart step (first not already in cart)
  const suggestedProduct = getAllProducts().find(
    p => p.availability === 'pre-launch' && p.slug !== 'test-sample' && !cartItems.find(i => i.slug === p.slug)
  )

  function updateQty(slug: string, delta: number) {
    setCartItems(prev => {
      const next = prev.map(i => i.slug === slug ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0)
      // If adding a product not in cart
      if (delta > 0 && !prev.find(i => i.slug === slug)) {
        const p = getAllProducts().find(p => p.slug === slug)
        if (p) return [...next, { slug: p.slug, name: p.name, price: p.price, image: p.heroImage, size: p.size, quantity: 1 }]
      }
      return next
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function submitToMollie(finalItems: CartItem[] = cartItems) {
    setError('')
    setLoading(true)
    const total = finalItems.reduce((s, i) => s + i.price * i.quantity, 0)
    const shipping = total >= FREE_SHIPPING ? 0 : (shipMethod === 'express' ? 7.95 : STANDARD_SHIPPING)
    const orderT = total + shipping
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: finalItems, form, total: orderT }),
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
    submitToMollie([...cartItems, { slug, name, price, image, size, quantity: 1 }])
  }

  function handleUpsellDecline() {
    setShowUpsell(false)
    submitToMollie()
  }

  function handlePayClick() {
    setError('')
    setShowUpsell(true)
  }

  // Guards
  const canGoStep1 = cartItems.length > 0
  const canGoStep2 = form.email.includes('@') && form.name.trim().length > 1 && form.street && form.houseNumber && form.zipCode && form.city

  if (state.items.length === 0 && cartItems.length === 0) {
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
          <Link href="/shop" className="btn-gold px-8 py-3 rounded-xl text-[14px] font-semibold">Bekijk producten</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      {/* ── Header ── */}
      <header className="bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[1.4rem] font-semibold text-[#1A1A1A] tracking-[0.08em]" style={{ fontFamily: 'var(--font-cormorant)' }}>
            MAUYI
          </Link>

          {/* Stepper */}
          <ol className="hidden sm:flex items-center gap-3 text-[11px]">
            {STEPS.map((label, i) => {
              const active = i === step
              const done = i < step
              return (
                <li key={label} className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    done ? 'bg-[#C9A96E] text-white' : active ? 'bg-[#1A1A1A] text-white' : 'bg-stone-100 text-stone-400'
                  }`}>
                    {done ? '✓' : i + 1}
                  </span>
                  <span className={`tracking-[0.08em] uppercase ${active ? 'text-[#1A1A1A] font-semibold' : done ? 'text-[#C9A96E]' : 'text-stone-300'}`}>
                    {label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="ml-1">
                      <path d="M4 7h6M7 4l3 3-3 3" stroke="#D4CFC9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </li>
              )
            })}
          </ol>

          <Link href="/shop" className="text-[12px] text-[#9A9590] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              <path d="M8 6H2M4 3L1 6l3 3"/>
            </svg>
            Winkelen
          </Link>
        </div>
        <div className="border-t border-stone-50 bg-[#FDFCFA] py-2">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-6">
            {[{ icon: <LockIcon />, label: 'SSL versleuteld' }, { icon: <CheckIcon />, label: 'Betaling via Mollie' }, { icon: <CheckIcon />, label: '30 dagen retour' }].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[10px] text-[#9A9590]">
                <span className="text-[#C9A96E]">{icon}</span>{label}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main grid ── */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_340px] gap-8 items-start">

        {/* LEFT: Steps */}
        <div className="space-y-5">

          {/* ── STEP 0: Winkelmand ── */}
          {step === 0 && (
            <section className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-50 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C9A96E] text-white text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                <h2 className="text-[13px] font-semibold text-[#1A1A1A]">Je winkelmand</h2>
              </div>
              <ul className="divide-y divide-stone-50">
                {cartItems.map(item => (
                  <li key={item.slug} className="flex gap-4 p-6">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0 border border-stone-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px"/>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[14px] font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-cormorant)' }}>{item.name}</p>
                          <p className="text-[11px] text-[#9A9590] mt-0.5">{item.size}</p>
                        </div>
                        <p className="text-[14px] font-semibold text-[#1A1A1A] tabular-nums">
                          €{(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center rounded-full border border-stone-200 bg-white">
                          <button onClick={() => updateQty(item.slug, -1)} className="w-8 h-8 flex items-center justify-center text-[#5C5754] hover:bg-stone-50 rounded-full transition-colors text-lg leading-none" aria-label="Min">−</button>
                          <span className="w-7 text-center text-[13px] tabular-nums text-[#1A1A1A]">{item.quantity}</span>
                          <button onClick={() => updateQty(item.slug, +1)} className="w-8 h-8 flex items-center justify-center text-[#5C5754] hover:bg-stone-50 rounded-full transition-colors text-lg leading-none" aria-label="Plus">+</button>
                        </div>
                        <button onClick={() => updateQty(item.slug, -item.quantity)} className="text-[11px] text-[#9A9590] hover:text-red-400 transition-colors">Verwijder</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Single inline product suggestion */}
              {suggestedProduct && (
                <div className="border-t border-stone-50 px-5 py-4">
                  <p className="text-[10px] font-semibold text-[#9A9590] uppercase tracking-[0.12em] mb-3">Voeg toe aan je routine</p>
                  <div className="flex items-center gap-3 bg-[#FAF8F5] rounded-2xl p-3 border border-stone-100">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white border border-stone-100">
                      <Image src={suggestedProduct.heroImage} alt={suggestedProduct.name} fill className="object-cover" sizes="56px"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#1A1A1A] truncate" style={{ fontFamily: 'var(--font-cormorant)' }}>{suggestedProduct.name}</p>
                      <p className="text-[11px] text-[#9A9590]">{suggestedProduct.size} · €{suggestedProduct.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <button
                      onClick={() => updateQty(suggestedProduct.slug, 1)}
                      className="shrink-0 btn-gold text-[12px] font-semibold rounded-full px-4 py-2 active:scale-[0.98] transition-transform"
                    >
                      + Voeg toe
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ── STEP 1: Bezorging ── */}
          {step === 1 && (
            <>
              <section className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-stone-50 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C9A96E] text-white text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                  <h2 className="text-[13px] font-semibold text-[#1A1A1A]">Contactgegevens</h2>
                </div>
                <div className="p-6 space-y-4">
                  <FormField label="E-mailadres" name="email" type="email" value={form.email} onChange={handleChange} placeholder="naam@voorbeeld.nl" hint="Bevestiging wordt hierheen gestuurd" required autoComplete="email"/>
                  <FormField label="Volledige naam" name="name" value={form.name} onChange={handleChange} placeholder="Voor- en achternaam" required autoComplete="name"/>
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-stone-50 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C9A96E] text-white text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
                  <h2 className="text-[13px] font-semibold text-[#1A1A1A]">Bezorgadres</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-[1fr_100px] gap-3">
                    <FormField label="Straatnaam" name="street" value={form.street} onChange={handleChange} placeholder="Dorpsstraat" required autoComplete="address-line1"/>
                    <FormField label="Huisnr." name="houseNumber" value={form.houseNumber} onChange={handleChange} placeholder="12A" required autoComplete="address-line2"/>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] gap-3">
                    <FormField label="Postcode" name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="1234 AB" required autoComplete="postal-code"/>
                    <FormField label="Stad" name="city" value={form.city} onChange={handleChange} placeholder="Amsterdam" required autoComplete="address-level2"/>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5C5754] uppercase tracking-[0.08em] mb-1.5">Land</label>
                    <select name="country" value={form.country} onChange={handleChange} autoComplete="country" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/10 transition-all bg-white">
                      <option value="NL">🇳🇱 Nederland</option>
                      <option value="BE">🇧🇪 België</option>
                      <option value="DE">🇩🇪 Duitsland</option>
                      <option value="FR">🇫🇷 Frankrijk</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-stone-50 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C9A96E] text-white text-[11px] font-bold flex items-center justify-center shrink-0">3</span>
                  <h2 className="text-[13px] font-semibold text-[#1A1A1A]">Bezorgmethode</h2>
                </div>
                <div className="p-6 space-y-2">
                  <ShipOption checked={shipMethod === 'standard'} onChange={() => setShipMethod('standard')} title="Standaard · PostNL" meta="2–4 werkdagen" right={subtotal >= FREE_SHIPPING ? 'Gratis' : '€4,99'}/>
                  <ShipOption checked={shipMethod === 'express'} onChange={() => setShipMethod('express')} title="Express · morgen in huis" meta="Bestel voor 22:00" right="€7,95"/>
                </div>
              </section>
            </>
          )}

          {/* ── STEP 2: Betaling ── */}
          {step === 2 && (
            <section className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-50 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C9A96E] text-white text-[11px] font-bold flex items-center justify-center shrink-0">4</span>
                <h2 className="text-[13px] font-semibold text-[#1A1A1A]">Betaalmethode</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2.5 mb-4">
                  {/* iDEAL */}
                  <div className="bg-white border border-stone-200 rounded-lg h-9 px-3 flex items-center justify-center gap-0.5 min-w-[64px]">
                    <span style={{ color: '#CC0066', fontWeight: 900, fontSize: 14, fontFamily: 'Arial Black, sans-serif', lineHeight: 1 }}>i</span>
                    <span style={{ color: '#000', fontWeight: 700, fontSize: 11, fontFamily: 'Arial, sans-serif' }}>DEAL</span>
                    <span style={{ color: '#CC0066', marginLeft: 2, fontSize: 18, lineHeight: 1 }}>●</span>
                  </div>
                  {/* Mastercard */}
                  <div className="bg-white border border-stone-200 rounded-lg h-9 px-3 flex items-center justify-center min-w-[56px]">
                    <div className="relative flex items-center" style={{ width: 34, height: 22 }}>
                      <div className="absolute rounded-full bg-[#EB001B]" style={{ width: 22, height: 22, left: 0 }}/>
                      <div className="absolute rounded-full bg-[#F79E1B]" style={{ width: 22, height: 22, left: 12, opacity: 0.95 }}/>
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
                  <LockIcon/>
                  <span>Je kiest je betaalmethode op de volgende pagina. Veilig verwerkt via <span className="font-medium text-[#5C5754]">Mollie</span>.</span>
                </div>
              </div>
            </section>
          )}

          {/* ── Error ── */}
          {error && (
            <div className="flex items-start gap-3 text-[13px] bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5" aria-hidden>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span className="text-red-600">{error}</span>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between pt-1">
            {step > 0 ? (
              <button onClick={() => setStep((step - 1) as Step)} className="text-[13px] text-[#9A9590] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden><path d="M8 6H2M4 3L1 6l3 3"/></svg>
                Terug
              </button>
            ) : (
              <Link href="/shop" className="text-[13px] text-[#9A9590] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden><path d="M8 6H2M4 3L1 6l3 3"/></svg>
                Verder winkelen
              </Link>
            )}

            {step < 2 && (
              <button
                disabled={(step === 0 && !canGoStep1) || (step === 1 && !canGoStep2)}
                onClick={() => setStep((step + 1) as Step)}
                className="btn-gold px-8 py-3.5 rounded-2xl font-semibold text-[14px] tracking-[0.01em] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 active:scale-[0.99] transition-transform"
              >
                {step === 0 && 'Naar bezorging'}
                {step === 1 && 'Naar betaling'}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                  <path d="M2 7h10M7 2l5 5-5 5"/>
                </svg>
              </button>
            )}

            {step === 2 && (
              <button
                onClick={handlePayClick}
                disabled={loading}
                className="btn-gold px-8 py-3.5 rounded-2xl font-semibold text-[14px] tracking-[0.01em] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2.5 active:scale-[0.99] transition-transform"
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
                    <LockIcon/>
                    Veilig betalen · €{orderTotal.toFixed(2).replace('.', ',')}
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 pt-1">
            <span className="flex items-center gap-1"><LockIcon/> SSL beveiligd</span>
            <span>·</span><span>Geen account nodig</span>
            <span>·</span><span>Gratis retour</span>
          </div>
        </div>

        {/* RIGHT: Order summary */}
        <aside className="lg:sticky lg:top-6 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-50">
              <h2 className="text-[13px] font-semibold text-[#1A1A1A]">Jouw bestelling</h2>
              <p className="text-[11px] text-[#9A9590] mt-0.5">{cartItems.reduce((s, i) => s + i.quantity, 0)} product{cartItems.reduce((s, i) => s + i.quantity, 0) !== 1 ? 'en' : ''}</p>
            </div>
            <div className="p-6 space-y-4">
              {cartItems.map(item => (
                <div key={item.slug} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0 border border-stone-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px"/>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C9A96E] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">{item.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{item.name}</p>
                    <p className="text-[11px] text-[#9A9590]">{item.size}</p>
                  </div>
                  <p className="text-[13px] font-semibold text-[#1A1A1A] tabular-nums shrink-0">€{(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 border-t border-stone-50 pt-4 space-y-2.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#9A9590]">Subtotaal</span>
                <span className="font-medium text-[#1A1A1A]">€{subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-[#9A9590]">Verzending · {shipMethod === 'express' ? 'Express' : 'Standaard'}</span>
                <span className={subtotal >= FREE_SHIPPING ? 'text-emerald-600 font-medium' : 'text-[#1A1A1A] font-medium'}>
                  {shippingCost === 0 ? 'Gratis' : `€${shippingCost.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              <div className="flex justify-between text-[15px] font-bold text-[#1A1A1A] pt-3 border-t border-stone-100">
                <span>Totaal</span>
                <span>€{orderTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <p className="text-[10px] text-[#9A9590]">Inclusief BTW</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-3">
            {['30 dagen retourrecht', 'Gratis retour — geen gedoe', '100% vegan & parfumvrij', 'Veilig betalen via Mollie', 'Bevestiging per e-mail'].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-[12px] text-[#5C5754]">
                <CheckIcon/>{item}
              </div>
            ))}
          </div>

          <div className="bg-[#FAF8F5] rounded-2xl border border-stone-100 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-stone-100 flex items-center justify-center shrink-0 text-[#5C5754]">
              <LockIcon size={14}/>
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
          cartSlugs={cartItems.map(i => i.slug)}
          onAccept={handleUpsellAccept}
          onDecline={handleUpsellDecline}
        />
      )}
    </main>
  )
}

/* ─────────── Sub-components ─────────── */
function FormField({ label, name, type = 'text', value, onChange, placeholder, hint, required, autoComplete }: {
  label: string; name: string; type?: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string; hint?: string; required?: boolean; autoComplete?: string
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#5C5754] uppercase tracking-[0.08em] mb-1.5">{label}</label>
      <input
        name={name} type={type} value={value} onChange={onChange}
        placeholder={placeholder} required={required} autoComplete={autoComplete}
        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder-stone-300 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/10 transition-all bg-white"
      />
      {hint && <p className="text-[10px] text-[#9A9590] mt-1.5">{hint}</p>}
    </div>
  )
}

function ShipOption({ checked, onChange, title, meta, right }: {
  checked: boolean; onChange: () => void; title: string; meta: string; right: string
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${checked ? 'border-[#C9A96E] bg-[#FDF8F0]' : 'border-stone-200 bg-white hover:border-stone-300'}`}
    >
      <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${checked ? 'border-[#C9A96E]' : 'border-stone-300'}`}>
        {checked && <span className="w-2 h-2 rounded-full bg-[#C9A96E]"/>}
      </span>
      <span className="flex-1">
        <span className="block text-[13px] font-semibold text-[#1A1A1A]">{title}</span>
        <span className="block text-[11px] text-[#9A9590] mt-0.5">{meta}</span>
      </span>
      <span className="text-[13px] font-medium text-[#1A1A1A] tabular-nums">{right}</span>
    </button>
  )
}
