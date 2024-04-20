import {
  createEqualityComparator,
  createEqualityComparatorConfig, createInternalEqualityComparator, createIsEqual,
  CustomEqualCreatorOptions,
  sameValueZeroEqual
} from './_internal/fast-equal';
import { IsEqual } from '../../types';

/**
 * Whether the items passed are deeply-equal in value.
 */
export const isDeepEqual = createCustomEqual();

/**
 * Whether the items passed are deeply-equal in value based on strict comparison.
 */
export const isStrictDeepEqual = createCustomEqual({ strict: true });

/**
 * Whether the items passed are deeply-equal in value, including circular references.
 */
export const isCircularDeepEqual = createCustomEqual({ circular: true });

/**
 * Whether the items passed are deeply-equal in value, including circular references,
 * based on strict comparison.
 */
export const isStrictCircularDeepEqual = createCustomEqual({
  circular: true,
  strict: true,
});

/**
 * Whether the items passed are shallowly-equal in value.
 */
export const isShallowEqual = createCustomEqual({
  createInternalComparator: () => sameValueZeroEqual,
});

/**
 * Whether the items passed are shallowly-equal in value based on strict comparison
 */
export const isStrictShallowEqual = createCustomEqual({
  strict: true,
  createInternalComparator: () => sameValueZeroEqual,
});

/**
 * Whether the items passed are shallowly-equal in value, including circular references.
 */
export const isCircularShallowEqual = createCustomEqual({
  circular: true,
  createInternalComparator: () => sameValueZeroEqual,
});

/**
 * Whether the items passed are shallowly-equal in value, including circular references,
 * based on strict comparison.
 */
export const isStrictCircularShallowEqual = createCustomEqual({
  circular: true,
  createInternalComparator: () => sameValueZeroEqual,
  strict: true,
});

/**
 * Create a custom equality comparison method.
 *
 * This can be done to create very targeted comparisons in extreme hot-path scenarios
 * where the standard methods are not performant enough, but can also be used to provide
 * support for legacy environments that do not support expected features like
 * `RegExp.prototype.flags` out of the box.
 */
export function createCustomEqual<Meta = undefined>(
  options: CustomEqualCreatorOptions<Meta> = {},
) {
  const {
    circular = false,
    createInternalComparator: createCustomInternalComparator,
    createState,
    strict = false,
  } = options;

  const config = createEqualityComparatorConfig<Meta>(options);
  const comparator = createEqualityComparator(config);
  const equals = createCustomInternalComparator
    ? createCustomInternalComparator(comparator)
    : createInternalEqualityComparator(comparator);

  return createIsEqual({ circular, comparator, createState, equals, strict });
}

export function isEqual<A, B>(value: A, other: B): IsEqual<A, B> {
  // @ts-expect-error TS2367
  return value === other || (value !== value && other !== other);
}
