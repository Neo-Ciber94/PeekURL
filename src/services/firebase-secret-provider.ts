import { Config } from "src/config";

export interface FirebaseSecret {
    project_id: string;
    client_email: string;
    private_key: string;
}

export interface IFirebaseSecretProvider {
    getSecret(): FirebaseSecret;
}

class FirebaseSecretProvider implements IFirebaseSecretProvider {
    getSecret(): FirebaseSecret {
        const secret = Config.FIRE_BASE_SECRET;

        if (secret == null) {
            throw new Error("Firebase secret is required");
        }

        return JSON.parse(secret);
    }
}

export function getSecretProvider(): IFirebaseSecretProvider {
    return new FirebaseSecretProvider();
}