import { isLocalIpAddress } from "@utils/isLocalIpAddress";
import { expect, test } from "vitest";

test("isLocalIpAddress", () => {
  expect(isLocalIpAddress("localhost")).toBeTruthy();
  expect(isLocalIpAddress("127.0.0.1")).toBeTruthy();
  expect(isLocalIpAddress("::1")).toBeTruthy();
  expect(isLocalIpAddress("::ffff:127.0.0.1")).toBeTruthy();
});

test("isLocalIpAddress with port", () => {
  expect(isLocalIpAddress("localhost:3000")).toBeTruthy();
  expect(isLocalIpAddress("127.0.0.1:5000")).toBeTruthy();
  expect(isLocalIpAddress("::1:4000")).toBeTruthy();
  expect(isLocalIpAddress("::ffff:127.0.0.1:6999")).toBeTruthy();
});
