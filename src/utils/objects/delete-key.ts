export function deleteKey<T extends object>(obj: T, key: keyof T): void {
  delete obj[key];
}
