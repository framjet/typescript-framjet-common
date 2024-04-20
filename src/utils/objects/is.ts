export function is(value: unknown, ignoreArrays = true): value is object {
  const type = typeof value;
  return value != null
    && (type === 'object' || type === 'function')
    && !(ignoreArrays === true && Array.isArray(value));
}
