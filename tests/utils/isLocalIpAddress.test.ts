import { isLocalIpAddress } from "@utils/isLocalIpAddress";
import { expect, test } from "vitest";

test("isLocalIpAddress", () => {
  expect(isLocalIpAddress("localhost")).toBeTruthy();
  expect(isLocalIpAddress("127.0.0.1")).toBeTruthy();
  expect(isLocalIpAddress("::1")).toBeTruthy();
  expect(isLocalIpAddress("::ffff:127.0.0.1")).toBeTruthy();
});

test("isLocalIpAddress invalid ip", () => {
  expect(isLocalIpAddress("8.8.8.8")).toBeFalsy();
  expect(isLocalIpAddress("104.26.11.194")).toBeFalsy();
});
