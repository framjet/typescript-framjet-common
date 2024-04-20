import type { StringToArray } from '../..';
import { asciiToArray } from './ascii-to-array';
import { hasUnicode } from './has-unicode';
import { unicodeToArray } from './unicode-to-array';

/**
 * Converts `string` to an array.
 */
export function stringToArray<T extends string>(input: T): StringToArray<T> {
  return hasUnicode(input) ? unicodeToArray(input) : asciiToArray(input);
}
