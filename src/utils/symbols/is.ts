export function is(value: unknown): value is symbol {
  return typeof value === 'symbol';
}
