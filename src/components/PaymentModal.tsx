import { useEffect, useRef, useState, type FormEvent } from "react";
import { formatMoney } from "../lib/cart";

type Props = {
  amount: number;
  onClose: () => void;
  onSuccess: (cardLast4: string) => void;
};

type Status = "idle" | "processing" | "declined";

/** Cards ending in this number always decline, so the failure path can be tested. */
const DECLINE_SUFFIX = "0002";

const digits = (s: string) => s.replace(/\D/g, "");

function luhnValid(num: string): boolean {
  let sum = 0;
  let double = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let d = Number(num[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return num.length >= 12 && sum % 10 === 0;
}

function formatCard(v: string) {
  return digits(v)
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(v: string) {
  const d = digits(v).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

function cardBrand(num: string) {
  if (/^4/.test(num)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(num)) return "Mastercard";
  if (/^3[47]/.test(num)) return "Amex";
  return "";
}

export function PaymentModal({ amount, onClose, onSuccess }: Props) {
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const firstInput = useRef<HTMLInputElement>(null);

  const processing = status === "processing";

  useEffect(() => {
    firstInput.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !processing) onClose();
    };

    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, processing]);

  const validate = () => {
    const e: Record<string, string> = {};
    const num = digits(card);
    if (!luhnValid(num)) e.card = "Card number is invalid";
    if (!name.trim()) e.name = "Enter the name on the card";
    const [mm, yy] = expiry.split("/").map(Number);
    const now = new Date();
    const expDate = new Date(2000 + (yy || 0), mm || 0); // first day of the month after expiry
    if (!mm || mm > 12 || !yy || expDate <= now) e.expiry = "Expiry is invalid";
    if (!/^\d{3,4}$/.test(cvc)) e.cvc = "CVC is invalid";
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("processing");
    const num = digits(card);
    window.setTimeout(() => {
      if (num.endsWith(DECLINE_SUFFIX)) {
        setStatus("declined");
      } else {
        onSuccess(num.slice(-4));
      }
    }, 1800);
  };

  const brand = cardBrand(digits(card));
  const inputCls = (err?: string) =>
    `mt-1 w-full rounded-lg border bg-white px-3 py-2 outline-none focus:ring-2 disabled:bg-stone-100 ${
      err
        ? "border-red-400 focus:ring-red-200"
        : "border-stone-300 focus:border-amber-500 focus:ring-amber-200"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/50 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !processing) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 id="payment-title" className="text-xl font-bold">
              Payment
            </h2>
            <p className="text-sm text-stone-500">
              Amount due:{" "}
              <span className="font-semibold text-stone-900">{formatMoney(amount)}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={processing}
            aria-label="Close"
            className="rounded-full p-1 text-2xl leading-none text-stone-400 hover:bg-stone-100 hover:text-stone-700 disabled:opacity-40"
          >
            ×
          </button>
        </div>

        <div className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
          <strong>Test mode.</strong> Use{" "}
          <code className="font-mono">4242 4242 4242 4242</code> to succeed or{" "}
          <code className="font-mono">4000 0000 0000 0002</code> to be declined. Any
          future expiry and any 3-digit CVC.
        </div>

        {status === "declined" && (
          <div
            role="alert"
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            Your card was declined. Try a different card.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
          <label className="block">
            <span className="flex justify-between text-sm font-medium text-stone-700">
              Card number <span className="text-stone-400">{brand}</span>
            </span>
            <input
              ref={firstInput}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 1234 1234 1234"
              value={card}
              disabled={processing}
              onChange={(e) => {
                setCard(formatCard(e.target.value));
                if (status === "declined") setStatus("idle");
              }}
              className={`${inputCls(errors.card)} font-mono tracking-wider`}
            />
            {errors.card && (
              <span className="mt-1 block text-xs text-red-600">{errors.card}</span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-stone-700">Name on card</span>
            <input
              autoComplete="cc-name"
              value={name}
              disabled={processing}
              onChange={(e) => setName(e.target.value)}
              className={inputCls(errors.name)}
            />
            {errors.name && (
              <span className="mt-1 block text-xs text-red-600">{errors.name}</span>
            )}
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-stone-700">Expiry</span>
              <input
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                value={expiry}
                disabled={processing}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                className={inputCls(errors.expiry)}
              />
              {errors.expiry && (
                <span className="mt-1 block text-xs text-red-600">{errors.expiry}</span>
              )}
            </label>
            <label className="block">
              <span className="text-sm font-medium text-stone-700">CVC</span>
              <input
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                value={cvc}
                disabled={processing}
                onChange={(e) => setCvc(digits(e.target.value).slice(0, 4))}
                className={inputCls(errors.cvc)}
              />
              {errors.cvc && (
                <span className="mt-1 block text-xs text-red-600">{errors.cvc}</span>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 py-3 font-semibold text-white hover:bg-stone-800 disabled:bg-stone-500"
          >
            {processing && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {processing ? "Processing…" : `Pay ${formatMoney(amount)}`}
          </button>
        </form>
      </div>
    </div>
  );
}
