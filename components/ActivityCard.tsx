"use client";

import Link from "next/link";
import type { Activity } from "@/lib/activities";
import { formatPrice } from "@/lib/format";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { useLocale, useTranslations } from "@/components/providers/I18nProvider";

type ActivityCardProps = {
  activity: Activity;
  showDuration?: boolean;
};

export default function ActivityCard({ activity, showDuration = true }: ActivityCardProps) {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tActivity = useTranslations(`activities.items.${activity.slug}`);

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-4 shadow-soft transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-navy/25 sm:p-5">
      <ImagePlaceholder ratio="16:9" label={tActivity("heroLabel")} />

      <div className="mt-4 space-y-2">
        <h3 className="heading-md text-ink">{tActivity("title")}</h3>
        <p className="text-sm leading-relaxed text-ink/70">{tActivity("shortDescription")}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] uppercase tracking-[0.14em] text-ink/55">
        {showDuration && <span>{tActivity("duration")}</span>}
        <span>{tActivity("location")}</span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-navy">{formatPrice(activity.pricePerPerson)}</p>
        <Link
          href={`/${locale}/activity/${activity.slug}`}
          className="rounded-full border border-navy/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-all duration-300 ease-premium hover:border-lime hover:bg-lime/30"
        >
          {tCommon("viewDetails")}
        </Link>
      </div>
    </article>
  );
}
