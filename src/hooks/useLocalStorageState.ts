import { useState } from "react";
import { PartialRequired } from "src/types/types";

export type ValueOrFactory<T> = T | (() => T);

export type Transform = {
  parse: <T = unknown>(s: string) => T;
  stringify: (s: unknown) => string;
};

/**
 * Options for the `useLocalStorageState` hook.
 */
export type UseLocalStorageStateOptions<T> = {
  /**
   * Key of the local storage item.
   */
  key: string;

  /**
   * Transform the value when store or retrieve from local storage, defaults to `JSON`.
   */
  transform?: Transform;

  /**
   * The default value.
   */
  defaultValue?: ValueOrFactory<T>;
};

/**
 * Options for the `useLocalStorageState` hook with required default value.
 */
export type UseLocalStorageStateOptionsWithDefault<T> = PartialRequired<
  UseLocalStorageStateOptions<T>,
  "defaultValue"
>;

export type SetValueAction<T> = T | ((prevState: T) => T);

export type SetLocalStorageValue<T, TPrevious = T> = (
  valueOrFactory: T | ((previousValue: TPrevious) => T)
) => void;

const DEFAULT_TRANSFORM: Transform = {
  parse: JSON.parse,
  stringify: JSON.stringify,
};

export function useLocalStorageState<T>(
  options: UseLocalStorageStateOptionsWithDefault<T>
): [T, SetLocalStorageValue<T>];

/**
 * A hook to get and set a value from the local storage.
 */
export function useLocalStorageState<T>(
  options: UseLocalStorageStateOptions<T>
): [T | undefined, SetLocalStorageValue<T, T | undefined>] {
  const { key, transform = DEFAULT_TRANSFORM, defaultValue } = options;

  // prettier-ignore
  const [value, setValue] = useState(getLocalStorageValue({ key, transform, defaultValue}));

  const setLocalStorageValue = (value: SetValueAction<T | undefined>) => {
    setValue((prevState) => {
      let newState: T | undefined;

      if (typeof value === "function") {
        const f = value as (arg: T | undefined) => T;
        newState = f(prevState);
      } else {
        newState = value;
      }

      const json = transform.stringify(newState);
      localStorage.setItem(key, json);
      return newState;
    });
  };

  return [value, setLocalStorageValue];
}

function getLocalStorageValue<T>({
  key,
  defaultValue,
  transform,
}: PartialRequired<UseLocalStorageStateOptions<T>, "transform">): () =>
  | T
  | undefined {
  return () => {
    const item = localStorage.getItem(key);

    if (item == null) {
      return getValue(defaultValue);
    }

    try {
      // Transform is NOT NULL
      const value = transform.parse(item);
      return value as T;
    } catch {
      return getValue(defaultValue);
    }
  };
}

function getValue<T>(valueOrFactory: ValueOrFactory<T>): T {
  if (typeof valueOrFactory === "function") {
    const f = valueOrFactory as () => T;
    return f();
  }

  return valueOrFactory;
}
