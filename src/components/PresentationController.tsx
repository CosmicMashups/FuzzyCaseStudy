import { useEffect, useRef } from 'react'
import { useSimulatorStore } from '../store/useSimulatorStore'

const STEP_DELAY_MS = 2200

export function PresentationController() {
  const { step, nextStep, prevStep, reset, loadTestCase, isPlaying, setPlaying } = useSimulatorStore()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isPlaying || step >= 7) {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (step >= 7) setPlaying(false)
      return
    }
    timerRef.current = setTimeout(() => {
      nextStep()
    }, STEP_DELAY_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, step, nextStep, setPlaying])

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-800 px-3 py-2">
      <button
        type="button"
        onClick={prevStep}
        disabled={step <= 1}
        className="rounded bg-slate-700 px-3 py-1.5 text-sm font-medium text-slate-200 disabled:opacity-40 hover:bg-slate-600 disabled:hover:bg-slate-700"
      >
        Previous Step
      </button>
      <button
        type="button"
        onClick={nextStep}
        disabled={step >= 7}
        className="rounded bg-slate-700 px-3 py-1.5 text-sm font-medium text-slate-200 disabled:opacity-40 hover:bg-slate-600 disabled:hover:bg-slate-700"
      >
        Next Step
      </button>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        disabled={step >= 7 || isPlaying}
        className="rounded bg-emerald-700 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-40 hover:bg-emerald-600 disabled:hover:bg-emerald-700"
      >
        Play Full Simulation
      </button>
      <button
        type="button"
        onClick={reset}
        className="rounded bg-slate-700 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-600"
      >
        Reset
      </button>
      <span className="text-slate-400">|</span>
      <span className="text-slate-400 text-sm">Test case:</span>
      {(['A', 'B', 'C', 'D'] as const).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => loadTestCase(key)}
          className="rounded bg-slate-700 px-2 py-1 text-sm font-medium text-slate-200 hover:bg-slate-600"
        >
          {key}
        </button>
      ))}
      <span className="ml-auto text-slate-500 text-sm">Step {step} of 7</span>
    </div>
  )
}
