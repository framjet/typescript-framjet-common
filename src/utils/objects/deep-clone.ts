/* eslint-disable @typescript-eslint/no-explicit-any */
let deserialize: (obj: any) => any;
let serialize: (obj: any) => any;
if (!('structuredClone' in globalThis)) {
  const VOID = -1;
  const PRIMITIVE = 0;
  const ARRAY = 1;
  const OBJECT = 2;
  const DATE = 3;
  const REGEXP = 4;
  const MAP = 5;
  const SET = 6;
  const ERROR = 7;
  const BIGINT = 8;
//const SYMBOL = 9;

  const EMPTY = '';

  const {toString} = {};
  const {keys} = Object;

  const typeOf = (value: unknown): [number, string] => {
    const type = typeof value;
    if (type !== 'object' || !value)
      return [PRIMITIVE, type];

    const asString = toString.call(value).slice(8, -1);
    switch (asString) {
      case 'Array':
        return [ARRAY, EMPTY];
      case 'Object':
        return [OBJECT, EMPTY];
      case 'Date':
        return [DATE, EMPTY];
      case 'RegExp':
        return [REGEXP, EMPTY];
      case 'Map':
        return [MAP, EMPTY];
      case 'Set':
        return [SET, EMPTY];
    }

    if (asString.includes('Array'))
      return [ARRAY, asString];

    if (asString.includes('Error'))
      return [ERROR, asString];

    return [OBJECT, asString];
  };

  const shouldSkip = ([TYPE, type]) => (
    TYPE === PRIMITIVE &&
    (type === 'function' || type === 'symbol')
  );

  const serializer = (strict: boolean, json: boolean, $: Map<unknown, unknown>, _: unknown[]) => {

    const as = (out: unknown, value: unknown) => {
      const index = _.push(out) - 1;
      $.set(value, index);
      return index;
    };

    const pair = <T>(value: T) => {
      if ($.has(value))
        return $.get(value);

      // eslint-disable-next-line prefer-const
      let [TYPE, type] = typeOf(value);
      switch (TYPE) {
        case PRIMITIVE: {
          let entry: unknown = value;
          switch (type) {
            case 'bigint':
              TYPE = BIGINT;
              entry = (value as bigint).toString();
              break;
            case 'function':
            case 'symbol':
              if (strict)
                throw new TypeError('unable to serialize ' + type);
              entry = null;
              break;
            case 'undefined':
              return as([VOID], value);
          }
          return as([TYPE, entry], value);
        }
        case ARRAY: {
          if (type)
            return as([type, [...value as unknown[]]], value);

          const arr = [];
          const index = as([TYPE, arr], value);
          for (const entry of value as unknown[])
            arr.push(pair(entry));
          return index;
        }
        case OBJECT: {
          if (type) {
            switch (type) {
              case 'BigInt':
                return as([type, value.toString()], value);
              case 'Boolean':
              case 'Number':
              case 'String':
                return as([type, value.valueOf()], value);
            }
          }

          if (json && ('toJSON' in (value as object)))
            return pair((value as { toJSON: () => unknown}).toJSON());

          const entries = [];
          const index = as([TYPE, entries], value);
          for (const key of keys(value)) {
            if (strict || !shouldSkip(typeOf(value[key])))
              entries.push([pair(key), pair(value[key])]);
          }
          return index;
        }
        case DATE:
          return as([TYPE, (value as Date).toISOString()], value);
        case REGEXP: {
          const {source, flags} = value as RegExp;
          return as([TYPE, {source, flags}], value);
        }
        case MAP: {
          const entries = [];
          const index = as([TYPE, entries], value);
          for (const [key, entry] of value as Map<unknown, unknown>) {
            if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry))))
              entries.push([pair(key), pair(entry)]);
          }
          return index;
        }
        case SET: {
          const entries = [];
          const index = as([TYPE, entries], value);
          for (const entry of value as Set<unknown>) {
            if (strict || !shouldSkip(typeOf(entry)))
              entries.push(pair(entry));
          }
          return index;
        }
      }

      const {message} = value as { message: string };
      return as([TYPE, {name: type, message}], value);
    };

    return pair;
  };

  const env = typeof self === 'object' ? self : globalThis;

  const deserializer = ($: Map<unknown, unknown>, _: unknown[]) => {
    const as = <T>(out: T, index: PropertyKey): T => {
      $.set(index, out);
      return out;
    };

    const unpair = (index: PropertyKey) => {
      if ($.has(index))
        return $.get(index);

      const [type, value] = _[index];
      switch (type) {
        case PRIMITIVE:
        case VOID:
          return as(value, index);
        case ARRAY: {
          const arr = as([], index);
          for (const index of value)
            arr.push(unpair(index));
          return arr;
        }
        case OBJECT: {
          const object = as({}, index);
          for (const [key, index] of value)
            object[unpair(key)] = unpair(index);
          return object;
        }
        case DATE:
          return as(new Date(value), index);
        case REGEXP: {
          const {source, flags} = value;
          return as(new RegExp(source, flags), index);
        }
        case MAP: {
          const map = as(new Map, index);
          for (const [key, index] of value)
            map.set(unpair(key), unpair(index));
          return map;
        }
        case SET: {
          const set = as(new Set, index);
          for (const index of value)
            set.add(unpair(index));
          return set;
        }
        case ERROR: {
          const {name, message} = value;
          return as(new env[name](message), index);
        }
        case BIGINT:
          return as(BigInt(value), index);
        case 'BigInt':
          return as(Object(BigInt(value)), index);
      }
      return as(new env[type](value), index);
    };

    return unpair;
  };

  deserialize = serialized => deserializer(new Map, serialized)(0);
  serialize = (value, {json, lossy}: {json?: boolean, lossy?: boolean } = {}) => {
    const _ = [];
    serializer(!(json || lossy), !!json, new Map, _)(value);

    return _;
  };
}

export function deepClone<T>(obj: T): T {
  if (!('structuredClone' in globalThis)) {
    console.warn('[FramJetCommon] Objects.deepClone is using polyfill')
    return deserialize(serialize(obj));
  }

  return globalThis.structuredClone(obj);
}
