const InternalAPISymbol: unique symbol = Symbol('__InternalAPI__');
type InternalAPISymbol = typeof InternalAPISymbol;
export interface ContainsInternalAPI<T> {
  [InternalAPISymbol]: T;
}

export function injectInternalAPI<
  I extends ContainsInternalAPI<T>,
  U extends Omit<I, InternalAPISymbol>,
  T,
>(input: U, internalAPI: T): I {
  return Object.assign(input, {
    [InternalAPISymbol]: internalAPI,
  }) as any;
}

function containsInternalAPI(
  input: unknown,
): input is ContainsInternalAPI<any> {
  if (input === undefined || input === null) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(input, InternalAPISymbol);
}

export function getInternalAPI<T extends object>(
  input: T,
): T extends ContainsInternalAPI<infer U> ? U : never {
  if (containsInternalAPI(input)) {
    return input[InternalAPISymbol];
  }

  throw new Error('No Internal API found on given object');
}
