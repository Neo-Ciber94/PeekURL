import crypto from "crypto";
import logger from "src/logging";
import {
  FirebaseSecret,
  IFirebaseSecretProvider,
} from "./firebase-secret-provider";
import { Lazy } from "@utils/lazy";

interface SecretDataJsonResponse {
  data: string;
}

// We get the secret lazily to avoid multiple reads from a file
const lazy = new Lazy<Promise<FirebaseSecret>>(getSecret);

/**
 * Provides the key used for firebase.
 *
 * You can implement your own to provide the firebase secret keys, from file storage, env or remote server.
 * Checkout: https://firebase.google.com/docs/admin/setup
 */
export class FirebaseSecretProvider implements IFirebaseSecretProvider {
  async getSecret(): Promise<FirebaseSecret> {
    try {
      return lazy.get();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

async function getSecret(): Promise<FirebaseSecret> {
  const json = await fetchSecretFromRemoteServer();
  const decrypted = decryptSecret(json.data);
  const secret = JSON.parse(decrypted) as FirebaseSecret;
  return secret;
}

async function fetchSecretFromRemoteServer(): Promise<SecretDataJsonResponse> {
  const apiUrl = process.env.SECRET_PROVIDER_URL;
  const token = process.env.SECRET_PROVIDER_TOKEN;

  if (apiUrl == null) {
    throw new Error("Secret provider URL is required");
  }

  if (token == null) {
    throw new Error("Secret provider token is required");
  }

  const url = `${apiUrl}/data`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      mode: "cors",
    },
  });

  if (!res.ok) {
    const error = {
      status: res.status,
      statusText: res.statusText,
      message: await res.text(),
    };

    throw new Error(JSON.stringify(error, null, 2));
  }

  const json: SecretDataJsonResponse = await res.json();
  logger.info("Loaded firebase secret from remote server");
  return json;
}

function decryptSecret(data: string): string {
  const algorithm = "aes-128-cbc";
  const encryptionKeyHex = process.env.SECRET_PROVIDER_ENCRYPTION_KEY as string;
  const encryptionIvHex = process.env.SECRET_PROVIDER_ENCRYPTION_IV as string;

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(encryptionKeyHex, "hex"),
    Buffer.from(encryptionIvHex, "hex")
  );

  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
