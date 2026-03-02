# Add Interactive Presentation-Style Fuzzy Logic Computation Simulator

## Why

Create a fully functional, presentation-style interactive web application that simulates the fuzzy logic computation process step by step for educational use in classroom, thesis defense, or presentation settings. The application must visually demonstrate and animate every intrinsic computational step from crisp input through fuzzification, rule evaluation, aggregation, and defuzzification to the final Action Level output, using the exact fuzzy logic implementation from the reference Jupyter notebook.

## What Changes

- Add new `fuzzy-simulator/` application (React 18+, TypeScript, Vite) with strict project structure under project root
- Implement presentation controller with Next Step, Previous Step, Play Full Simulation, Reset, and Select Test Case
- Implement seven animated stages: Crisp Input, Fuzzification, Rule Evaluation, Consequent Activation, Aggregation, Defuzzification, Final Output
- Implement fuzzy engine in TypeScript (trimf, trapmf, 16 Mamdani rules, centroid defuzzification) matching notebook exactly
- Add components: PresentationController, InputPanel, MembershipChart, FuzzificationView, RuleEvaluationView, AggregationView, DefuzzificationView, ActionLevelGauge, StepExplanationPanel, AnimatedValue
- Add step explanation panel with dynamic text per stage describing the mathematics
- Add predefined test cases from notebook (A–D) with exact input values and expected outputs
- Use Framer Motion for value transitions, graph highlights, signal propagation, membership activation, centroid emergence, gauge movement
- Use Recharts or D3.js for live animated membership and output graphs
- Use Zustand or React Context for state management; no backend
- Dark theme, professional academic layout: left (inputs), center (graphs), right (explanation), bottom (gauge)
- Ensure simulation outputs match notebook exactly; fully typed TypeScript, modular, no placeholder code

## Impact

- Affected specs: `presentation-simulator`, `fuzzy-engine`, `app-shell` (new capabilities)
- Affected code: New `fuzzy-simulator/` directory with complete SPA
- Reference: `CaseStudy_Borillo, Brown.ipynb` for membership parameters, universes, rules, defuzzification, and test cases
