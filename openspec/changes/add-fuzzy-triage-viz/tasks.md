# Implementation Tasks

## 1. Project Setup
- [x] 1.1 Create Vite app: `npm create vite@latest fuzzy-triage-viz -- --template react-ts`
- [x] 1.2 Install dependencies: recharts, framer-motion, lucide-react; tailwindcss, postcss, autoprefixer, @types/node
- [x] 1.3 Configure Tailwind (content, index.css)
- [x] 1.4 Ensure tsconfig.json has strict, jsx, moduleResolution, allowImportingTsExtensions

## 2. Type Definitions
- [x] 2.1 Create src/types/index.ts with InputValues, MembershipSet, AntecedentConfig, RuleActivation, FuzzyResult

## 3. Fuzzy Logic Engine
- [x] 3.1 Implement trimf and trapmf in src/lib/fuzzyLogic.ts
- [x] 3.2 Define universes and antecedent membership functions
- [x] 3.3 Define consequent membership functions
- [x] 3.4 Implement 16 Mamdani rules with firing strength (min)
- [x] 3.5 Implement aggregation (max) and centroid defuzzification
- [x] 3.6 Implement interpretResult
- [x] 3.7 Add JSDoc for all exported functions

## 4. Hooks
- [x] 4.1 Create useCountUp hook with requestAnimationFrame

## 5. Components
- [x] 5.1 InputPanel: six sliders with labels and values
- [x] 5.2 MembershipChart: Recharts LineChart, ReferenceLine, framer-motion dots
- [x] 5.3 OutputChart: AreaChart, aggregated overlay, crisp ReferenceLine
- [x] 5.4 RuleActivationPanel: 16 rules, progress bars, color-coding, framer-motion
- [x] 5.5 OutputPanel: crisp number, badge, gauge, useCountUp
- [x] 5.6 TestCaseSelector: four preset buttons with exact input values

## 6. App Integration
- [x] 6.1 App.tsx: state (InputValues), useMemo for FuzzyResult
- [x] 6.2 Layout: header, safety disclaimer, two-column grid
- [x] 6.3 Wire all components with props
- [x] 6.4 Apply dark theme (slate-900, slate-800) and output colors (green/yellow/orange/red)

## 7. Validation
- [x] 7.1 Run npm run build with zero TypeScript errors
- [x] 7.2 Verify all four test cases produce expected decisions
- [x] 7.3 Verify real-time updates on slider change
