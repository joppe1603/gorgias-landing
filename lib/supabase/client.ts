import { createClient } from '@supabase/supabase-js'

// Fallback to placeholder during build if env vars are not yet set.
// At runtime the real values are required for any Supabase call to succeed.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WaitlistEntry = {
  id: string
  email: string
  source: string | null
  product_slug: string | null
  created_at: string
}
