import { Config } from "src/config";

export function getRedirectUrl(url: string): string {
    return `${Config.BASE_URL}/q${url}`;
}
