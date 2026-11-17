import { DELIVERY_FEE, MENU, TAX_RATE } from '../data/menu'
import type { Cart, CartLine } from '../types'

export const formatMoney = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export function cartLines(cart: Cart): CartLine[] {
  return MENU.filter((item) => (cart[item.id] ?? 0) > 0).map((item) => {
    const quantity = cart[item.id]
    return { ...item, quantity, lineTotal: item.price * quantity }
  })
}

export function cartCount(cart: Cart): number {
  return Object.values(cart).reduce((sum, q) => sum + q, 0)
}

export function cartTotals(lines: CartLine[], fulfilment: 'delivery' | 'pickup') {
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0)
  const delivery = fulfilment === 'delivery' && subtotal > 0 ? DELIVERY_FEE : 0
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  const total = subtotal + delivery + tax
  return { subtotal, delivery, tax, total }
}
