import { is as isBoolean } from '../booleans';
import { is as isNumeric } from '../numerics';
import { is as isString } from '../strings';
import { is as isSymbol } from '../symbols';
import type { Primitive } from '../../types';

export function is(value: unknown): value is Primitive {
  if (value === undefined || value === null) {
    return true;
  }

  if (isString(value)) {
    return true;
  }

  if (isNumeric(value)) {
    return true;
  }

  if (isBoolean(value)) {
    return true;
  }

  return isSymbol(value);
}
