export function is(value: unknown): value is string {
  return typeof value === 'string';
}
