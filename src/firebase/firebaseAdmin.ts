import firebaseAdmin, {
  initializeApp,
  cert,
  getApps,
} from "firebase-admin/app";
import { getSecretProvider } from "src/server/services/firebase-secret-provider";
import logger from "src/server/logging";
import retry from "@utils/retry";

let app: firebaseAdmin.App | undefined;

export async function getFirebaseAdmin(): Promise<firebaseAdmin.App> {
  if (app == null && getApps().length === 0) {
    const provider = getSecretProvider();
    const secret = await retry(
      () => provider.getSecret(),
      retry.exponential(5, (_retryCount, _err, ms) => {
        logger.warn(`Failed to get firebase secret, retrying in ${ms}ms`);
      })
    );

    app = initializeApp({
      credential: cert({
        projectId: secret.project_id,
        clientEmail: secret.client_email,
        privateKey: secret.private_key,
      }),
    });

    logger.info("Initialized server side firebase");
  }

  return app!;
}
