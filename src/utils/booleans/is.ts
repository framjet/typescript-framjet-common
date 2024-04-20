export function is(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
