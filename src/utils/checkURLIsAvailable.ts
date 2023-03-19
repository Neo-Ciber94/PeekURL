export async function checkURLIsAvailable(url: string): Promise<boolean> {
  // From: https://regexr.com/37i6s
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  const isValid = urlRegex.test(url);
  return Promise.resolve(isValid);
}
