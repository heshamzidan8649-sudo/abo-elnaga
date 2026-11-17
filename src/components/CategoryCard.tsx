import { Link } from 'react-router-dom'
import ImageSlot from './ui/ImageSlot'
import { imageUrl } from '../lib/supabase'
import type { Category } from '../types/database'

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/collections?category=${category.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden border border-white/10 transition duration-500 hover:border-gold/60"
    >
      <ImageSlot
        src={category.image_path ? imageUrl(category.image_path) : null}
        alt={category.name_ar}
        className="transition duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="mb-3 h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
        <h3 className="font-display text-2xl text-ivory transition group-hover:text-gold-soft">
          {category.name_ar}
        </h3>
      </div>
    </Link>
  )
}
