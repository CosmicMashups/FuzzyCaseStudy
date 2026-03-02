## ADDED Requirements

### Requirement: Project Scaffolding
The system SHALL use Vite with react-ts template. The app SHALL start with `npm run dev` with zero additional configuration. Dependencies: recharts, framer-motion, lucide-react; dev: tailwindcss, postcss, autoprefixer, @types/node.

#### Scenario: Dev server
- **WHEN** user runs npm run dev
- **THEN** the app starts without errors

### Requirement: Safety Disclaimer
The system SHALL display a fixed yellow warning banner stating: "This application is strictly for educational and demonstration purposes only. It does NOT diagnose mental health conditions, replace clinical judgment, or provide medical advice. It must NOT be used to make treatment decisions. Always consult licensed mental health professionals."

#### Scenario: Disclaimer visibility
- **WHEN** the app is loaded
- **THEN** the safety disclaimer is visible in the header area

### Requirement: App Layout
The system SHALL lay out the page in a two-column grid on desktop (lg:grid-cols-2), single column on mobile. Left column: TestCaseSelector, InputPanel, RuleActivationPanel. Right column: six MembershipChart instances, OutputChart, OutputPanel. A fixed header SHALL show the app title "Fuzzy Logic Mental Health Triage Simulator".

#### Scenario: Responsive layout
- **WHEN** viewport is large
- **THEN** two-column layout is used

### Requirement: State and Computation
The system SHALL manage InputValues state and compute FuzzyResult (memberships, rule activations, aggregated output, crisp value, decision) via useMemo whenever inputs change. All updates SHALL complete synchronously in under 16ms (single render frame).

#### Scenario: Real-time update
- **WHEN** any slider value changes
- **THEN** all charts, bars, gauges, and labels update in one render

### Requirement: Type Definitions
The system SHALL define InputValues, MembershipSet, AntecedentConfig, RuleActivation, and FuzzyResult in src/types/index.ts with full TypeScript types and no any.

#### Scenario: Type safety
- **WHEN** components consume props
- **THEN** all types are explicitly defined

### Requirement: Animated Counter Hook
The system SHALL provide a useCountUp hook that smoothly transitions a displayed number to a new value over approximately 400ms using requestAnimationFrame.

#### Scenario: Number transition
- **WHEN** crisp output changes from 50 to 63
- **THEN** the displayed number animates from 50 to 63 over ~400ms
