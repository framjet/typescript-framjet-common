import type { IsAny, NonRecursiveType, ToString, UnknownArray } from '.';

export type IsPlainObject<T> =
  T extends NonRecursiveType | UnknownArray | ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>
    ? false
    : T extends object
      ? true
      : false;

export type BuildObject<Key extends PropertyKey, Value, CopiedFrom extends object = {}> =
  Key extends keyof CopiedFrom
    ? Pick<{[_ in keyof CopiedFrom]: Value}, Key>
    : Key extends `${infer NumberKey extends number}`
      ? NumberKey extends keyof CopiedFrom
        ? Pick<{[_ in keyof CopiedFrom]: Value}, NumberKey>
        : {[_ in Key]: Value}
      : {[_ in Key]: Value};


export type ObjectValue<T, K> =
  K extends keyof T
    ? T[K]
    : ToString<K> extends keyof T
      ? T[ToString<K>]
      : K extends `${infer NumberK extends number}`
        ? NumberK extends keyof T
          ? T[NumberK]
          : never
        : never;

export type RequireNone<KeysType extends PropertyKey> = Partial<Record<KeysType, never>>;

export type ExactKey<T extends object, Key extends PropertyKey> =
  Key extends keyof T
    ? Key
    : ToString<Key> extends keyof T
      ? ToString<Key>
      : Key extends `${infer NumberKey extends number}`
        ? NumberKey extends keyof T
          ? NumberKey
          : never
        : never;


export type Simplify<T> = {[KeyType in keyof T]: T[KeyType]} & {};

export type UndefinedToOptional<T extends object> = Simplify<
  {
    // Property is not a union with `undefined`, keep it as-is.
    [Key in keyof Pick<T, FilterDefinedKeys<T>>]: T[Key];
  } & {
  // Property _is_ a union with defined value. Set as optional (via `?`) and remove `undefined` from the union.
  [Key in keyof Pick<T, FilterOptionalKeys<T>>]?: Exclude<T[Key], undefined>;
}
>;

type BaseKeyFilter<Type, Key extends keyof Type> = Key extends symbol
  ? never
  : Type[Key] extends symbol
    ? never
    /*
    To prevent a problem where an object with only a `name` property is incorrectly treated as assignable to a function, we first check if the property is a record.
    This check is necessary, because without it, if we don't verify whether the property is a record, an object with a type of `{name: any}` would return `never` due to its potential assignability to a function.
    See: https://github.com/sindresorhus/type-fest/issues/657
    */
    : Type[Key] extends Record<string, unknown>
      ? Key
      : [(...arguments_: any[]) => any] extends [Type[Key]]
        ? never
        : Key;


type FilterDefinedKeys<T extends object> = Exclude<
  {
    [Key in keyof T]: IsAny<T[Key]> extends true
    ? Key
    : undefined extends T[Key]
      ? never
      : T[Key] extends undefined
        ? never
        : BaseKeyFilter<T, Key>;
  }[keyof T],
  undefined
>;


type FilterOptionalKeys<T extends object> = Exclude<
  {
    [Key in keyof T]: IsAny<T[Key]> extends true
    ? never
    : undefined extends T[Key]
      ? T[Key] extends undefined
        ? never
        : BaseKeyFilter<T, Key>
      : never;
  }[keyof T],
  undefined
>;

declare const emptyObjectSymbol: unique symbol;
export type EmptyObject = {[emptyObjectSymbol]?: never};

export type IsEmptyObject<T> = T extends EmptyObject ? true : false;
