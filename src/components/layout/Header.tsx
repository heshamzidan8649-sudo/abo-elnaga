import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/collections', label: 'المجموعات', end: false },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="شعار أبو النجا للأثاث"
            className="h-12 w-12 object-cover ring-1 ring-gold/40"
          />
          <span className="font-display text-2xl font-bold text-gold">أبو النجا</span>
        </Link>
        <nav aria-label="القائمة الرئيسية" className="flex items-center gap-8 text-base">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `border-b pb-0.5 transition ${
                  isActive
                    ? 'border-gold text-gold'
                    : 'border-transparent text-stone hover:text-ivory'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href="#contact"
            className="hidden border border-gold/60 px-5 py-1.5 text-sm text-gold transition hover:bg-gold hover:text-ink sm:inline-block"
          >
            تواصل معنا
          </a>
        </nav>
      </div>
    </header>
  )
}
