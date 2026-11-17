interface Props {
  src?: string | null
  alt: string
  className?: string
}

// لو مفيش صورة بيظهر مكان مؤقت واضح، ولو فيه صورة بتظهر مباشرة.
export default function ImageSlot({ src, alt, className = '' }: Props) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
  }
  return (
    <div
      role="img"
      aria-label="الصورة لم تُضف بعد"
      className={`flex h-full w-full items-center justify-center border border-dashed border-white/15 bg-graphite/40 text-sm text-stone/70 ${className}`}
    >
      مكان الصورة
    </div>
  )
}
