import type { IsNever, IsNotFalse, IsPrimitive, Numeric, Primitive } from '.';

type LiteralCheck<T, LiteralType extends Primitive> = IsNever<T> extends false // Must be wider than `never`
  ? [T] extends [LiteralType] // Must be narrower than `LiteralType`
    ? [LiteralType] extends [T] // Cannot be wider than `LiteralType`
      ? false
      : true
    : false
  : false;

type LiteralChecks<T, LiteralUnionType> =
  // Conditional type to force union distribution.
  // If `T` is none of the literal types in the union `LiteralUnionType`, then `LiteralCheck<T, LiteralType>` will evaluate to `false` for the whole union.
  // If `T` is one of the literal types in the union, it will evaluate to `boolean` (i.e. `true | false`)
  IsNotFalse<
    LiteralUnionType extends Primitive
      ? LiteralCheck<T, LiteralUnionType>
      : never
  >;

export type IsStringLiteral<T> = LiteralCheck<T, string>;

export type IsNumberLiteral<T> = LiteralCheck<T, number>;

export type IsNumericLiteral<T> = LiteralChecks<T, Numeric>;

export type IsBooleanLiteral<T> = LiteralCheck<T, boolean>;

export type IsSymbolLiteral<T> = LiteralCheck<T, symbol>;

type IsLiteralUnion<T> =
  | IsStringLiteral<T>
  | IsNumericLiteral<T>
  | IsBooleanLiteral<T>
  | IsSymbolLiteral<T>;

export type IsLiteral<T> = IsPrimitive<T> extends true
  ? IsNotFalse<IsLiteralUnion<T>>
  : false;
