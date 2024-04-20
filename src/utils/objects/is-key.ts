import { is } from '../symbols';

/** Used to match property names within property paths. */
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;

export function isKey<T>(key: unknown, object: T): key is keyof (T extends object ? T : never) {
  if (Array.isArray(key)) {
    return false;
  }
  if (typeof key === 'number' || typeof key === 'boolean' || key == null || is(key)) {
    return true;
  }

  if (typeof key !== 'string') {
    return false;
  }

  return reIsPlainProp.test(key) || !reIsDeepProp.test(key) ||
    (object != null && key in Object(object));
}
