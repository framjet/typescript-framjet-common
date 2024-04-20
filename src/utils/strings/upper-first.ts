import { createCaseFirst } from './create-case-first';

/**
 * Converts the first character of `string` to upper case.
 *
 * upperFirst('fred')
 * // => 'Fred'
 *
 * upperFirst('FRED')
 * // => 'FRED'
 */
export const upperFirst = createCaseFirst('toUpperCase');
