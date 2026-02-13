"use client";

import { useMemo, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Activity } from "@/lib/activities";
import { formatPrice } from "@/lib/format";
import { useLocale, useTranslations } from "@/components/providers/I18nProvider";

type ReservationValues = {
  firstName: string;
  lastName: string;
  phone: string;
  persons: number;
};

type ReservationFormProps = {
  activity: Activity;
};

const inputClassName =
  "w-full rounded-2xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-all duration-300 ease-premium placeholder:text-ink/35 focus:border-navy focus:shadow-focus";

export default function ReservationForm({ activity }: ReservationFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const tReservation = useTranslations("reservation");
  const tCommon = useTranslations("common");
  const tActivity = useTranslations(`activities.items.${activity.slug}`);

  const schema = useMemo(
    () =>
      z.object({
        firstName: z.string().min(2, tReservation("errors.firstNameRequired")),
        lastName: z.string().min(2, tReservation("errors.lastNameRequired")),
        phone: z
          .string()
          .min(8, tReservation("errors.phoneRequired"))
          .regex(/^[+0-9\s().-]+$/, tReservation("errors.phoneInvalid")),
        persons: z.coerce
          .number()
          .min(1, tReservation("errors.personsMin"))
          .max(12, tReservation("errors.personsMax"))
      }),
    [tReservation]
  );

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ReservationValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      persons: 1
    }
  });

  const persons = watch("persons") || 1;
  const total = activity.pricePerPerson * persons;

  const onSubmit = async (values: ReservationValues) => {
    const payload = new URLSearchParams({
      activity: tActivity("title"),
      slug: activity.slug,
      duration: tActivity("duration"),
      persons: String(values.persons),
      total: String(total),
      phone: values.phone,
      customer: `${values.firstName} ${values.lastName}`
    });

    router.push(`/${locale}/payment?${payload.toString()}`);
  };

  const personLabel = persons > 1 ? tCommon("personPlural") : tCommon("personSingular");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-3xl border border-line bg-white p-4 shadow-soft sm:p-6"
      aria-label={tReservation("submit")}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={tReservation("fields.firstName")} error={errors.firstName?.message}>
          <input
            {...register("firstName")}
            className={inputClassName}
            autoComplete="given-name"
            placeholder={tReservation("placeholders.firstName")}
          />
        </Field>
        <Field label={tReservation("fields.lastName")} error={errors.lastName?.message}>
          <input
            {...register("lastName")}
            className={inputClassName}
            autoComplete="family-name"
            placeholder={tReservation("placeholders.lastName")}
          />
        </Field>
      </div>

      <Field label={tReservation("fields.phone")} error={errors.phone?.message}>
        <input
          {...register("phone")}
          className={inputClassName}
          autoComplete="tel"
          placeholder={tReservation("placeholders.phone")}
        />
      </Field>

      <Field label={tReservation("fields.persons")} error={errors.persons?.message}>
        <input {...register("persons")} type="number" min={1} max={12} className={inputClassName} />
      </Field>

      <div className="rounded-2xl bg-cloud p-4">
        <p className="text-xs uppercase tracking-[0.14em] text-ink/55">{tReservation("paymentMethodLabel")}</p>
        <p className="mt-1 text-sm font-medium text-navy">{tReservation("mobileMoneyOnly")}</p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
          <span className="text-ink/65">{tReservation("pricePerPersonLabel")}</span>
          <span className="font-medium text-ink">{formatPrice(activity.pricePerPerson)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-ink/65">{tReservation("totalLabel", { count: persons, personLabel })}</span>
          <span className="font-semibold text-navy">{formatPrice(total)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-navy/92 disabled:cursor-not-allowed disabled:opacity-65"
      >
        {isSubmitting ? tReservation("submitting") : tReservation("submit")}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
  error
}: {
  label: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <label className="block text-sm text-ink/85">
      <span>{label}</span>
      <div className="mt-2">{children}</div>
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
