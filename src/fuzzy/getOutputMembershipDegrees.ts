import { getConsequentMembership } from './fuzzyEngine'

const ACTION_LEVEL_SETS = [
  'Monitor & Self-care',
  'Schedule Counseling',
  'Urgent Referral',
  'Emergency Protocol',
] as const

export interface OutputMembershipDegrees {
  monitor: number
  counseling: number
  urgent: number
  emergency: number
}

/**
 * Computes the membership degree of a crisp output value in each Action Level
 * fuzzy set using the same trapezoidal/triangular functions as the fuzzy engine.
 * Used for visualization only; does not modify engine logic.
 */
export function getOutputMembershipDegrees(crispValue: number): OutputMembershipDegrees {
  const clamp = Math.max(0, Math.min(100, crispValue))
  return {
    monitor: getConsequentMembership(clamp, ACTION_LEVEL_SETS[0]),
    counseling: getConsequentMembership(clamp, ACTION_LEVEL_SETS[1]),
    urgent: getConsequentMembership(clamp, ACTION_LEVEL_SETS[2]),
    emergency: getConsequentMembership(clamp, ACTION_LEVEL_SETS[3]),
  }
}
