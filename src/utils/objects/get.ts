import { castPath } from './cast-path';
import { toKey } from './to-key';
import { GetTypeAtPath, PossiblePaths } from '../..';

export function get<
  T,
  TPath extends string,
  TDefault = undefined
>(
  input: unknown,
  path: PossiblePaths<T, TPath, ''> | TPath,
  defaultValue?: GetTypeAtPath<T, TPath, TDefault> | TDefault
): TDefault extends undefined ? GetTypeAtPath<T, TPath, TDefault> : Exclude<GetTypeAtPath<T, TPath, TDefault>, undefined> | TDefault {
  const parsedPath = castPath(path, input);

  const length = parsedPath.length;

  let index = 0;
  let obj = input;
  while (obj != null && index < length) {
    obj = obj[toKey(parsedPath[index++])];
  }

  return ((index && index === length) ? obj : defaultValue) as never;
}

export function strictGet<
  T,
  TPath extends string,
  TDefault = undefined
>(
  input: unknown,
  path: PossiblePaths<T, TPath, ''>,
  defaultValue?: GetTypeAtPath<T, TPath, TDefault> | TDefault
): TDefault extends undefined ? GetTypeAtPath<T, TPath, TDefault> : Exclude<GetTypeAtPath<T, TPath, TDefault>, undefined> | TDefault {
  return get(input, path, defaultValue);
}
