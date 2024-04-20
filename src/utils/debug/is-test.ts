/// <reference types="vite/client" />

export function isTest() {
  return import.meta.env?.MODE === 'test';
}
