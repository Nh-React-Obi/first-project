import { useMemo, useState } from "react";
import { QuantityStepper } from "../components/QuantityStepper";
import { MENU } from "../data/menu";
import { cartCount, cartLines, cartTotals, formatMoney } from "../lib/cart";
import type { Cart } from "../data/types";

type Props = {
  cart: Cart;
  setQuantity: (id: string, qty: number) => void;
  onCheckout: () => void;
};

const CATEGORIES = ["All", ...Array.from(new Set(MENU.map((m) => m.category)))];

export function OrderPage({ cart, setQuantity, onCheckout }: Props) {
  const [category, setCategory] = useState("All");
  const items =
    category === "All" ? MENU : MENU.filter((m) => m.category === category);
  const lines = useMemo(() => cartLines(cart), [cart]);
  const { subtotal } = cartTotals(lines, "pickup");
  const count = cartCount(cart);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_340px]">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Order food</h1>
        <p className="mt-1 text-stone-600">
          Pick your items, then head to checkout.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                c === category
                  ? "bg-stone-900 text-white"
                  : "bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const qty = cart[item.id] ?? 0;
            return (
              <li
                key={item.id}
                className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200"
              >
                <div className="flex h-24 items-center justify-center rounded-xl bg-amber-50 text-5xl">
                  {item.emoji}
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <h2 className="font-semibold">{item.name}</h2>
                  <span className="font-semibold tabular-nums">
                    {formatMoney(item.price)}
                  </span>
                </div>
                <p className="mt-1 flex-1 text-sm text-stone-500">
                  {item.description}
                </p>
                <div className="mt-4">
                  {qty === 0 ? (
                    <button
                      onClick={() => setQuantity(item.id, 1)}
                      className="w-full rounded-full bg-amber-500 py-2 text-sm font-semibold text-white hover:bg-amber-600"
                    >
                      Add to order
                    </button>
                  ) : (
                    <QuantityStepper
                      quantity={qty}
                      label={item.name}
                      onChange={(n) => setQuantity(item.id, n)}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200 lg:sticky lg:top-8">
        <h2 className="text-lg font-semibold">Your order</h2>
        {lines.length === 0 ? (
          <p className="mt-4 text-sm text-stone-500">Your cart is empty.</p>
        ) : (
          <ul className="mt-4 divide-y divide-stone-100">
            {lines.map((l) => (
              <li
                key={l.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {l.emoji} {l.name}
                  </p>
                  <p className="text-xs text-stone-500">
                    {formatMoney(l.lineTotal)}
                  </p>
                </div>
                <QuantityStepper
                  quantity={l.quantity}
                  label={l.name}
                  onChange={(n) => setQuantity(l.id, n)}
                />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 font-semibold">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatMoney(subtotal)}</span>
        </div>
        <button
          disabled={count === 0}
          onClick={onCheckout}
          className="mt-4 w-full rounded-full bg-stone-900 py-3 font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          Checkout {count > 0 && `(${count})`}
        </button>
      </aside>
    </div>
  );
}
