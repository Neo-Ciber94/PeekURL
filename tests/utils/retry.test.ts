import { describe, test, expect, vi } from "vitest";
import retry, { OnRetryCallback, RetryFunction } from "@utils/retry";

describe("retry", () => {
  test("Expected to success with no retry", async () => {
    const f = () => 10;
    expect(await retry(f)).toStrictEqual(10);
  });

  test("Expect to retry once", async () => {
    let retries = 0;
    const f = fallible(1, () => 12);
    const onRetry = () => (retries += 1);

    expect(await retry(f, { onRetry })).toStrictEqual(12);
    expect(retries).toStrictEqual(1);
  });

  test("Expect to fail 3 times", async () => {
    let retries = 0;
    const f = fallible(3, () => 25);
    const onRetry = () => (retries += 1);

    expect(await retry(f, { onRetry })).toStrictEqual(25);
    expect(retries).toStrictEqual(3);
  });

  test("Expect to fail and throw", () => {
    const f = fallible(3, () => 25);

    expect(async () => retry(f, { maxRetries: 1 })).rejects.toThrow(FailError);
  });

  test("Expect to retry exponentially", async () => {
    const f = fallible(Number.MAX_SAFE_INTEGER, () => 69);

    const retryMs: number[] = [];
    const exponentialRetryFn = retry.exponential(5);
    const retryFn: RetryFunction = (...args) => {
      const ms = exponentialRetryFn(...args);

      if (typeof ms === "number") {
        retryMs.push(ms);
      }
      return ms;
    };

    await expect(retry(f, retryFn)).rejects.toThrow(FailError);
    expect(retryMs[0]).toStrictEqual(2);
    expect(retryMs[1]).toStrictEqual(4);
    expect(retryMs[2]).toStrictEqual(8);
    expect(retryMs[3]).toStrictEqual(16);
    expect(retryMs[4]).toStrictEqual(32);
  });

  test("Expect to retry infinitely", async () => {
    const f = fallible(1000, () => 420);
    let retries = 0;

    const retryFn = retry.infinite(0, () => (retries += 1));
    await expect(retry(f, retryFn)).resolves.toStrictEqual(420);
    expect(retries).toStrictEqual(1000);
  });

  test("Expect retry to timeout", async () => {
    const f = fallible(Number.MAX_SAFE_INTEGER, () => 69420);
    const retryFn = retry.timeout(1000, 200);
    await expect(retry(f, retryFn)).rejects.toThrow(FailError);
  });
});

// Testing the utility function
describe("fallible", () => {
  test("fail 1", () => {
    const f = fallible(1, () => 10);

    expect(f).toThrow(FailError);
    expect(f()).toStrictEqual(10);
  });

  test("fail 2", () => {
    const f = fallible(2, () => 23);

    expect(f).toThrow(FailError);
    expect(f).toThrow(FailError);
    expect(f()).toStrictEqual(23);
  });
});

class FailError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

function fallible<T>(callsBeforeFail: number, action: () => T) {
  let fails = 0;
  return function () {
    if (fails++ < callsBeforeFail) {
      throw new FailError();
    }

    return action();
  };
}
