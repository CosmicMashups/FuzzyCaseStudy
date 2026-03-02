## ADDED Requirements

### Requirement: Presentation Controller
The system SHALL provide a PresentationController component with buttons or controls for: Next Step, Previous Step, Play Full Simulation, Reset, and Select Test Case. The simulation SHALL behave like a slide-based presentation where each step is a discrete stage with animated transitions.

#### Scenario: Next Step
- **WHEN** user clicks Next Step
- **THEN** the current step advances by one (up to the final step) and the view and explanation update

#### Scenario: Previous Step
- **WHEN** user clicks Previous Step
- **THEN** the current step decreases by one (down to step 1) and the view and explanation update

#### Scenario: Play Full Simulation
- **WHEN** user clicks Play Full Simulation
- **THEN** the simulation advances through all steps automatically with timed transitions until the final step

#### Scenario: Reset
- **WHEN** user clicks Reset
- **THEN** the current step returns to the first step; inputs MAY be cleared or retained per design

#### Scenario: Select Test Case
- **WHEN** user selects a predefined test case (e.g. A, B, C, D)
- **THEN** all six crisp inputs are set to the preset values from the notebook and the user can run or step through the simulation

### Requirement: Seven-Step Pipeline
The system SHALL implement exactly seven stages in order: (1) Crisp Input, (2) Fuzzification, (3) Rule Evaluation, (4) Consequent Activation, (5) Aggregation, (6) Defuzzification, (7) Final Output. Each stage SHALL have a dedicated view or visualization and SHALL be reachable by step navigation.

#### Scenario: Step visibility
- **WHEN** user is on step 2
- **THEN** the Fuzzification view and explanation for step 2 are shown

### Requirement: Crisp Input Stage
The system SHALL display sliders for Symptom Severity (0–27), Functional Impairment (0–10), Suicidal Risk (0–10), Symptom Duration (0–12), Social Support (0–10), and Stress Load (0–10). Numeric values SHALL animate smoothly when inputs change (e.g. via Framer Motion or AnimatedValue component).

#### Scenario: Slider and value display
- **WHEN** user moves a slider or loads a test case
- **THEN** the displayed numeric value transitions smoothly to the new value

### Requirement: Fuzzification Stage Visualization
The system SHALL display animated membership function graphs for each antecedent showing the fuzzy sets (e.g. Low, Moderate, High) as defined in the notebook. The system SHALL animate a vertical line rising from the x-axis at the crisp input value, SHALL highlight intersection points with each membership curve, and SHALL show computed membership degrees dynamically (e.g. "Moderate: 0.72, High: 0.18"). Activated regions on the graph SHALL be highlighted.

#### Scenario: Fuzzification display
- **WHEN** user is on the Fuzzification step with given crisp inputs
- **THEN** each antecedent graph shows membership curves, the crisp input line, intersection points, and membership degree labels

### Requirement: Rule Evaluation Stage Visualization
The system SHALL visually simulate rule activation for every rule from the notebook. For each rule the system SHALL show the rule activation strength calculation, SHALL animate AND operations as MIN (e.g. MIN(0.72, 0.65) = 0.65) and OR operations as MAX. The system SHALL highlight source membership functions, SHALL animate signal flow into the rule node, and SHALL animate output fuzzy set activation. Rules SHALL be presented in a logic-flow or diagram style (e.g. neural-network-like).

#### Scenario: Rule activation display
- **WHEN** user is on the Rule Evaluation step and a rule is active
- **THEN** the antecedent memberships and the MIN/MAX calculation are shown with animation

### Requirement: Consequent Activation Stage
The system SHALL display the Action Level membership graph with sets: Monitor & Self-care, Schedule Counseling, Urgent Referral, Emergency Protocol. The system SHALL animate clipping of output membership functions by rule activation strengths, SHALL highlight activated regions, and SHALL show stacking of multiple activated outputs.

#### Scenario: Consequent clipping
- **WHEN** user is on the Consequent Activation step
- **THEN** clipped consequent sets and activated regions are visible and animated

