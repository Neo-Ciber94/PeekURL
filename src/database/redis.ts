import Redis from "ioredis";
import { serverConfig } from "src/config/server.config";
import logger from "src/logging";

const redisInstance = new Redis(serverConfig.REDIS_URL);

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
