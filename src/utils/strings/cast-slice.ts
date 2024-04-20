import { slice } from '../arrays';

/**
 * Casts `array` to a slice if it's needed.
 */
export function castSlice<T>(array: T[], start: number, end?: number) {
  const { length } = array;
  end = end === undefined ? length : end;

  return !start && end >= length ? array : slice(array, start, end);
}
