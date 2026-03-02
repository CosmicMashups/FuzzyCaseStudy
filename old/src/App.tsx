import { useMemo, useState } from 'react'
import { computeFuzzyResult } from './lib/fuzzyLogic'
import { getAntecedentConfigs } from './lib/antecedentConfig'
import type { InputValues } from './types'
import { InputPanel } from './components/InputPanel'
import { MembershipChart } from './components/MembershipChart'
import { OutputChart } from './components/OutputChart'
import { OutputPanel } from './components/OutputPanel'
import { RuleActivationPanel } from './components/RuleActivationPanel'
import { TestCaseSelector } from './components/TestCaseSelector'

const INITIAL_VALUES: InputValues = {
  symptomSeverity: 6,
  functionalImpairment: 2,
  suicidalRisk: 0,
  symptomDuration: 1,
  socialSupport: 5,
  stressLoad: 5,
}

function App() {
  const [values, setValues] = useState<InputValues>(INITIAL_VALUES)

  const result = useMemo(() => computeFuzzyResult(values), [values])

  const antecedentConfigs = useMemo(() => getAntecedentConfigs(), [])

  const handleChange = (key: keyof InputValues, value: number) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleTestCaseSelect = (newValues: InputValues) => {
    setValues(newValues)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <header className="sticky top-0 z-10 border-b border-slate-700 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <h1 className="text-xl font-bold text-white">
            Fuzzy Logic Mental Health Triage Simulator
          </h1>
          <div className="mt-2 rounded-md bg-amber-500/20 px-4 py-2 text-sm text-amber-200">
            {`This application is strictly for educational and demonstration purposes only. It does NOT diagnose mental health conditions, replace clinical judgment, or provide medical advice. It must NOT be used to make treatment decisions. Always consult licensed mental health professionals.`}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <TestCaseSelector onSelect={handleTestCaseSelect} />
            <InputPanel values={values} onChange={handleChange} />
            <RuleActivationPanel ruleActivations={result.ruleActivations} />
          </div>

          <div className="space-y-6">
            {antecedentConfigs.map((config) => (
              <MembershipChart
                key={config.key}
                variable={config}
                currentValue={values[config.key]}
                memberships={result.memberships[config.key] ?? {}}
              />
            ))}
            <OutputChart
              aggregatedOutput={result.aggregatedOutput}
              crispOutput={result.crispOutput}
              ruleActivations={result.ruleActivations}
            />
            <OutputPanel crispOutput={result.crispOutput} decision={result.decision} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
