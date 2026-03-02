import type { InputKey } from './types'

export interface RuleCondition {
  variable: InputKey
  set: string
}

export interface RuleDef {
  conditions: RuleCondition[]
  consequent: string
}

/** 16 Mamdani rules from notebook; AND = min. */
export const RULES: RuleDef[] = [
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

export const RULE_DESCRIPTIONS: string[] = [
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
