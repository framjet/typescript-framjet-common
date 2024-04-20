export function is(value: unknown): value is Function {
  return typeof value === 'function';
}
