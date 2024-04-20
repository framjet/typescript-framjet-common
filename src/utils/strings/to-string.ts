import { is } from '../symbols';

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * toString(null)
 * // => ''
 *
 * toString(-0)
 * // => '-0'
 *
 * toString([1, 2, 3])
 * // => '1,2,3'
 */
export function toString(value: unknown): string {
  if (value == null) {
    return '';
  }

  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map((other) => (other == null ? other : toString(other)))}`;
  }

  if (is(value)) {
    return value.toString();
  }

  const result = `${value}`;

  return result === '0' && 1 / (value as any) === -INFINITY ? '-0' : result;
}
