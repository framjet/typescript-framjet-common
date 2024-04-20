import type { Numeric } from '../..';

export function is(value: unknown): value is Numeric {
  return (
    typeof value === 'number' ||
    value instanceof Number ||
    value instanceof BigInt
  );
}
