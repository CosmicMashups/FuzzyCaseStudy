## ADDED Requirements

### Requirement: Input Panel
The system SHALL render six labeled sliders (Symptom Severity 0–27 step 1, Functional Impairment 0–10 step 0.1, Suicidal Risk 0–10 step 0.1, Symptom Duration 0–12 step 0.1, Social Support 0–10 step 0.1, Stress Load 0–10 step 0.1) with current value displayed. Props: values, onChange.

#### Scenario: Slider interaction
- **WHEN** user moves a slider
- **THEN** onChange is called with the key and new value, and the UI updates

### Requirement: Membership Chart
The system SHALL render a Recharts LineChart for one antecedent showing all fuzzy sets as colored lines, a vertical red dashed ReferenceLine at the current input value, and animated colored dots (framer-motion) at the intersection of the reference line and each membership curve. Chart title SHALL show active fuzzy sets and their membership degrees.

#### Scenario: Chart display
- **WHEN** an antecedent and current value are provided
- **THEN** all membership curves and activation dots are visible

### Requirement: Output Chart
The system SHALL render an AreaChart for the Action Level consequent with all four output membership functions as filled areas, the aggregated output as a bold overlay line, and a vertical ReferenceLine at the defuzzified crisp value. The crisp line SHALL animate with framer-motion.

#### Scenario: Output visualization
- **WHEN** aggregated output and crisp value are provided
- **THEN** the chart shows membership areas, aggregated shape, and crisp marker

### Requirement: Rule Activation Panel
The system SHALL list all 16 rules with firing strength as a progress bar, sorted descending by strength. Inactive rules (strength 0) SHALL be visually dimmed. Bars SHALL animate with framer-motion. Color-code by consequent: Monitor & Self-care (green), Schedule Counseling (yellow/amber), Urgent Referral (orange), Emergency Protocol (red).

#### Scenario: Rule display
- **WHEN** rule activations are provided
- **THEN** rules are sorted by firing strength and color-coded by output set

### Requirement: Output Panel
The system SHALL display the crisp output number (large font, animated with useCountUp), the recommended action label in a color-coded badge, and a horizontal gauge (0–100) with gradient (green to red). Per-output-set contribution percentages MAY be shown.

#### Scenario: Output display
- **WHEN** crisp output and decision are available
- **THEN** number, label, and gauge are visible and animated

### Requirement: Test Case Selector
The system SHALL provide four preset buttons: Case A (Monitor & Self-Care), Case B (Schedule to Urgent), Case C (Urgent Referral), Case D (Emergency Protocol) with exact input values from the notebook. Clicking a preset SHALL load all six inputs and trigger recomputation.

#### Scenario: Preset load
- **WHEN** user clicks Case A
- **THEN** inputs are set to symptomSeverity:6, functionalImpairment:2, suicidalRisk:0, symptomDuration:1, socialSupport:5, stressLoad:5
