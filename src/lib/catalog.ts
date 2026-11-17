import { supabase } from './supabase'
import type { Category, InquiryInput, Product } from '../types/database'

const PRODUCT_SELECT =
  'id, category_id, slug, name_ar, description_ar, price, show_price, specs, is_featured, product_images(id, path, alt_ar, sort_order)'

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug, name_ar, image_path, sort_order')
    .order('sort_order')
  if (error) throw error
  return data ?? []
}

export async function getProducts(opts: { categoryId?: string; featured?: boolean } = {}): Promise<Product[]> {
  let q = supabase.from('products').select(PRODUCT_SELECT).order('created_at', { ascending: false })
  if (opts.categoryId) q = q.eq('category_id', opts.categoryId)
  if (opts.featured) q = q.eq('is_featured', true)
  const { data, error } = await q
  if (error) throw error
  return (data ?? []) as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('slug', slug)
    .maybeSingle()
  if (error) throw error
  return data as Product | null
}

export async function sendInquiry(input: InquiryInput): Promise<void> {
  const { error } = await supabase.from('inquiries').insert({
    name: input.name.trim(),
    phone: input.phone.trim(),
    message: input.message?.trim() || null,
    product_id: input.product_id ?? null,
  })
  if (error) throw error
}
