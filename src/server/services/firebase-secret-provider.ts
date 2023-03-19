import { FirebaseSecretProvider } from "./firebase-secret-provider.impl";

export interface FirebaseSecret {
    project_id: string;
    client_email: string;
    private_key: string;
}

export interface IFirebaseSecretProvider {
    getSecret(): Promise<FirebaseSecret>;
}

export function getSecretProvider(): IFirebaseSecretProvider {
    return new FirebaseSecretProvider();
}

// Other implementation to load the secret from ENV
// class FirebaseSecretProviderFromEnv implements IFirebaseSecretProvider {
//     async getSecret(): Promise<FirebaseSecret> {
//         const secret = process.env.FIRE_BASE_SECRET; // Define the secret in a environment variable

//         if (secret == null) {
//             throw new Error("Firebase secret is required");
//         }

//         return JSON.parse(secret);
//     }
// }