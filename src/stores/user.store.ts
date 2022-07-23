import { User } from "firebase/auth";
import { createInMemoryStore } from "./core/InMemoryStore";

export const userStore = createInMemoryStore<User>();

export async function getUserIdToken(): Promise<string | undefined> {
    const user = await userStore.load();

    if (user == null) {
        return undefined;
    }

    return user.getIdToken();
}