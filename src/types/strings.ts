import type { NegativeInfinity, PositiveInfinity } from ".";

export type UpperCaseCharacters =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type LowerCaseCharacters =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

export type StringDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Whitespace =
  | '\u{9}' // '\t'
  | '\u{A}' // '\n'
  | '\u{B}' // '\v'
  | '\u{C}' // '\f'
  | '\u{D}' // '\r'
  | '\u{20}' // ' '
  | '\u{85}'
  | '\u{A0}'
  | '\u{1680}'
  | '\u{2000}'
  | '\u{2001}'
  | '\u{2002}'
  | '\u{2003}'
  | '\u{2004}'
  | '\u{2005}'
  | '\u{2006}'
  | '\u{2007}'
  | '\u{2008}'
  | '\u{2009}'
  | '\u{200A}'
  | '\u{2028}'
  | '\u{2029}'
  | '\u{202F}'
  | '\u{205F}'
  | '\u{3000}'
  | '\u{FEFF}';

export type WordSeparators = '-' | '_' | Whitespace;

export type Quotes = '"' | '\'';


export type StringToArray<S extends string, Result extends string[] = []> = string extends S
  ? never
  : S extends `${infer F}${infer R}`
    ? StringToArray<R, [...Result, F]>
    : Result;


export type StringLength<S extends string> = string extends S
  ? never
  : StringToArray<S>['length'];


export type ToString<T> = T extends string | number ? `${T}` : never;


export type StringToNumber<S extends string> = S extends `${infer N extends number}`
  ? N
  : S extends 'Infinity'
    ? PositiveInfinity
    : S extends '-Infinity'
      ? NegativeInfinity
      : never;



export type StartsWith<S extends string, SearchString extends string> = string extends S | SearchString
  ? never
  : S extends `${SearchString}${infer T}`
    ? true
    : false;



export type EndsWith<S extends string, SearchString extends string> = string extends S | SearchString
  ? never
  : S extends `${infer T}${SearchString}`
    ? true
    : false;


export type IsLowerCase<T extends string> = T extends Lowercase<T> ? true : false;


export type IsUpperCase<T extends string> = T extends Uppercase<T> ? true : false;


export type IsWhitespace<T extends string> = T extends Whitespace
  ? true
  : T extends `${Whitespace}${infer Rest}`
    ? IsWhitespace<Rest>
    : false;



export type IsNumeric<T extends string> = T extends `${number}`
  ? Trim<T> extends T
    ? true
    : false
  : false;

export type TrimLeft<V extends string> = V extends `${Whitespace}${infer R}` ? TrimLeft<R> : V;
export type TrimRight<V extends string> = V extends `${infer R}${Whitespace}` ? TrimRight<R> : V;

export type Trim<V extends string> = TrimLeft<TrimRight<V>>;

export type StripQuotes<T> = T extends `${Quotes}${infer L}` ? L extends `${infer R}${Quotes}` ? StripQuotes<R> : StripQuotes<L> : T;
