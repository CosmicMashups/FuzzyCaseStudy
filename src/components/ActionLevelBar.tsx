import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { getOutputMembershipDegrees } from '../fuzzy/getOutputMembershipDegrees'
import { AnimatedValue } from './AnimatedValue'

const ACTION_LEVEL_CONFIG = [
  { key: 'monitor' as const, label: 'Monitor & Self-care', left: 0, right: 30, color: '#22c55e' },
  { key: 'counseling' as const, label: 'Schedule Counseling', left: 20, right: 55, color: '#3b82f6' },
  { key: 'urgent' as const, label: 'Urgent Referral', left: 45, right: 80, color: '#f97316' },
  { key: 'emergency' as const, label: 'Emergency Protocol', left: 75, right: 100, color: '#ef4444' },
] as const

interface ActionLevelBarProps {
  crispOutput: number
}

export function ActionLevelBar({ crispOutput }: ActionLevelBarProps) {
  const degrees = getOutputMembershipDegrees(crispOutput)
  const [showExplanation, setShowExplanation] = useState(false)

  const activeLevels = ACTION_LEVEL_CONFIG.map((config) => ({
    ...config,
    degree: degrees[config.key],
  }))
    .filter((l) => l.degree > 0)
    .sort((a, b) => b.degree - a.degree)

  const pct = Math.max(0, Math.min(100, crispOutput))

  return (
    <div className="space-y-3">
      {/* Top: Crisp output value */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-500">Crisp Output:</span>
        <AnimatedValue value={crispOutput} decimals={2} className="font-mono text-lg font-semibold text-slate-200" />
        <button
          type="button"
          onClick={() => setShowExplanation((s) => !s)}
          className="rounded border border-slate-600 bg-slate-700/80 px-2 py-0.5 text-xs text-slate-400 hover:bg-slate-600/80 hover:text-slate-300"
          aria-expanded={showExplanation}
        >
          {showExplanation ? 'Hide explanation' : 'Why multiple levels?'}
        </button>
      </div>

      {showExplanation && (
        <AnimatePresence>
          <motion.div
            key="explanation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded bg-slate-800/80 p-3 text-sm text-slate-400"
          >
            This output belongs partially to multiple action levels due to overlapping fuzzy membership
            functions. The bar and list below show each level&apos;s activation strength at this crisp value.
          </motion.div>
        </AnimatePresence>
      )}

      {/* Center: Horizontal bar with overlapping regions */}
      <div className="relative h-10 w-full overflow-hidden rounded-lg bg-slate-800">
        {/* Layered regions: each set's support with opacity = membership at crisp */}
        {ACTION_LEVEL_CONFIG.map((config) => {
          const mu = degrees[config.key]
          if (mu <= 0) return null
          return (
            <motion.div
              key={config.key}
              className="absolute top-0 h-full mix-blend-screen"
              initial={{ opacity: 0, scaleX: 0.98 }}
              animate={{
                opacity: 0.4 + mu * 0.6,
                scaleX: 1,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 24 }}
              style={{
                left: `${config.left}%`,
                width: `${config.right - config.left}%`,
                backgroundColor: config.color,
                transformOrigin: 'left',
              }}
            />
          )
        })}
        {/* Crisp output indicator */}
        <motion.div
          className="absolute top-0 z-10 h-full w-1 bg-white shadow-lg"
          initial={false}
          animate={{ left: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 90, damping: 22 }}
          style={{ marginLeft: '-2px' }}
          aria-hidden
        />
      </div>

      <div className="flex justify-between text-xs text-slate-500">
        <span>0</span>
        <span>100</span>
      </div>

      {/* Bottom: Overlapping action levels */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-slate-400">Overlapping Action Levels:</p>
        <AnimatePresence mode="popLayout">
          {activeLevels.length > 0 ? (
            <ul className="space-y-1">
              {activeLevels.map((level, i) => (
                <motion.li
                  key={level.key}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: level.color }}
                  />
                  <span className="text-slate-300">
                    {level.label} ({Math.round(level.degree * 100)}%)
                  </span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-slate-500"
            >
              No action level active at this crisp value.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
