import * as React from 'react';

export function isNode(value: unknown): value is React.ReactNode {
  return (
    value === null ||
    ['string', 'number', 'boolean'].includes(typeof value) ||
    React.isValidElement(value) ||
    (Array.isArray(value) && value.every(isNode))
  );
}
