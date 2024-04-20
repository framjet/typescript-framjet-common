# arrays

The `arrays` module provides functionality for working with arrays.

## Functions

| Function                | Description                                                               | Arguments                                      | Return Type                      |
|-------------------------|---------------------------------------------------------------------------|------------------------------------------------|----------------------------------|
| [is](is.ts)             | Checks if a value is an array.                                            | `value: unknown`                               | `value is any[]`                 |
| [entries](entries.ts)   | Returns an array of key-value pairs for an array.                         | `value: T[]`                                   | `[number, T][]`                  |
| [includes](includes.ts) | Checks if an array includes a specific value.                             | `array: T`, `value: unknown`                   | `value is T[number]`             |
| [slice](slice.ts)       | Creates a slice of an array from `start` up to, but not including, `end`. | `array: T[]`, `start?: number`, `end?: number` | `T[]`                            |
| [wrap](wrap.ts)         | Wraps a value in an array if it's not already an array.                   | `value: T`                                     | `T extends Array<any> ? T : T[]` |
| [lastOf](last.ts)       | Returns the last element of an array.                                     | `array: V`                                     | `LastArrayElement<V>`            |
| [map](map.ts)           | Maps the elements of an array to a new array using a callback function.   | `arr: T[]`, `fn: (item: T) => U`               | `U[]`                            |
