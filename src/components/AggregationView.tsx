import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'

interface AggregationViewProps {
  aggregatedOutput: number[]
}

const UNIVERSE = Array.from({ length: 101 }, (_, i) => i)

export function AggregationView({ aggregatedOutput }: AggregationViewProps) {
  const data = UNIVERSE.map((x, i) => ({ x, mu: aggregatedOutput[i] ?? 0 }))

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-200">Step 5: Aggregation</h3>
      <p className="text-sm text-slate-400">
        All clipped consequent sets are combined using MAX at each point to form a single aggregated fuzzy set.
      </p>
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
              stroke="#818cf8"
              fill="#818cf8"
              fillOpacity={0.6}
              strokeWidth={2}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
