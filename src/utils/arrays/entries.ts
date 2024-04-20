export function entries<T>(value: T[]): [number, T][] {
  return Array.prototype.entries.call(value) as any as [number, T][];
}
