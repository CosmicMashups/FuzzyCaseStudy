# Implementation Tasks

## 1. Project Setup
- [x] 1.1 Create `fuzzy-simulator/` with Vite react-ts template (index.html, package.json, vite.config.ts, tsconfig.json)
- [x] 1.2 Install dependencies: react 18+, typescript, tailwindcss, framer-motion, recharts (or d3), zustand (or use React Context), and dev deps (postcss, autoprefixer, @types/node)
- [x] 1.3 Configure Tailwind and ensure `npm install` and `npm run dev` run without error

## 2. Source Structure and Types
- [x] 2.1 Create src/main.tsx, App.tsx, styles/
- [x] 2.2 Create src/fuzzy/types.ts with crisp input types, membership types, rule types, and engine result types
- [x] 2.3 Create src/utils/math.ts for any shared math helpers

## 3. Fuzzy Engine
- [x] 3.1 Implement src/fuzzy/membershipFunctions.ts: trimf(x,a,b,c), trapmf(x,a,b,c,d) per notebook
- [x] 3.2 Implement src/fuzzy/fuzzyRules.ts: 16 Mamdani rules with exact antecedent/consequent labels and parameters from notebook
- [x] 3.3 Implement src/fuzzy/fuzzyEngine.ts: universes (Symptom Severity 0–27 step 1; others 0–10/0–12 step 0.1; Action Level 0–100 step 1), fuzzification, rule evaluation (MIN for AND), aggregation (MAX), centroid defuzzification, result interpretation (Monitor & Self-care / Schedule Counseling / Urgent Referral / Emergency Protocol)
- [x] 3.4 Verify all four notebook test cases produce matching crisp output and decision

## 4. State Management
- [x] 4.1 Implement global state for crisp inputs (six sliders), current step index (1–7), and optional “playing” flag (Zustand or React Context)
- [x] 4.2 Derive fuzzification, rule activations, aggregated output, crisp value, and decision from inputs (memoized)

## 5. Presentation Controller
- [x] 5.1 Implement PresentationController: Next Step, Previous Step, Play Full Simulation, Reset, Select Test Case (dropdown or buttons)
- [x] 5.2 Ensure step index wraps or clamps (e.g. 1–7); Play advances step with delay and stops at step 7; Reset sets step to 1

## 6. Input and Crisp Stage
- [x] 6.1 Implement InputPanel: six sliders (Symptom Severity 0–27, Functional Impairment 0–10, Suicidal Risk 0–10, Symptom Duration 0–12, Social Support 0–10, Stress Load 0–10) with labels and AnimatedValue for numeric display
- [x] 6.2 Animate value transitions when sliders or test case change (Framer Motion)

## 7. Fuzzification View
- [x] 7.1 Implement FuzzificationView: for each antecedent, show MembershipChart with membership curves (Low/Moderate/High etc. per notebook)
- [x] 7.2 Animate vertical line at crisp input value; highlight intersection points with each curve; show computed membership degrees (e.g. “Moderate: 0.72, High: 0.18”)
- [x] 7.3 Implement MembershipChart (reusable) with Recharts or D3: curves, reference line, activation dots/labels

## 8. Rule Evaluation View
- [x] 8.1 Implement RuleEvaluationView: list or diagram of all 16 rules; for selected/active rule show antecedent memberships and MIN(…) calculation with animation
- [x] 8.2 Animate “signal” from membership values into rule node and show activation strength; support AND as MIN, OR as MAX where applicable per notebook

## 9. Consequent Activation View
- [x] 9.1 Show Action Level membership graph (Monitor & Self-care, Schedule Counseling, Urgent Referral, Emergency Protocol) with trapmf/trimf from notebook
- [x] 9.2 Animate clipping of output membership functions by rule activation strengths; highlight activated regions; stack multiple activated outputs

## 10. Aggregation View
- [x] 10.1 Show combined output from all rules using MAX; animate merging of activated fuzzy sets into single aggregated shape

## 11. Defuzzification View
- [x] 11.1 Show aggregated region with centroid calculation; animate centroid line and formula: Centroid = Σ(x * μ(x)) / Σ μ(x); animate numeric computation

## 12. Final Output and Gauge
- [x] 12.1 Implement ActionLevelGauge: ranges 0–30 Monitor & Self-care, 20–55 Schedule Counseling, 45–80 Urgent Referral, 75–100 Emergency Protocol; animate needle to crisp value
- [x] 12.2 Display “Crisp Output: X.X” and “Recommended Action: Y” with AnimatedValue for number

## 13. Step Explanation Panel
- [x] 13.1 Implement StepExplanationPanel: dynamic text per step (1–7) describing what is happening mathematically (e.g. “Step 3: Evaluating Rule 7. MIN(0.72, 0.65) = 0.65.”)

## 14. App Shell and Layout
- [x] 14.1 App.tsx: left panel (inputs), center (step-dependent graph/view), right (StepExplanationPanel), bottom (gauge + final output on step 7)
- [x] 14.2 Dark theme; professional academic style; optional safety disclaimer banner for educational use

## 15. Test Cases and Validation
- [x] 15.1 Wire Select Test Case to preset inputs (A: 6,2,0,1,5,5; B: 14,5,1,5,5,5; C: 20,8,2,10,5,5; D: 0,0,8,0,10,0)
- [x] 15.2 Confirm crisp output and recommended action match notebook for each case (e.g. A: ~12.67 Monitor & Self-Care; B: ~49.25 Schedule Counseling; C: ~71.77 Urgent Referral; D: ~90.18 Emergency Protocol)

## 16. Code Quality and Deliverable
- [x] 16.1 Full TypeScript typing; modular components; no placeholder or pseudocode; build passes with zero errors
- [x] 16.2 README or inline note for running: `npm install`, `npm run dev`
