import { generateUID } from "./generateUID";
import TLD_LIST from "../data/tld.data";
import { checkURLIsAvailable } from "./checkURLIsAvailable";

export interface ShortenUrlOptions {
  /**
   * The url to shorten.
   */
  url: string;

  /**
   * The size of the generated id.
   */
  size?: number;

  /**
   * Whether if keep the domain name. eg: google, youtube, etc...
   * @default true.
   */
  keepDomain?: boolean;

  /**
   * Wether if keep the top-level-domain name. eg: .com, .org, etc...,
   * if this option is true you must keep the domain name as well.
   * @default false.
   */
  keepTld?: boolean;
}

export async function shortenUrl({
  url,
  size,
  keepDomain = true,
  keepTld = false,
}: ShortenUrlOptions): Promise<string> {
  // Expected an output like:
  // https://www.google.com -> /google/0dAZpLlDvU9l07cN

  if (keepTld === true && keepDomain === false) {
    throw new Error(
      "You should keep the domain name if want to show the top-level-domain"
    );
  }

  if (size == null && keepDomain === false) {
    size = 16;
  }

  if (!(await checkURLIsAvailable(url))) {
    throw new Error("Invalid URL: " + url);
  }

  const uid = generateUID(size);

  if (keepDomain) {
    let host = new URL(url).hostname.replace("www.", "");

    if (!keepTld) {
      host = trimTld(host);
    }

    return `/${host}/${uid}`;
  } else {
    return `/${uid}`;
  }
}

function trimTld(hostname: string): string {
  for (const name of TLD_LIST) {
    const tld = `.${name}`;

    if (hostname.endsWith(tld)) {
      return hostname.slice(0, -tld.length);
    }
  }
  return hostname;
}
