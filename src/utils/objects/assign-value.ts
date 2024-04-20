import { isEqual } from './is-equal';

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 */
function baseAssignValue(object: object, key: PropertyKey, value: unknown): void {
  if (key === '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    })
  } else {
    object[key] = value
  }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent.
 */
export function assignValue(object: object, key: PropertyKey, value: unknown): void {
  const objValue = object[key]

  if (!(hasOwnProperty.call(object, key) && isEqual(objValue, value))) {
    if (value !== 0 || (1 / value) === (1 / objValue)) {
      baseAssignValue(object, key, value)
    }
  } else if (value === undefined && !(key in object)) {
    baseAssignValue(object, key, value)
  }
}
