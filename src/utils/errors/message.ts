export function message(e: unknown): string {
  if (e instanceof Error) {
    return e.message;
  } else {
    return String(e);
  }
}
