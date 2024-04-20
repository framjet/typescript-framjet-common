import { keys } from './keys';

export function replaceValue<V>(obj: object, search: V, replacement: V) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }

  keys(obj).forEach((key) => {
    if (obj[key] === search) {
      // @ts-expect-error TS2322
      obj[key] = replacement;
    } else if (typeof obj[key] === 'object') {
      replaceValue(obj[key] as object, search, replacement);
    }
  });
}
