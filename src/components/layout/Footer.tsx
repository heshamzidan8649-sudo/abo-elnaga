export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-stone">
        © {new Date().getFullYear()} أبو النجا للأثاث. جميع الحقوق محفوظة.
      </div>
    </footer>
  )
}
