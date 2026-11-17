import type { ReactNode } from 'react'

interface Props {
  loading: boolean
  error: string | null
  isEmpty: boolean
  emptyText: string
  children: ReactNode
}

export default function StateBlock({ loading, error, isEmpty, emptyText, children }: Props) {
  if (loading) return <p role="status" className="py-16 text-center text-stone">جارٍ التحميل…</p>
  if (error) return <p role="alert" className="py-16 text-center text-red-300">{error}</p>
  if (isEmpty) return <p className="py-16 text-center text-stone">{emptyText}</p>
  return <>{children}</>
}
