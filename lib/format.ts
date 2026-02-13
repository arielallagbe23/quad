export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("en-US").format(value)} FCFA`;
}
