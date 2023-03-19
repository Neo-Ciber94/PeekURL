import fetch from "node-fetch";
import { localConfig } from "src/config/local.config";
import logger from "src/server/logging";

/**
 * Checks if the url available.
 */
export async function checkURLIsAvailable(url: string): Promise<boolean> {
  if (url.trim().length === 0) {
    return false;
  }

  try {
    let res = await fetch(url, { method: "HEAD" });

    // If server does not allow HEAD request, we try with GET
    if (res.status === 405) {
      res = await fetch(url, { method: "GET" });
    }

    return res.status < 400 || res.status > 500;
  } catch (err) {
    if (localConfig.IS_DEVELOPMENT) {
      logger.error(err);
    }

    return false;
  }
}
