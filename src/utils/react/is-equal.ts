import { isDeepEqual } from '../objects/is-equal';

export function isEqual(a: unknown, b: unknown): boolean {
  return isDeepEqual(a, b);
}
