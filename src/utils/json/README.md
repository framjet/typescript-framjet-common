# json

The `json` module provides functionality for working with JSON.

## Functions

| Function             | Description                                  | Arguments                          | Return Type              |
|----------------------|----------------------------------------------|------------------------------------|--------------------------|
| [is](is.ts)          | Checks if a value is a valid JSON value.     | `value: unknown`, `deep?: boolean` | `value is JsonValue`     |
| [isObject](is.ts)    | Checks if a value is a valid JSON object.    | `value: unknown`, `deep?: boolean` | `value is JsonObject`    |
| [isArray](is.ts)     | Checks if a value is a valid JSON array.     | `value: unknown`, `deep?: boolean` | `value is JsonArray`     |
| [isPrimitive](is.ts) | Checks if a value is a valid JSON primitive. | `value: unknown`                   | `value is JsonPrimitive` |
