# FramJet Common

A suite of essential utilities and TypeScript types for FramJet projects, offering streamlined code integration and
enhanced type safety.

## Installation

You can install the package using npm, yarn or pnpm:

```bash
# With npm

npm install @framjet/common

# With Yarn

yarn add @framjet/common

# With PNPM

pnpm install @framjet/common
```

## Features

`@framjet/common` offers a diverse set of features, including:


* String utilities: Manipulate strings, convert to arrays, handle Unicode characters, and more.
* Type utilities: Comprehensive set of TypeScript types for enhanced type safety and code organization.
* Object utilities: Work with objects, build objects, simplify objects, and handle empty objects.
* Array utilities: Manipulate arrays, get array lengths, extract array elements, and more.
* Numeric utilities: Handle numbers, perform arithmetic operations, and work with numeric literals.
* Functional utilities: Create case-first functions, convert values to strings, and split Unicode strings.
* Data structures: Implement LRU (Least Recently Used) caches, map-sets, and key-value stores.
* Memoization: Memoize functions and manage memoization containers.
* Internal API: Inject and retrieve internal APIs for objects.
* TypeScript Integration: Strongly typed interfaces to ensure code reliability and developer productivity.
* Utility Functions: A collection of utility functions to facilitate common programming tasks.

## [Types](src/types/README.md)

The `Types` folder contains a wide range of TypeScript type definitions and utilities designed to enhance type safety
and facilitate type manipulation in our FramJet projects. These types cover various domains, including arrays, objects,
tuples, logic, numerics, primitives, strings, and more. By leveraging these types, you can write more robust and
expressive code, catch potential type-related issues at compile-time, and improve the overall maintainability of your
codebase.

### [Array](./src/types/array.ts)

Provides types for working with arrays.

Types:

- **`AnyArray`**: Represents an array of unknown type and unknown mutability.
- **`ArrayLength<T>`**: Gets the length of an array type.
- **`UnknownArray`**: Represents a readonly array of unknown type.
- **`FirstArrayElement<TArray>`**: Gets the type of the first element in an array or tuple.
- **`ArrayTail<TArray>`**: Gets the tail of an array (all elements except the first).
- **`ArrayElement<T>`**: Gets the element type of an array.
- **`ArrayMin<A>`**: Finds the minimum numeric value in a numeric array type.
- **`ArrayMax<A>`**: Finds the maximum numeric value in a numeric array type.
- **`StaticPartOfArray<T>`**: Extracts the static part of an array (the part with known length).
- **`VariablePartOfArray<T>`**: Extracts the variable part of an array (the part with unknown length).
- **`SetArrayAccess<T, IsReadonly>`**: Sets the mutability of an array type.
- **`IsArrayReadonly<T>`**: Checks if an array type is readonly.
- **`LastArrayElement<Elements>`**: Gets the type of the last element in an array or tuple.
- **`AtLeastOneItemArray<T>`**: Ensures an array type has at least one item.
- **`ArrayKeys`**: Represents the string keys of an array.
- **`KnownArrayIndices<T>`**: Gets the known numeric indices of an array type.
- **`ArrayIndices<T>`**: Gets the numeric indices of an array type.

### [Assert](./src/types/assert.ts)

Provides types for making assertions.

Types:

- **`that<T>`**: Asserts that a type is true.
- **`thatKeysAreValueField<T, F>`**: Asserts that all keys of an object type are a specific field of the value type.
- **`thatValuesAre<T, U>`**: Asserts that all values of an object type are of a specific type.

### [Boolean](./src/types/boolean.ts)

Provides types for working with booleans.

Types:

- **`IsFalse<T>`**: Checks if a boolean type is false.
- **`IsNotFalse<T>`**: Checks if a boolean type is not false.
- **`IsTrue<T>`**: Checks if a boolean type is true.
- **`IsNotTrue<T>`**: Checks if a boolean type is not true.

### [Class](./src/types/class.ts)

Provides types for working with classes.

Types:

