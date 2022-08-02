export function assertNotNull<T>(
  valueOrFactory: T | (() => T),
  message?: string
): T {
  if (typeof valueOrFactory === "function") {
    const f = valueOrFactory as () => T;
    return assertNotNull(f());
  }

  if (valueOrFactory == null) {
    throw new Error(message || "Value cannot be null.");
  }

  return valueOrFactory;
}
