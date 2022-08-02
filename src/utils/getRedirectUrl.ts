import { localConfig } from "src/config/local.config";

export function getRedirectUrl(url: string): string {
  return `${localConfig.BASE_URL}/q${url}`;
}
