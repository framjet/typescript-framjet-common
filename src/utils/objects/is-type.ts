import { is as isArrays } from '../arrays';
import { is as isBooleans } from '../booleans';
import { is as isFunctions } from '../functions';
import { is as isJson, isArray, isObject, isPrimitive } from '../json';
import { is as isNumerics, isBigInt, isNumber } from '../numerics';
import { is as isObjects } from './is';
import { is as isPrimitives } from '../primitives';
import { isElement, isNode } from '../react';
import { is as isStrings } from '../strings';
import { is as isSymbols } from '../symbols';
import type { TypeNames, TypesFromNames } from '../../types/types';
import type { AtLeastOneItemArray, Class } from '../../types';
import { entries } from './entries';

type CheckFunction = (value: unknown) => boolean;

function setDefaultCheckers() {
  registerTypeChecker(v => v === null, 'null');
  registerTypeChecker(v => v === undefined, 'undefined');
  registerTypeChecker(isStrings, 'string');
  registerTypeChecker(isNumber, 'number');
  registerTypeChecker(isBooleans, 'boolean');
  registerTypeChecker(isSymbols, 'symbol');
  registerTypeChecker(isBigInt, 'bigint');
  registerTypeChecker(isPrimitives, 'Primitive');
  registerTypeChecker(isNumerics, 'Numeric');
  registerTypeChecker(v => isStrings(v) || isNumber(v) || isSymbols(v), 'PropertyKey');
  registerTypeChecker(isArrays, 'array');
  registerTypeChecker(isObjects, 'object');
  registerTypeChecker(isFunctions, 'Function');
  registerTypeChecker(isNode, 'react.node');
  registerTypeChecker(isElement, 'react.element');
  registerTypeChecker(isJson, 'JsonValue');
  registerTypeChecker(isPrimitive, 'JsonPrimitive');
  registerTypeChecker(isArray, 'JsonArray');
  registerTypeChecker(isObject, 'JsonObject');

  registerInstanceTypeChecker({
    Date: Date,
    RegExp: RegExp,
    Int8Array: Int8Array,
    Uint8Array: Uint8Array,
    Uint8ClampedArray: Uint8ClampedArray,
    Int16Array: Int16Array,
    Uint16Array: Uint16Array,
    Int32Array: Int32Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
    BigInt64Array: BigInt64Array,
    BigUint64Array: BigUint64Array,
    Error: Error,
    EvalError: EvalError,
    RangeError: RangeError,
    ReferenceError: ReferenceError,
    SyntaxError: SyntaxError,
    TypeError: TypeError,
    URIError: URIError,
    ArrayBuffer: ArrayBuffer,
    DataView: DataView,
    Map: Map,
    Set: Set,
    WeakMap: WeakMap,
    WeakSet: WeakSet,
    WeakRef: WeakRef,
    Promise: Promise
  });
}

function getRegistry(): Map<string, CheckFunction> {
  if (globalThis['FRAMJET_COMMON_TYPE_REGISTRY'] !== undefined) {
    return globalThis['FRAMJET_COMMON_TYPE_REGISTRY'];
  }

  const registry = new Map<string, CheckFunction>();

  Object.assign(globalThis, {
    FRAMJET_COMMON_TYPE_REGISTRY: registry
  });

  setDefaultCheckers();

  return registry;
}

export function registerTypeChecker(
  checker: CheckFunction,
  ...types: AtLeastOneItemArray<TypeNames[]>
) {
  if (types.length === 0) {
    throw new Error('No type names provided');
  }

  types.forEach((typeName) => {
    if (getRegistry().has(typeName)) {
      throw new Error(
        `The Object.isType type "${typeName}" checker already registered`
      );
    }

    getRegistry().set(typeName, checker);
  });
}

export function registerTypeCheckerAlias(
  name: TypeNames,
  ...types: AtLeastOneItemArray<TypeNames[]>
) {
  if (types.length === 0) {
    throw new Error('No type names provided');
  }

  if (!getRegistry().has(name)) {
    throw new Error(`The Object.isType type "${name}" checker not registered`);
  }

  types.forEach((typeName) => {
    if (getRegistry().has(typeName)) {
      throw new Error(
        `The Object.isType type "${typeName}" checker already registered`
      );
    }

    getRegistry().set(typeName, (value) => isType(value, name));
  });
}

export function registerInstanceTypeChecker(
  checkers: Partial<Record<TypeNames, Class<unknown>>>
) {
  for (const [typeName, cls] of entries(checkers)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    registerTypeChecker((value) => value instanceof cls!, typeName);
  }
}

export function isType<T extends TypeNames[]>(
  value: unknown,
  ...types: AtLeastOneItemArray<T>
): value is TypesFromNames<T> {
  if (types.length === 0) {
    throw new Error('No type provided');
  }

  if (types.length > 1) {
    return types.some((type) => isType(value, type));
  }

  const [typeName] = types;

  let checker = getRegistry().get(typeName);

  if (checker === undefined) {
    if (typeName.endsWith('[]')) {
      const baseType = typeName.slice(0, -2);
      checker = getRegistry().get(baseType);

      if (checker !== undefined) {
        return (
          Array.isArray(value) &&
          value.every((v) => isType(v, baseType as TypeNames))
        );
      }
    }

    throw new Error(
      `No Object.isType checker registered for type "${typeName}"`
    );
  }

  return checker(value);
}
