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

export type AnyMap<K = unknown, V = unknown> = Map<K, V>;
export type AnyWeakMap<K extends WeakKey = WeakKey, V = unknown> = WeakMap<K, V>;
export type AnySet<V = unknown> = Set<V>;
export type AnyWeakSet<V extends WeakKey = WeakKey> = WeakSet<V>;
export type AnyWeakRef<V extends WeakKey = WeakKey> = WeakRef<V>;
export type AnyPromise<V = unknown> = Promise<V>;
