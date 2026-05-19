import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.mauyi.nl'

function taskMessage(task: string, count: number): string {
  if (task === 'tips')     return count > 0 ? `${count} tips-e-mail(s) verstuurd.`           : 'Geen bestellingen in venster.'
  if (task === 'tracking') return count > 0 ? `${count} track & trace-e-mail(s) verstuurd.`  : 'Geen nieuwe tracking codes.'
  if (task === 'reviews')  return count > 0 ? `${count} review-e-mail(s) verstuurd.`         : 'Geen bestellingen in venster.'
  if (task === 'winback')  return count > 0 ? `${count} nabestel-e-mail(s) verstuurd.`       : 'Geen bestellingen in venster.'
  if (task === 'lowstock') return count > 0 ? `${count} product(en) onder drempel — melding verstuurd.` : 'Voorraad is op peil.'
  return 'Klaar.'
}

export async function POST(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { task } = (await req.json()) as { task: string }

  // Launch email uses its own dedicated endpoint
  if (task === 'launch') {
    const res = await fetch(`${BASE_URL}/api/admin/send-launch`, {
      method: 'POST',
      headers: { 'x-admin-password': password },
    })
    const data = await res.json()
    if (!res.ok) return NextResponse.json({ error: data.error ?? 'Fout.' }, { status: res.status })
    return NextResponse.json({ message: data.message })
  }

  // All other tasks proxy through the cron with ?task= filter
  const url = new URL('/api/cron/daily-tasks', BASE_URL)
  url.searchParams.set('task', task)

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Cron fout.' }, { status: 500 })
  }

  const data = await res.json()
  const countKey = task === 'lowstock' ? 'lowStock' : task
  const count: number = data[countKey] ?? 0

  return NextResponse.json({ message: taskMessage(task, count) })
}
