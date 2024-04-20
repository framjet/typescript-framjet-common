import { toString } from './to-string';
import { upperFirst } from './upper-first';
import { words } from './words';

interface ConvertCaseOptions {
  separator?: string; // Separator for joining words
  transformWord?: (word: string, index: number) => string; // Function to transform each word
  transformResult?: (result: string) => string; // Function to transform the final result
}

export function createCaseFunction(config: ConvertCaseOptions) {
  return function (input: string): string {
    const {
      separator = '',
      transformWord = (w) => w,
      transformResult = (w) => w,
    } = config;

    const transformedWords = words(toString(input).replace(/['\u2019]/g, ''))
      .map(transformWord)
      .join(separator);

    return transformResult(transformedWords);
  };
}

export function convertCase(
  input: string,
  options?: ConvertCaseOptions,
): string {
  return createCaseFunction(options ?? {})(input);
}

/**
 * Converts `string` to
 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * snakeCase('Foo Bar')
 * // => 'foo_bar'
 *
 * snakeCase('fooBar')
 * // => 'foo_bar'
 *
 * snakeCase('--FOO-BAR--')
 * // => 'foo_bar'
 *
 * snakeCase('foo2bar')
 * // => 'foo_2_bar'
 */
export const snakeCase = createCaseFunction({
  separator: '_',
  transformWord: (word) => word.toLowerCase(),
});

/**
 * Converts `string` to dot case
 *
 * dotCase('Foo Bar')
 * // => 'foo.bar'
 *
 * dotCase('fooBar')
 * // => 'foo.bar'
 *
 * dotCase('--FOO-BAR--')
 * // => 'foo.bar'
 *
 * dotCase('foo2bar')
 * // => 'foo.2.bar'
 */
export const dotCase = createCaseFunction({
  separator: '.',
  transformWord: (word) => word.toLowerCase(),
});

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 */
export const camelCase = createCaseFunction({
  transformWord: (word, index) =>
    index === 0 ? word.toLowerCase() : upperFirst(word.toLowerCase()),
});

/**
 * Converts `string` to [pascal case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * pascalCase('Foo Bar')
 * // => 'FooBar'
 *
 * pascalCase('--foo-bar--')
 * // => 'FooBar'
 *
 * pascalCase('__FOO_BAR__')
 * // => 'FooBar'
 */
export const pascalCase = createCaseFunction({
  transformWord: (word) => upperFirst(word.toLowerCase()),
  transformResult: upperFirst,
});

/**
 * Converts `string`, as space separated words, to upper case.
 *
 * upperCase('--foo-bar')
 * // => 'FOO BAR'
 *
 * upperCase('fooBar')
 * // => 'FOO BAR'
 *
 * upperCase('__foo_bar__')
 * // => 'FOO BAR'
 */
export const upperCase = createCaseFunction({
  separator: ' ',
  transformWord: (word) => word.toUpperCase(),
});

/**
 * Converts `string`, as space separated words, to lower case.

 *
 * lowerCase('--Foo-Bar--')
 * // => 'foo bar'
 *
 * lowerCase('fooBar')
 * // => 'foo bar'
 *
 * lowerCase('__FOO_BAR__')
 * // => 'foo bar'
 */
export const lowerCase = createCaseFunction({
  separator: ' ',
  transformWord: (word) => word.toLowerCase(),
});

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * kebabCase('Foo Bar')
 * // => 'foo-bar'
 *
 * kebabCase('fooBar')
 * // => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__')
 * // => 'foo-bar'
 */
export const kebabCase = createCaseFunction({
  separator: '-',
  transformWord: (word) => word.toLowerCase(),
});

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * startCase('--foo-bar--')
 * // => 'Foo Bar'
 *
 * startCase('fooBar')
 * // => 'Foo Bar'
 *
 * startCase('__FOO_BAR__')
 * // => 'FOO BAR'
 */
export const startCase = createCaseFunction({
  separator: ' ',
  transformWord: (word) => upperFirst(word.toLowerCase()),
});
