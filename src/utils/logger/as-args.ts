export function asArgsInner(...args: unknown[]): string {
  return args.map((a) => JSON.stringify(a)).join(', ');
}

export function asArgs(...args: unknown[]): string {
  return `(${asArgsInner(...args)})`;
}
