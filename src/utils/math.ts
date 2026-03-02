/** Round to a given number of decimal places. */
export function roundTo(value: number, decimals: number): number {
  const p = 10 ** decimals
  return Math.round(value * p) / p
}

/** Generate array of numbers from min to max with step. */
export function range(min: number, max: number, step: number): number[] {
  const out: number[] = []
  for (let x = min; x <= max; x = roundTo(x + step, 2)) out.push(x)
  return out
}
