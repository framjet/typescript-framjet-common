# react

The `react` module provides functionality for working with React.

## Functions

| Function                   | Description                                                                | Arguments                  | Return Type                   |
|----------------------------|----------------------------------------------------------------------------|----------------------------|-------------------------------|
| [isElement](is-element.ts) | Checks if a value is a React element.                                      | `value: unknown`           | `value is React.ReactElement` |
| [isEqual](is-equal.ts)     | Checks if two values are equal using a React-specific equality comparison. | `a: unknown`, `b: unknown` | `boolean`                     |
| [isNode](is-node.ts)       | Checks if a value is a React node.                                         | `value: unknown`           | `value is React.ReactNode`    |
