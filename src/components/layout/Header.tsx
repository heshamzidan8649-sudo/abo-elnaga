import { Link, NavLink } from 'react-router-dom'

// الروابط بتتضاف كل ما نخلّص صفحة ونوافق عليها.
const links: { to: string; label: string }[] = []

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-display text-3xl font-bold text-gold">
          أبو النجا
        </Link>
        <nav aria-label="القائمة الرئيسية" className="flex gap-8 text-base">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? 'text-gold' : 'text-stone transition hover:text-ivory'
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
