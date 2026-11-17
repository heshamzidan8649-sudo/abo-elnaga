import { Link } from 'react-router-dom'
import { getCategories, getProducts } from '../lib/catalog'
import { useAsync } from '../lib/useAsync'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'

// نصوص مؤقتة: لازم تتراجع مع العميل قبل النشر.
const highlights = [
  { title: 'مصنع', text: 'نص مؤقت: وصف التصنيع هيتكتب بعد ما نعرف تفاصيل الشغل.' },
  { title: 'معرض', text: 'نص مؤقت: وصف المعرض والعنوان هيتأكدوا من العميل.' },
  { title: 'اطلب سعرك', text: 'تواصل معنا واحنا نرد عليك بالتفاصيل والسعر.' },
]

function SectionHeading({ title, to }: { title: string; to?: string }) {
  return (
    <div className="mb-12 flex items-end justify-between gap-6">
      <div className="flex-1">
        <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl">{title}</h2>
        <div className="gold-line mt-4 max-w-xs" />
      </div>
      {to && (
        <Link to={to} className="shrink-0 text-sm text-gold transition hover:text-gold-soft">
          عرض الكل ←
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  const categories = useAsync(getCategories, [])
  const featured = useAsync(() => getProducts({ featured: true }), [])

  return (
    <>
      <section className="hero-bg relative overflow-hidden border-b border-white/10">
        <div className="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="rise mb-6 flex items-center gap-4 text-sm tracking-wide text-gold">
              <span className="h-px w-12 bg-gold" />
              مصنع ومعرض أثاث
            </p>
            <h1 className="rise-2 font-display text-6xl font-bold leading-[1.15] md:text-8xl">
              <span className="gold-text">أبو النجا</span>
              <br />
              للأثاث
            </h1>
            <p className="rise-3 mt-8 max-w-md text-lg text-stone">
              نص تعريفي مؤقت. هيتكتب النص الحقيقي بعد ما نعرف تفاصيل الشغل من العميل.
            </p>
            <div className="rise-3 mt-10 flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="bg-gold px-9 py-3.5 font-medium text-ink transition hover:bg-gold-soft"
              >
                تصفّح المجموعات
              </Link>
              <a
                href="#contact"
                className="border border-gold/60 px-9 py-3.5 text-gold transition hover:border-gold hover:bg-gold/10"
              >
                تواصل معنا
              </a>
            </div>
          </div>
          <div className="rise-2 mx-auto w-full max-w-md">
            <img
              src="/logo.jpg"
              alt="شعار أبو النجا للأثاث"
              className="w-full [mask-image:radial-gradient(closest-side,black_70%,transparent)]"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-charcoal">
        <div className="mx-auto grid max-w-7xl gap-px px-6 md:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="py-10 md:px-8 md:first:ps-0 md:last:pe-0">
              <h3 className="font-display text-2xl text-gold">{h.title}</h3>
              <p className="mt-2 text-sm text-stone">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {categories.error && (
        <p role="alert" className="px-6 py-8 text-center text-red-300">{categories.error}</p>
      )}

      {categories.data && categories.data.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading title="المجموعات" to="/collections" />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
            {categories.data.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </section>
      )}

      {featured.data && featured.data.length > 0 && (
        <section className="border-t border-white/10 bg-charcoal/60">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeading title="منتجات مختارة" to="/collections" />
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
              {featured.data.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
