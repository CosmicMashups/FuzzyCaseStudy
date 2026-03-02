/**
 * Triangular membership function.
 * Returns membership in [0, 1]; 0 outside [a, c].
 */
export function trimf(x: number, a: number, b: number, c: number): number {
  if (x <= a || x >= c) return 0
  if (x === b) return 1
  if (x < b) return (x - a) / (b - a)
  return (c - x) / (c - b)
}

/**
 * Trapezoidal membership function.
 * Flat top between b and c; 0 outside [a, d].
 */
export function trapmf(x: number, a: number, b: number, c: number, d: number): number {
  if (x <= a || x >= d) return 0
  if (x >= b && x <= c) return 1
  if (x < b) return (x - a) / (b - a)
  return (d - x) / (d - c)
}
