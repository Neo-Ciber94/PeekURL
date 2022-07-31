import firebaseAdmin, { initializeApp, cert, getApps } from "firebase-admin/app";
import { getSecretProvider } from "src/services/firebase-secret-provider";
import logger from "src/logging";

let app: firebaseAdmin.App | undefined;

export async function getFirebaseAdmin(): Promise<firebaseAdmin.App> {
    if (app == null && getApps().length === 0) {
        const provider = getSecretProvider();
        const secret = await provider.getSecret();

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
