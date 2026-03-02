import { useMemo } from 'react'
import { useSimulatorStore } from '../store/useSimulatorStore'
import { computeFuzzyResult } from '../fuzzy/fuzzyEngine'
import { RULE_DESCRIPTIONS } from '../fuzzy/fuzzyRules'

export function StepExplanationPanel() {
  const step = useSimulatorStore((s) => s.step)
  const inputs = useSimulatorStore((s) => s.inputs)
  const result = useMemo(() => computeFuzzyResult(inputs), [inputs])

  const explanations: Record<number, string> = {
    1: 'Step 1: Crisp input stage. The six inputs (Symptom Severity, Functional Impairment, Suicidal Risk, Symptom Duration, Social Support, Stress Load) are set by the sliders. These crisp values will be fuzzified in the next step.',
    2: 'Step 2: Fuzzification. Each crisp input is mapped to membership degrees in its fuzzy sets (e.g. Low, Moderate, High) using triangular or trapezoidal membership functions. The vertical red line shows the crisp value; the curves show membership from 0 to 1.',
    3: `Step 3: Rule evaluation. Each of the 16 Mamdani rules computes its activation strength as the minimum (AND) of its antecedent membership values. For example, Rule 7: IF Symptom Severity is Moderate AND Functional Impairment is Moderate, then activation = MIN(μ(Moderate SS), μ(Moderate FI)). ${result.ruleActivations[0] ? `Strongest rule: ${RULE_DESCRIPTIONS[result.ruleActivations[0].id - 1]} with strength ${result.ruleActivations[0].firingStrength.toFixed(2)}.` : ''}`,
    4: 'Step 4: Consequent activation. Each rule clips its output membership function (Monitor & Self-care, Schedule Counseling, Urgent Referral, or Emergency Protocol) at the rule activation strength. Multiple rules can contribute to the same output set; we take the maximum at each point.',
    5: 'Step 5: Aggregation. All clipped output sets are combined using maximum (MAX) at each point of the Action Level universe (0–100), producing a single aggregated fuzzy set.',
    6: `Step 6: Defuzzification. The centroid method computes the crisp output: Centroid = Σ(x · μ(x)) / Σ μ(x) over the aggregated set. Here the centroid is ${result.crispOutput.toFixed(2)}.`,
    7: `Step 7: Final output. The crisp value ${result.crispOutput.toFixed(2)} is interpreted as: ${result.decision}. The gauge shows the Action Level; the recommended action is displayed.`,
  }

  const text = explanations[step] ?? ''

  return (
    <div className="rounded-lg bg-slate-800/80 p-4">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Step explanation
      </h3>
      <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">{text}</p>
    </div>
  )
}
