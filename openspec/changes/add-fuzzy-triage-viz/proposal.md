# Add Fuzzy Logic Mental Health Triage Visualizer

## Why

Build a fully interactive, animated React + TypeScript + Vite single-page application that visually simulates a Fuzzy Logic-Based Mental Health Support Triage System. The app must implement the complete fuzzy logic pipeline from scratch in TypeScript (no Python dependencies), including fuzzification, fuzzy inference via Mamdani-style rules, and centroid defuzzification. All logic runs entirely in the browser in real time. The goal is for viewers to *see* fuzzy logic reasoning in real time through membership charts, rule activations, and animated output.

## What Changes

- Add new `fuzzy-triage-viz` application scaffolded with Vite `react-ts` template
- Implement pure TypeScript fuzzy logic engine (`trimf`, `trapmf`, universes, 16 Mamdani rules, centroid defuzzification)
- Add six antecedent membership charts (Recharts) with animated activation dots (framer-motion)
- Add output consequent chart with aggregated shape and crisp value reference line
- Add input sliders, rule activation panel, output panel, and test case presets
- Add fixed header with app title and mandatory safety disclaimer banner
- Add `useCountUp` hook for animated numeric transitions
- Configure Tailwind, Recharts, framer-motion, lucide-react

## Impact

- Affected specs: `fuzzy-engine`, `triage-visualizer`, `app-shell` (new capabilities)
- Affected code: New `fuzzy-triage-viz/` directory with full SPA
- Reference: `CaseStudy_Borillo, Brown.ipynb` for membership parameters, rules, and test cases
