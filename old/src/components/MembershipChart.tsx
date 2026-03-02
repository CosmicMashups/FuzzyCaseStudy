import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { motion } from 'framer-motion'
import type { AntecedentConfig } from '../types'

interface MembershipChartProps {
  variable: AntecedentConfig
  currentValue: number
  memberships: Record<string, number>
}

export function MembershipChart({ variable, currentValue, memberships }: MembershipChartProps) {
  const universe = variable.sets[0]?.values
    ? Array.from(
        { length: variable.sets[0].values.length },
        (_, i) => variable.min + i * variable.step
      )
    : []

  const chartData = universe.map((x, i) => {
    const point: Record<string, number | string> = { x }
    for (const set of variable.sets) {
      point[set.name] = set.values[i]
    }
    return point
  })

  const activeLabel = Object.entries(memberships)
    .filter(([, v]) => v > 0.01)
    .map(([k, v]) => `${k}: ${v.toFixed(2)}`)
    .join(' | ')

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h4 className="mb-2 text-sm font-medium text-white">
        {variable.label}
        {activeLabel && (
          <span className="ml-2 text-slate-400">({activeLabel})</span>
        )}
      </h4>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis
              dataKey="x"
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              domain={[variable.min, variable.max]}
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
            <ReferenceLine
              x={currentValue}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeWidth={2}
            />
            {variable.sets.map((set) => (
              <Line
                key={set.name}
                type="monotone"
                dataKey={set.name}
                stroke={set.color}
                strokeWidth={2}
                dot={false}
                isAnimationActive
                animationDuration={400}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {variable.sets.map((set) => {
          const deg = memberships[set.name] ?? 0
          return (
            <motion.div
              key={set.name}
              className="flex items-center gap-1"
              initial={false}
              animate={{
                scale: deg > 0 ? 1 : 0.8,
                opacity: deg > 0 ? 1 : 0.5,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              <motion.span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: set.color }}
                animate={deg > 0.5 ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span className="text-xs text-slate-400">
                {set.name}: {(deg * 100).toFixed(0)}%
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
