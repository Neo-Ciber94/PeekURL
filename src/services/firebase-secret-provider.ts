import crypto from 'crypto';
import logger from 'src/logging';
import fs from 'fs/promises';
import * as fse from 'fs-extra';
import path from 'path'

const SECRET_PATH = path.join(__dirname, "secret.data");

export interface FirebaseSecret {
    project_id: string;
    client_email: string;
    private_key: string;
}

export interface IFirebaseSecretProvider {
    getSecret(): Promise<FirebaseSecret>;
}

interface SecretDataJsonResponse {
    data: string
}

/**
 * Provides the key used for firebase.
 * 
 * You can implement your own to provide the firebase secret keys, from file storage, env or remote server.
 * Checkout: https://firebase.google.com/docs/admin/setup
 */
class FirebaseSecretProvider implements IFirebaseSecretProvider {
    async getSecret(): Promise<FirebaseSecret> {
        try {
            let data = await tryGetSecretFromStorage();

            if (data == null) {
                const json = await fetchSecret();
                data = json.data;

                // TODO: Store secret in memory to avoid multiple reads from file system
                // Save the secret locally
                await fs.writeFile(SECRET_PATH, data);
            }

            const decrypted = decryptSecret(data);
            const secret = JSON.parse(decrypted) as FirebaseSecret;
            return secret;
        }
        catch (err) {
            logger.error(err);
            throw err;
        }
    }
}

async function tryGetSecretFromStorage(): Promise<string | null> {
    if (await fse.pathExists(SECRET_PATH)) {
        const data = await fs.readFile(SECRET_PATH, 'utf8');
        return data;
    }

    return null;
}

async function fetchSecret(): Promise<SecretDataJsonResponse> {
    const apiUrl = process.env.SECRET_PROVIDER_URL;
    const token = process.env.SECRET_PROVIDER_TOKEN;

    if (apiUrl == null) {
        throw new Error("Secret provider URL is required");
    }

    if (token == null) {
        throw new Error("Secret provider token is required");
    }

    const res = await fetch(apiUrl, {
        headers: {
            "Authentication": `Bearer ${token}`
        }
    })

    const json: SecretDataJsonResponse = await res.json();
    return json;
}

function decryptSecret(data: string): string {
    const algorithm = 'aes-128-cbc';
    const decipher = crypto.createDecipheriv(
        algorithm,
        process.env.SECRET_PROVIDER_ENCRYPTION_KEY as string,
        process.env.SECRET_PROVIDER_ENCRYPTION_IV as string
    );

    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
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