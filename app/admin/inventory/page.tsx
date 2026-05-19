import { createClient } from '@supabase/supabase-js'

type InventoryItem = {
  id: string
  product_slug: string
  name: string
  quantity: number
  low_stock_threshold: number
  updated_at: string
}

export default async function AdminInventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const { key } = await searchParams

  if (!key || key !== process.env.ADMIN_KEY) {
    return (
      <main className="min-h-screen bg-[#0F0E0C] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#C9A96E] text-sm font-bold uppercase tracking-[0.2em] mb-3">MAUYI Admin</p>
          <p className="text-stone-500 text-sm">Toegang geweigerd. Voeg ?key=... toe aan de URL.</p>
        </div>
      </main>
    )
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: inventory } = await supabase
    .from('inventory')
    .select('*')
    .order('name')

  const items = (inventory ?? []) as InventoryItem[]
  const outOfStock = items.filter(i => i.quantity === 0).length
  const lowStock = items.filter(i => i.quantity > 0 && i.quantity <= i.low_stock_threshold).length
  const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <main className="min-h-screen bg-[#FAF8F5] p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#C9A96E] text-[10px] font-bold uppercase tracking-[0.25em]">MAUYI</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-400 text-[10px] uppercase tracking-[0.15em]">Admin</span>
            <span className="text-stone-300">·</span>
            <a href={`/admin/orders?key=${key}`} className="text-stone-400 text-[10px] uppercase tracking-[0.15em] hover:text-[#C9A96E]">
              Bestellingen
            </a>
          </div>
          <h1 className="text-3xl font-semibold text-[#1A1A1A]">Voorraad</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Totaal stuks', value: totalUnits },
            { label: 'Lage voorraad', value: lowStock, warn: lowStock > 0 },
            { label: 'Uitverkocht', value: outOfStock, warn: outOfStock > 0 },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-stone-100 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9590] mb-2">{stat.label}</p>
              <p className={`text-2xl font-semibold ${stat.warn ? 'text-red-500' : 'text-[#1A1A1A]'}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Inventory table */}
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-[#FAF8F5]">
                  {['Product', 'Slug', 'Voorraad', 'Drempel', 'Status', 'Bijgewerkt'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9590]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  const isOut = item.quantity === 0
                  const isLow = item.quantity > 0 && item.quantity <= item.low_stock_threshold
                  return (
                    <tr key={item.id} className="border-b border-stone-50 hover:bg-[#FAF8F5] transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1A1A1A]">{item.name}</td>
                      <td className="px-5 py-4 text-[11px] text-[#9A9590] font-mono">{item.product_slug}</td>
                      <td className="px-5 py-4">
                        <span className={`text-lg font-semibold ${isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-emerald-700'}`}>
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#9A9590] text-sm">{item.low_stock_threshold}</td>
                      <td className="px-5 py-4">
                        {isOut ? (
                          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border bg-red-50 text-red-600 border-red-200">
                            Uitverkocht
                          </span>
                        ) : isLow ? (
                          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
                            Laag
                          </span>
                        ) : (
                          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                            Op voorraad
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-[11px] text-[#9A9590]">
                        {new Date(item.updated_at).toLocaleDateString('nl-NL', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {items.length === 0 && (
            <div className="text-center py-20 text-[#9A9590]">
              <p className="text-sm">Geen voorraadgegevens gevonden.</p>
              <p className="text-xs mt-2">Voer de SQL-migratie uit in Supabase om te beginnen.</p>
            </div>
          )}
        </div>

        <p className="text-center text-[11px] text-stone-400 mt-8">
          MAUYI Admin · Voorraad wordt automatisch bijgewerkt bij bestellingen · {items.length} producten
        </p>
      </div>
    </main>
  )
}
