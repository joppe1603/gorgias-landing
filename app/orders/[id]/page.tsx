import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bestelling — LUMÉ',
  robots: { index: false, follow: false },
}

const STATUS_LABEL: Record<string, { label: string; desc: string; color: string }> = {
  pending: { label: 'In behandeling', desc: 'Je betaling wordt verwerkt.', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  paid: { label: 'Betaald', desc: 'Je bestelling is bevestigd en wordt zo snel mogelijk verzonden.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  canceled: { label: 'Geannuleerd', desc: 'Je bestelling is geannuleerd.', color: 'text-red-600 bg-red-50 border-red-200' },
  expired: { label: 'Verlopen', desc: 'De betaling is verlopen.', color: 'text-stone-500 bg-stone-100 border-stone-200' },
  failed: { label: 'Mislukt', desc: 'De betaling is mislukt.', color: 'text-red-600 bg-red-50 border-red-200' },
}

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

  const items = order.items as Array<{ name: string; quantity: number; price: number; size: string }>
  const status = STATUS_LABEL[order.status] ?? STATUS_LABEL.pending

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF8F5] py-16">
        <div className="max-w-2xl mx-auto px-6">

          {/* Header */}
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A96E] mb-2">LUMÉ</p>
            <h1 className="text-3xl font-semibold text-[#1A1A1A] mb-1">Jouw bestelling</h1>
            <p className="text-[13px] text-[#9A9590]">#{order.id.slice(0, 8).toUpperCase()}</p>
          </div>

          {/* Status */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-semibold mb-3 ${status.color}`}>
            {status.label}
          </div>
          <p className="text-[14px] text-[#5C5754] mb-8">{status.desc}</p>

          {/* Tracking */}
          {order.tracking_code && (
            <div className="bg-white rounded-2xl border border-[#C9A96E]/30 p-6 mb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A9590] mb-3">Track & Trace</p>
              <a
                href={`https://track.postnl.nl/trace/${order.tracking_code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A96E] font-semibold hover:underline text-[14px]"
              >
                Volg je pakket via PostNL → {order.tracking_code}
              </a>
            </div>
          )}

          {/* Items */}
          <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A9590] mb-5">Producten</p>
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="text-[14px] font-semibold text-[#1A1A1A]">{item.quantity}× {item.name}</p>
                    <p className="text-[11px] text-[#9A9590]">{item.size}</p>
                  </div>
                  <p className="text-[14px] font-semibold text-[#1A1A1A]">€{(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-100 mt-5 pt-4 flex justify-between">
              <span className="text-[15px] font-semibold text-[#1A1A1A]">Totaal betaald</span>
              <span className="text-[15px] font-semibold text-[#1A1A1A]">€{Number(order.total).toFixed(2).replace('.', ',')}</span>
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

          {/* Datum */}
          <p className="text-center text-[11px] text-[#9A9590] mb-6">
            Besteld op {new Date(order.created_at).toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>

          <div className="text-center">
            <Link href="/shop" className="text-[13px] text-[#C9A96E] hover:underline">← Terug naar producten</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
