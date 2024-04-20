import type { StringToArray } from '../..';

/**
 * Converts an ASCII `string` to an array.
 */
export function asciiToArray<T extends string>(input: T): StringToArray<T> {
  return input.split('') as StringToArray<T>;
}
