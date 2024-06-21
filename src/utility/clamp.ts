/**
 * Clamps the given value between the minimum (inclusive) and maximum (inclusive).
 * @param val The value to clamp between the minimum and maximum.
 * @param min The minimum value to use if the given value is smaller.
 * @param max The maximum value to use if the given value is bigger.
 * @returns The value clamped between the minimum and maximum.
 */
export default function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(val, max));
}
