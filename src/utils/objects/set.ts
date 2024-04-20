import { is } from './is';
import { GetTypeAtPath, PossiblePaths } from '../..';
import { castPath } from './cast-path';
import { toKey } from './to-key';
import { isIndex } from './is-index';
import { assignValue } from './assign-value';

export function set<
  T,
  TPath extends string,
  TValue
>(
  obj: T,
  path: PossiblePaths<T, TPath, ''>,
  value: GetTypeAtPath<T, TPath, TValue> | TValue
): T {
  if (obj == null) {
    return obj;
  }

  if (!is(obj)) {
    return obj;
  }
  const processedPaths = castPath(path, obj);

  const length = processedPaths.length;
  const lastIndex = length - 1;

  let index = -1;
  let nested = obj;

  while (nested != null && ++index < length) {
    const key = toKey(processedPaths[index]);
    let newValue: unknown = value;

    if (index !== lastIndex) {
      const objValue = nested[key];
      newValue = is(objValue)
        ? objValue
        : (isIndex(processedPaths[index + 1]) ? [] : {});
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }

  return obj;
}
