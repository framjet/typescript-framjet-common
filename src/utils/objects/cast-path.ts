import { isKey } from './is-key';
import { toPath } from '../strings';

export function castPath(value: unknown, object: unknown): PropertyKey[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (isKey(value, object)) {
    return [value];
  }

  if (typeof value === 'string') {
    return toPath(value);
  }

  throw new Error(`Unsupported value of type "${typeof value}" given`);
}
