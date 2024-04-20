export class LRU<K, V> implements Map<K, V> {
  readonly #store = new Map<K, V>();
  #maxSize: number;

  constructor(maxSize = 500) {
    this.#maxSize = maxSize;
  }

  clear() {
    this.#store.clear();
  }

  delete(key: K): boolean {
    return this.#store.delete(key);
  }

  get(key: K): V | undefined {
    let entry: V | undefined;
    if (this.#store.has(key)) {
      entry = this.#store.get(key);
      this.#store.delete(key);
      this.#store.set(key, entry);
    }

    return entry;
  }

  computeIfNotPresent(key: K, compute: (key: K) => V): V {
    let entry = this.get(key);
    if (entry !== undefined) {
      return entry;
    }

    entry = compute(key);

    this.set(key, entry);

    return entry;
  }

  has(key: K): boolean {
    return this.#store.has(key);
  }

  replace(key: K, value: V): V | undefined {
    if (this.#store.has(key)) {
      const oldValue = this.#store.get(key);
      this.#store.delete(key);
      this.#store.set(key, value);

      return oldValue;
    }

    this.cleanOverflow();

    this.#store.set(key, value);
  }

  set(key: K, value: V): this {
    this.replace(key, value);

    return this;
  }

  forEach(callbackFn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: unknown): void {
    this.#store.forEach(callbackFn, thisArg);
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.#store[Symbol.iterator]();
  }

  entries(): IterableIterator<[K, V]> {
    return this.#store.entries();
  }

  keys(): IterableIterator<K> {
    return this.#store.keys();
  }

  values(): IterableIterator<V> {
    return this.#store.values();
  }

  get size(): number {
    return this.#store.size;
  }

  get maxSize(): number {
    return this.#maxSize;
  }

  set maxSize(value: number) {
    this.#maxSize = value;

    this.cleanOverflow();
  }

  get [Symbol.toStringTag](): string {
    return `LRU<current=${this.size}, max=${this.maxSize}>`;
  }

  protected cleanOverflow() {
    while (this.#store.size >= this.#maxSize) {
      const firstKey = this.#store.keys().next().value;
      if (firstKey !== undefined) {
        this.#store.delete(firstKey);
      }
    }
  }
}

export type StringLRU<T> = LRU<string, T>;
export type AnyStringLRU<T = unknown> = StringLRU<T>;
