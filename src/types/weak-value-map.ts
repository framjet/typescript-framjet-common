/* eslint-disable @typescript-eslint/no-empty-function */
export class WeakValueMap<K, V extends WeakKey> implements Map<K, V> {
  readonly #storage = new Map<K, WeakRef<V>>();
  readonly #cleanUp: (key: K) => void;
  readonly #finalisationRegistry = new FinalizationRegistry<K>(
    (k) => {
      this.#storage.delete(k);
      this.#cleanUp(k);
    }
  );

  constructor();
  constructor(onCleanUp: (key: K) => void);
  constructor(
    entries: readonly (readonly [K, V])[] | null,
    onCleanUp?: (key: K) => void
  );
  constructor(
    entries?: (readonly (readonly [K, V])[] | null) | ((key: K) => void),
    onCleanUp: (key: K) => void = () => {}
  ) {
    if (typeof entries === 'function') {
      this.#cleanUp = entries;
    } else {
      this.#cleanUp = onCleanUp;

      if (Array.isArray(entries)) {
        entries.forEach(([k, v]) => this.set(k, v));
      } else if (entries != null) {
        throw new Error(`Not array value provided but: ${typeof entries}`);
      }
    }
  }

  clear() {
    for (const key of this.#storage.keys()) {
      this.delete(key);
    }
  }

  delete(key: K): boolean {
    const ref = this.#storage.get(key);

    if (ref !== undefined) {
      const value = ref.deref();

      if (value !== undefined) {
        this.#finalisationRegistry.unregister(ref);
      }

      return this.#storage.delete(key);
    }

    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forEach(callbackFn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any) {
    for (const [key, ref] of this.#storage) {
      const value = ref.deref();
      if (value !== undefined) {
        callbackFn.call(thisArg, value, key, this);
      }
    }
  }

  get(key: K): V | undefined {
    return this.#storage.get(key)?.deref();
  }

  has(key: K): boolean {
    return this.#storage.get(key)?.deref() !== undefined;
  }

  set(key: K, value: V): this {
    this.#storage.set(key, new WeakRef(value));
    this.#finalisationRegistry.register(value, key);

    return this;
  }

  get size() {
    return this.#storage.size;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  * entries(): IterableIterator<[K, V]> {
    for (const [k, value] of this.#storage) {
      const r = value.deref();
      if (r !== undefined) {
        yield [k, r];
      }
    }
  }

  keys(): IterableIterator<K> {
    return this.#storage.keys();
  }

  * values(): IterableIterator<V> {
    for (const value of this.#storage.values()) {
      const r = value.deref();
      if (r !== undefined) {
        yield r;
      }
    }
  }

  get [Symbol.toStringTag]() {
    return 'WeakValueMap';
  }
}
