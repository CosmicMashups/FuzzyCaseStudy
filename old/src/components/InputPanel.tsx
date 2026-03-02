import type { InputValues } from '../types'
import { getAntecedentConfigs } from '../lib/antecedentConfig'

interface InputPanelProps {
  values: InputValues
  onChange: (key: keyof InputValues, value: number) => void
}

export function InputPanel({ values, onChange }: InputPanelProps) {
  const configs = getAntecedentConfigs()

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">Inputs</h3>
      <div className="space-y-4">
        {configs.map((config) => (
          <div key={config.key}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-slate-300">{config.label}</span>
              <span className="font-mono text-white">
                {values[config.key]}
                {config.unit}
              </span>
            </div>
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={values[config.key]}
              onChange={(e) => onChange(config.key, parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-600 accent-emerald-500"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