### Requirement: Aggregation Stage
The system SHALL animate the combination of all rule outputs using MAX aggregation. The graph SHALL visually show activated fuzzy sets merging into a single aggregated shape.

#### Scenario: Aggregation display
- **WHEN** user is on the Aggregation step
- **THEN** the merged aggregated fuzzy set is shown with animation

### Requirement: Defuzzification Stage
The system SHALL visually animate centroid calculation: the aggregated fuzzy region SHALL be filled or emphasized, the centroid balancing SHALL be animated, and a vertical centroid line SHALL emerge. The formula SHALL be displayed dynamically: Centroid = Σ(x * μ(x)) / Σ μ(x). The numeric computation SHALL be animated.

#### Scenario: Centroid display
- **WHEN** user is on the Defuzzification step
- **THEN** the centroid line and formula are shown and the numeric result is animated

### Requirement: Final Output Stage
The system SHALL display an Action Level gauge with ranges: 0–30 Monitor & Self-care, 20–55 Schedule Counseling, 45–80 Urgent Referral, 75–100 Emergency Protocol. The gauge needle SHALL animate to the final crisp value. The system SHALL display the crisp output number and the recommended action label (e.g. "Crisp Output: 52.4", "Recommended Action: Urgent Referral").

#### Scenario: Final output display
- **WHEN** user is on the Final Output step
- **THEN** the gauge needle moves to the crisp value and the crisp output and recommended action are shown

### Requirement: Step Explanation Panel
The system SHALL provide a StepExplanationPanel that displays explanation text dynamically for the current stage. The text SHALL describe what is happening mathematically (e.g. "Step 3: Evaluating Rule 7. The minimum of Moderate symptom severity (0.72) and Moderate impairment (0.65) produces activation strength 0.65.").

#### Scenario: Explanation per step
- **WHEN** the current step changes
- **THEN** the explanation panel updates to the text for that step

### Requirement: Animations
The system SHALL use Framer Motion to animate value transitions, graph highlights, signal propagation, membership activation, centroid emergence, and gauge movement. Animations SHALL be smooth and professional.

#### Scenario: Value animation
- **WHEN** a numeric value changes (e.g. crisp output or membership degree)
- **THEN** the change is reflected with a smooth transition rather than an instant jump

### Requirement: Live Animated Graphs
Each antecedent and consequent SHALL have live animated graphs that update in real time when inputs or step change. Graphs SHALL show membership curves, activated regions, and crisp input or output indicator as appropriate for the step.

#### Scenario: Graph update
- **WHEN** inputs change or the user advances to a new step
- **THEN** the visible graph updates to reflect the new state with animation

### Requirement: Test Case Presets
The system SHALL include predefined test cases from the notebook. Test case A SHALL use inputs (6, 2, 0, 1, 5, 5); B (14, 5, 1, 5, 5, 5); C (20, 8, 2, 10, 5, 5); D (0, 0, 8, 0, 10, 0). Selecting a test case SHALL load these inputs and allow the user to watch the full animated simulation. Simulation outputs SHALL match notebook results exactly.

#### Scenario: Test case A
- **WHEN** user selects Test Case A and runs through to Final Output
- **THEN** crisp output is approximately 12.67 and recommended action is Monitor & Self-Care

#### Scenario: Test case D
- **WHEN** user selects Test Case D and runs through to Final Output
- **THEN** crisp output is approximately 90.18 and recommended action is Emergency Protocol

### Requirement: Notebook as Source of Truth
The system SHALL use the reference Jupyter notebook (CaseStudy_Borillo, Brown.ipynb) as the single source of truth for membership function parameters, universes of discourse, fuzzy rules, defuzzification method, and test case input values. Outputs SHALL match the notebook exactly for the same inputs.

#### Scenario: Output match
- **WHEN** any test case or input set from the notebook is used
- **THEN** the defuzzified crisp value and recommended action match the notebook output
