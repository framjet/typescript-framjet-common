import type { NoParameterMethods } from '../..';
import { castSlice } from './cast-slice';
import { hasUnicode } from './has-unicode';
import { stringToArray } from './string-to-array';

/**
 * Creates a function like `lowerFirst`.
 */
export function createCaseFirst(methodName: NoParameterMethods<String>) {
  return (input: string) => {
    if (!input) {
      return '';
    }

    const strSymbols = hasUnicode(input) ? stringToArray(input) : undefined;

    const chr = strSymbols ? strSymbols[0] : input[0];

    const trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : input.slice(1);

    return chr[methodName]() + trailing;
  };
}
