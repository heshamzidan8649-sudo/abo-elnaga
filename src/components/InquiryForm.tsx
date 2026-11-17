import { useState, type FormEvent } from 'react'
import { sendInquiry } from '../lib/catalog'
import { normalizeDigits } from '../lib/format'

type Status = 'idle' | 'sending' | 'success' | 'error'

const field =
  'w-full border border-white/15 bg-charcoal px-4 py-3 text-ivory outline-none transition focus:border-gold'

export default function InquiryForm({ productId }: { productId?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = normalizeDigits(String(data.get('phone') ?? '')).replace(/[\s-]/g, '')
    const message = String(data.get('message') ?? '').trim()

    if (name.length < 2) return setError('اكتب اسمك من فضلك.')
    if (!/^\+?[0-9]{8,15}$/.test(phone)) return setError('رقم الهاتف غير صحيح.')
    if (message.length > 1000) return setError('الرسالة طويلة جداً (الحد الأقصى 1000 حرف).')

    setError(null)
    setStatus('sending')
    try {
      await sendInquiry({ name, phone, message, product_id: productId })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className="border border-gold/40 p-6 text-gold-soft">
        وصلنا طلبك، وهنتواصل معاك في أقرب وقت.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-stone">الاسم</label>
        <input id="name" name="name" autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm text-stone">رقم الهاتف</label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" className={`${field} text-right`} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-stone">رسالتك (اختياري)</label>
        <textarea id="message" name="message" rows={4} className={field} />
      </div>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-300">حصلت مشكلة أثناء الإرسال. حاول تاني.</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-gold px-8 py-3 font-semibold text-ink transition hover:bg-gold-soft disabled:opacity-60"
      >
        {status === 'sending' ? 'جارٍ الإرسال…' : 'إرسال الطلب'}
      </button>
    </form>
  )
}
