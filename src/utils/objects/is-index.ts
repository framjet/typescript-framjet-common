/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
const reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 */
export function isIndex(value: unknown, length?: number): boolean {
  const type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type === 'number' ||
      (type !== 'symbol' && reIsUint.test(<string>value))) &&
    // @ts-expect-error TS2365
    (value > -1 && value % 1 === 0 && value < length);
}
