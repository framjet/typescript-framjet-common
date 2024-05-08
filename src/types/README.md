# src/types

This folder contains TypeScript type definitions for various purposes.

## [array.ts](./array.ts)

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

## [assert.ts](./assert.ts)

Provides types for making assertions.

Types:
- **`that<T>`**: Asserts that a type is true.
- **`thatKeysAreValueField<T, F>`**: Asserts that all keys of an object type are a specific field of the value type.
- **`thatValuesAre<T, U>`**: Asserts that all values of an object type are of a specific type.

## [boolean.ts](./boolean.ts)

Provides types for working with booleans.

Types:
- **`IsFalse<T>`**: Checks if a boolean type is false.
- **`IsNotFalse<T>`**: Checks if a boolean type is not false.
- **`IsTrue<T>`**: Checks if a boolean type is true.
- **`IsNotTrue<T>`**: Checks if a boolean type is not true.

## [class.ts](./class.ts)

Provides types for working with classes.

Types:
- **`Class<T, Arguments>`**: Represents a class constructor with specific instance type and arguments.
- **`Constructor<T, Arguments>`**: Represents a constructor function with specific instance type and arguments.
- **`AbstractClass<T, Arguments>`**: Represents an abstract class constructor with specific instance type and arguments.
- **`AbstractConstructor<T, Arguments>`**: Represents an abstract constructor function with specific instance type and arguments.
- **`MethodsOf<T>`**: Gets the method names of a type.
- **`NoParameterMethods<T>`**: Gets the method names of a type that have no parameters.

## [functions.ts](./functions.ts)

Provides types for working with functions.

Types:
- **`AnyFunction<I, O>`**: Represents a function with specific input and output types.
- **`HasMultipleCallSignatures<T>`**: Checks if a function type has multiple call signatures.

## [index.ts](./index.ts)

The main entry point that exports all types.

## [internal-api.ts](./internal-api.ts)

Provides types and functions for internal API.

Exports:
- **`ContainsInternalAPI<T>`**: Represents an object that contains the internal API.
- **`injectInternalAPI<I, U, T>`**: Injects the internal API into an object type.
- **`getInternalAPI<T>`**: Retrieves the internal API from an object type.

## [json.ts](./json.ts)

Provides types for working with JSON.

Types:
- **`JsonObject`**: Represents a JSON object.
- **`JsonArray`**: Represents a JSON array.
- **`JsonPrimitive`**: Represents a JSON primitive value.
- **`JsonValue`**: Represents any JSON value.

## [key-value.ts](./key-value.ts)

Provides an interface for key-value stores.

Interface:
- **`KeyValueStore<K, V>`**: Represents a key-value store with specific key and value types.

## [literal.ts](./literal.ts)

Provides types for checking literal types.

Types:
- **`IsStringLiteral<T>`**: Checks if a type is a string literal type.
- **`IsNumberLiteral<T>`**: Checks if a type is a number literal type.
- **`IsNumericLiteral<T>`**: Checks if a type is a numeric literal type.
- **`IsBooleanLiteral<T>`**: Checks if a type is a boolean literal type.
- **`IsSymbolLiteral<T>`**: Checks if a type is a symbol literal type.
- **`IsLiteral<T>`**: Checks if a type is any literal type.

## [logic.ts](./logic.ts)

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

## [lru.ts](./lru.ts)

Provides the LRU (Least Recently Used) cache implementation.

Exports:
- **`LRU<K, V>`**: Represents an LRU cache with specific key and value types.
- **`StringLRU<T>`**: Represents an LRU cache with string keys and specific value type.
- **`AnyStringLRU<T>`**: Represents an LRU cache with string keys and any value type.

## [map-set.ts](./map-set.ts)

Provides the MapSet class, a Map that holds Sets as values.

Exports:
- **`MapSet<K, V>`**: Represents a Map that holds Sets as values, with specific key and value types.

## [memoize-container.ts](./memoize-container.ts)

