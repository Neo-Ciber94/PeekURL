export function rangeArray(max: number): number[];
export function rangeArray(min: number, max: number): number[];
export function rangeArray(minOrMax: number, max?: number): number[] {
  if (max == null && minOrMax < 0) {
    throw new Error("max cannot be negative");
  }

  if (max && minOrMax > max) {
    throw new Error("min cannot be greater than max");
  }

  if (max == null) {
    return Array.from([...Array(minOrMax).keys()], (i) => i);
  }

  const length = max - minOrMax;
  return Array.from([...Array(length).keys()], (i) => i + minOrMax);
}
