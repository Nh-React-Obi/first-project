export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
  emoji: string
}

/** Cart maps item id -> quantity. */
export type Cart = Record<string, number>

export type CartLine = MenuItem & { quantity: number; lineTotal: number }

export type CustomerDetails = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  notes: string
  fulfilment: 'delivery' | 'pickup'
}

export type PlacedOrder = {
  id: string
  lines: CartLine[]
  total: number
  customer: CustomerDetails
  cardLast4: string
}
