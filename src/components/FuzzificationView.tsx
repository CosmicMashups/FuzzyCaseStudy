import type { InputKey, InputValues } from '../fuzzy/types'
import { ANTECEDENT_LABELS } from '../fuzzy/types'
import { MembershipChart } from './MembershipChart'

interface FuzzificationViewProps {
  inputs: InputValues
  memberships: Record<string, Record<string, number>>
}

const VARIABLES: InputKey[] = [
  'symptomSeverity',
  'functionalImpairment',
  'suicidalRisk',
  'symptomDuration',
  'socialSupport',
  'stressLoad',
]

export function FuzzificationView({ inputs, memberships }: FuzzificationViewProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-200">Step 2: Fuzzification</h3>
      <p className="text-sm text-slate-400">
        Each crisp input is converted to membership degrees in the fuzzy sets. The vertical red line shows the crisp value; the curves show membership (0–1).
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {VARIABLES.map((key) => (
          <div key={key} className="rounded-lg bg-slate-800/80 p-3">
            <MembershipChart
              variable={key}
              crispValue={inputs[key] ?? 0}
              memberships={memberships[key] ?? {}}
              title={ANTECEDENT_LABELS[key]}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
