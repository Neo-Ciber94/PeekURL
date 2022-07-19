import fetch from 'node-fetch';

/**
 * Checks if the url available.
 */
export async function checkURLIsAvailable(url: string): Promise<boolean> {
    if (url.trim().length === 0) {
        return false;
    }

    try {
        const res = await fetch(url, {
            method: 'HEAD',
        })

        return res.status < 400 || res.status > 500;
    }
    catch {
        return false;
    }
}