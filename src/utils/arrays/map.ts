export function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}
