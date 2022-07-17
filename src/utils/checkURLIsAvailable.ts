import fetch from 'node-fetch';

/**
 * Checks if the url available.
 */
export async function checkURLIsAvailable(url: string): Promise<boolean> {
    if (url.trim().length === 0) {
        return false;
    }

    const res = await fetch(url, {
        method: 'HEAD'
    })

    if (res.ok) {
        return true;
    }

    return false;
}