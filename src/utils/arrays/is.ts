export function is(value: unknown): value is any[] {
  if (value === null || value === undefined) {
    return false;
  }

  return Array.isArray(value);
}
