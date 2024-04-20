import type { IsNever, UnknownArray } from '.';

type InternalUnionMin<
  N extends number,
  T extends UnknownArray = []
> = T['length'] extends N ? T['length'] : InternalUnionMin<N, [...T, unknown]>;

type InternalUnionMax<
  N extends number,
  T extends UnknownArray = []
> = IsNever<N> extends true
  ? T['length']
  : T['length'] extends N
  ? InternalUnionMax<Exclude<N, T['length']>, T>
  : InternalUnionMax<N, [...T, unknown]>;

type InternalIsUnion<
  T,
  U = T
> = // @link https://ghaiklor.github.io/type-challenges-solutions/en/medium-isunion.html
(
  IsNever<T> extends true
    ? false
    : T extends any
    ? [U] extends [T]
      ? false
      : true
    : never
) extends infer Result
  ? // In some cases `Result` will return `false | true` which is `boolean`,
    // that means `T` has at least two types and it's a union type,
    // so we will return `true` instead of `boolean`.
    boolean extends Result
    ? true
    : Result
  : never; // Should never happen

export type UnionMin<N extends number> = InternalUnionMin<N>;

export type UnionMax<N extends number> = InternalUnionMax<N>;

export type IsUnion<T> = InternalIsUnion<T>;
