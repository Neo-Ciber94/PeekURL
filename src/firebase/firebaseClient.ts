import firebase, { initializeApp } from "firebase/app";
import firebaseAnalytics from "firebase/analytics";
import { Analytics } from "firebase/analytics";
import logger from "src/logging";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIRE_BASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIRE_BASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIRE_BASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIRE_BASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIRE_BASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIRE_BASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIRE_BASE_MEASUREMENT_ID,
};

let app: firebase.FirebaseApp | undefined;
let analytics: Analytics | undefined;

if (app == null && analytics == null) {
    app = initializeApp(firebaseConfig);
    console.info("Initialized client side firebase");
}

export function getFirebaseApp() {
    return app;
}

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
    const isSupported = await firebaseAnalytics.isSupported();

    if (isSupported) {
        if (analytics == null) {
            analytics = firebaseAnalytics.getAnalytics(app);
        }

        return analytics;
    }

    return null;
}
