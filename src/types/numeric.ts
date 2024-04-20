import type { StringLength, StringToNumber } from '.';
import type { BuildTuple } from '.';

export type Numeric = number | bigint;

export type Zero = 0 | 0n;


// See https://github.com/microsoft/TypeScript/issues/31752
// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
export type PositiveInfinity = 1e999;


// See https://github.com/microsoft/TypeScript/issues/31752
// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
export type NegativeInfinity = -1e999;

export type Finite<T extends number> = T extends PositiveInfinity | NegativeInfinity ? never : T;


export type Negative<T extends Numeric> = T extends Zero ? never : `${T}` extends `-${string}` ? T : never;

export type NonNegative<T extends Numeric> = T extends Zero ? T : Negative<T> extends never ? T : never;

export type IsNegative<T extends Numeric> = T extends Negative<T> ? true : false;



export type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never;

export type NegativeInteger<T extends number> = Negative<Integer<T>>;

export type NonNegativeInteger<T extends number> = NonNegative<Integer<T>>;



export type Float<T extends number> = T extends Integer<T> ? never : T;

export type NegativeFloat<T extends number> = Negative<Float<T>>;

export type NonNegativeFloat<T extends number> = NonNegative<Float<T>>;



export type NumberAbsolute<N extends number> = `${N}` extends `-${infer StringPositiveN}` ? StringToNumber<StringPositiveN> : N;




export type SameLengthPositiveNumericStringGt<A extends string, B extends string> = A extends `${infer FirstA}${infer RestA}`
  ? B extends `${infer FirstB}${infer RestB}`
    ? FirstA extends FirstB
      ? SameLengthPositiveNumericStringGt<RestA, RestB>
      : PositiveNumericCharacterGt<FirstA, FirstB>
    : never
  : false;

type NumericString = '0123456789';


export type PositiveNumericStringGt<A extends string, B extends string> = A extends B
  ? false
  : [BuildTuple<StringLength<A>, 0>, BuildTuple<StringLength<B>, 0>] extends infer R extends [readonly unknown[], readonly unknown[]]
    ? R[0] extends [...R[1], ...infer Remain extends readonly unknown[]]
      ? 0 extends Remain['length']
        ? SameLengthPositiveNumericStringGt<A, B>
        : true
      : false
    : never;


export type PositiveNumericCharacterGt<A extends string, B extends string> = NumericString extends `${infer HeadA}${A}${infer TailA}`
  ? NumericString extends `${infer HeadB}${B}${infer TailB}`
    ? HeadA extends `${HeadB}${infer _}${infer __}`
      ? true
      : false
    : never
  : never;
