export type CheckoutPayload = {
  activity: string;
  slug: string;
  duration: string;
  persons: number;
  total: number;
  phone: string;
  customer: string;
  paymentMethod: "Mobile Money";
};

type QueryValue = string | string[] | undefined;

function asSingle(value: QueryValue) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return "";
}

export function parseCheckoutPayload(searchParams: Record<string, QueryValue>): CheckoutPayload | null {
  const activity = asSingle(searchParams.activity);
  const slug = asSingle(searchParams.slug);
  const duration = asSingle(searchParams.duration);
  const persons = Number(asSingle(searchParams.persons));
  const total = Number(asSingle(searchParams.total));
  const phone = asSingle(searchParams.phone);
  const customer = asSingle(searchParams.customer);

  if (!activity || !slug || !duration || !phone || !customer) return null;
  if (!Number.isFinite(persons) || persons < 1) return null;
  if (!Number.isFinite(total) || total < 1) return null;

  return {
    activity,
    slug,
    duration,
    persons,
    total,
    phone,
    customer,
    paymentMethod: "Mobile Money"
  };
}

export function generateReservationReference() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(100000 + Math.random() * 900000);
  return `RE-${year}-${suffix}`;
}
