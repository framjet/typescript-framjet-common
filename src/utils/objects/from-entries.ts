export function fromEntries<K extends PropertyKey, V>(
  entries: [K, V][]
): { [KK in K]: V } {
  return Object.fromEntries(entries) as any;
}
