import type { GreaterThan, LessThan, NegativeInfinity, PositiveInfinity, UnknownArrayOrTuple } from '.';

export type AnyArray = unknown[] | readonly unknown[];

export type ArrayLength<T extends readonly unknown[]> = T extends { readonly length: infer L } ? L : never;


export type UnknownArray = readonly unknown[];

export type FirstArrayElement<TArray extends UnknownArrayOrTuple> = TArray extends readonly [infer THead, ...unknown[]]
  ? THead
  : never;


export type ArrayTail<TArray extends UnknownArrayOrTuple> = TArray extends readonly [unknown, ...infer TTail] ? TTail : [];


export type ArrayElement<T> = T extends readonly unknown[] ? T[0] : never;


export type ArrayMin<A extends number[], Result extends number = PositiveInfinity> = number extends A[number]
  ? never
  : A extends [infer F extends number, ...infer R extends number[]]
    ? LessThan<F, Result> extends true
      ? ArrayMin<R, F>
      : ArrayMin<R, Result>
    : Result;

export type ArrayMax<A extends number[], Result extends number = NegativeInfinity> = number extends A[number]
  ? never :
  A extends [infer F extends number, ...infer R extends number[]]
    ? GreaterThan<F, Result> extends true
      ? ArrayMax<R, F>
      : ArrayMax<R, Result>
    : Result;


export type StaticPartOfArray<T extends UnknownArray, Result extends UnknownArray = []> =
  T extends unknown
    ? number extends T['length'] ?
      T extends readonly [infer U, ...infer V]
        ? StaticPartOfArray<V, [...Result, U]>
        : Result
      : T
    : never; // Should never happen


export type VariablePartOfArray<T extends UnknownArray> =
  T extends unknown
    ? T extends readonly [...StaticPartOfArray<T>, ...infer U]
      ? U
      : []
    : never; // Should never happen


export type SetArrayAccess<T extends UnknownArray, IsReadonly extends boolean> =
  T extends readonly [...infer U] ?
    IsReadonly extends true
      ? readonly [...U]
      : [...U]
    : T;


export type IsArrayReadonly<T extends UnknownArray> = T extends unknown[] ? false : true;


export type LastArrayElement<Elements extends readonly unknown[], ElementBeforeTailingSpreadElement = never> =
// If the last element of an array is a spread element, the `LastArrayElement` result should be `'the type of the element before the spread element' | 'the type of the spread element'`.
  Elements extends readonly []
    ? ElementBeforeTailingSpreadElement
    : Elements extends readonly [...infer U, infer V]
      ? V
      : Elements extends readonly [infer U, ...infer V]
        // If we return `V[number] | U` directly, it would be wrong for `[[string, boolean, object, ...number[]]`.
        // So we need to recurse type `V` and carry over the type of the element before the spread element.
        ? LastArrayElement<V, U>
        : Elements extends ReadonlyArray<infer U>
          ? U | ElementBeforeTailingSpreadElement
          : never;


export type AtLeastOneItemArray<T extends unknown[]> = number extends T['length'] ? T : T['length'] extends 0 ? never : T

export type ArrayKeys = Exclude<keyof [], symbol | number>
export type KnownArrayIndices<T> = Exclude<keyof T, ArrayKeys | symbol | number> extends `${infer V extends number}` ? V : never;
export type ArrayIndices<T extends ArrayLike<unknown>> = number extends T['length'] ? number | Exclude<keyof T, ArrayKeys | symbol | number> : KnownArrayIndices<T>;
