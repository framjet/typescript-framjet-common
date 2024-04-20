import { is } from '../symbols';

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 */
export function toKey(value: unknown): PropertyKey {
  if (typeof value === 'string' || is(value)) {
    return value;
  }

  const result = `${value}`;
  return (result === '0' && (1 / (value as never)) === -INFINITY) ? '-0' : result;
}
