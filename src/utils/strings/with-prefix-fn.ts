export function withPrefixFn<T extends string>(prefix: T) {
  return <U extends string>(value: U): `${T}${U}` => `${prefix}${value}`;
}
