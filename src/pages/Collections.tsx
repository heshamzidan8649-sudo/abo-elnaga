import { Link, useSearchParams } from 'react-router-dom'
import { getCategories, getProducts } from '../lib/catalog'
import { useAsync } from '../lib/useAsync'
import ProductCard from '../components/ProductCard'
import StateBlock from '../components/ui/StateBlock'
import type { Product } from '../types/database'

export default function Collections() {
  const [params] = useSearchParams()
  const slug = params.get('category')

  const cats = useAsync(getCategories, [])
  const activeCat = cats.data?.find((c) => c.slug === slug)
  const unknown = !!slug && !cats.loading && !cats.error && !activeCat

  const products = useAsync(
    () =>
      cats.loading || unknown
        ? Promise.resolve([] as Product[])
        : getProducts({ categoryId: activeCat?.id }),
    [cats.loading, unknown, activeCat?.id],
  )

  const pill = (active: boolean) =>
    `border px-5 py-2 text-sm transition ${
      active ? 'border-gold bg-gold text-ink' : 'border-white/15 text-stone hover:border-gold hover:text-ivory'
    }`

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-display text-5xl text-gold">المجموعات</h1>

      {cats.data && cats.data.length > 0 && (
        <nav aria-label="تصفية حسب القسم" className="mt-8 flex flex-wrap gap-3">
          <Link to="/collections" className={pill(!slug)} aria-current={!slug ? 'page' : undefined}>
            الكل
          </Link>
          {cats.data.map((c) => (
            <Link
              key={c.id}
              to={`/collections?category=${c.slug}`}
              className={pill(c.slug === slug)}
              aria-current={c.slug === slug ? 'page' : undefined}
            >
              {c.name_ar}
            </Link>
          ))}
        </nav>
      )}

      <div className="mt-10">
        {unknown ? (
          <p className="py-16 text-center text-stone">القسم ده مش موجود.</p>
        ) : (
          <StateBlock
            loading={cats.loading || products.loading}
            error={cats.error ?? products.error}
            isEmpty={!products.data || products.data.length === 0}
            emptyText="مفيش منتجات هنا لسه."
          >
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {products.data?.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </StateBlock>
        )}
      </div>
    </section>
  )
}
