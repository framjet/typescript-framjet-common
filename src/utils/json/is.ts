import type { JsonArray, JsonObject, JsonPrimitive, JsonValue } from '../..';
import { is as isObjects } from '../objects/is';
import { is as isString } from '../strings';
import { isNumber } from '../numerics';
import { is as isBoolean } from '../booleans';

export function is(value: unknown, deep = true): value is JsonValue {
  if (isPrimitive(value)) {
    return true;
  }

  if (isArray(value, deep)) {
    return true;
  }

  return !!isObject(value, deep);
}

export function isObject(
  value: unknown,
  deep = true
): value is JsonObject {
  if (!isObjects(value)) {
    return false;
  }

  if (!deep) {
    return true;
  }

  return Object.entries(value).every(
    ([key, item]) => isString(key) && is(item)
  );
}

export function isArray(
  value: unknown,
  deep = true
): value is JsonArray {
  if (!Array.isArray(value)) {
    return false;
  }

  if (!deep) {
    return true;
  }

  return value.every((item) => is(item));
}

export function isPrimitive(value: unknown): value is JsonPrimitive {
  if (value === null) {
    return true;
  }

  if (isString(value)) {
    return true;
  }

  if (isNumber(value)) {
    return true;
  }

  return !!isBoolean(value);
}
