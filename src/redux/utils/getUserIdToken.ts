import { store } from "../store";

export async function getUserIdToken(): Promise<string | undefined> {
    const user = store.getState().userReducer.user || undefined;

    if (user == null) {
        return undefined;
    }

    return user.getIdToken();
}
