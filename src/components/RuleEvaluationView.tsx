import { motion } from 'framer-motion'
import { RULE_DESCRIPTIONS } from '../fuzzy/fuzzyRules'
import type { RuleActivation } from '../fuzzy/types'

interface RuleEvaluationViewProps {
  ruleActivations: RuleActivation[]
}

export function RuleEvaluationView({ ruleActivations }: RuleEvaluationViewProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-200">Step 3: Rule evaluation</h3>
      <p className="text-sm text-slate-400">
        Each rule computes activation strength as MIN of antecedent memberships (Mamdani AND). Rules are sorted by strength.
      </p>
      <div className="max-h-96 space-y-2 overflow-y-auto">
        {ruleActivations.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`rounded-lg border p-2 ${
              r.firingStrength > 0
                ? 'border-slate-600 bg-slate-800/80'
                : 'border-slate-700/50 bg-slate-800/40 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-500">Rule {r.id}</span>
              <span
                className="text-xs font-medium"
                style={{ color: r.consequentColor }}
              >
                {r.consequentSet}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{RULE_DESCRIPTIONS[r.id - 1]}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-700">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: r.consequentColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${r.firingStrength * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="font-mono text-xs text-slate-300">
                {r.firingStrength.toFixed(2)}
              </span>
            </div>
            {r.antecedentValues && r.antecedentValues.length > 0 && r.firingStrength > 0 && (
              <p className="mt-1 text-xs text-slate-500">
                MIN({r.antecedentValues.map((v) => v.toFixed(2)).join(', ')}) = {r.firingStrength.toFixed(2)}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
