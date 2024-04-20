import { AnyStringLRU, LRU } from './lru';

export class MemoizeContainer {
  readonly #container = new Map<string, AnyStringLRU>();
  readonly #defaultMaxSize: number;
  readonly #defaultMaxSizeMap = new Map<string, number>();

  clear(name?: string): boolean {
    if (name === undefined) {
      this.values().forEach(v => v.clear());

      return true;
    }

    const lru = this.#container.get(name);
    if (lru !== undefined) {
      lru.clear();

      return true;
    }

    return false;
  }

  get(name: string): AnyStringLRU {
    let lru = this.#container.get(name);
    if (lru !== undefined) {
      return lru;
    }

    lru = new LRU<string, unknown>(this.#defaultMaxSizeMap.get(name) ?? this.#defaultMaxSize);

    this.#container.set(name, lru);

    return lru;
  }

  has(name: string): boolean {
    return this.#container.has(name);
  }

  delete(name: string): boolean {
    return this.#container.delete(name);
  }

  keys(): string[] {
    return Array.from(this.#container.keys());
  }

  values(): AnyStringLRU[] {
    return Array.from(this.#container.values());
  }

  get totalSize(): number {
    return this.values().reduce((a, b) => a + b.size, 0);
  }
}
