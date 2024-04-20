/* eslint-disable no-var */
// noinspection ES6ConvertVarToLetConst

import { MemoizeContainer } from './types';

declare global {
  var FRAMJET_COMMON_TYPE_REGISTRY: Map<string, (arg: unknown) => boolean>;
  var FRAMJET_COMMON_MEMOIZE_CONTAINER: MemoizeContainer | undefined;

  interface Window {
    FRAMJET_COMMON_TYPE_REGISTRY: Map<string, (arg: unknown) => boolean>;
    FRAMJET_COMMON_MEMOIZE_CONTAINER: MemoizeContainer | undefined;
  }
}
