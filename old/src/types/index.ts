export interface InputValues {
  symptomSeverity: number
  functionalImpairment: number
  suicidalRisk: number
  symptomDuration: number
  socialSupport: number
  stressLoad: number
}

export interface MembershipSet {
  name: string
  color: string
  values: number[]
}

export interface AntecedentConfig {
  key: keyof InputValues
  label: string
  min: number
  max: number
  step: number
  unit?: string
  sets: MembershipSet[]
}

export interface RuleActivation {
  id: number
  description: string
  firingStrength: number
  consequentSet: string
  consequentColor: string
}

export interface FuzzyResult {
  memberships: Record<string, Record<string, number>>
  ruleActivations: RuleActivation[]
  aggregatedOutput: number[]
  crispOutput: number
  decision: string
}
