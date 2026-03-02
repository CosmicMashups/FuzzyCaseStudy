import { create } from 'zustand'
import type { InputValues } from '../fuzzy/types'

export const TEST_CASES: Record<string, InputValues> = {
  A: { symptomSeverity: 6, functionalImpairment: 2, suicidalRisk: 0, symptomDuration: 1, socialSupport: 5, stressLoad: 5 },
  B: { symptomSeverity: 14, functionalImpairment: 5, suicidalRisk: 1, symptomDuration: 5, socialSupport: 5, stressLoad: 5 },
  C: { symptomSeverity: 20, functionalImpairment: 8, suicidalRisk: 2, symptomDuration: 10, socialSupport: 5, stressLoad: 5 },
  D: { symptomSeverity: 0, functionalImpairment: 0, suicidalRisk: 8, symptomDuration: 0, socialSupport: 10, stressLoad: 0 },
}

const INITIAL_INPUTS: InputValues = { ...TEST_CASES['A']! }

interface SimulatorState {
  inputs: InputValues
  step: number
  isPlaying: boolean
  setInputs: (inputs: InputValues | ((prev: InputValues) => InputValues)) => void
  setStep: (step: number | ((prev: number) => number)) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
  loadTestCase: (key: keyof typeof TEST_CASES) => void
  setPlaying: (v: boolean) => void
}

const MAX_STEP = 7

export const useSimulatorStore = create<SimulatorState>((set) => ({
  inputs: { ...INITIAL_INPUTS },
  step: 1,
  isPlaying: false,
  setInputs: (updater) =>
    set((s) => ({
      inputs: typeof updater === 'function' ? updater(s.inputs) : updater,
    })),
  setStep: (updater) =>
    set((s) => ({
      step: Math.max(1, Math.min(MAX_STEP, typeof updater === 'function' ? updater(s.step) : updater)),
    })),
  nextStep: () =>
    set((s) => ({ step: Math.min(MAX_STEP, s.step + 1), isPlaying: s.step + 1 >= MAX_STEP ? false : s.isPlaying })),
  prevStep: () => set((s) => ({ step: Math.max(1, s.step - 1), isPlaying: false })),
  reset: () => set({ step: 1, isPlaying: false }),
  loadTestCase: (key) => set({ inputs: { ...TEST_CASES[key]! }, step: 1, isPlaying: false }),
  setPlaying: (v) => set({ isPlaying: v }),
}))
