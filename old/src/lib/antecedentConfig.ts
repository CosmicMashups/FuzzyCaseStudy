import { trimf, trapmf } from './fuzzyLogic'
import type { AntecedentConfig, InputValues } from '../types'

function buildUniverse(min: number, max: number, step: number): number[] {
  const len = Math.round((max - min) / step) + 1
  return Array.from({ length: len }, (_, i) => min + i * step)
}

const ANTECEDENT_CONFIGS: Omit<AntecedentConfig, 'sets'>[] = [
  {
    key: 'symptomSeverity',
    label: 'Symptom Severity (PHQ-9)',
    min: 0,
    max: 27,
    step: 1,
    unit: '',
  },
  {
    key: 'functionalImpairment',
    label: 'Functional Impairment',
    min: 0,
    max: 10,
    step: 0.1,
    unit: '',
  },
  {
    key: 'suicidalRisk',
    label: 'Suicidal Risk',
    min: 0,
    max: 10,
    step: 0.1,
    unit: '',
  },
  {
    key: 'symptomDuration',
    label: 'Symptom Duration',
    min: 0,
    max: 12,
    step: 0.1,
    unit: ' weeks',
  },
  {
    key: 'socialSupport',
    label: 'Social Support',
    min: 0,
    max: 10,
    step: 0.1,
    unit: '',
  },
  {
    key: 'stressLoad',
    label: 'Stress Load',
    min: 0,
    max: 10,
    step: 0.1,
    unit: '',
  },
]

const SET_DEFS: Record<
  keyof InputValues,
  { name: string; color: string; fn: (x: number) => number }[]
> = {
  symptomSeverity: [
    { name: 'Low', color: '#22c55e', fn: (x) => trimf(x, 0, 4.5, 9) },
    { name: 'Moderate', color: '#eab308', fn: (x) => trimf(x, 7, 12, 17) },
    { name: 'High', color: '#ef4444', fn: (x) => trimf(x, 15, 22, 27) },
  ],
  functionalImpairment: [
    { name: 'Mild', color: '#22c55e', fn: (x) => trimf(x, 0, 1.5, 3) },
    { name: 'Moderate', color: '#eab308', fn: (x) => trimf(x, 2, 4.5, 7) },
    { name: 'Severe', color: '#ef4444', fn: (x) => trimf(x, 6, 8, 10) },
  ],
  suicidalRisk: [
    { name: 'None', color: '#22c55e', fn: (x) => trimf(x, 0, 0.5, 1) },
    { name: 'Some', color: '#eab308', fn: (x) => trimf(x, 1, 3.5, 6) },
    { name: 'High', color: '#ef4444', fn: (x) => trimf(x, 5, 7.5, 10) },
  ],
  symptomDuration: [
    { name: 'Short', color: '#22c55e', fn: (x) => trimf(x, 0, 1, 2) },
    { name: 'Medium', color: '#eab308', fn: (x) => trimf(x, 2, 4, 6) },
    { name: 'Long', color: '#ef4444', fn: (x) => trimf(x, 6, 9, 12) },
  ],
  socialSupport: [
    { name: 'Weak', color: '#ef4444', fn: (x) => trimf(x, 0, 2.5, 5) },
    { name: 'Moderate', color: '#eab308', fn: (x) => trimf(x, 3, 5, 7) },
    { name: 'Strong', color: '#22c55e', fn: (x) => trimf(x, 6, 8.5, 10) },
  ],
  stressLoad: [
    { name: 'Low', color: '#22c55e', fn: (x) => trimf(x, 0, 2.5, 5) },
    { name: 'Moderate', color: '#eab308', fn: (x) => trimf(x, 3, 5, 7) },
    { name: 'High', color: '#ef4444', fn: (x) => trimf(x, 6, 8.5, 10) },
  ],
}

export function getAntecedentConfigs(): AntecedentConfig[] {
  return ANTECEDENT_CONFIGS.map((base) => {
    const universe = buildUniverse(base.min, base.max, base.step)
    const sets = SET_DEFS[base.key].map((def) => ({
      name: def.name,
      color: def.color,
      values: universe.map((x) => def.fn(x)),
    }))
    return { ...base, sets }
  })
}

export const CONSEQUENT_SETS = [
  { name: 'Monitor & Self-care', color: '#22c55e', fn: (x: number) => trapmf(x, 0, 0, 15, 30) },
  { name: 'Schedule Counseling', color: '#eab308', fn: (x: number) => trimf(x, 20, 37.5, 55) },
  { name: 'Urgent Referral', color: '#f97316', fn: (x: number) => trimf(x, 45, 62.5, 80) },
  { name: 'Emergency Protocol', color: '#ef4444', fn: (x: number) => trapmf(x, 75, 90, 100, 100) },
]
