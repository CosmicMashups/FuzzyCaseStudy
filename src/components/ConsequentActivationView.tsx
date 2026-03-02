import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { getConsequentMembership, CONSEQUENT_COLORS, ACTION_LEVEL_UNIVERSE } from '../fuzzy/fuzzyEngine'
import { RULES } from '../fuzzy/fuzzyRules'
import type { RuleActivation } from '../fuzzy/types'

interface ConsequentActivationViewProps {
  ruleActivations: RuleActivation[]
}

const CONSEQUENT_SETS = ['Monitor & Self-care', 'Schedule Counseling', 'Urgent Referral', 'Emergency Protocol']

function getStrengthById(ruleActivations: RuleActivation[], id: number): number {
  return ruleActivations.find((r) => r.id === id)?.firingStrength ?? 0
}

export function ConsequentActivationView({ ruleActivations }: ConsequentActivationViewProps) {
  const data = ACTION_LEVEL_UNIVERSE.map((x) => {
    const point: Record<string, number> = { x }
    for (const set of CONSEQUENT_SETS) {
      let maxClip = 0
      for (let i = 0; i < RULES.length; i++) {
        if (RULES[i]!.consequent !== set) continue
        const strength = getStrengthById(ruleActivations, i + 1)
        const mu = getConsequentMembership(x, set)
        const clipped = Math.min(strength, mu)
        maxClip = Math.max(maxClip, clipped)
      }
      point[set] = maxClip
    }
    return point
  })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-200">Step 4: Consequent activation</h3>
      <p className="text-sm text-slate-400">
        Each rule clips its consequent membership function at the rule activation strength. Multiple rules can activate the same set (max is taken).
      </p>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="x" type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
            <YAxis type="number" domain={[0, 1]} stroke="#94a3b8" fontSize={11} width={28} />
            {CONSEQUENT_SETS.map((set) => (
              <Area
                key={set}
                dataKey={set}
                type="monotone"
                stackId="1"
                stroke={CONSEQUENT_COLORS[set] ?? '#888'}
                fill={CONSEQUENT_COLORS[set] ?? '#888'}
                fillOpacity={0.5}
                strokeWidth={1.5}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
