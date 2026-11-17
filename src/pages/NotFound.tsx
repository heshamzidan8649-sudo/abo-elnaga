import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 text-center">
      <h1 className="font-display text-6xl font-bold text-gold">404</h1>
      <p className="mt-4 text-stone">الصفحة دي مش موجودة.</p>
      <Link to="/" className="mt-8 inline-block border border-gold px-6 py-3 text-gold transition hover:bg-gold hover:text-ink">
        الرجوع للرئيسية
      </Link>
    </section>
  )
}
