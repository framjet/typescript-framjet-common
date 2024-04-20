export interface KeyValueStore<K, V> {

  get(key: K): V | undefined;

  has(key: K): boolean;

  set(key: K, value: V): void;

  delete(key: K): boolean;

}
