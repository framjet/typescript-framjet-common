import { hasProperty } from '../objects';

export type TaggedObject<T extends object, V extends string = string> = T & {
  [Symbol.toStringTag]: V;
};

export function tagObject<T extends object, V extends string>(
  obj: T,
  tag: V
): TaggedObject<T, V> {
  if (Object.isFrozen(obj)) {
    return obj as TaggedObject<T, V>;
  }

  return Object.assign(obj, { [Symbol.toStringTag]: tag });
}

export function tagObjectOrAppend<T extends object, V extends string>(
  obj: T,
  tag: V
): T extends TaggedObject<infer U, infer N>
  ? TaggedObject<U, `${N}${V}`>
  : TaggedObject<T, V> {
  if (hasProperty(obj, Symbol.toStringTag)) {
    return tagObject(obj, `${obj[Symbol.toStringTag]}${tag}`) as never;
  }

  return Object.assign(obj, { [Symbol.toStringTag]: tag }) as never;
}

export function getTag(obj: object): string | undefined {
  return (obj as unknown)[Symbol.toStringTag];
}
