export type Class<T, Arguments extends unknown[] = any[]> = {
  prototype: Pick<T, keyof T>;
  new (...arguments_: Arguments): T;
};

export type Constructor<T, Arguments extends unknown[] = any[]> = new (
  ...arguments_: Arguments
) => T;

export interface AbstractClass<T, Arguments extends unknown[] = any[]>
  extends AbstractConstructor<T, Arguments> {
  prototype: Pick<T, keyof T>;
}

export type AbstractConstructor<
  T,
  Arguments extends unknown[] = any[],
> = abstract new (...arguments_: Arguments) => T;

export type MethodsOf<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type NoParameterMethods<T> = {
  [K in MethodsOf<T>]: T[K] extends (...args: []) => any ? K : never;
}[MethodsOf<T>];
