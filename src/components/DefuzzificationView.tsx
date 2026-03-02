import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { motion } from 'framer-motion'

interface DefuzzificationViewProps {
  aggregatedOutput: number[]
  crispOutput: number
}

const UNIVERSE = Array.from({ length: 101 }, (_, i) => i)

export function DefuzzificationView({ aggregatedOutput, crispOutput }: DefuzzificationViewProps) {
  const data = UNIVERSE.map((x, i) => ({ x, mu: aggregatedOutput[i] ?? 0 }))
  const numerator = UNIVERSE.reduce((s, x, i) => s + x * (aggregatedOutput[i] ?? 0), 0)
  const denominator = aggregatedOutput.reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-200">Step 6: Defuzzification (centroid)</h3>
      <p className="text-sm text-slate-400">
        The crisp output is the centroid of the aggregated set: weighted average of x by membership.
      </p>
      <div className="rounded bg-slate-800/60 p-3 font-mono text-sm text-slate-400">
        Centroid = &Sigma;(x &middot; &mu;(x)) / &Sigma; &mu;(x) = {numerator.toFixed(1)} / {denominator.toFixed(1)} = {crispOutput.toFixed(2)}
      </div>
      <motion.div
        className="h-72 w-full"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="x" type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
            <YAxis type="number" domain={[0, 1]} stroke="#94a3b8" fontSize={11} width={28} />
            <Area
              dataKey="mu"
              type="monotone"
              stroke="#a78bfa"
              fill="#a78bfa"
              fillOpacity={0.5}
              strokeWidth={2}
            />
            <ReferenceLine
              x={crispOutput}
              stroke="#f43f5e"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{ value: 'Centroid', fill: '#f43f5e', fontSize: 12 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