- **`Class<T, Arguments>`**: Represents a class constructor with specific instance type and arguments.
- **`Constructor<T, Arguments>`**: Represents a constructor function with specific instance type and arguments.
- **`AbstractClass<T, Arguments>`**: Represents an abstract class constructor with specific instance type and arguments.
- **`AbstractConstructor<T, Arguments>`**: Represents an abstract constructor function with specific instance type and
  arguments.
- **`MethodsOf<T>`**: Gets the method names of a type.
- **`NoParameterMethods<T>`**: Gets the method names of a type that have no parameters.

### [Functions](./src/types/functions.ts)

Provides types for working with functions.

Types:

- **`AnyFunction<I, O>`**: Represents a function with specific input and output types.
- **`HasMultipleCallSignatures<T>`**: Checks if a function type has multiple call signatures.

## [InternalAPI](./src/types/internal-api.ts)

Provides types and functions for internal API.

Exports:

- **`ContainsInternalAPI<T>`**: Represents an object that contains the internal API.
- **`injectInternalAPI<I, U, T>`**: Injects the internal API into an object type.
- **`getInternalAPI<T>`**: Retrieves the internal API from an object type.

### [JSON](./src/types/json.ts)

Provides types for working with JSON.

Types:

- **`JsonObject`**: Represents a JSON object.
- **`JsonArray`**: Represents a JSON array.
- **`JsonPrimitive`**: Represents a JSON primitive value.
- **`JsonValue`**: Represents any JSON value.

### [KeyValue](./src/types/key-value.ts)

Provides an interface for key-value stores.

Interface:

- **`KeyValueStore<K, V>`**: Represents a key-value store with specific key and value types.

### [Literal](./src/types/literal.ts)

Provides types for checking literal types.

Types:

- **`IsStringLiteral<T>`**: Checks if a type is a string literal type.
- **`IsNumberLiteral<T>`**: Checks if a type is a number literal type.
- **`IsNumericLiteral<T>`**: Checks if a type is a numeric literal type.
- **`IsBooleanLiteral<T>`**: Checks if a type is a boolean literal type.
- **`IsSymbolLiteral<T>`**: Checks if a type is a symbol literal type.
- **`IsLiteral<T>`**: Checks if a type is any literal type.

### [Logic](./src/types/logic.ts)

Provides types for logical operations.

Types:

- **`IsAny<T>`**: Checks if a type is the `any` type.
- **`IsArray<T>`**: Checks if a type is an array type.
- **`IsObject<T>`**: Checks if a type is an object type.
- **`IsFunction<T>`**: Checks if a type is a function type.
- **`IsNever<T>`**: Checks if a type is the `never` type.
- **`IsUnknown<T>`**: Checks if a type is the `unknown` type.
- **`IsNull<T>`**: Checks if a type is the `null` type.
- **`IsPrimitive<T>`**: Checks if a type is a primitive type.
- **`IsBothExtends<BaseType, FirstType, SecondType>`**: Checks if both types extend a base type.
- **`IsEqual<A, B>`**: Checks if two types are equal.
- **`And<A, B>`**: Logical AND operator for boolean types.
- **`Or<A, B>`**: Logical OR operator for boolean types.
- **`Not<A>`**: Logical NOT operator for boolean types.
- **`GreaterThan<A, B>`**: Checks if a numeric type is greater than another.
- **`GreaterThanOrEqual<A, B>`**: Checks if a numeric type is greater than or equal to another.
- **`LessThan<A, B>`**: Checks if a numeric type is less than another.
- **`LessThanOrEqual<A, B>`**: Checks if a numeric type is less than or equal to another.

### [LRU](./src/types/lru.ts)

Provides the LRU (Least Recently Used) cache implementation.

Exports:

- **`LRU<K, V>`**: Represents an LRU cache with specific key and value types.
- **`StringLRU<T>`**: Represents an LRU cache with string keys and specific value type.
- **`AnyStringLRU<T>`**: Represents an LRU cache with string keys and any value type.

### [MapSet](./src/types/map-set.ts)

