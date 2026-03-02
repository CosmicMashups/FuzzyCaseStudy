import { useMemo } from 'react'
import { PresentationController } from './components/PresentationController'
import { InputPanel } from './components/InputPanel'
import { FuzzificationView } from './components/FuzzificationView'
import { RuleEvaluationView } from './components/RuleEvaluationView'
import { ConsequentActivationView } from './components/ConsequentActivationView'
import { AggregationView } from './components/AggregationView'
import { DefuzzificationView } from './components/DefuzzificationView'
import { ActionLevelGauge } from './components/ActionLevelGauge'
import { StepExplanationPanel } from './components/StepExplanationPanel'
import { useSimulatorStore } from './store/useSimulatorStore'
import { computeFuzzyResult } from './fuzzy/fuzzyEngine'

function StepContent() {
  const step = useSimulatorStore((s) => s.step)
  const inputs = useSimulatorStore((s) => s.inputs)
  const result = useMemo(() => computeFuzzyResult(inputs), [inputs])

  switch (step) {
    case 1:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-200">Step 1: Crisp input</h3>
          <p className="text-sm text-slate-400">
            Set the six input values using the sliders in the left panel. These crisp numbers will be fuzzified in the next step.
          </p>
          <div className="rounded-lg bg-slate-800/60 p-4 font-mono text-sm text-slate-300">
            <p>Symptom Severity: {inputs.symptomSeverity}</p>
            <p>Functional Impairment: {inputs.functionalImpairment}</p>
            <p>Suicidal Risk: {inputs.suicidalRisk}</p>
            <p>Symptom Duration: {inputs.symptomDuration}</p>
            <p>Social Support: {inputs.socialSupport}</p>
            <p>Stress Load: {inputs.stressLoad}</p>
          </div>
        </div>
      )
    case 2:
      return (
        <FuzzificationView
          inputs={inputs}
          memberships={result.memberships}
        />
      )
    case 3:
      return <RuleEvaluationView ruleActivations={result.ruleActivations} />
    case 4:
      return <ConsequentActivationView ruleActivations={result.ruleActivations} />
    case 5:
      return <AggregationView aggregatedOutput={result.aggregatedOutput} />
    case 6:
      return (
        <DefuzzificationView
          aggregatedOutput={result.aggregatedOutput}
          crispOutput={result.crispOutput}
        />
      )
    case 7:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-200">Step 7: Final output</h3>
          <p className="text-sm text-slate-400">
            The defuzzified Action Level and recommended action are shown below in the gauge panel.
          </p>
          <ActionLevelGauge crispOutput={result.crispOutput} decision={result.decision} />
        </div>
      )
    default:
      return null
  }
}

export default function App() {
  const inputs = useSimulatorStore((s) => s.inputs)
  const setInputs = useSimulatorStore((s) => s.setInputs)
  const step = useSimulatorStore((s) => s.step)
  const result = useMemo(() => computeFuzzyResult(inputs), [inputs])

  const setInput = (key: keyof typeof inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-800/90 px-4 py-3">
        <h1 className="text-xl font-bold text-slate-100">
          Fuzzy Logic Computation Simulator
        </h1>
        <p className="mt-1 text-xs text-amber-200/90">
          Educational use only. Not for clinical decisions. Do not use for diagnosis or treatment.
        </p>
      </header>

      <div className="border-b border-slate-700 px-4 py-2">
        <PresentationController />
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="rounded-lg bg-slate-800/80 p-4">
            <InputPanel values={inputs} onChange={setInput} />
          </div>
        </aside>

        <main className="min-h-[400px] rounded-lg bg-slate-800/60 p-4 lg:col-span-6">
          <StepContent />
        </main>

        <aside className="lg:col-span-3">
          <StepExplanationPanel />
        </aside>
      </div>

      <footer className="border-t border-slate-700 bg-slate-800/80 px-4 py-3">
        <div className="mx-auto max-w-4xl">
          <ActionLevelGauge crispOutput={result.crispOutput} decision={result.decision} />
          {step === 7 && (
            <p className="mt-2 text-sm text-slate-500">
              Recommended action: {result.decision}
            </p>
          )}
        </div>
      </footer>
    </div>
  )
}
