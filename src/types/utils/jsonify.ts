import type {
  EmptyObject,
  IsAny,
  IsNever,
  IsUnknown,
  JsonPrimitive,
  JsonValue,
  NegativeInfinity,
  PositiveInfinity,
  TypedArray,
  UndefinedToOptional,
  UnknownArray,
} from '..';

type NotJsonable = ((...arguments_: any[]) => any) | undefined | symbol;

type NeverToNull<T> = IsNever<T> extends true ? null : T;

type JsonifyList<T extends UnknownArray> = T extends readonly []
  ? []
  : T extends readonly [infer F, ...infer R]
  ? [NeverToNull<Jsonify<F>>, ...JsonifyList<R>]
  : IsUnknown<T[number]> extends true
  ? []
  : Array<T[number] extends NotJsonable ? null : Jsonify<T[number]>>;

type FilterJsonableKeys<T extends object> = {
  [Key in keyof T]: T[Key] extends NotJsonable ? never : Key;
}[keyof T];

type JsonifyObject<T extends object> = {
  [Key in keyof Pick<T, FilterJsonableKeys<T>>]: Jsonify<T[Key]>;
};

export type Jsonify<T> = IsAny<T> extends true
  ? any
  : T extends PositiveInfinity | NegativeInfinity
  ? null
  : T extends JsonPrimitive
  ? T
  : // Any object with toJSON is special case
  T extends { toJSON(): infer J }
  ? (() => J) extends () => JsonValue // Is J assignable to JsonValue?
    ? J // Then T is Jsonable and its Jsonable value is J
    : Jsonify<J> // Maybe if we look a level deeper we'll find a JsonValue
  : // Instanced primitives are objects
  T extends Number
  ? number
  : T extends String
  ? string
  : T extends Boolean
  ? boolean
  : T extends Map<any, any> | Set<any>
  ? EmptyObject
  : T extends TypedArray
  ? Record<string, number>
  : T extends NotJsonable
  ? never // Non-JSONable type union was found not empty
  : T extends UnknownArray
  ? JsonifyList<T>
  : T extends object
  ? JsonifyObject<UndefinedToOptional<T>> // JsonifyObject recursive call for its children
  : never; // Otherwise any other non-object is removed
