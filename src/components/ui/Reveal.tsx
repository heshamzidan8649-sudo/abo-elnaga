import { useEffect, useRef, useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  from?: 'up' | 'left' | 'right' | 'fade'
  className?: string
}

// بيظهر العنصر بحركة أول ما يدخل الشاشة (مرة واحدة).
export default function Reveal({ children, delay = 0, from = 'up', className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal reveal-${from} ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