Provides the MapSet class, a Map that holds Sets as values.

Exports:

- **`MapSet<K, V>`**: Represents a Map that holds Sets as values, with specific key and value types.

### [Memoize-container](./src/types/memoize-container.ts)

Provides the MemoizeContainer class for memoization.

Exports:

- **`MemoizeContainer`**: Represents a container for memoized values.

### [Numeric](./src/types/numeric.ts)

Provides types for working with numbers.

Types:

- **`Numeric`**: Represents a numeric type (number or bigint).
- **`Zero`**: Represents the numeric value zero.
- **`PositiveInfinity`**: Represents the numeric value positive infinity.
- **`NegativeInfinity`**: Represents the numeric value negative infinity.
- **`Finite<T>`**: Constrains a numeric type to be finite.
- **`Negative<T>`**: Constrains a numeric type to be negative.
- **`NonNegative<T>`**: Constrains a numeric type to be non-negative.
- **`IsNegative<T>`**: Checks if a numeric type is negative.
- **`Integer<T>`**: Constrains a numeric type to be an integer.
- **`NegativeInteger<T>`**: Constrains a numeric type to be a negative integer.
- **`NonNegativeInteger<T>`**: Constrains a numeric type to be a non-negative integer.
- **`Float<T>`**: Constrains a numeric type to be a floating-point number.
- **`NegativeFloat<T>`**: Constrains a numeric type to be a negative floating-point number.
- **`NonNegativeFloat<T>`**: Constrains a numeric type to be a non-negative floating-point number.
- **`NumberAbsolute<N>`**: Gets the absolute value of a numeric type.
- **`SameLengthPositiveNumericStringGt<A, B>`**: Checks if a positive numeric string type is greater than another of the
  same length.
- **`PositiveNumericStringGt<A, B>`**: Checks if a positive numeric string type is greater than another.
- **`PositiveNumericCharacterGt<A, B>`**: Checks if a character from a positive numeric string type is greater than
  another.

### [Object](./src/types/object.ts)

Provides types for working with objects.

Types:

- **`IsPlainObject<T>`**: Checks if a type is a plain object type.
- **`BuildObject<Key, Value, CopiedFrom>`**: Builds an object type with specific key and value types, optionally copying
  from another object type.
- **`ObjectValue<T, K>`**: Gets the value type of a specific key in an object type.
- **`RequireNone<KeysType>`**: Makes all properties of an object type optional and sets their types to never.
- **`ExactKey<T, Key>`**: Gets the exact key type of an object type.
- **`Simplify<T>`**: Simplifies an object type by flattening intersections and removing index signatures.
- **`UndefinedToOptional<T>`**: Converts undefined properties in an object type to optional properties.
- **`EmptyObject`**: Represents an empty object type.
- **`IsEmptyObject<T>`**: Checks if an object type is empty.

### [Path](./src/types/path.ts)

Provides types for working with paths in objects.

Types:

- **`PossiblePaths<T, TPath, TResult>`**: Gets all possible paths in an object type.
- **`GetTypeAtPath<T, TPath, TDefault>`**: Gets the type at a specific path in an object type, with a default type if
  the path does not exist.

### [Primitives](./src/types/primitives.ts)

Provides primitive types.

Types:

- **`Primitive`**: Represents any primitive type.
- **`BuiltIns`**: Represents any built-in type.
- **`NonRecursiveType`**: Represents any non-recursive type.
- **`UnknownArrayOrTuple`**: Represents an array or tuple of unknown type.
- **`NonEmptyTuple`**: Represents a non-empty tuple type.
- **`TypedArray`**: Represents any typed array type.

### [Strings](./src/types/strings.ts)

Provides types for working with strings.

Types:

