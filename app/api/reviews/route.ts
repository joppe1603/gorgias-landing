import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// GET /api/reviews?slug=reset-serum
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  const { data, error } = await supabase()
    .from('reviews')
    .select('id, name, rating, title, body, created_at, verified_purchase')
    .eq('product_slug', slug)
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json(data ?? [])
}

// POST /api/reviews
export async function POST(req: NextRequest) {
  const { slug, name, rating, title, body } = await req.json()

  if (!slug || !name || !rating || !body) {
    return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 })
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Ongeldige beoordeling.' }, { status: 400 })
  }
  if (body.length < 10 || body.length > 1000) {
    return NextResponse.json({ error: 'Review moet tussen 10 en 1000 tekens zijn.' }, { status: 400 })
  }

  const { error } = await supabase()
    .from('reviews')
    .insert({ product_slug: slug, name: name.trim(), rating, title: title?.trim() || null, body: body.trim(), approved: false })

  if (error) return NextResponse.json({ error: 'Opslaan mislukt.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
