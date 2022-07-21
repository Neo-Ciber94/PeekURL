import firebaseAdmin, { initializeApp, cert, getApps } from "firebase-admin/app";
import logger from "src/logging";
import serviceAccount from "../../private/firebase-secret.json";

let app: firebaseAdmin.App | undefined;

if (app == null && getApps().length === 0) {
    app = initializeApp({
        credential: cert({
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
        }),
    });

    logger.info("Initialized server side firebase")
}

export function getFirebaseAdmin() {
    return app;
}
