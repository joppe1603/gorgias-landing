import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllProducts } from '@/lib/products'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bestelling — MAUYI',
  robots: { index: false, follow: false },
}

const STATUS_CONFIG: Record<string, { label: string; desc: string; color: string; step: number }> = {
  pending:  { label: 'In behandeling', desc: 'Je betaling wordt verwerkt.',                                  color: 'text-amber-600 bg-amber-50 border-amber-200',   step: 0 },
  paid:     { label: 'Betaald',         desc: 'Je bestelling is bevestigd en wordt zo snel mogelijk verzonden.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', step: 1 },
  shipped:  { label: 'Verzonden',       desc: 'Je pakket is onderweg.',                                      color: 'text-blue-600 bg-blue-50 border-blue-200',       step: 2 },
  canceled: { label: 'Geannuleerd',     desc: 'Je bestelling is geannuleerd.',                               color: 'text-red-600 bg-red-50 border-red-200',          step: -1 },
  expired:  { label: 'Verlopen',        desc: 'De betaling is verlopen.',                                    color: 'text-stone-500 bg-stone-100 border-stone-200',   step: -1 },
  failed:   { label: 'Mislukt',         desc: 'De betaling is mislukt.',                                     color: 'text-red-600 bg-red-50 border-red-200',          step: -1 },
}

const TIMELINE_STEPS = ['Besteld', 'Betaald', 'Verzonden']

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: order } = await supabase
    .from('orders')
    .select('id, created_at, status, name, email, items, total, address, tracking_code, myparcel_shipment_id')
    .eq('id', id)
    .single()

  if (!order) notFound()

  const items = order.items as Array<{ name: string; quantity: number; price: number; size: string; slug?: string; image?: string }>
  const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending
  const products = getAllProducts()

  // Enrich items with images from product catalog
  const enrichedItems = items.map(item => {
    const product = item.slug ? products.find(p => p.slug === item.slug) : undefined
    return { ...item, heroImage: item.image ?? product?.heroImage ?? null }
  })

  const isNegative = status.step === -1

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF8F5] py-12">
        <div className="max-w-2xl mx-auto px-6">

          {/* Header */}
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A96E] mb-2">MAUYI</p>
            <h1 className="text-3xl font-semibold text-[#1A1A1A] mb-1" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Jouw bestelling
            </h1>
            <p className="text-[13px] text-[#9A9590]">#{order.id.slice(0, 8).toUpperCase()}</p>
          </div>

          {/* Status badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-[13px] font-semibold mb-2 ${status.color}`}>
            {status.label}
          </div>
          <p className="text-[14px] text-[#5C5754] mb-8">{status.desc}</p>

          {/* Status timeline — only for non-negative statuses */}
          {!isNegative && (
            <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-6">
              <div className="flex items-center gap-0">
                {TIMELINE_STEPS.map((label, i) => {
                  const done = i < status.step || (label === 'Verzonden' && !!order.tracking_code)
                  const active = i === status.step && !(label === 'Verzonden' && !order.tracking_code)
                  return (
                    <div key={label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all ${
                          done ? 'bg-[#C9A96E] border-[#C9A96E] text-white'
                            : active ? 'bg-white border-[#1A1A1A] text-[#1A1A1A]'
                            : 'bg-stone-50 border-stone-200 text-stone-300'
                        }`}>
                          {done ? (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : i + 1}
                        </div>
                        <span className={`text-[10px] mt-1.5 font-medium whitespace-nowrap ${done || active ? 'text-[#1A1A1A]' : 'text-stone-300'}`}>
                          {label}
                        </span>
                      </div>
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div className={`flex-1 h-px mx-2 mb-4 ${done ? 'bg-[#C9A96E]' : 'bg-stone-200'}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Track & Trace */}
          {order.tracking_code && (
            <div className="bg-white rounded-2xl border border-[#C9A96E]/30 p-6 mb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A9590] mb-3">Track & Trace</p>
              <a
                href={`https://track.postnl.nl/trace/${order.tracking_code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C9A96E] font-semibold hover:underline text-[14px]"
              >
                Volg je pakket via PostNL
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M2 6h8M6 2l4 4-4 4"/>
                </svg>
              </a>
              <p className="text-[11px] text-[#9A9590] mt-1">{order.tracking_code}</p>
            </div>
          )}

          {/* Items */}
          <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden mb-6">
            <div className="px-6 pt-5 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A9590]">Producten</p>
            </div>
            <div className="divide-y divide-stone-50">
              {enrichedItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  {item.heroImage && (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0 border border-stone-100">
                      <Image src={item.heroImage} alt={item.name} fill className="object-cover" sizes="56px"/>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C9A96E] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#1A1A1A]">{item.quantity}× {item.name}</p>
                    <p className="text-[11px] text-[#9A9590]">{item.size}</p>
                  </div>
                  <p className="text-[14px] font-semibold text-[#1A1A1A] tabular-nums shrink-0">
                    €{(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-100 px-6 py-4 flex justify-between items-center">
              <span className="text-[14px] font-semibold text-[#1A1A1A]">Totaal betaald</span>
              <span className="text-[15px] font-bold text-[#1A1A1A]">€{Number(order.total).toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A9590] mb-3">Bezorgadres</p>
            <p className="text-[13px] text-[#5C5754] leading-relaxed">
              {order.name}<br />
              {order.address?.street} {order.address?.houseNumber}<br />
              {order.address?.zipCode} {order.address?.city}<br />
              {order.address?.country === 'NL' ? 'Nederland' : order.address?.country === 'BE' ? 'België' : order.address?.country}
            </p>
          </div>

          <p className="text-center text-[11px] text-[#9A9590] mb-6">
            Besteld op {new Date(order.created_at).toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>

          <div className="text-center space-y-3">
            <p className="text-[12px] text-[#9A9590]">
              Vragen? Mail naar{' '}
              <a href="mailto:hello@mauyi.nl" className="text-[#C9A96E] hover:underline">hello@mauyi.nl</a>
            </p>
            <Link href="/shop" className="inline-block text-[13px] text-[#C9A96E] hover:underline">
              ← Terug naar producten
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
