// prettier-ignore
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
const baseUrl = vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000";
const environment = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV;

// prettier-ignore
/**
 * Shared configurations.
 */
export const localConfig = Object.freeze({
  IS_DEVELOPMENT: environment === "development",
  IS_VERCEL: vercelUrl != null,
  BASE_URL: baseUrl,
  API_URL: `${baseUrl}/api`,
});
