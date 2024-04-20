import { createCaseFirst } from './create-case-first';

/**
 * Converts the first character of `string` to lower case.
 *
 * lowerFirst('Fred')
 * // => 'fred'
 *
 * lowerFirst('FRED')
 * // => 'fRED'
 */
export const lowerFirst = createCaseFirst('toLowerCase');
