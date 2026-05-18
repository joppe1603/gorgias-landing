import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

type Order = {
  id: string
  created_at: string
  status: string
  name: string
  email: string
  total: number
  items: Array<{ name: string; quantity: number; price: number; size: string }>
  address: { street: string; houseNumber: string; zipCode: string; city: string; country: string }
  mollie_payment_id: string | null
}

const STATUS_COLOR: Record<string, string> = {
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  canceled: 'bg-red-50 text-red-600 border-red-200',
  expired: 'bg-stone-100 text-stone-500 border-stone-200',
  failed: 'bg-red-50 text-red-600 border-red-200',
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const { key } = await searchParams

  if (!key || key !== process.env.ADMIN_KEY) {
    return (
      <main className="min-h-screen bg-[#0F0E0C] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#C9A96E] text-sm font-bold uppercase tracking-[0.2em] mb-3">LUMÉ Admin</p>
          <p className="text-stone-500 text-sm">Toegang geweigerd. Voeg ?key=... toe aan de URL.</p>
        </div>
      </main>
    )
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) return notFound()

  const totalRevenue = (orders as Order[])
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + Number(o.total), 0)

  const paidCount = (orders as Order[]).filter(o => o.status === 'paid').length

  return (
    <main className="min-h-screen bg-[#FAF8F5] p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#C9A96E] text-[10px] font-bold uppercase tracking-[0.25em]">LUMÉ</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-400 text-[10px] uppercase tracking-[0.15em]">Admin</span>
          </div>
          <h1 className="text-3xl font-semibold text-[#1A1A1A]">Bestellingen</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Totaal bestellingen', value: (orders as Order[]).length },
            { label: 'Betaald', value: paidCount },
            { label: 'Omzet', value: `€${totalRevenue.toFixed(2).replace('.', ',')}` },
            { label: 'In afwachting', value: (orders as Order[]).filter(o => o.status === 'pending').length },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-stone-100 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9590] mb-2">{stat.label}</p>
              <p className="text-2xl font-semibold text-[#1A1A1A]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-[#FAF8F5]">
                  {['Datum', 'Klant', 'Producten', 'Totaal', 'Status', 'Adres'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9590]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(orders as Order[]).map(order => (
                  <tr key={order.id} className="border-b border-stone-50 hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-4 text-[#9A9590] whitespace-nowrap text-xs">
                      {new Date(order.created_at).toLocaleDateString('nl-NL', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                      <br />
                      <span className="text-[10px]">
                        {new Date(order.created_at).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#1A1A1A]">{order.name}</p>
                      <p className="text-[11px] text-[#9A9590]">{order.email}</p>
                    </td>
                    <td className="px-5 py-4 max-w-[200px]">
                      {(order.items || []).map((item, i) => (
                        <p key={i} className="text-xs text-[#5C5754] truncate">
                          {item.quantity}× {item.name}
                        </p>
                      ))}
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#1A1A1A] whitespace-nowrap">
                      €{Number(order.total).toFixed(2).replace('.', ',')}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border ${STATUS_COLOR[order.status] ?? STATUS_COLOR.pending}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[11px] text-[#9A9590] whitespace-nowrap">
                      {order.address?.street} {order.address?.houseNumber}<br />
                      {order.address?.zipCode} {order.address?.city}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(orders as Order[]).length === 0 && (
            <div className="text-center py-20 text-[#9A9590]">
              <p className="text-sm">Nog geen bestellingen.</p>
            </div>
          )}
        </div>

        <p className="text-center text-[11px] text-stone-400 mt-8">
          LUMÉ Admin · Niet delen · {(orders as Order[]).length} bestellingen geladen
        </p>
      </div>
    </main>
  )
}
