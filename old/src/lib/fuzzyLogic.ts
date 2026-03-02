import type { InputValues, RuleActivation } from '../types'

/**
 * Triangular membership function.
 * @param x - Input value
 * @param a - Left vertex (membership 0)
 * @param b - Peak vertex (membership 1)
 * @param c - Right vertex (membership 0)
 * @returns Membership degree in [0, 1], or 0 outside [a, c]
 */
export function trimf(x: number, a: number, b: number, c: number): number {
  if (x <= a || x >= c) return 0
  if (x === b) return 1
  if (x < b) return (x - a) / (b - a)
  return (c - x) / (c - b)
}

/**
 * Trapezoidal membership function.
 * @param x - Input value
 * @param a - Left foot (membership 0)
 * @param b - Left shoulder (membership 1)
 * @param c - Right shoulder (membership 1)
 * @param d - Right foot (membership 0)
 * @returns Membership degree in [0, 1], or 0 outside [a, d]
 */
export function trapmf(x: number, a: number, b: number, c: number, d: number): number {
  if (x <= a || x >= d) return 0
  if (x >= b && x <= c) return 1
  if (x < b) return (x - a) / (b - a)
  return (d - x) / (d - c)
}

/**
 * Centroid defuzzification over output universe 0-100.
 * @param aggregatedOutput - Array of 101 membership values (one per output point)
 * @returns Crisp output value (weighted centroid)
 */
export function defuzzify(aggregatedOutput: number[]): number {
  const universe = Array.from({ length: 101 }, (_, i) => i)
  const numerator = universe.reduce((sum, x, i) => sum + x * aggregatedOutput[i], 0)
  const denominator = aggregatedOutput.reduce((sum, v) => sum + v, 0)
  return denominator === 0 ? 0 : numerator / denominator
}

/**
 * Interpret crisp output into decision label.
 * @param crisp - Defuzzified output (0-100)
 * @returns Decision: Monitor & Self-Care (<25), Schedule Counseling (<50), Urgent Referral (<75), Emergency Protocol (>=75)
 */
export function interpretResult(crisp: number): string {
  if (crisp < 25) return 'Monitor & Self-Care'
  if (crisp < 50) return 'Schedule Counseling'
  if (crisp < 75) return 'Urgent Referral'
  return 'Emergency Protocol'
}

const OUTPUT_COLORS: Record<string, string> = {
  'Monitor & Self-care': '#22c55e',
  'Schedule Counseling': '#eab308',
  'Urgent Referral': '#f97316',
  'Emergency Protocol': '#ef4444',
}

type RuleCondition = { variable: keyof InputValues; set: string }
type RuleDef = { conditions: RuleCondition[]; consequent: string }

const RULES: RuleDef[] = [
  { conditions: [{ variable: 'suicidalRisk', set: 'High' }], consequent: 'Emergency Protocol' },
  {
    conditions: [
      { variable: 'suicidalRisk', set: 'Some' },
      { variable: 'functionalImpairment', set: 'Severe' },
    ],
    consequent: 'Emergency Protocol',
  },
  {
    conditions: [
      { variable: 'suicidalRisk', set: 'Some' },
      { variable: 'symptomSeverity', set: 'High' },
    ],
    consequent: 'Urgent Referral',
  },
  {
    conditions: [
      { variable: 'symptomSeverity', set: 'High' },
      { variable: 'functionalImpairment', set: 'Severe' },
    ],
    consequent: 'Urgent Referral',
  },
  {
    conditions: [
      { variable: 'symptomSeverity', set: 'High' },
      { variable: 'symptomDuration', set: 'Long' },
    ],
    consequent: 'Urgent Referral',
  },
  {
    conditions: [
      { variable: 'functionalImpairment', set: 'Severe' },
      { variable: 'symptomDuration', set: 'Long' },
    ],
    consequent: 'Urgent Referral',
  },
  {
    conditions: [
      { variable: 'symptomSeverity', set: 'Moderate' },
      { variable: 'functionalImpairment', set: 'Moderate' },
    ],
    consequent: 'Schedule Counseling',
  },
  {
    conditions: [
      { variable: 'symptomSeverity', set: 'Moderate' },
      { variable: 'symptomDuration', set: 'Medium' },
    ],
    consequent: 'Schedule Counseling',
  },
  {
    conditions: [
      { variable: 'functionalImpairment', set: 'Moderate' },
      { variable: 'symptomDuration', set: 'Long' },
    ],
    consequent: 'Schedule Counseling',
  },
  {
    conditions: [
      { variable: 'symptomSeverity', set: 'Low' },
      { variable: 'functionalImpairment', set: 'Mild' },
    ],
    consequent: 'Monitor & Self-care',
  },
  {
    conditions: [
      { variable: 'symptomSeverity', set: 'Low' },
      { variable: 'symptomDuration', set: 'Short' },
    ],
    consequent: 'Monitor & Self-care',
  },
  {
    conditions: [
      { variable: 'socialSupport', set: 'Weak' },
      { variable: 'stressLoad', set: 'High' },
    ],
    consequent: 'Schedule Counseling',
  },
  {
    conditions: [
      { variable: 'socialSupport', set: 'Weak' },
      { variable: 'symptomSeverity', set: 'High' },
    ],
    consequent: 'Urgent Referral',
  },
  {
    conditions: [
      { variable: 'socialSupport', set: 'Strong' },
      { variable: 'symptomSeverity', set: 'Moderate' },
      { variable: 'functionalImpairment', set: 'Mild' },
    ],
    consequent: 'Monitor & Self-care',
  },
  {
    conditions: [
      { variable: 'suicidalRisk', set: 'Some' },
      { variable: 'symptomSeverity', set: 'Moderate' },
      { variable: 'functionalImpairment', set: 'Moderate' },
    ],
    consequent: 'Urgent Referral',
  },
  {
    conditions: [
      { variable: 'symptomDuration', set: 'Medium' },
      { variable: 'symptomSeverity', set: 'Moderate' },
      { variable: 'functionalImpairment', set: 'Moderate' },
    ],
    consequent: 'Urgent Referral',
  },
]

