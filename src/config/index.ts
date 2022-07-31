const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

const environment = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV;

/**
 * Configuration for application.
 */
export const Config = Object.freeze({
  isDevelopment: environment === "development",
  BASE_URL: baseUrl,
  API_URL: `${baseUrl}/api`,
  IP_STACK_API_KEY: process.env.IP_STACK_API_KEY,
  REDIS_URL: process.env.REDIS_URL,
});
