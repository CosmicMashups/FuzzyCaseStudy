## ADDED Requirements

### Requirement: Project Scaffolding
The system SHALL provide a runnable application under `fuzzy-simulator/` with index.html, package.json, vite.config.ts, tsconfig.json, and src/main.tsx and App.tsx. The app SHALL start with `npm install` followed by `npm run dev` with zero additional configuration. Dependencies SHALL include React 18+, TypeScript, Vite, TailwindCSS, Framer Motion, Recharts or D3.js, and Zustand or React Context; no backend.

#### Scenario: Dev server
- **WHEN** user runs npm install and npm run dev from fuzzy-simulator/
- **THEN** the app starts without errors

### Requirement: Application Layout
The system SHALL lay out the page in a four-panel structure: left panel for inputs (InputPanel), center panel for the current step visualization (graph/view), right panel for StepExplanationPanel, and bottom panel for ActionLevelGauge and final output. Layout SHALL be clean and suitable for academic presentation.

#### Scenario: Panel visibility
- **WHEN** the app is displayed
- **THEN** all four panel areas are present and identifiable

### Requirement: Dark Theme and Style
The system SHALL use a dark theme and professional academic presentation style. Styling SHALL be implemented with TailwindCSS.

#### Scenario: Theme
- **WHEN** the app is loaded
- **THEN** the overall appearance is dark and professional

### Requirement: TypeScript and Code Quality
The system SHALL be fully typed with TypeScript with no placeholder code or pseudocode. Code SHALL be modular and follow a clean architecture. The project SHALL build successfully with zero TypeScript errors.

#### Scenario: Build
- **WHEN** user runs npm run build in fuzzy-simulator/
- **THEN** the build completes with no errors

### Requirement: Mandatory Project Structure
The system SHALL include under fuzzy-simulator/src: main.tsx, App.tsx, styles/, components/ (PresentationController, InputPanel, MembershipChart, FuzzificationView, RuleEvaluationView, AggregationView, DefuzzificationView, ActionLevelGauge, StepExplanationPanel, AnimatedValue), fuzzy/ (membershipFunctions.ts, fuzzyRules.ts, fuzzyEngine.ts, types.ts), and utils/math.ts.

#### Scenario: Structure
- **WHEN** the repository is inspected
- **THEN** the listed files and directories exist under fuzzy-simulator/
