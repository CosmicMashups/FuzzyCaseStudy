import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts'
import type { InputKey } from '../fuzzy/types'
import { ANTECEDENT_CONFIG } from '../fuzzy/types'
import { getMembership } from '../fuzzy/fuzzyEngine'
import { range } from '../utils/math'

const SET_COLORS: Record<string, string> = {
  Low: '#22c55e',
  Moderate: '#eab308',
  High: '#ef4444',
  Mild: '#22c55e',
  Severe: '#ef4444',
  None: '#64748b',
  Some: '#eab308',
  Short: '#22c55e',
  Medium: '#eab308',
  Long: '#ef4444',
  Weak: '#ef4444',
  Strong: '#22c55e',
}

interface MembershipChartProps {
  variable: InputKey
  crispValue: number
  memberships: Record<string, number>
  title?: string
}

export function MembershipChart({ variable, crispValue, memberships, title }: MembershipChartProps) {
  const config = ANTECEDENT_CONFIG[variable]!
  const univ = range(config.min, config.max, config.step)
  const hasCrisp = univ.some((x) => Math.abs(x - crispValue) < config.step / 2)
  const univWithCrisp = hasCrisp ? univ : [...univ, crispValue].sort((a, b) => a - b)
  const sets = config.sets

  const data = univWithCrisp.map((x) => {
    const point: Record<string, number | string> = { x }
    for (const set of sets) {
      point[set] = getMembership(variable, set, x)
    }
    return point
  })

  return (
    <div className="h-64 w-full">
      {title && (
        <p className="mb-1 text-sm font-medium text-slate-400">{title}</p>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="x" type="number" domain={[config.min, config.max]} stroke="#94a3b8" fontSize={11} />
          <YAxis type="number" domain={[0, 1]} stroke="#94a3b8" fontSize={11} width={28} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value: number) => [(value as number).toFixed(3), '']}
          />
          <Legend />
          {sets.map((set) => (
            <Line
              key={set}
              dataKey={set}
              type="monotone"
              stroke={SET_COLORS[set] ?? '#94a3b8'}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          ))}
          <ReferenceLine
            x={crispValue}
            stroke="#f43f5e"
            strokeDasharray="4 4"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0 text-xs text-slate-500">
        {sets.map((set) => (
          <span key={set}>
            {set}: {(memberships[set] ?? 0).toFixed(2)}
          </span>
        ))}
      </div>
    </div>
  )
}
