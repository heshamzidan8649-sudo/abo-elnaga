import { Link } from 'react-router-dom'
import { getCategories, getProducts } from '../lib/catalog'
import { useAsync } from '../lib/useAsync'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/ui/Reveal'

// نصوص مؤقتة: لازم تتراجع مع العميل قبل النشر.
const highlights = [
  {
    no: '٠١',
    title: 'مصنع',
    text: 'نص مؤقت: وصف التصنيع هيتكتب بعد ما نعرف تفاصيل الشغل.',
    icon: 'M3 21V9l6 4V9l6 4V5h6v16H3z',
  },
  {
    no: '٠٢',
    title: 'معرض',
    text: 'نص مؤقت: وصف المعرض والعنوان هيتأكدوا من العميل.',
    icon: 'M3 10l9-6 9 6v10H3V10zm6 10v-6h6v6',
  },
  {
    no: '٠٣',
    title: 'اطلب سعرك',
    text: 'تواصل معنا واحنا نرد عليك بالتفاصيل والسعر.',
    icon: 'M4 5h16v11H8l-4 4V5z',
  },
]

function SectionHeading({ title, to, no }: { title: string; to?: string; no?: string }) {
  return (
    <Reveal className="mb-12 flex items-end justify-between gap-6">
      <div className="flex-1">
        {no && <span className="font-display text-lg text-gold/70">{no}</span>}
        <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl">{title}</h2>
        <div className="gold-line line-grow mt-4 max-w-xs" />
      </div>
      {to && (
        <Link to={to} className="shrink-0 text-sm text-gold transition hover:text-gold-soft">
          عرض الكل ←
        </Link>
      )}
    </Reveal>
  )
}

export default function Home() {
  const categories = useAsync(getCategories, [])
  const featured = useAsync(() => getProducts({ featured: true }), [])

  return (
    <>
      <section className="hero-bg hero-grain relative overflow-hidden border-b border-gold/20">
        <div className="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-8 px-6 py-10 md:grid-cols-2 md:gap-12 md:py-24">
          <div>
            <p className="rise mb-5 flex items-center gap-4 text-sm tracking-wide text-gold">
              <span className="h-px w-12 bg-gold" />
              أبو النجا للأثاث · مصنع ومعرض
            </p>
            <h1 className="rise-2 font-display text-5xl font-bold leading-[1.3] md:text-7xl">
              <span className="gold-text">أثاث يُصنع بإتقان</span>
              <br />
              <span className="text-ivory">ليدوم لسنين</span>
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
          <div className="rise-2 frame-gold order-first mx-auto w-full max-w-[16rem] sm:max-w-sm md:order-none md:max-w-md">
            <img
              src="/logo.jpg"
              alt="شعار أبو النجا للأثاث"
              className="w-full [mask-image:radial-gradient(closest-side,black_70%,transparent)]"
            />
          </div>
        </div>
      </section>

      <section className="section-glow border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <Reveal className="mb-14 text-center">
            <p className="mb-3 flex items-center justify-center gap-4 text-sm tracking-wide text-gold">
              <span className="h-px w-10 bg-gold/60" />
              ما نقدّمه
              <span className="h-px w-10 bg-gold/60" />
            </p>
            <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl">
              تفاصيل <span className="gold-text">تصنع الفرق</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 140}>
                <div className="group card-shine relative h-full border border-white/10 bg-ink/50 p-8 transition duration-500 hover:-translate-y-1.5 hover:border-gold/50 md:p-10">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-4 inset-e-4 font-display text-8xl font-bold text-gold/[0.07] transition duration-500 group-hover:text-gold/[0.14]"
                  >
                    {h.no}
                  </span>
                  <div className="diamond mb-9">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-gold" strokeWidth="1.2" aria-hidden="true">
                      <path d={h.icon} />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl text-ivory transition group-hover:text-gold-soft">{h.title}</h3>
                  <div className="mt-4 h-px w-10 bg-gold transition-all duration-500 group-hover:w-24" />
                  <p className="mt-5 text-sm leading-7 text-stone">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {categories.error && (
        <p role="alert" className="px-6 py-8 text-center text-red-300">{categories.error}</p>
      )}

      {categories.data && categories.data.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading no="٠١" title="المجموعات" to="/collections" />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
            {categories.data.map((c, i) => (
              <Reveal key={c.id} delay={(i % 4) * 100}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {featured.data && featured.data.length > 0 && (
        <section className="border-t border-white/10 bg-charcoal/60">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeading no="٠٢" title="منتجات مختارة" to="/collections" />
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
              {featured.data.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 100}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
