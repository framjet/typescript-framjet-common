export class MapSet<K, V> extends Map<K, Set<V>> {
  addItem(key: K, value: V): this {
    if (!this.has(key)) {
      this.set(key, new Set());
    }

    this.get(key)!.add(value);

    return this;
  }

  deleteItem(value: V): boolean;
  deleteItem(key: K, value: V): boolean;
  deleteItem(key: K | V, value?: V): boolean {
    if (arguments.length === 2) {
      if (!this.has(key as K)) {
        return false;
      }

      return this.get(key as K)!.delete(value as V);
    } else if (arguments.length === 1) {
      for (const set of this.values()) {
        if (set.delete(key as V)) {
          return true;
        }
      }

      return false;
    }

    throw new Error('Invalid number of arguments');
  }

  forEachItem(
    key: K,
    callbackfn: (value: V, key: K, set: Set<V>, map: Map<K, Set<V>>) => void,
    thisArg?: any,
  ): void {
    if (this.has(key)) {
      const map = this;
      this.get(key)!.forEach((value, _, set) => {
        callbackfn(value, key, set, map);
      }, thisArg);
    }
  }

  hasItem(key: K, value: V): boolean {
    return this.has(key) && this.get(key)!.has(value);
  }
}
