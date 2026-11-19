import { formatMoney } from "../lib/cart";
import type { PlacedOrder } from "../data/types";

type Props = {
  order: PlacedOrder;
  onNewOrder: () => void;
};

export function ConfirmationPage({ order, onNewOrder }: Props) {
  const { customer } = order;
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
        ✓
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        Order confirmed
      </h1>
      <p className="mt-2 text-stone-600">
        Thanks, {customer.fullName.split(" ")[0]}! A receipt has been "sent" to{" "}
        {customer.email}.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-stone-200">
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Order number</span>
          <span className="font-mono font-semibold">{order.id}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-stone-500">
            {customer.fulfilment === "delivery" ? "Delivering to" : "Pickup"}
          </span>
          <span className="text-right">
            {customer.fulfilment === "delivery"
              ? `${customer.address}, ${customer.city}`
              : "Ready in ~15 min"}
          </span>
        </div>
        <ul className="mt-4 space-y-2 border-t border-stone-200 pt-4 text-sm">
          {order.lines.map((l) => (
            <li key={l.id} className="flex justify-between">
              <span>
                {l.quantity}× {l.name}
              </span>
              <span className="tabular-nums">{formatMoney(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 font-bold">
          <span>Paid with card •••• {order.cardLast4}</span>
          <span className="tabular-nums">{formatMoney(order.total)}</span>
        </div>
      </div>

      <button
        onClick={onNewOrder}
        className="mt-8 rounded-full bg-stone-900 px-6 py-3 font-semibold text-white hover:bg-stone-800"
      >
        Start a new order
      </button>
    </div>
  );
}
