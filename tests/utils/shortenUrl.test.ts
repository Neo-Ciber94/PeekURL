import { shortenUrl } from '@utils/shortenUrl';
import { expect, describe, test } from 'vitest';

describe("shortenUrl", () => {
    test("Valid shorten url", async () => {
        const result = await shortenUrl({
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        });

        expect(result).match(/\/youtube\/[\w|-]{10}/);
    })

    test("Valid shorten url with top-level-domain", async () => {
        const result = await shortenUrl({
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            keepTld: true,
        });

        expect(result).match(/\/youtube\.com\/[\w|-]{10}/);
    })

    test("Valid shorten url no domain", async () => {
        const result = await shortenUrl({
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            keepDomain: false,
        });

        expect(result).match(/\/[\w|-]{16}/);
    })

    test("Invalid url", async () => {
        await expect(shortenUrl({
            url: "www.youtube.com/watch?v=dQw4w9WgXcQ",
            keepDomain: false,
        }))
            .rejects
            .toThrow();
    })
})