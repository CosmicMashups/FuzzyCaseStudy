import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'

const DECISION_COLORS: Record<string, string> = {
  'Monitor & Self-Care': '#22c55e',
  'Schedule Counseling': '#eab308',
  'Urgent Referral': '#f97316',
  'Emergency Protocol': '#ef4444',
}

interface OutputPanelProps {
  crispOutput: number
  decision: string
}

export function OutputPanel({ crispOutput, decision }: OutputPanelProps) {
  const animatedValue = useCountUp(crispOutput)
  const color = DECISION_COLORS[decision] ?? '#94a3b8'

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Output</h3>
      <div className="mb-4 flex items-baseline gap-2">
        <motion.span
          key={crispOutput}
          className="text-4xl font-bold tabular-nums"
          style={{ color }}
        >
          {animatedValue.toFixed(1)}
        </motion.span>
        <span className="text-slate-400">/ 100</span>
      </div>
      <div
        className="mb-4 inline-block rounded-full px-4 py-2 text-sm font-medium text-white"
        style={{ backgroundColor: color }}
      >
        {decision}
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-700">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444)',
          }}
          initial={false}
          animate={{ width: `${crispOutput}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        />
      </div>
    </div>
  )
}
