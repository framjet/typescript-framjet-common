# debug

The `debug` module provides functionality for debugging and environment detection.

## Functions

| Function                                      | Description                                                                            | Arguments                         | Return Type                                                                                       |
|-----------------------------------------------|----------------------------------------------------------------------------------------|-----------------------------------|---------------------------------------------------------------------------------------------------|
| [isDev](is-dev.ts)                            | Checks if the environment is development.                                              | -                                 | `boolean`                                                                                         |
| [isTest](is-test.ts)                          | Checks if the environment is test.                                                     | -                                 | `boolean`                                                                                         |
| [isDevOrTest](is-dev-or-test.ts)              | Checks if the environment is either development or test.                               | -                                 | `boolean`                                                                                         |
| [isProd](is-prod.ts)                          | Checks if the environment is production.                                               | -                                 | `boolean`                                                                                         |
| [tagObject](tag-object.ts)                    | Tags an object with a string value.                                                    | `obj: T`, `tag: V`                | `TaggedObject<T, V>`                                                                              |
| [tagObjectOrAppend](tag-object.ts)            | Tags an object with a string value or appends the tag if the object is already tagged. | `obj: T`, `tag: V`                | ``T extends TaggedObject<infer U, infer N> ? TaggedObject<U, \`${N}${V}\`> : TaggedObject<T, V>`` |
| [getTag](tag-object.ts)                       | Gets the tag value of an object.                                                       | `obj: object`                     | `string`                                                                                          |
| [createMemoryDebugHandler](memory-handler.ts) | Creates a memory debug handler.                                                        | `props?: MemoryDebugHandlerProps` | `MemoryDebugHandler`                                                                              |
| [memoryDebugHandler](memory-handler.ts)       | The default memory debug handler instance.                                             | -                                 | `MemoryDebugHandler`                                                                              |

## Interfaces

### MemoryDebugHandler

| Method     | Description                                        | Arguments                                   | Return Type |
|------------|----------------------------------------------------|---------------------------------------------|-------------|
| `register` | Registers an object with the memory debug handler. | `obj: object`, `type: string`, `id: string` | `void`      |

### MemoryDebugHandlerProps

| Property          | Description                                            | Type                                                          |
|-------------------|--------------------------------------------------------|---------------------------------------------------------------|
| `cleanUpHandler`  | Optional cleanup handler function.                     | `(ref: CleanUpReference) => void`                             |
| `createReference` | Optional function to create a reference for an object. | `(obj: object, type: string, id: string) => CleanUpReference` |
