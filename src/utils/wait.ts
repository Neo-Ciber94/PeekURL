/**
 * Returns a promise that resolve when the given milliseconds passed.
 * @param ms The milliseconds to wait.
 */
export function wait(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
