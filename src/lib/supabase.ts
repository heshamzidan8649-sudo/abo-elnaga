import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  throw new Error('بيانات Supabase ناقصة في ملف .env.local')
}

export const supabase = createClient(url, key)

export function imageUrl(path: string): string {
  return supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl
}
