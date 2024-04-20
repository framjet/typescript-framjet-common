
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type BuiltIns = Primitive | void | Date | RegExp;

export type NonRecursiveType = BuiltIns | Function | (new (...args: any[]) => unknown);

export type UnknownArrayOrTuple = readonly [...unknown[]];

export type NonEmptyTuple = readonly [unknown, ...unknown[]];

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;
