"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CheckoutPayload } from "@/lib/checkout";
import { generateReservationReference } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { useLocale, useTranslations } from "@/components/providers/I18nProvider";

type MobileMoneyCheckoutProps = {
  payload: CheckoutPayload;
};

export default function MobileMoneyCheckout({ payload }: MobileMoneyCheckoutProps) {
  const router = useRouter();
  const locale = useLocale();
  const tPayment = useTranslations("payment");
  const tCommon = useTranslations("common");
  const [isPaying, setIsPaying] = useState(false);

  const handlePayment = async () => {
    setIsPaying(true);

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const reference = generateReservationReference();

    const params = new URLSearchParams({
      ...Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, String(value)])),
      reference,
      status: "success"
    });

    router.push(`/${locale}/confirmation?${params.toString()}`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
      <section className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-6">
        <h2 className="heading-md text-ink">{tPayment("title")}</h2>
        <p className="mt-2 text-sm text-ink/70">{tPayment("description")}</p>

        <div className="mt-6 grid gap-4">
          <SummaryRow label={tPayment("summary.activity")} value={payload.activity} />
          <SummaryRow label={tPayment("summary.duration")} value={payload.duration} />
          <SummaryRow label={tPayment("summary.persons")} value={String(payload.persons)} />
          <SummaryRow label={tPayment("summary.customer")} value={payload.customer} />
          <SummaryRow label={tPayment("summary.phone")} value={payload.phone} />
          <SummaryRow label={tPayment("summary.paymentMethod")} value={tCommon("paymentMethodMobileMoney")} />
          <SummaryRow label={tPayment("summary.total")} value={formatPrice(payload.total)} highlight />
        </div>

        <button
          type="button"
          onClick={handlePayment}
          disabled={isPaying}
          className="mt-6 w-full rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-300 ease-premium hover:bg-lime/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPaying ? tPayment("payingButton") : tPayment("payButton")}
        </button>
      </section>

      <aside className="rounded-3xl border border-line bg-navy p-5 text-white shadow-soft sm:p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-white/70">{tPayment("secureBadge")}</p>
        <p className="mt-3 heading-md text-white">{tPayment("secureTitle")}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/80">{tPayment("secureDescription")}</p>

        <div className="mt-6 space-y-3 text-sm text-white/82">
          <p>1. {tPayment("steps.one")}</p>
          <p>2. {tPayment("steps.two")}</p>
          <p>3. {tPayment("steps.three")}</p>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-2 text-sm">
      <span className="text-ink/62">{label}</span>
      <span className={highlight ? "font-semibold text-navy" : "font-medium text-ink"}>{value}</span>
    </div>
  );
}
