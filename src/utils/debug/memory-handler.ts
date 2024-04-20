export interface MemoryDebugHandler {
  register(obj: object, type: string, id: string): void;
}

interface CleanUpReference {
  type: string;
  id: string;
}

interface MemoryDebugHandlerProps {
  cleanUpHandler?: (ref: CleanUpReference) => void;
  createReference?: (obj: object, type: string, id: string) => CleanUpReference;
}

export function consoleLogCleanUpHandler(ref: CleanUpReference) {
  console.log(
    `%c[DebugHandler] %cGarbage collected type: "%c${ref.type}%c" id "%c${ref.id}%c"`,
    'color: lime',
    'color: line',
    'color: cyan',
    'color: line',
    'color: cyan',
    'color: line',
  );
}

export function defaultCreateReference(
  obj: object,
  type: string,
  id: string,
): CleanUpReference {
  return {
    type,
    id,
  };
}

export function createMemoryDebugHandler(
  props?: MemoryDebugHandlerProps,
): MemoryDebugHandler {
  const {
    cleanUpHandler = consoleLogCleanUpHandler,
    createReference = defaultCreateReference,
  } = props ?? {};

  const registry = new FinalizationRegistry<CleanUpReference>(
    (ref: CleanUpReference) => cleanUpHandler(ref),
  );

  return {
    register(obj: object, type: string, id: string) {
      const ref = createReference(obj, type, id);

      registry.register(obj, ref);
    },
  };
}

export const memoryDebugHandler = createMemoryDebugHandler();
