/// <reference types="vite/client" />
import { isDev } from './is-dev';
import { isTest } from './is-test';

export function isDevOrTest() {
  return isDev() || isTest();
}
