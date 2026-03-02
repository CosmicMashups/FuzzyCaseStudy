import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 400

export function useCountUp(value: number): number {
  const [display, setDisplay] = useState(value)
  const displayRef = useRef(value)
  const rafRef = useRef<number | null>(null)

  displayRef.current = display

  useEffect(() => {
    if (Math.abs(displayRef.current - value) < 0.01) return

    const startVal = displayRef.current
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / DURATION_MS, 1)
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
      const next = startVal + (value - startVal) * eased
      setDisplay(next)

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [value])

  return display
}
