/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyFunction, AnyStringLRU, KeyValueStore, LRU } from '../../types';
import { container } from './containter';

type InferFn<T> = T extends MemoizeFnOptions<infer V, any, any> ? V : never;
type InferKey<T> = T extends MemoizeFnOptions<any, infer V, any> ? V : never;

export interface MemoizeFnState<T extends AnyMemoizeFnOptions> {
  getOptions(): T;

  getStore(): ReturnType<T['createStore']>;

  getFunction(): InferFn<T>;
}

export interface BeforeCall<T extends AnyMemoizeFnOptions> extends MemoizeFnState<T> {
  useCachedResult<V extends boolean = true>(value: V): this;

  useCacheKey(key: InferKey<T>): this;

  stopPropagation(result: ReturnType<InferFn<T>>): this;

  getArguments(): Parameters<InferFn<T>>;

  setArguments(...args: Parameters<InferFn<T>>): this;
}

export interface AfterCall<T extends AnyMemoizeFnOptions> extends MemoizeFnState<T> {
  cacheResult<V extends boolean = true>(value: V): this;

  useCacheKey(key: InferKey<T>): this;

  getArguments(): Parameters<InferFn<T>>;

  getResult(): ReturnType<InferFn<T>>;

  setResult(result: ReturnType<InferFn<T>>): this;
}

export interface MemoizeFnOptions<Fn extends AnyFunction, Resolver extends AnyFunction<Parameters<Fn>>, Store extends KeyValueStore<ReturnType<Resolver>, ReturnType<Fn>>> {
  maxSize: number;
  createStore: (maxSize: number) => Store;
  beforeCall: (state: BeforeCall<this>) => void;
  afterCall: (state: AfterCall<this>) => void;
  resolver: Resolver;
}

export type AnyMemoizeFnOptions = MemoizeFnOptions<AnyFunction, AnyFunction, KeyValueStore<unknown, unknown>>;

export type MemoizeFn<Fn extends AnyFunction, T extends MemoizeFnOptions<AnyFunction, AnyFunction, KeyValueStore<unknown, unknown>>> = Fn & {
  _memoizedFn: MemoizeFnState<T>;
};

export function func<
  Fn extends AnyFunction,
  Store extends KeyValueStore<ReturnType<Resolver>, ReturnType<Fn>>,
  Resolver extends AnyFunction<Parameters<Fn>>,
>(
  name: string,
  fn: Fn,
  options?: Partial<MemoizeFnOptions<Fn, Resolver, Store>>
): MemoizeFn<Fn, MemoizeFnOptions<Fn, Resolver, Store>> {
  const resolvedOptions: MemoizeFnOptions<Fn, Resolver, Store> = {
    maxSize: options.maxSize ?? 500,
    createStore: options.createStore ?? ((maxSize: number) => new LRU<ReturnType<Resolver>, ReturnType<Fn>>(maxSize) as any),
    beforeCall: options.beforeCall ?? (() => {
      // nop
    }),
    afterCall: options.afterCall ?? (() => {
      // nop
    }),
    resolver: options.resolver ?? ((args: Parameters<Fn>) => args) as any
  };

  const memoFnStore = container().get('framjet.cache.memoize-fn') as AnyStringLRU<Store>;
  const state: MemoizeFnState<MemoizeFnOptions<Fn, Resolver, Store>> = {
    getOptions() {
      return resolvedOptions;
    },
    getStore() {
      return memoFnStore.computeIfNotPresent(name, () => resolvedOptions.createStore(resolvedOptions.maxSize));
    },
    getFunction() {
      return fn;
    }
  };

  const func = ((...args: Parameters<Fn>) => {
    let useCache = true;
    let cacheKey = this._memoizedFn.getOptions().resolver(...args);
    let processedArgs = args;
    let stopProp = false;
    let result: ReturnType<Fn>;

    func._memoizedFn.getOptions().beforeCall({
      ...func._memoizedFn,
      useCachedResult(value = true) {
        useCache = value;

        return this;
      },
      useCacheKey(key: ReturnType<Resolver>) {
        cacheKey = key;

        return this;
      },

      stopPropagation(r: ReturnType<Fn>) {
        stopProp = true;
        result = r;

        return this;
      },

      getArguments() {
        return processedArgs;
      },

      setArguments(...args: Parameters<Fn>) {
        processedArgs = args;

        return this;
      }
    });

    // @ts-expect-error TS2367
    if (stopProp === true) {
      return result;
    }

    if (useCache === true) {
      if (func._memoizedFn.getStore().has(cacheKey)) {
        return func._memoizedFn.getStore().get(cacheKey);
      }
    }

    result = fn(...processedArgs);

    this._memoizedFn.getOptions().afterCall({
      ...this._memoizedFn,
      cacheResult(value = true) {
        useCache = value;

        return this
      },
      useCacheKey(key: ReturnType<Resolver>) {
        cacheKey = key;

        return this;
      },
      getArguments() {
        return processedArgs;
      },
      getResult() {
        return result;
      },
      setResult(r: ReturnType<Fn>) {
        result = r;

        return this;
      }
    });

    if (useCache === true) {
      this._memoizedFn.getStore().set(cacheKey, result);
    }

    return result;
  }) as MemoizeFn<Fn, MemoizeFnOptions<Fn, Resolver, Store>>;

  func._memoizedFn = state;

  return func;
}
