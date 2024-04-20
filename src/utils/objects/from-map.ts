export function fromMap<K extends PropertyKey, V>(
  map: Map<K, V>,
): Record<K, V> {
  return Object.fromEntries(map.entries()) as Record<K, V>;
}
