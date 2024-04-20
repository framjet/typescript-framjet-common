# memoize

The `memoize` module provides functionality for memoization.

## Functions

| Function                   | Description                               | Arguments                                                                            | Return Type                                            |
|----------------------------|-------------------------------------------|--------------------------------------------------------------------------------------|--------------------------------------------------------|
| [func](fn.ts)              | Creates a memoized version of a function. | `name: string`, `fn: Fn`, `options?: Partial<MemoizeFnOptions<Fn, Resolver, Store>>` | `MemoizeFn<Fn, MemoizeFnOptions<Fn, Resolver, Store>>` |
| [container](containter.ts) | Creates a memoization container.          | -                                                                                    | `MemoizeContainer`                                     |
