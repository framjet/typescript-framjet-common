import { ArrayIndices, ArrayKeys, IsArray, StripQuotes } from '.';

type Field<T> = T extends `[${infer V}]` ? StripQuotes<V> : never;
type StringKeyIndexWrap<T> = T extends string ? `'${T}'` | `"${T}"` : never;


type KeyAccessArray<T> = T extends IsArray<T> ? ArrayIndices<T> | StringKeyIndexWrap<`${ArrayIndices<T>}`> : never;
type KeyAccessObject<T> = keyof T extends string ? StringKeyIndexWrap<keyof T> : never;
type KeyAccess<T> = T extends IsArray<T>
  ? KeyAccessArray<T> : KeyAccessObject<T>;

type IndexAccessor<T> = `[${KeyAccess<T>}]`;

type FieldAccessArray<T> = T extends IsArray<T> ? `${ArrayIndices<T>}` : never;
type FieldAccessObject<T> = Exclude<keyof T, ArrayKeys | symbol | number>;

type FieldAccessor<T> = T extends IsArray<T> ? FieldAccessArray<T> : FieldAccessObject<T>;

type GetFieldInner<T, K> = T extends IsArray<T> ?
  number extends K ?
    T[number]
    : K extends keyof T ?
      T[K]
      : K extends `${infer N extends number}` ?
        K extends `${string}.${string}` ? never : T[N]
        : never
  : K extends keyof T ?
    T[K]
    : never;

type GetField<T, K, D = never> = [GetFieldInner<T, K>] extends [never] ? D : GetFieldInner<T, K>;

type IsAllowedKey<T, K> = T extends IsArray<T> ? K : K extends keyof T ? K : never;


export type PossiblePaths<T, TPath extends string, TResult extends string> = TPath extends `[${string}` ?
  TPath extends `${IndexAccessor<T>}${infer Right extends string}` ?
    TPath extends `${infer Left}${Right}` ?
      Field<Left> extends IsAllowedKey<T, Field<Left>> ?
        PossiblePaths<GetField<T, Field<Left>>, Right, `${TResult}${Left}`>
        : never
      : `${TResult}${IndexAccessor<T>}`
    : `${TResult}${IndexAccessor<T>}`
  : TPath extends `.${string}` ?
    TPath extends `.${FieldAccessor<T>}${'.' | '['}${string}` ?
      TPath extends `.${infer Left}${'.' | '['}${string}` ?
        TPath extends `.${Left}${infer Right}` ?
          Left extends IsAllowedKey<T, Left> ?
            PossiblePaths<GetField<T, Left>, Right, `${TResult extends '' ? '' : `${TResult}.`}${Left}`>
            : never
          : never
        : never
      : `${TResult extends '' ? '' : `${TResult}.`}${FieldAccessor<T>}`
    : TResult extends '' ?
      TPath extends FieldAccessor<T> ?
        TPath extends IsAllowedKey<T, TPath> ?
          PossiblePaths<GetField<T, TPath>, '', TPath>
          : never
        : TPath extends `${FieldAccessor<T>}${'.' | '['}${string}` ?
          TPath extends `${infer Left}${'.' | '['}${string}` ?
            TPath extends `${Left}${infer Right}` ?
              Left extends IsAllowedKey<T, Left> ?
                PossiblePaths<GetField<T, Left>, Right, `${TResult}${Left}`>
                : never
              : never
            : never
          : FieldAccessor<T>
      : `${TResult}`
  ;


export type GetTypeAtPath<T, TPath, TDefault = never> = [GetField<T, TPath>] extends [never] ?
  TPath extends `[${infer Left}]${infer Right}` ?
    [GetField<T, StripQuotes<Left>>] extends [never] ?
      TDefault
      : Right extends `.${infer R}` ?
        '' extends R ?
          TDefault
          : GetTypeAtPath<GetField<T, StripQuotes<Left>>, R, TDefault>
        : GetTypeAtPath<GetField<T, StripQuotes<Left>>, Right, TDefault>
    : TPath extends `${infer Left}${'.' | '['}${infer U}` ?
      '' extends U ? TDefault
        : [GetField<T, Left>] extends [never] ?
          TDefault
          : TPath extends `${Left}[${infer Right}` ?
            '' extends Right ?
              TDefault
              : GetTypeAtPath<GetField<T, Left>, `[${Right}`, TDefault>
            : TPath extends `${Left}.${infer Right}` ?
              '' extends Right ?
                TDefault
                : GetTypeAtPath<GetField<T, Left>, Right, TDefault>
              : TDefault
      : '' extends TPath ? T : TDefault
  : GetField<T, TPath, TDefault>;
