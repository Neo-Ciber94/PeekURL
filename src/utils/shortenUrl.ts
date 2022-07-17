import { generateUID } from "./generateUID";
import TLD_LIST from '../data/tld.data';

export function shortenUrl(url: string): string {
    // Expected an output like: 
    // https://www.google.com -> /google/0dAZpLlDvU9l07cN

    let host = new URL(url).hostname.replace("www.", "");
    host = trimTld(host);
    const uid = generateUID();
    return `/${host}/${uid}`
}

function trimTld(hostname: string): string {
    for (const name of TLD_LIST) {
        const tld = `.${name}`

        if (hostname.endsWith(tld)) {
            return hostname.slice(0, -tld.length);
        }
    }
    return hostname;
}