import firebaseAdmin, { initializeApp, cert, getApps } from "firebase-admin/app";
import logger from "src/logging";
let app: firebaseAdmin.App | undefined;

if (app == null && getApps().length === 0) {
    const secret = process.env.FIREBASE_SECRET;
    if (secret == null) {
        throw new Error("Firebase secret is required");
    }

    const serviceAccount = JSON.parse(secret);

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