Provides the MemoizeContainer class for memoization.

Exports:
- **`MemoizeContainer`**: Represents a container for memoized values.

## [numeric.ts](./numeric.ts)

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
- **`SameLengthPositiveNumericStringGt<A, B>`**: Checks if a positive numeric string type is greater than another of the same length.
- **`PositiveNumericStringGt<A, B>`**: Checks if a positive numeric string type is greater than another.
- **`PositiveNumericCharacterGt<A, B>`**: Checks if a character from a positive numeric string type is greater than another.

## [object.ts](./object.ts)

Provides types for working with objects.

Types:
- **`IsPlainObject<T>`**: Checks if a type is a plain object type.
- **`BuildObject<Key, Value, CopiedFrom>`**: Builds an object type with specific key and value types, optionally copying from another object type.
- **`ObjectValue<T, K>`**: Gets the value type of a specific key in an object type.
- **`RequireNone<KeysType>`**: Makes all properties of an object type optional and sets their types to never.
- **`ExactKey<T, Key>`**: Gets the exact key type of an object type.
- **`Simplify<T>`**: Simplifies an object type by flattening intersections and removing index signatures.
- **`UndefinedToOptional<T>`**: Converts undefined properties in an object type to optional properties.
- **`EmptyObject`**: Represents an empty object type.
- **`IsEmptyObject<T>`**: Checks if an object type is empty.

## [path.ts](./path.ts)

Provides types for working with paths in objects.

Types:
- **`PossiblePaths<T, TPath, TResult>`**: Gets all possible paths in an object type.
- **`GetTypeAtPath<T, TPath, TDefault>`**: Gets the type at a specific path in an object type, with a default type if the path does not exist.

## [primitives.ts](./primitives.ts)

Provides primitive types.

Types:
- **`Primitive`**: Represents any primitive type.
- **`BuiltIns`**: Represents any built-in type.
- **`NonRecursiveType`**: Represents any non-recursive type.
- **`UnknownArrayOrTuple`**: Represents an array or tuple of unknown type.
- **`NonEmptyTuple`**: Represents a non-empty tuple type.
- **`TypedArray`**: Represents any typed array type.

## [strings.ts](./strings.ts)

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

## [tuple.ts](./tuple.ts)

Provides types for working with tuples.

Types:
- **`TupleLength<T>`**: Gets the length of a tuple type.
- **`BuildTuple<L, Fill>`**: Builds a tuple type of a specific length, filled with a specific type.
- **`ToTuple<Union>`**: Converts a union type to a tuple type.

## [types.ts](./types.ts)

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

## [union.ts](./union.ts)

Provides types for working with unions.

Types:
- **`UnionMin<N>`**: Represents a union type with a minimum number of members.
- **`UnionMax<N>`**: Represents a union type with a maximum number of members.
- **`IsUnion<T>`**: Checks if a type is a union type.

## utils/

A folder with utility types.

### [exact.ts](./utils/exact.ts)

Provides the Exact type for exact type matching.

Type:
- **`Exact<T, Shape>`**: Checks if a type exactly matches a shape type.

### [jsonify.ts](./utils/jsonify.ts)

Provides the Jsonify type for converting types to JSON-compatible types.

Type:
- **`Jsonify<T>`**: Converts a type to a JSON-compatible type.

### [readonly-deep.ts](./utils/readonly-deep.ts)

Provides the ReadonlyDeep type for making all properties and sub-properties readonly.

Type:
- **`ReadonlyDeep<T>`**: Makes all properties and sub-properties of a type readonly.

## [weak-value-map.ts](./weak-value-map.ts)

Provides a `WeakValueMap` class that implements a weak value mapping:

- `WeakValueMap<K, V extends WeakKey>`: A class that implements a `Map`-like interface with weak references to the values. It supports optional cleanup callbacks and can be initialized with an iterable of entries. The class provides methods similar to the built-in `Map`, such as `get`, `set`, `delete`, `has`, `clear`, and iteration methods.
