export function wrap<T>(value: T): T extends Array<any> ? T : T[] {
  if (Array.isArray(value)) {
    return value as any;
  }

  return [value] as any;
}
