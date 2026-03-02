import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Line,
  ComposedChart,
} from 'recharts'
import { CONSEQUENT_SETS } from '../lib/antecedentConfig'
import type { RuleActivation } from '../types'

interface OutputChartProps {
  aggregatedOutput: number[]
  crispOutput: number
  ruleActivations: RuleActivation[]
}

export function OutputChart({
  aggregatedOutput,
  crispOutput,
}: OutputChartProps) {
  const universe = Array.from({ length: 101 }, (_, i) => i)

  const areaData = universe.map((x, i) => {
    const point: Record<string, number | string> = { x }
    for (const set of CONSEQUENT_SETS) {
      point[set.name] = set.fn(x)
    }
    point.aggregated = aggregatedOutput[i]
    return point
  })

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h4 className="mb-2 text-sm font-medium text-white">Action Level (Consequent)</h4>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={areaData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis
              dataKey="x"
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              domain={[0, 100]}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              domain={[0, 1]}
              width={24}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#e2e8f0' }}
              formatter={(value: number | undefined) => [value != null ? value.toFixed(3) : '', '']}
            />
            {CONSEQUENT_SETS.map((set) => (
              <Area
                key={set.name}
                type="monotone"
                dataKey={set.name}
                stroke={set.color}
                fill={set.color}
                fillOpacity={0.3}
                strokeWidth={1}
                isAnimationActive
                animationDuration={400}
              />
            ))}
            <Line
              type="monotone"
              dataKey="aggregated"
              stroke="#f8fafc"
              strokeWidth={3}
              dot={false}
              isAnimationActive
              animationDuration={400}
            />
            <ReferenceLine
              x={crispOutput}
              stroke="#f8fafc"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