- **`UpperCaseCharacters`**: Represents uppercase alphabetic characters.
- **`LowerCaseCharacters`**: Represents lowercase alphabetic characters.
- **`StringDigit`**: Represents numeric characters.
- **`Whitespace`**: Represents whitespace characters.
- **`WordSeparators`**: Represents word separator characters.
- **`Quotes`**: Represents quote characters.
- **`StringToArray<S>`**: Converts a string type to an array type of characters.
- **`StringLength<S>`**: Gets the length of a string type.
- **`ToString<T>`**: Converts a type to its string representation.
- **`StringToNumber<S>`**: Converts a string type to a numeric type.
- **`StartsWith<S, SearchString>`**: Checks if a string type starts with a specific substring.
- **`EndsWith<S, SearchString>`**: Checks if a string type ends with a specific substring.
- **`IsLowerCase<T>`**: Checks if a string type is lowercase.
- **`IsUpperCase<T>`**: Checks if a string type is uppercase.
- **`IsWhitespace<T>`**: Checks if a string type consists only of whitespace characters.
- **`IsNumeric<T>`**: Checks if a string type represents a numeric value.
- **`TrimLeft<V>`**: Removes leading whitespace from a string type.
- **`TrimRight<V>`**: Removes trailing whitespace from a string type.
- **`Trim<V>`**: Removes leading and trailing whitespace from a string type.
- **`StripQuotes<T>`**: Removes surrounding quotes from a string type.

### [Tuple](./src/types/tuple.ts)

Provides types for working with tuples.

Types:

- **`TupleLength<T>`**: Gets the length of a tuple type.
- **`BuildTuple<L, Fill>`**: Builds a tuple type of a specific length, filled with a specific type.
- **`ToTuple<Union>`**: Converts a union type to a tuple type.

### [Types](./src/types/types.ts)

Provides registry of types and type names.

Exports:

- **`TypesPrimitivesRegistry`**: Represents a registry of primitive types.
- **`TypesRegistry`**: Represents a registry of non-primitive types.
- **`TypeNames`**: Represents the names of all registered types.
- **`TypeName<T, Exact>`**: Gets the name of a type, with optional exact matching.
- **`Primitives`**: Represents the names of primitive types.
- **`BuiltIns`**: Represents the names of built-in types.
- **`NonRecursiveType`**: Represents the names of non-recursive types.
- **`TypedArray`**: Represents the names of typed array types.
- **`TypeFromName<T>`**: Gets the type corresponding to a type name.
- **`TypesFromNames<T>`**: Gets a union of types corresponding to an array of type names.

### [Union](./src/types/union.ts)

Provides types for working with unions.

Types:

- **`UnionMin<N>`**: Represents a union type with a minimum number of members.
- **`UnionMax<N>`**: Represents a union type with a maximum number of members.
- **`IsUnion<T>`**: Checks if a type is a union type.

### [Exact](./src/types/utils/exact.ts)

Provides the Exact type for exact type matching.

Type:

- **`Exact<T, Shape>`**: Checks if a type exactly matches a shape type.

### [Jsonify](./src/types/utils/jsonify.ts)

Provides the Jsonify type for converting types to JSON-compatible types.

Type:

- **`Jsonify<T>`**: Converts a type to a JSON-compatible type.

### [ReadOnly Deep](./src/types/utils/readonly-deep.ts)

Provides the ReadonlyDeep type for making all properties and sub-properties readonly.

Type:

- **`ReadonlyDeep<T>`**: Makes all properties and sub-properties of a type readonly.

## [Utility Functions](src/utils/README.md)

The utility functions provides a collection of utility functions that simplify common tasks and operations in JavaScript and TypeScript projects. These utilities cover a wide range of areas, including array manipulation, boolean checks, debugging, error handling, JSON validation, logging, memoization, numeric operations, object manipulation, primitive checks, React-specific utilities, and string manipulation. By utilizing these utility functions, you can write more concise, readable, and efficient code while focusing on your core application logic.

### [Arrays](src/utils/arrays/README.md)

* [`Arrays.entries(value: T[]): [number, T][]`](src/utils/arrays/entries.ts) - Returns an array of key-value pairs for
  an array.
* [`Arrays.includes(array: T, value: unknown): value is T[number]`](src/utils/arrays/includes.ts) - Checks if an array
  includes a specific value.
