type Nullable<T> = T | null | undefined;

export function assertNotNull<T>(
  valueOrFactory: Nullable<T> | (() => Nullable<T>),
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
