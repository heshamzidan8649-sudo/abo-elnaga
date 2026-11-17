import { Link } from 'react-router-dom'
import ImageSlot from './ui/ImageSlot'
import { imageUrl } from '../lib/supabase'
import { formatPrice } from '../lib/format'
import type { Product } from '../types/database'

export default function ProductCard({ product }: { product: Product }) {
  const first = [...product.product_images].sort((a, b) => a.sort_order - b.sort_order)[0]
  const hasPrice = product.show_price && product.price != null

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block border border-white/10 bg-charcoal transition duration-500 hover:border-gold/60"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <ImageSlot
          src={first ? imageUrl(first.path) : null}
          alt={first?.alt_ar ?? product.name_ar}
          className="transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="border-t border-white/10 p-4">
        <h3 className="text-lg text-ivory transition group-hover:text-gold-soft">{product.name_ar}</h3>
        <p className="mt-1 text-sm text-gold">
          {hasPrice ? formatPrice(product.price as number) : 'اطلب السعر'}
        </p>
      </div>
    </Link>
  )
}
