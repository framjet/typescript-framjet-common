/// <reference types="vite/client" />

export function isProd() {
  return import.meta.env?.MODE === 'production';
}
