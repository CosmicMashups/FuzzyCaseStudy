import { motion } from 'framer-motion'
import type { RuleActivation } from '../types'

interface RuleActivationPanelProps {
  ruleActivations: RuleActivation[]
}

export function RuleActivationPanel({ ruleActivations }: RuleActivationPanelProps) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">Rule Activations</h3>
      <div className="max-h-64 space-y-2 overflow-y-auto">
        {ruleActivations.map((rule) => (
          <div
            key={rule.id}
            className={`rounded p-2 ${rule.firingStrength === 0 ? 'opacity-40' : ''}`}
          >
            <div className="mb-1 flex justify-between text-xs">
              <span className="truncate text-slate-400" title={rule.description}>
                Rule {rule.id}
              </span>
              <span
                className="font-mono"
                style={{ color: rule.consequentColor }}
              >
                {rule.consequentSet}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded bg-slate-700">
              <motion.div
                className="h-full rounded"
                style={{ backgroundColor: rule.consequentColor }}
                initial={false}
                animate={{ width: `${rule.firingStrength * 100}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
