import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductBySlug } from '../lib/catalog'
import { useAsync } from '../lib/useAsync'
import { imageUrl } from '../lib/supabase'
import { formatPrice } from '../lib/format'
import ImageSlot from '../components/ui/ImageSlot'
import InquiryForm from '../components/InquiryForm'

export default function ProductDetails() {
  const { slug = '' } = useParams()
  const { data: product, loading, error } = useAsync(() => getProductBySlug(slug), [slug])
  const [active, setActive] = useState(0)

  if (loading) return <p role="status" className="py-32 text-center text-stone">جارٍ التحميل…</p>
  if (error) return <p role="alert" className="py-32 text-center text-red-300">{error}</p>
  if (!product) {
    return (
      <div className="py-32 text-center">
        <p className="text-stone">المنتج ده مش موجود.</p>
        <Link to="/collections" className="mt-6 inline-block text-gold">الرجوع للمجموعات</Link>
      </div>
    )
  }

  const images = [...product.product_images].sort((a, b) => a.sort_order - b.sort_order)
  const current = images[active]
  const hasPrice = product.show_price && product.price != null
  const specs = Object.entries(product.specs ?? {})

  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined
  const waLink = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`مرحباً، عايز أستفسر عن: ${product.name_ar}`)}`
    : null

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2">
      <div>
        <div className="aspect-square overflow-hidden">
          <ImageSlot src={current ? imageUrl(current.path) : null} alt={current?.alt_ar ?? product.name_ar} />
        </div>
        {images.length > 1 && (
          <ul className="mt-4 flex gap-3">
            {images.map((img, i) => (
              <li key={img.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`عرض الصورة ${i + 1}`}
                  className={`h-20 w-20 overflow-hidden border ${i === active ? 'border-gold' : 'border-white/15'}`}
                >
                  <ImageSlot src={imageUrl(img.path)} alt={img.alt_ar ?? product.name_ar} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h1 className="font-display text-5xl font-bold">{product.name_ar}</h1>
        <p className="mt-4 text-2xl text-gold">{hasPrice ? formatPrice(product.price as number) : 'اطلب السعر'}</p>
        {product.description_ar && <p className="mt-6 text-stone">{product.description_ar}</p>}

        {specs.length > 0 && (
          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3">
                <dt className="text-stone">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-10">
          <h2 className="mb-4 font-display text-3xl text-gold">اطلب أو استفسر</h2>
          <InquiryForm productId={product.id} />
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block border border-gold px-8 py-3 text-gold transition hover:bg-gold hover:text-ink"
            >
              تواصل عبر واتساب
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
