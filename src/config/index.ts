const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

/**
 * Configuration for application.
 */
export const Config = Object.freeze({
  isDevelopment: process.env.NODE_ENV === "development",
  BASE_URL: baseUrl,
  API_URL: `${baseUrl}/api`,
  IP_STACK_API_KEY: process.env.IP_STACK_API_KEY,
  REDIS_URL: process.env.REDIS_URL,
});
