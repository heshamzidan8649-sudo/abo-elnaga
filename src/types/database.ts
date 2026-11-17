export interface Category {
  id: string
  slug: string
  name_ar: string
  image_path: string | null
  sort_order: number
}

export interface ProductImage {
  id: string
  path: string
  alt_ar: string | null
  sort_order: number
}

export interface Product {
  id: string
  category_id: string
  slug: string
  name_ar: string
  description_ar: string | null
  price: number | null
  show_price: boolean
  specs: Record<string, string>
  is_featured: boolean
  product_images: ProductImage[]
}

export interface InquiryInput {
  name: string
  phone: string
  message?: string
  product_id?: string
}
