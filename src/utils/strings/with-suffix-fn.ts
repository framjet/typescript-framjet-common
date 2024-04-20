export function withSuffixFn<T extends string>(suffix: T) {
  return <U extends string>(value: U): `${U}${T}` => `${value}${suffix}`;
}
