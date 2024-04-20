import {
  IsNegative,
  NegativeInfinity,
  NumberAbsolute,
  PositiveInfinity,
  PositiveNumericStringGt,
  Primitive,
  UnknownArray
} from '.';


export type IsAny<T> = 0 extends 1 & T ? true : false;

// export type IsArray<T> = T extends any[] ? true : false;
export type IsArray<T> = T extends UnknownArray | ArrayLike<unknown> ? T : never;

export type IsObject<T> = T extends object ? true : false;

export type IsFunction<T> = T extends (...args: never) => unknown ? true : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsUnknown<T> = (
  unknown extends T // `T` can be `unknown` or `any`
    ? IsNull<T> extends false // `any` can be `null`, but `unknown` can't be
      ? true
      : false
    : false
  );

export type IsNull<T> = [T] extends [null] ? true : false;

export type IsPrimitive<T> = [T] extends [Primitive] ? true : false;

export type IsBothExtends<BaseType, FirstType, SecondType> = FirstType extends BaseType
  ? SecondType extends BaseType
    ? true
    : false
  : false;

export type IsEqual<A, B> =
  (<G>() => G extends A ? 1 : 2) extends
    (<G>() => G extends B ? 1 : 2)
    ? true
    : false;

export type And<A extends boolean, B extends boolean> = [A, B][number] extends true
  ? true
  : true extends [IsEqual<A, false>, IsEqual<B, false>][number]
    ? false
    : never;


export type Or<A extends boolean, B extends boolean> = [A, B][number] extends false
  ? false
  : true extends [IsEqual<A, true>, IsEqual<B, true>][number]
    ? true
    : never;

export type Not<A extends boolean> = A extends true
  ? false
  : A extends false
    ? true
    : never;

export type GreaterThan<A extends number, B extends number> = number extends A | B
  ? never
  : [
    IsEqual<A, PositiveInfinity>, IsEqual<A, NegativeInfinity>,
    IsEqual<B, PositiveInfinity>, IsEqual<B, NegativeInfinity>,
  ] extends infer R extends [boolean, boolean, boolean, boolean]
    ? Or<
      And<IsEqual<R[0], true>, IsEqual<R[2], false>>,
      And<IsEqual<R[3], true>, IsEqual<R[1], false>>
    > extends true
      ? true
      : Or<
        And<IsEqual<R[1], true>, IsEqual<R[3], false>>,
        And<IsEqual<R[2], true>, IsEqual<R[0], false>>
      > extends true
        ? false
        : true extends R[number]
          ? false
          : [IsNegative<A>, IsNegative<B>] extends infer R extends [boolean, boolean]
            ? [true, false] extends R
              ? false
              : [false, true] extends R
                ? true
                : [false, false] extends R
                  ? PositiveNumericStringGt<`${A}`, `${B}`>
                  : PositiveNumericStringGt<`${NumberAbsolute<B>}`, `${NumberAbsolute<A>}`>
            : never
    : never;

export type GreaterThanOrEqual<A extends number, B extends number> = number extends A | B
  ? never
  : A extends B ? true : GreaterThan<A, B>;

export type LessThan<A extends number, B extends number> = number extends A | B
  ? never
  : GreaterThanOrEqual<A, B> extends true ? false : true;

export type LessThanOrEqual<A extends number, B extends number> = number extends A | B
  ? never
  : GreaterThan<A, B> extends true ? false : true;
