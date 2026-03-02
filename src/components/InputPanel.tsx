import type { InputValues, InputKey } from '../fuzzy/types'
import { ANTECEDENT_LABELS, ANTECEDENT_CONFIG } from '../fuzzy/types'
import { AnimatedValue } from './AnimatedValue'

interface InputPanelProps {
  values: InputValues
  onChange: (key: InputKey, value: number) => void
}

export function InputPanel({ values, onChange }: InputPanelProps) {
  const keys = Object.keys(values) as InputKey[]
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Crisp inputs</h3>
      {keys.map((key) => {
        const config = ANTECEDENT_CONFIG[key]!
        const label = ANTECEDENT_LABELS[key]
        const value = values[key]
        return (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <label className="text-slate-300">{label}</label>
              <AnimatedValue value={value} decimals={key === 'symptomSeverity' ? 0 : 1} className="font-mono text-slate-200" />
            </div>
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={value}
              onChange={(e) => onChange(key, Number(e.target.value))}
              className="w-full accent-sky-500"
            />
          </div>
        )
      })}
    </div>
  )
}
