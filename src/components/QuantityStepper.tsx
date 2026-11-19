type Props = {
  quantity: number
  onChange: (next: number) => void
  label: string
}

export function QuantityStepper({ quantity, onChange, label }: Props) {
  return (
    <div className="inline-flex items-center rounded-full border border-stone-300 bg-white">
      <button
        type="button"
        aria-label={`Remove one ${label}`}
        onClick={() => onChange(quantity - 1)}
        className="h-8 w-8 rounded-full text-lg leading-none text-stone-700 hover:bg-stone-100"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-semibold tabular-nums">{quantity}</span>
      <button
        type="button"
        aria-label={`Add one ${label}`}
        onClick={() => onChange(quantity + 1)}
        className="h-8 w-8 rounded-full text-lg leading-none text-stone-700 hover:bg-stone-100"
      >
        +
      </button>
    </div>
  )
}
