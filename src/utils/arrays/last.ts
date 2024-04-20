import type { LastArrayElement } from '../..';

export function lastOf<V extends readonly any[]>(
  array: V
): LastArrayElement<V> {
  return array[array.length - 1];
}
