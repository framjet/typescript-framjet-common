import { is } from './is';

export function keys<T extends object | undefined | null>(obj: T): (keyof T)[] {
  if (!is(obj)) {
    return [];
  }

  return Object.keys(obj) as (keyof T)[];
}
