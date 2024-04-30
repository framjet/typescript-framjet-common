import type * as React from 'react';
import type {
  BuiltIns as _BuiltIns,
  Exact,
  NonRecursiveType as _NonRecursiveType,
  Numeric,
  Primitive,
  TypedArray as _TypedArray,
  JsonObject,
  JsonArray,
  JsonPrimitive,
  JsonValue,
} from '.';

export interface TypesPrimitivesRegistry {
  null: null;
  undefined: undefined;
  string: string;
  number: number;
  boolean: boolean;
  symbol: symbol;
  bigint: bigint;
  Primitive: Primitive;
  Numeric: Numeric;
  PropertyKey: PropertyKey;
}

export interface TypesRegistry {
  void: void;
  Date: Date;
  RegExp: RegExp;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Function: Function;
  Int8Array: Int8Array;
  Uint8Array: Uint8Array;
  Uint8ClampedArray: Uint8ClampedArray;
  Int16Array: Int16Array;
  Uint16Array: Uint16Array;
  Int32Array: Int32Array;
  Uint32Array: Uint32Array;
  Float32Array: Float32Array;
  Float64Array: Float64Array;
  BigInt64Array: BigInt64Array;
  BigUint64Array: BigUint64Array;
  Error: Error;
  EvalError: EvalError;
  RangeError: RangeError;
  ReferenceError: ReferenceError;
  SyntaxError: SyntaxError;
  TypeError: TypeError;
  URIError: URIError;
  ArrayBuffer: ArrayBuffer;
  DataView: DataView;
  Map: Map<any, any>;
  Set: Set<any>;
  WeakMap: WeakMap<any, any>;
  WeakSet: WeakSet<any>;
  WeakRef: WeakRef<any>;
  Promise: Promise<any>;
  'react.element': React.ReactElement;
  'react.node': React.ReactNode;
  JsonObject: JsonObject;
  JsonArray: JsonArray;
  JsonPrimitive: JsonPrimitive;
  JsonValue: JsonValue;
}

type TypesPrimitivesRegistryArrays = {
  [K in keyof TypesPrimitivesRegistry as `${K &
    string}[]`]: TypesPrimitivesRegistry[K][];
};

type TypesRegistryArrays = {
  [K in keyof TypesRegistry as `${K & string}[]`]: TypesRegistry[K][];
};

type TypesList = TypesRegistry & TypesRegistryArrays;
type TypesPrimitivesList = TypesPrimitivesRegistry &
  TypesPrimitivesRegistryArrays;

type TypesOthers = {
  object: object;
  array: unknown[];
  unknown: unknown;
};

export type TypeNames =
  | keyof TypesList
  | keyof TypesPrimitivesList
  | keyof TypesOthers;

type TypeNameInner<T, E extends boolean> = {
  [K in keyof TypesList]: E extends true
    ? Exact<T, TypesList[K]> extends never
      ? never
      : K
    : T extends TypesList[K]
      ? K
      : never;
}[keyof TypesList];

type TypeNamePrimitivesInner<T, E extends boolean> = {
  [K in keyof TypesPrimitivesList]: E extends true
    ? Exact<T, TypesPrimitivesList[K]> extends never
      ? never
      : K
    : T extends TypesPrimitivesList[K]
      ? K
      : never;
}[keyof TypesPrimitivesList];

type TypeNameOthersInner<T, E extends boolean> = {
  [K in keyof TypesOthers]: E extends true
    ? Exact<T, TypesOthers[K]> extends never
      ? never
      : K
    : T extends TypesOthers[K]
      ? K
      : never;
}[keyof TypesOthers];

export type TypeName<T, Exact extends boolean = true> =
  TypeNameInner<T, Exact> extends never
    ? TypeNamePrimitivesInner<T, Exact> extends never
      ? TypeNameOthersInner<T, Exact> extends never
        ? 'unknown'
        : TypeNameOthersInner<T, Exact>
      : TypeNamePrimitivesInner<T, Exact>
    : TypeNameInner<T, Exact>;

export type Primitives = TypeName<Primitive>;
export type BuiltIns = TypeName<_BuiltIns>;
export type NonRecursiveType = TypeName<_NonRecursiveType>;
export type TypedArray = TypeName<_TypedArray>;

export type TypeFromName<T extends TypeNames> = T extends keyof TypesList
  ? TypesList[T]
  : T extends keyof TypesPrimitivesList
    ? TypesPrimitivesList[T]
    : T extends keyof TypesOthers
      ? TypesOthers[T]
      : unknown;

export type TypesFromNames<T extends TypeNames[]> = {
  [K in keyof T]: TypeFromName<T[K]>;
}[number];
