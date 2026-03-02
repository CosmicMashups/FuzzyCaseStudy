import { motion } from 'framer-motion'
import { AnimatedValue } from './AnimatedValue'

interface ActionLevelGaugeProps {
  crispOutput: number
  decision: string
}

const SEGMENTS = [
  { label: 'Monitor & Self-care', min: 0, max: 30, color: '#22c55e' },
  { label: 'Schedule Counseling', min: 20, max: 55, color: '#eab308' },
  { label: 'Urgent Referral', min: 45, max: 80, color: '#f97316' },
  { label: 'Emergency Protocol', min: 75, max: 100, color: '#ef4444' },
]

export function ActionLevelGauge({ crispOutput, decision }: ActionLevelGaugeProps) {
  const pct = Math.max(0, Math.min(100, crispOutput))

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-slate-500 text-sm">Crisp output:</span>
          <AnimatedValue value={crispOutput} decimals={2} className="text-lg font-mono font-semibold text-slate-200" />
        </div>
        <span className="rounded px-2 py-0.5 text-sm font-medium text-slate-900"
          style={{
            backgroundColor:
              SEGMENTS.find((s) => decision.includes(s.label.split(' ')[0] ?? ''))?.color ?? '#94a3b8',
          }}
        >
          {decision}
        </span>
      </div>
      <div className="relative h-6 w-full overflow-hidden rounded-full bg-slate-700">
        <div className="absolute inset-0 flex">
          {SEGMENTS.map((s) => (
            <div
              key={s.label}
              className="h-full flex-1 opacity-80"
              style={{
                backgroundColor: s.color,
                minWidth: `${(s.max - s.min) / 2}%`,
              }}
            />
          ))}
        </div>
        <motion.div
          className="absolute top-0 h-full w-1 bg-white shadow-lg"
          initial={false}
          animate={{ left: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          style={{ marginLeft: '-2px' }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  )
}
