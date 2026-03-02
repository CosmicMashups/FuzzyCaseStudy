import { trimf, trapmf } from './membershipFunctions'
import { RULES, RULE_DESCRIPTIONS } from './fuzzyRules'
import type { InputValues, RuleActivation, FuzzyResult } from './types'

const ACTION_LEVEL_UNIVERSE = Array.from({ length: 101 }, (_, i) => i)

function getMembership(variable: keyof InputValues, set: string, value: number): number {
  switch (variable) {
    case 'symptomSeverity':
      if (set === 'Low') return trimf(value, 0, 4.5, 9)
      if (set === 'Moderate') return trimf(value, 7, 12, 17)
      if (set === 'High') return trimf(value, 15, 22, 27)
      break
    case 'functionalImpairment':
      if (set === 'Mild') return trimf(value, 0, 1.5, 3)
      if (set === 'Moderate') return trimf(value, 2, 4.5, 7)
      if (set === 'Severe') return trimf(value, 6, 8, 10)
      break
    case 'suicidalRisk':
      if (set === 'None') return trimf(value, 0, 0.5, 1)
      if (set === 'Some') return trimf(value, 1, 3.5, 6)
      if (set === 'High') return trapmf(value, 5, 7.5, 10, 11)
      break
    case 'symptomDuration':
      if (set === 'Short') return trimf(value, 0, 1, 2)
      if (set === 'Medium') return trimf(value, 2, 4, 6)
      if (set === 'Long') return trimf(value, 6, 9, 12)
      break
    case 'socialSupport':
      if (set === 'Weak') return trimf(value, 0, 2.5, 5)
      if (set === 'Moderate') return trimf(value, 3, 5, 7)
      if (set === 'Strong') return trimf(value, 6, 8.5, 10)
      break
    case 'stressLoad':
      if (set === 'Low') return trimf(value, 0, 2.5, 5)
      if (set === 'Moderate') return trimf(value, 3, 5, 7)
      if (set === 'High') return trimf(value, 6, 8.5, 10)
      break
  }
  return 0
}

function getConsequentMembership(x: number, set: string): number {
  switch (set) {
    case 'Monitor & Self-care':
      return trapmf(x, 0, 0, 15, 30)
    case 'Schedule Counseling':
      return trimf(x, 20, 37.5, 55)
    case 'Urgent Referral':
      return trimf(x, 45, 62.5, 80)
    case 'Emergency Protocol':
      return trapmf(x, 75, 90, 100, 100)
    default:
      return 0
  }
}

const CONSEQUENT_COLORS: Record<string, string> = {
  'Monitor & Self-care': '#22c55e',
  'Schedule Counseling': '#eab308',
  'Urgent Referral': '#f97316',
  'Emergency Protocol': '#ef4444',
}

function defuzzify(aggregatedOutput: number[]): number {
  const numerator = ACTION_LEVEL_UNIVERSE.reduce(
    (sum, x, i) => sum + x * aggregatedOutput[i]!,
    0
  )
  const denominator = aggregatedOutput.reduce((sum, v) => sum + v, 0)
  return denominator === 0 ? 0 : numerator / denominator
}

function interpretResult(crisp: number): string {
  if (crisp < 25) return 'Monitor & Self-Care'
  if (crisp < 50) return 'Schedule Counseling'
  if (crisp < 75) return 'Urgent Referral'
  return 'Emergency Protocol'
}

const VAR_KEYS: (keyof InputValues)[] = [
  'symptomSeverity',
  'functionalImpairment',
  'suicidalRisk',
  'symptomDuration',
  'socialSupport',
  'stressLoad',
]

const SET_NAMES: Record<keyof InputValues, string[]> = {
  symptomSeverity: ['Low', 'Moderate', 'High'],
  functionalImpairment: ['Mild', 'Moderate', 'Severe'],
  suicidalRisk: ['None', 'Some', 'High'],
  symptomDuration: ['Short', 'Medium', 'Long'],
  socialSupport: ['Weak', 'Moderate', 'Strong'],
  stressLoad: ['Low', 'Moderate', 'High'],
}

export function computeFuzzyResult(inputs: InputValues): FuzzyResult {
  const memberships: Record<string, Record<string, number>> = {}
  for (const key of VAR_KEYS) {
    memberships[key] = {}
    for (const set of SET_NAMES[key]!) {
      memberships[key]![set] = getMembership(key, set, inputs[key])
    }
  }

  const ruleActivations: RuleActivation[] = RULES.map((rule, i) => {
    const antecedentValues = rule.conditions.map((c) =>
      getMembership(c.variable, c.set, inputs[c.variable])
    )
    const firingStrength = Math.min(...antecedentValues)
    return {
      id: i + 1,
      description: RULE_DESCRIPTIONS[i]!,
      firingStrength,
      consequentSet: rule.consequent,
      consequentColor: CONSEQUENT_COLORS[rule.consequent] ?? '#888',
      antecedentValues,
    }
  })

  const aggregatedOutput = ACTION_LEVEL_UNIVERSE.map((x) => {
    let maxVal = 0
    for (let i = 0; i < RULES.length; i++) {
      const strength = ruleActivations[i]!.firingStrength
      const consequentSet = RULES[i]!.consequent
      const clipped = Math.min(strength, getConsequentMembership(x, consequentSet))
      maxVal = Math.max(maxVal, clipped)
    }
    return maxVal
  })

  const crispOutput = defuzzify(aggregatedOutput)
  const decision = interpretResult(crispOutput)

  return {
    memberships,
    ruleActivations: [...ruleActivations].sort((a, b) => b.firingStrength - a.firingStrength),
    aggregatedOutput,
    crispOutput,
    decision,
  }
}

export { getMembership, getConsequentMembership, ACTION_LEVEL_UNIVERSE, CONSEQUENT_COLORS }
