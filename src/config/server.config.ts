import { assertNotNull } from "@utils/assertNotNull";

// prettier-ignore
/**
 * Server configurations.
 */
export const serverConfig = Object.freeze({
  IP_STACK_API_KEY: assertNotNull(process.env.IP_STACK_API_KEY, "IP_STACK_API_KEY was not found"),
  REDIS_URL: assertNotNull(process.env.REDIS_URL, "REDIS_URL was not found"),
});