* [`Arrays.is(value: unknown): value is any[]`](src/utils/arrays/is.ts) - Checks if a value is an array.
* [`Arrays.lastOf(array: V): LastArrayElement<V>`](src/utils/arrays/last.ts) - Returns the last element of an array.
* [`Arrays.map(arr: T[], fn: (item: T) => U): U[]`](src/utils/arrays/map.ts) - Maps the elements of an array to a new
  array using a callback function.
* [`Arrays.slice(array: T[], start?: number, end?: number): T[]`](src/utils/arrays/slice.ts) - Creates a slice of an
  array from `start` up to, but not including, `end`.
* [`Arrays.wrap(value: T): T extends Array<any> ? T : T[]`](src/utils/arrays/wrap.ts) - Wraps a value in an array if
  it's not already an array.

### [Booleans](src/utils/booleans/README.md)

* [`Booleans.is(value: unknown): value is boolean`](src/utils/booleans/is.ts) - Checks if a value is a boolean.

### [Debug](src/utils/debug/README.md)

* [`Debug.createMemoryDebugHandler(props?: MemoryDebugHandlerProps): MemoryDebugHandler`](src/utils/debug/memory-handler.ts) -
  Creates a memory debug handler.
* [`Debug.getTag(obj: object): string`](src/utils/debug/tag-object.ts) - Gets the tag value of an object.
* [`Debug.isDev(): boolean`](src/utils/debug/is-dev.ts) - Checks if the environment is development.
* [`Debug.isDevOrTest(): boolean`](src/utils/debug/is-dev-or-test.ts) - Checks if the environment is either development
  or test.
* [`Debug.isProd(): boolean`](src/utils/debug/is-prod.ts) - Checks if the environment is production.
* [`Debug.isTest(): boolean`](src/utils/debug/is-test.ts) - Checks if the environment is test.
* [`Debug.memoryDebugHandler: MemoryDebugHandler`](src/utils/debug/memory-handler.ts) - The default memory debug handler
  instance.
* [`Debug.tagObject(obj: T, tag: V): TaggedObject<T, V>`](src/utils/debug/tag-object.ts) - Tags an object with a string
  value.
* [``Debug.tagObjectOrAppend(obj: T, tag: V): T extends TaggedObject<infer U, infer N> ? TaggedObject<U, `${N}${V}`> : TaggedObject<T, V>``](src/utils/debug/tag-object.ts) -
  Tags an object with a string value or appends the tag if the object is already tagged.

### [Errors](src/utils/errors/README.md)

* [`Errors.message(e: unknown): string`](src/utils/errors/message.ts) - Gets the error message from an unknown value.

### [Functions](src/utils/functions/README.md)

* [`Functions.is(value: unknown): value is Function`](src/utils/functions/is.ts) - Checks if a value is a function.

### [Json](src/utils/json/README.md)

* [`Json.is(value: unknown, deep?: boolean): value is JsonValue`](src/utils/json/is.ts) - Checks if a value is a valid
  JSON value.
* [`Json.isArray(value: unknown, deep?: boolean): value is JsonArray`](src/utils/json/is.ts) - Checks if a value is a
  valid JSON array.
* [`Json.isObject(value: unknown, deep?: boolean): value is JsonObject`](src/utils/json/is.ts) - Checks if a value is a
  valid JSON object.
* [`Json.isPrimitive(value: unknown): value is JsonPrimitive`](src/utils/json/is.ts) - Checks if a value is a valid JSON
  primitive.

### [Logger](src/utils/logger/README.md)

* [`Logger.asArgs(...args: unknown[]): string`](src/utils/logger/as-args.ts) - Converts values to a string
  representation suitable for logging.

### [Memoize](src/utils/memoize/README.md)

* [`Memoize.container(): MemoizeContainer`](src/utils/memoize/containter.ts) - Creates a memoization container.
* [`Memoize.func(name: string, fn: Fn, options?: Partial<MemoizeFnOptions<Fn, Resolver, Store>>): MemoizeFn<Fn, MemoizeFnOptions<Fn, Resolver, Store>>`](src/utils/memoize/fn.ts) -
  Creates a memoized version of a function.

