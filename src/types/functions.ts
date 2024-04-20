export type AnyFunction<I extends any[] = any[], O = any> = (...args: I) => O;

export type HasMultipleCallSignatures<
  T extends (...arguments_: any[]) => unknown
> = T extends {
  (...arguments_: infer A): unknown;
  (...arguments_: any[]): unknown;
}
  ? unknown[] extends A
    ? false
    : true
  : false;
