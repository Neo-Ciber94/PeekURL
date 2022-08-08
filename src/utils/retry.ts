import { wait } from "./wait";

/**
 * Callback function for each retry.
 */
export type OnRetryCallback = (
  retryCount: number,
  error: unknown,
  nextRetryMs: number
) => void;

/**
 * Options for retry.
 */
export interface RetryOptions {
  /**
   * The max number of retry attempts.
   */
  maxRetries?: number;

  /**
   * The delay in milliseconds between retries.
   */
  delay?: number;

  /**
   * Function called after each attempt to retry.
   */
  onRetry?: OnRetryCallback;
}

/**
 * Function called after each attempt to retry, should return the number of milliseconds
 * to wait before the next retry or false if should stop to retry.
 */
export type RetryFunction = (
  retryCount: number,
  error: unknown
) => number | boolean;

/**
 * Determines how to retry after failure.
 */
export type RetryStrategy = RetryOptions | RetryFunction;

/**
 * Executes a function an retry its execution on failure.
 * @param action The action to execute.
 * @param strategy The strategy to retry on failure.
 * @returns A promise that resolve or rejects with the result.
 */
async function retry<T>(
  action: () => Promise<T> | T,
  strategy?: RetryStrategy
): Promise<T> {
  return new Promise((resolve, reject) =>
    doRetry(1, action, strategy, (err, value) => {
      if (err) {
        reject(err);
      }
      // Value only may be null if is rejected
      resolve(value!);
    })
  );
}

async function doRetry<T>(
  retryCount: number,
  action: () => Promise<T> | T,
  strategy: RetryStrategy | undefined,
  callback: (err: unknown | null, value?: T) => void
) {
  try {
    const result = await action();
    callback(null, result);
  } catch (err) {
    const nextRetry = getNextRetry(retryCount, strategy, err);

    if (nextRetry === false) {
      callback(err);
      return;
    }

    if (typeof strategy === "object") {
      const onRetry = strategy?.onRetry as OnRetryCallback | undefined;
      if (onRetry) {
        onRetry(retryCount, err, nextRetry);
      }
    }

    if (nextRetry > 0) {
      await wait(nextRetry);
    }

    return Promise.resolve().then(() =>
      doRetry(retryCount + 1, action, strategy, callback)
    );
  }
}

// Default retry options.
const defaultOptions: Required<RetryOptions> = {
  delay: 1000, // 1 second
  maxRetries: 5,
  onRetry: () => {},
};

// Returns the milliseconds to wait before the next retry or false.
function getNextRetry(
  retryCount: number,
  strategy: RetryStrategy | undefined,
  error: unknown
): number | false {
  if (typeof strategy === "function") {
    const f = strategy as RetryFunction;
    const result = f(retryCount, error);

    if (typeof result === "boolean") {
      return result ? 0 : false;
    }

    return result;
  } else {
    const options: Required<RetryOptions> = { ...defaultOptions, ...strategy };

    if (retryCount > options.maxRetries) {
      return false;
    }

    return options.delay;
  }
}

/**
 * Utility retry functions.
 */
const retryFunctions = {
  /**
   *  Calculates the next retry using 2^n where n is the number of retries
   * @param maxRetries The maximum number of retries.
   */
  exponential(maxRetries: number, onRetry?: OnRetryCallback): RetryFunction {
    return (retryCount: number, error: unknown) => {
      const ms = retryCount > maxRetries ? false : Math.pow(2, retryCount);

      if (typeof ms === "number" && onRetry) {
        onRetry(retryCount, error, ms);
      }

      return ms;
    };
  },

  /**
   * Retries infinitely using the given delay.
   * @param delayMs The delay between retries in milliseconds. Default to zero.
   */
  infinite(delayMs: number = 0, onRetry?: OnRetryCallback): RetryFunction {
    return (retryCount: number, error: unknown) => {
      if (onRetry) {
        onRetry(retryCount, error, delayMs);
      }
      return delayMs;
    };
  },

  /**
   *
   * @param timeoutMs The timeout in milliseconds.
   * @param delayMs The delay between retries in milliseconds. Default to 1000 milliseconds.
   */
  timeout(
    timeoutMs: number,
    delayMs: number = 1000,
    onRetry?: OnRetryCallback
  ): RetryFunction {
    let canRetry = true;
    setTimeout(() => (canRetry = false), timeoutMs);

    return (retryCount: number, error: unknown) => {
      if (onRetry) {
        onRetry(retryCount, error, delayMs);
      }

      return canRetry ? delayMs : false;
    };
  },
} as const;

/**
 * Retry type.
 */
export type Retry = typeof retry & typeof retryFunctions;

for (const k in retryFunctions) {
  retry[k] = retryFunctions[k];
}

export default retry as Retry;
