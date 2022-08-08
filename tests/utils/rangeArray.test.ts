import { rangeArray } from "@utils/rangeArray";
import { describe, test, expect } from "vitest";

describe("rangeArray", () => {
  test("array from max", () => {
    const array = rangeArray(5);

    expect(array[0]).toStrictEqual(0);
    expect(array[1]).toStrictEqual(1);
    expect(array[2]).toStrictEqual(2);
    expect(array[3]).toStrictEqual(3);
    expect(array[4]).toStrictEqual(4);
  });

  test("array from min max", () => {
    const array = rangeArray(5, 10);

    expect(array[0]).toStrictEqual(5);
    expect(array[1]).toStrictEqual(6);
    expect(array[2]).toStrictEqual(7);
    expect(array[3]).toStrictEqual(8);
    expect(array[4]).toStrictEqual(9);
  });

  test("throw if max is negative", () => {
    expect(() => {
      rangeArray(-3);
    }).toThrow();
  });

  test("throw if min > max", () => {
    expect(() => {
      rangeArray(10, 2);
    }).toThrow();
  });
});
