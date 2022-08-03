import Redis from "ioredis";
import { serverConfig } from "src/config/server.config";
import logger from "src/logging";

declare global {
  // eslint-disable-next-line no-var
  var redis: Redis | undefined;
}

let redisInstance: Redis;

if (!global.redis) {
  global.redis = new Redis(serverConfig.REDIS_URL, {
    family: 6,
  });
}

redisInstance = global.redis;

redisInstance.on("ready", () => {
  logger.info(`Redis client is ready`);
});

redisInstance.on("connect", () => {
  logger.info(`Redis client is connected to ${serverConfig.REDIS_URL}`);
});

redisInstance.on("close", () => {
  logger.info(`Redis client was closed`);
});

redisInstance.on("reconnecting", () => {
  logger.info(`Redis client is reconnecting...`);
});

redisInstance.on("error", (err) => {
  logger.error(err);
});

export default redisInstance;