const RULE_DESCRIPTIONS: string[] = [
  "suicidalRisk['High'] -> Emergency Protocol",
  "suicidalRisk['Some'] AND functionalImpairment['Severe'] -> Emergency Protocol",
  "suicidalRisk['Some'] AND symptomSeverity['High'] -> Urgent Referral",
  "symptomSeverity['High'] AND functionalImpairment['Severe'] -> Urgent Referral",
  "symptomSeverity['High'] AND symptomDuration['Long'] -> Urgent Referral",
  "functionalImpairment['Severe'] AND symptomDuration['Long'] -> Urgent Referral",
  "symptomSeverity['Moderate'] AND functionalImpairment['Moderate'] -> Schedule Counseling",
  "symptomSeverity['Moderate'] AND symptomDuration['Medium'] -> Schedule Counseling",
  "functionalImpairment['Moderate'] AND symptomDuration['Long'] -> Schedule Counseling",
  "symptomSeverity['Low'] AND functionalImpairment['Mild'] -> Monitor & Self-care",
  "symptomSeverity['Low'] AND symptomDuration['Short'] -> Monitor & Self-care",
  "socialSupport['Weak'] AND stressLoad['High'] -> Schedule Counseling",
  "socialSupport['Weak'] AND symptomSeverity['High'] -> Urgent Referral",
  "socialSupport['Strong'] AND symptomSeverity['Moderate'] AND functionalImpairment['Mild'] -> Monitor & Self-care",
  "suicidalRisk['Some'] AND symptomSeverity['Moderate'] AND functionalImpairment['Moderate'] -> Urgent Referral",
  "symptomDuration['Medium'] AND symptomSeverity['Moderate'] AND functionalImpairment['Moderate'] -> Urgent Referral",
]

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
      if (set === 'High') return trimf(value, 5, 7.5, 10)
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

/**
 * Compute full fuzzy pipeline: fuzzification, rule evaluation, aggregation, defuzzification.
 * @param inputs - Six antecedent input values
 * @returns Memberships, rule activations, aggregated output, crisp value, and decision
 */
export function computeFuzzyResult(inputs: InputValues): {
  memberships: Record<string, Record<string, number>>
  ruleActivations: RuleActivation[]
  aggregatedOutput: number[]
  crispOutput: number
  decision: string
} {
  const varKeys: (keyof InputValues)[] = [
    'symptomSeverity',
    'functionalImpairment',
    'suicidalRisk',
    'symptomDuration',
    'socialSupport',
    'stressLoad',
  ]

  const memberships: Record<string, Record<string, number>> = {}
  const setNames: Record<keyof InputValues, string[]> = {
    symptomSeverity: ['Low', 'Moderate', 'High'],
    functionalImpairment: ['Mild', 'Moderate', 'Severe'],
    suicidalRisk: ['None', 'Some', 'High'],
    symptomDuration: ['Short', 'Medium', 'Long'],
    socialSupport: ['Weak', 'Moderate', 'Strong'],
    stressLoad: ['Low', 'Moderate', 'High'],
  }

  for (const key of varKeys) {
    memberships[key] = {}
    for (const set of setNames[key]) {
      memberships[key][set] = getMembership(key, set, inputs[key])
    }
  }

  const ruleActivations: RuleActivation[] = RULES.map((rule, i) => {
    const strengths = rule.conditions.map((c) => getMembership(c.variable, c.set, inputs[c.variable]))
    const firingStrength = Math.min(...strengths)
    return {
      id: i + 1,
      description: RULE_DESCRIPTIONS[i],
      firingStrength,
      consequentSet: rule.consequent,
      consequentColor: OUTPUT_COLORS[rule.consequent] ?? '#888',
    }
  })

  const universe = Array.from({ length: 101 }, (_, i) => i)
  const aggregatedOutput = universe.map((x) => {
    let maxVal = 0
    for (let i = 0; i < RULES.length; i++) {
      const strength = ruleActivations[i].firingStrength
      const consequentSet = RULES[i].consequent
      const clipped = Math.min(strength, getConsequentMembership(x, consequentSet))
      maxVal = Math.max(maxVal, clipped)
    }
    return maxVal
  })

  const crispOutput = defuzzify(aggregatedOutput)
  const decision = interpretResult(crispOutput)

  return {
    memberships,
    ruleActivations: ruleActivations.sort((a, b) => b.firingStrength - a.firingStrength),
    aggregatedOutput,
    crispOutput,
    decision,
  }
}
