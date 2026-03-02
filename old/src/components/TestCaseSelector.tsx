import type { InputValues } from '../types'

const TEST_CASES: { label: string; values: InputValues }[] = [
  {
    label: 'Case A: Monitor & Self-Care',
    values: {
      symptomSeverity: 6,
      functionalImpairment: 2,
      suicidalRisk: 0,
      symptomDuration: 1,
      socialSupport: 5,
      stressLoad: 5,
    },
  },
  {
    label: 'Case B: Schedule to Urgent',
    values: {
      symptomSeverity: 14,
      functionalImpairment: 5,
      suicidalRisk: 1,
      symptomDuration: 5,
      socialSupport: 5,
      stressLoad: 5,
    },
  },
  {
    label: 'Case C: Urgent Referral',
    values: {
      symptomSeverity: 20,
      functionalImpairment: 8,
      suicidalRisk: 2,
      symptomDuration: 10,
      socialSupport: 5,
      stressLoad: 5,
    },
  },
  {
    label: 'Case D: Emergency Protocol',
    values: {
      symptomSeverity: 0,
      functionalImpairment: 0,
      suicidalRisk: 8,
      symptomDuration: 0,
      socialSupport: 10,
      stressLoad: 0,
    },
  },
]

interface TestCaseSelectorProps {
  onSelect: (values: InputValues) => void
}

export function TestCaseSelector({ onSelect }: TestCaseSelectorProps) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h3 className="mb-3 text-lg font-semibold text-white">Test Cases</h3>
      <div className="flex flex-wrap gap-2">
        {TEST_CASES.map((tc) => (
          <button
            key={tc.label}
            type="button"
            onClick={() => onSelect(tc.values)}
            className="rounded-md bg-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-600"
          >
            {tc.label.split(':')[0]}
          </button>
        ))}
      </div>
    </div>
  )
}
