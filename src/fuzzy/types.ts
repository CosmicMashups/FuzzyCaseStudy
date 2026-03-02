export interface InputValues {
  symptomSeverity: number
  functionalImpairment: number
  suicidalRisk: number
  symptomDuration: number
  socialSupport: number
  stressLoad: number
}

export type InputKey = keyof InputValues

export interface RuleActivation {
  id: number
  description: string
  firingStrength: number
  consequentSet: string
  consequentColor: string
  antecedentValues?: number[]
}

export interface FuzzyResult {
  memberships: Record<string, Record<string, number>>
  ruleActivations: RuleActivation[]
  aggregatedOutput: number[]
  crispOutput: number
  decision: string
}

export const ANTECEDENT_LABELS: Record<InputKey, string> = {
  symptomSeverity: 'Symptom Severity',
  functionalImpairment: 'Functional Impairment',
  suicidalRisk: 'Suicidal Risk',
  symptomDuration: 'Symptom Duration',
  socialSupport: 'Social Support',
  stressLoad: 'Stress Load',
}

export const ANTECEDENT_CONFIG: Record<
  InputKey,
  { min: number; max: number; step: number; sets: string[] }
> = {
  symptomSeverity: { min: 0, max: 27, step: 1, sets: ['Low', 'Moderate', 'High'] },
  functionalImpairment: { min: 0, max: 10, step: 0.1, sets: ['Mild', 'Moderate', 'Severe'] },
  suicidalRisk: { min: 0, max: 10, step: 0.1, sets: ['None', 'Some', 'High'] },
  symptomDuration: { min: 0, max: 12, step: 0.1, sets: ['Short', 'Medium', 'Long'] },
  socialSupport: { min: 0, max: 10, step: 0.1, sets: ['Weak', 'Moderate', 'Strong'] },
  stressLoad: { min: 0, max: 10, step: 0.1, sets: ['Low', 'Moderate', 'High'] },
}

export const CONSEQUENT_SETS = [
  'Monitor & Self-care',
  'Schedule Counseling',
  'Urgent Referral',
  'Emergency Protocol',
] as const

export type ConsequentSet = (typeof CONSEQUENT_SETS)[number]
