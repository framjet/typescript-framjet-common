/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * var array = [1, 2, 3, 4]
 *
 * _.slice(array, 2)
 * // => [3, 4]
 */
export function slice<T>(array: T[], start?: number, end?: number): T[] {
  let length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }

  start = start == null ? 0 : start;
  end = end === undefined ? length : end;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }

  length = start > end ? 0 : (end - start) >>> 0;
  start >>>= 0;

  let index = -1;
  const result = new Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}
