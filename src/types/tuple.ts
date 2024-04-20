import type { UnknownArray } from '.';

export type TupleLength<T extends UnknownArray> =
  // `extends unknown` is used to convert `T` (if `T` is a union type) to
  // a [distributive conditional type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types))
  T extends unknown
    ? number extends T['length']
      ? never // Return never if the given type is an non-flexed-length array like `Array<string>`
      : T['length']
    : never; // Should never happen

export type BuildTuple<
  L extends number,
  Fill = unknown,
  T extends readonly unknown[] = []
> = T['length'] extends L ? T : BuildTuple<L, Fill, [...T, Fill]>;

type UnionToParm<U> = U extends any ? (k: U) => void : never;
type UnionToSect<U> = UnionToParm<U> extends (k: infer I) => void ? I : never;
type ExtractParm<F> = F extends { (a: infer A): void } ? A : never;

type SpliceOne<Union> = Exclude<Union, ExtractOne<Union>>;
type ExtractOne<Union> = ExtractParm<UnionToSect<UnionToParm<Union>>>;

type ToTupleRec<Union, Rslt extends any[]> = SpliceOne<Union> extends never
  ? [ExtractOne<Union>, ...Rslt]
  : ToTupleRec<SpliceOne<Union>, [ExtractOne<Union>, ...Rslt]>;

export type ToTuple<Union> = ToTupleRec<Union, []>;
