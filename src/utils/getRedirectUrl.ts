import { BASE_URL } from "src/config";

export function getDirectUrl(url: string): string {
    return `${BASE_URL}/q${url}`;
}
