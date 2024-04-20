export function hasProperty<T extends object | undefined | null>(
  obj: T,
  name: PropertyKey
): name is keyof T {
  if (obj === undefined || obj === null) {
    return false;
  }

  return obj ? Object.prototype.hasOwnProperty.call(obj, name) : false;
}
