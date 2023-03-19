import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { GenericContainer, StartedTestContainer } from "testcontainers";
import Redis from "ioredis";
import { rangeArray } from "@utils/rangeArray";
import { RedisService } from "src/server/services/redis/redis.service";

interface Item {
  value: string;
}

redisTest<Item>("RedisService get and set", (service) => {
  test("get and set", async () => {
    const item1 = await service.set("1", { value: "1" });
    expect(item1).toStrictEqual({ value: "1" });

    const result = await service.get("1");
    expect(result).toStrictEqual({ value: "1" });
  });

  test("getAll", async () => {
    const item2 = await service.set("2", { value: "2" });
    expect(item2).toStrictEqual({ value: "2" });

    const result = await service.getAll();
    expect(result).toStrictEqual([{ value: "1" }, { value: "2" }]);
  });
});

type TestFunction<T> = (service: RedisService<T>) => void | Promise<void>;

// FIXME: Not sure if this will fail because port is already in use
const ports = rangeArray(20000, 20010);
let portIndex = 0;

function redisTest<T>(description: string, fn: TestFunction<T>) {
  describe(description, async () => {
    let service: RedisService<T> | null;
    let container: StartedTestContainer | null;

    // Run function
    await fn(service!);

    beforeAll(async () => {
      container = await new GenericContainer("redis:7.0.4")
        .withExposedPorts(...ports)
        .start();

      const redis = new Redis({
        host: container.getHost(),
        port: container.getMappedPort(ports[portIndex++]),
        retryStrategy: () => null, // not retry
      });

      service = new RedisService<T>({
        baseKey: "test",
        client: redis,
      });
    }, 1000 * 60 * 5); // 5min timeout

    afterAll(async () => {
      if (service) {
        service.close();
      }

      if (container) {
        await container.stop();
      }
    });
  });
}
