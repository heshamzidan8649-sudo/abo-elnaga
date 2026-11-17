import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-gold/20 bg-charcoal">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="" className="h-12 w-12 object-cover ring-1 ring-gold/40" />
            <span className="font-display text-2xl font-bold text-gold">أبو النجا للأثاث</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-stone">مصنع ومعرض أثاث.</p>
        </div>

        <div>
          <h4 className="font-display text-xl text-ivory">روابط</h4>
          <div className="gold-line mt-3 max-w-[6rem]" />
          <ul className="mt-5 space-y-2 text-sm text-stone">
            <li><Link to="/" className="transition hover:text-gold">الرئيسية</Link></li>
            <li><Link to="/collections" className="transition hover:text-gold">المجموعات</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl text-ivory">تواصل معنا</h4>
          <div className="gold-line mt-3 max-w-[6rem]" />
          <p className="mt-5 text-sm text-stone">
            بيانات التواصل (الهاتف والعنوان) هتتضاف بعد تأكيدها من العميل.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-stone/80">
          © {new Date().getFullYear()} أبو النجا للأثاث. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
}
