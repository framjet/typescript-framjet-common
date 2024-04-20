export type that<T> = T extends true ? true : never;

export type thatKeysAreValueField<T, F extends keyof T[keyof T]> = that<
  keyof T extends T[keyof T][F] ? true : never
>;

export type thatValuesAre<T, U> = that<T[keyof T] extends U ? true : never>;
