import * as React from 'react';

export function isElement(value: unknown): value is React.ReactElement {
  return React.isValidElement(value);
}