### [Numerics](src/utils/numerics/README.md)

* [`Numerics.is(value: unknown): value is Numeric`](src/utils/numerics/is.ts) - Checks if a value is a numeric value.
* [`Numerics.isBigInt(value: unknown): value is bigint`](src/utils/numerics/is-bigint.ts) - Checks if a value is a
  BigInt.
* [`Numerics.isNumber(value: unknown): value is number`](src/utils/numerics/is-number.ts) - Checks if a value is a
  number.

### [Objects](src/utils/objects/README.md)

* [`Objects.deepClone(obj: T): T`](src/utils/objects/deep-clone.ts) - Creates a deep clone of an object.
* [`Objects.deepFreeze(obj: T): ReadonlyDeep<T>`](src/utils/objects/deep-freeze.ts) - Freezes an object and all its
  nested properties.
* [`Objects.deleteKey(obj: T, key: keyof T): void`](src/utils/objects/delete-key.ts) - Deletes a key from an object.
* [`Objects.entries(obj: T): [keyof T, T[keyof T]][]`](src/utils/objects/entries.ts) - Gets an array of key-value pairs
  for an object.
* [`Objects.fromEntries(entries: [K, V][]): { [KK in K]: V }`](src/utils/objects/from-entries.ts) - Creates an object
  from an array of key-value pairs.
* [`Objects.fromMap(map: Map<K, V>): Record<K, V>`](src/utils/objects/from-map.ts) - Creates an object from a Map.
* [`Objects.get(input: unknown, path: PossiblePaths<T, TPath, ''> | TPath, defaultValue?: GetTypeAtPath<T, TPath, TDefault> | TDefault): TDefault extends undefined ? GetTypeAtPath<T, TPath, TDefault> : Exclude<GetTypeAtPath<T, TPath, TDefault>, undefined> | TDefault`](src/utils/objects/get.ts) - Gets a value from an object by path.
* [`Objects.hasProperty(obj: T, name: PropertyKey): name is keyof T`](src/utils/objects/has-property.ts) - Checks if an object has a specific property.
* [`Objects.is(value: unknown, ignoreArrays?: boolean): value is object`](src/utils/objects/is.ts) - Checks if a value is an object.
* [`Objects.isEqual(value: A, other: B): IsEqual<A, B>`](src/utils/objects/is-equal.ts) - Checks if two values are deeply equal.
* [`Objects.isIndex(value: unknown, length?: number): boolean`](src/utils/objects/is-index.ts) - Checks if a value is a valid array-like index.
* [`Objects.isType(value: unknown, ...types: AtLeastOneItemArray<T>): value is TypesFromNames<T>`](src/utils/objects/is-type.ts) - Checks if a value is of a specific type or types.
* [`Objects.keys(obj: T): (keyof T)[]`](src/utils/objects/keys.ts) - Gets an array of an object's own enumerable property names.
* [`Objects.replaceValue(obj: object, search: V, replacement: V): void`](src/utils/objects/replace-value.ts) - Replaces a value in an object.
* [`Objects.set(obj: T, path: PossiblePaths<T, TPath, ''>, value: GetTypeAtPath<T, TPath, TValue> | TValue): T`](src/utils/objects/set.ts) - Sets a value in an object by path.
* [`Objects.values(obj: T): T[keyof T][]`](src/utils/objects/values.ts) - Gets an array of an object's own enumerable property values.

### [Primitives](src/utils/primitives/README.md)
* [`Primitives.is(value: unknown): value is Primitive`](src/utils/primitives/is.ts) - Checks if a value is a primitive value.

### [ReactUtils](src/utils/react/README.md)
* [`ReactUtils.isElement(value: unknown): value is React.ReactElement`](src/utils/react/is-element.ts) - Checks if a value is a React element.
* [`ReactUtils.isEqual(a: unknown, b: unknown): boolean`](src/utils/react/is-equal.ts) - Checks if two values are equal using a React-specific equality comparison.
* [`ReactUtils.isNode(value: unknown): value is React.ReactNode`](src/utils/react/is-node.ts) - Checks if a value is a React node.

