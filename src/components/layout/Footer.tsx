import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'

// بيانات التواصل لسه مش مؤكدة من العميل.
const contacts = [
  { label: 'الهاتف', value: 'يُضاف بعد التأكيد', icon: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z' },
  { label: 'العنوان', value: 'يُضاف بعد التأكيد', icon: 'M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' },
  { label: 'مواعيد العمل', value: 'تُضاف بعد التأكيد', icon: 'M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z' },
]

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-gold/30">
      <div className="cta-bg border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-24">
          <Reveal>
            <p className="mb-4 flex items-center justify-center gap-4 text-sm tracking-wide text-gold">
              <span className="h-px w-10 bg-gold/60" />
              تواصل معنا
              <span className="h-px w-10 bg-gold/60" />
            </p>
            <h2 className="font-display text-4xl font-bold leading-snug md:text-6xl">
              عندك فكرة أو محتاج <span className="gold-text">عرض سعر؟</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-stone">
              تصفّح المجموعات واختار اللي يعجبك، وبعدها كلّمنا واحنا نرد عليك بالتفاصيل.
            </p>
            <Link
              to="/collections"
              className="mt-9 inline-block bg-gold px-10 py-3.5 font-medium text-ink transition hover:bg-gold-soft"
            >
              تصفّح المجموعات
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {contacts.map((c, i) => (
              <Reveal key={c.label} delay={i * 120}>
                <div className="group card-shine flex items-center gap-5 border border-white/10 bg-ink/50 p-6 text-start transition duration-500 hover:border-gold/50">
                  <div className="diamond shrink-0 scale-75">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-gold" strokeWidth="1.3" aria-hidden="true">
                      <path d={c.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-xl text-ivory">{c.label}</p>
                    <p className="text-sm text-stone">{c.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-charcoal">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-4">
              <img src="/logo.jpg" alt="" className="h-16 w-16 object-cover ring-1 ring-gold/40" />
              <div>
                <p className="font-display text-3xl font-bold text-gold">أبو النجا</p>
                <p className="font-display text-lg text-ivory">للأثاث</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-7 text-stone">مصنع ومعرض أثاث.</p>
          </Reveal>

          <Reveal delay={120}>
            <h4 className="font-display text-xl text-ivory">روابط</h4>
            <div className="gold-line line-grow mt-3 max-w-[6rem]" />
            <ul className="mt-5 space-y-3 text-sm text-stone">
              <li><Link to="/" className="transition hover:text-gold">الرئيسية</Link></li>
              <li><Link to="/collections" className="transition hover:text-gold">المجموعات</Link></li>
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <h4 className="font-display text-xl text-ivory">للتواصل</h4>
            <div className="gold-line line-grow mt-3 max-w-[6rem]" />
            <p className="mt-5 text-sm leading-7 text-stone">
              بيانات التواصل هتتضاف بعد تأكيدها من العميل.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 text-sm text-stone/80">
            <span>© {new Date().getFullYear()} أبو النجا للأثاث. جميع الحقوق محفوظة.</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 border border-gold/40 px-4 py-1.5 text-gold transition hover:bg-gold hover:text-ink"
            >
              للأعلى <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
