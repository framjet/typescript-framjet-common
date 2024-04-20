import { MemoizeContainer } from '../../types';

export function container(): MemoizeContainer {
  if (globalThis['FRAMJET_COMMON_MEMOIZE_CONTAINER']) {
    if (globalThis['FRAMJET_COMMON_MEMOIZE_CONTAINER'] instanceof MemoizeContainer) {
      return globalThis['FRAMJET_COMMON_MEMOIZE_CONTAINER'];
    }

    console.warn(`Unexpected value for globalThis.FRAMJET_COMMON_MEMOIZE_CONTAINER: ${typeof globalThis['FRAMJET_COMMON_MEMOIZE_CONTAINER']}`, globalThis['FRAMJET_COMMON_MEMOIZE_CONTAINER']);
  }

  globalThis['FRAMJET_COMMON_MEMOIZE_CONTAINER'] = new MemoizeContainer();

  return globalThis['FRAMJET_COMMON_MEMOIZE_CONTAINER'];
}
