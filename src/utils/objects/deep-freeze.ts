import { is } from './is';
import type { ReadonlyDeep } from '../..';

export function deepFreeze<T>(obj: T): ReadonlyDeep<T> {
  if (!is(obj)) {
    return obj as ReadonlyDeep<T>;
  }

  Object.values(obj).forEach(
    (value) => Object.isFrozen(value) || deepFreeze(value)
  );

  return Object.freeze(obj) as ReadonlyDeep<T>;
}
