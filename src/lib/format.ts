// تنبيه: العملة لسه لازم تتأكد مع العميل.
export const CURRENCY_LABEL = 'ج.م'

export function formatPrice(value: number): string {
  return `${value.toLocaleString('ar-EG')} ${CURRENCY_LABEL}`
}

export function normalizeDigits(input: string): string {
  return input.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
}
