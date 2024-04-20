import type { AnyArray } from '../..';

export function includes<T extends AnyArray>(
  array: T,
  value: unknown
): value is T[number] {
  return array.includes(value as T);
}
