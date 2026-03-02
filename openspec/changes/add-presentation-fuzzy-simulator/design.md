# Design: Interactive Presentation-Style Fuzzy Logic Simulator

## Context

The project adds a second application alongside the existing fuzzy triage visualizer: a presentation-style simulator that walks users through the fuzzy logic pipeline one step at a time with animated transitions and explanatory text. The reference is the same Jupyter notebook (`CaseStudy_Borillo, Brown.ipynb`). The app runs entirely in the browser (no backend). It must feel like an educational slide deck with intrinsic animations (vertical input line, MIN/MAX for rules, centroid emergence, gauge needle).

## Goals / Non-Goals

- Goals: Step-by-step presentation flow; intrinsic animation of every computational step; explanation panel per step; test case presets; exact match to notebook outputs; runnable via `npm install` and `npm run dev`
- Non-Goals: Backend or persistence; clinical use; replacing the existing fuzzy-triage-viz app

## Decisions

### Project Location and Stack

- New app lives under `fuzzy-simulator/` at project root (not inside fuzzy-triage-viz).
- Stack: React 18+, TypeScript, Vite, TailwindCSS, Framer Motion, Recharts or D3.js, Zustand or React Context.

### Step-Based Presentation Model

- Seven discrete steps: (1) Crisp Input, (2) Fuzzification, (3) Rule Evaluation, (4) Consequent Activation, (5) Aggregation, (6) Defuzzification, (7) Final Output.
- Global step index drives which view and explanation are shown. Next/Previous advance or go back; Play runs through all steps with timed transitions; Reset returns to step 1 and optionally clears or restores initial inputs.

### Fuzzy Engine Reuse

- Implement the same fuzzy logic in TypeScript under `fuzzy-simulator/src/fuzzy/`: membershipFunctions.ts (trimf, trapmf), fuzzyRules.ts (16 rules from notebook), fuzzyEngine.ts (fuzzification, rule evaluation, aggregation, centroid defuzzification), types.ts.
- Single source of truth: notebook. No behavioral divergence.

### Animation Strategy

- Framer Motion for: numeric value transitions (AnimatedValue), graph highlights, vertical “crisp input” line, rule activation flow (e.g. signal into rule node), membership activation regions, centroid line emergence, gauge needle.
- Graphs (Recharts or D3): live curves, activated regions, reference lines; update when inputs or step change.

### Layout and UX

- Dark theme. Four-panel layout: Left = InputPanel (sliders), Center = main graph for current step, Right = StepExplanationPanel, Bottom = ActionLevelGauge (and final crisp output on step 7).
- PresentationController: toolbar or bar with Next Step, Previous Step, Play Full Simulation, Reset, Select Test Case.

### Test Cases

- Four presets from notebook: Case A (6,2,0,1,5,5) -> Monitor & Self-Care; Case B (14,5,1,5,5,5) -> Schedule Counseling; Case C (20,8,2,10,5,5) -> Urgent Referral; Case D (0,0,8,0,10,0) -> Emergency Protocol. Selecting a case loads inputs and allows running the full animated simulation.

## Risks / Trade-offs

- Two codebases (fuzzy-triage-viz and fuzzy-simulator) both implement the same engine; keep logic in sync with notebook to avoid drift.
- Play Full Simulation timing must be tuned so animations are readable without being slow.

## Migration Plan

N/A (greenfield app under new directory).

## Open Questions

None.
