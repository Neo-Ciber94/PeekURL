
export namespace Config {
    export const BASE_URL = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    export const API_URL = `${BASE_URL}/api`

    export const FIRE_BASE_SECRET = process.env.FIRE_BASE_SECRET;

    export const IP_STACK_API_KEY = process.env.IP_STACK_API_KEY;

    export const REDIS_URL = process.env.REDIS_URL;
}