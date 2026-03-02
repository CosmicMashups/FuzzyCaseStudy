# Design: Fuzzy Logic Mental Health Triage Visualizer

## Context

The project implements a browser-based educational simulator for a fuzzy logic triage system. The reference implementation is a Python Jupyter notebook (`CaseStudy_Borillo, Brown.ipynb`) using scikit-fuzzy. The new app must replicate the logic in pure TypeScript with no external fuzzy libraries. The UI must provide real-time visual feedback so users can observe fuzzification, rule firing, aggregation, and defuzzification as they adjust inputs.

## Goals / Non-Goals

- Goals: Full fuzzy pipeline in TypeScript; real-time updates (< 16ms); animated charts and rule bars; four preset test cases; mandatory safety disclaimer
- Non-Goals: Clinical use; diagnosis; medical advice; backend or persistence; Python integration

## Decisions

### Pure TypeScript Fuzzy Engine
Implement `trimf`, `trapmf`, universes, rules, and centroid defuzzification in `src/lib/fuzzyLogic.ts`. No scikit-fuzzy or other fuzzy libraries. All math is synchronous and pure.

### Universes and Steps
- Symptom Severity: 0–27, step 1 (PHQ-9 scale)
- Functional Impairment, Suicidal Risk, Social Support, Stress Load: 0–10, step 0.1
- Symptom Duration: 0–12, step 0.1 (weeks)
- Action Level (output): 0–100, step 1

### Mamdani Inference
- Rule firing strength = `Math.min(...)` of all antecedent membership values (AND = min)
- Aggregated output per point = `Math.max(...)` of all rule-clipped consequent values (union)
- Defuzzification = centroid (weighted average)

### UI Stack
- Vite + React + TypeScript
- Tailwind for layout and styling
- Recharts for LineChart (antecedents) and AreaChart (consequent)
- framer-motion for animations (dots, bars, gauge, reference line)
- lucide-react for icons if needed

### Safety Disclaimer
A fixed yellow warning banner MUST be displayed at the top of the app stating the system is for educational/demonstration purposes only and must NOT be used for clinical decisions.

## Risks / Trade-offs

- Rule count: Notebook has 16 rules; user prompt mentioned 17. Implement 16 rules per notebook.
- Test Case B: Notebook output is "Schedule Counseling" (49.25); user prompt labels it "Schedule to Urgent". Both are valid—the crisp value is near the 50 threshold.

## Migration Plan

N/A (greenfield project).

## Open Questions

None.