### [Strings](src/utils/strings/README.md)
* [`Strings.asciiToArray(input: T): StringToArray<T>`](src/utils/strings/ascii-to-array.ts) - Converts an ASCII string to an array.
* [`Strings.camelCase(input: string): string`](src/utils/strings/case.ts) - Converts a string to camel case.
* [`Strings.castSlice(array: T[], start: number, end?: number): T[]`](src/utils/strings/cast-slice.ts) - Casts an array to a slice if needed.
* [`Strings.convertCase(input: string, options?: ConvertCaseOptions): string`](src/utils/strings/case.ts) - Converts the case of a string based on specified options.
* [`Strings.createCaseFirst(methodName: NoParameterMethods<String>): (input: string) => string`](src/utils/strings/create-case-first.ts) - Creates a function that changes the case of the first character of a string.
* [`Strings.dotCase(input: string): string`](src/utils/strings/case.ts) - Converts a string to dot case.
* [`Strings.hasUnicode(input: string): boolean`](src/utils/strings/has-unicode.ts) - Checks if a string contains Unicode symbols.
* [`Strings.is(value: unknown): value is string`](src/utils/strings/is.ts) - Checks if a value is a string.
* [`Strings.kebabCase(input: string): string`](src/utils/strings/case.ts) - Converts a string to kebab case.
* [`Strings.lowerCase(input: string): string`](src/utils/strings/case.ts) - Converts a string to lower case.
* [`Strings.lowerFirst(input: string): string`](src/utils/strings/lower-first.ts) - Converts the first character of a string to lower case.
* [`Strings.pascalCase(input: string): string`](src/utils/strings/case.ts) - Converts a string to pascal case.
* [`Strings.randomString(length: number, { prefix, suffix, characters }?: Options): string`](src/utils/strings/random-string.ts) - Generates a random string.
* [`Strings.snakeCase(input: string): string`](src/utils/strings/case.ts) - Converts a string to snake case.
* [`Strings.startCase(input: string): string`](src/utils/strings/case.ts) - Converts a string to start case.
* [`Strings.stringToArray(input: T): StringToArray<T>`](src/utils/strings/string-to-array.ts) - Converts a string to an array.
* [`Strings.toPath(input: string): string[]`](src/utils/strings/to-path.ts) - Converts a string to a path array.
* [`Strings.toString(value: unknown): string`](src/utils/strings/to-string.ts) - Converts a value to a string.
* [`Strings.unicodeToArray(input: T): StringToArray<T>`](src/utils/strings/unicode-to-array.ts) - Converts a Unicode string to an array.
* [`Strings.unicodeWords(input: string): RegExpMatchArray`](src/utils/strings/unicode-words.ts) - Splits a Unicode string into an array of its words.
* [`Strings.upperCase(input: string): string`](src/utils/strings/case.ts) - Converts a string to upper case.
* [`Strings.upperFirst(input: string): string`](src/utils/strings/upper-first.ts) - Converts the first character of a string to upper case.
* [``Strings.withPrefixFn(prefix: T): <U extends string>(value: U) => `${T}${U}` ``](src/utils/strings/with-prefix-fn.ts) - Creates a function that adds a prefix to a string.
* [``Strings.withSuffixFn(suffix: T): <U extends string>(value: U) => `${U}${T}` ``](src/utils/strings/with-suffix-fn.ts) - Creates a function that adds a suffix to a string.
* [`Strings.words(input: string, pattern?: RegExp | string): string[]`](src/utils/strings/words.ts) - Splits a string into an array of its words.

### [Symbols](src/utils/symbols/README.md)
* [`Symbols.is(value: unknown): value is symbol`](src/utils/symbols/is.ts) - Checks if a value is a symbol.

## Contributing

Contributions to `@framjet/common` are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on the project's repository.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
