## ADDED Requirements

### Requirement: Triangular Membership Function
The system SHALL provide a `trimf(x, a, b, c)` function that returns membership degree in [0, 1] for a triangular fuzzy set with vertices at (a,0), (b,1), (c,0). Values outside [a, c] SHALL return 0.

#### Scenario: Within range
- **WHEN** x is between a and c
- **THEN** membership is computed as (x-a)/(b-a) for x < b and (c-x)/(c-b) for x >= b

#### Scenario: Outside range
- **WHEN** x <= a or x >= c
- **THEN** membership is 0

### Requirement: Trapezoidal Membership Function
The system SHALL provide a `trapmf(x, a, b, c, d)` function that returns membership degree in [0, 1] for a trapezoidal fuzzy set with flat top between b and c. Values outside [a, d] SHALL return 0.

#### Scenario: On flat top
- **WHEN** x is between b and c
- **THEN** membership is 1

#### Scenario: On slopes
- **WHEN** x is between a and b
- **THEN** membership is (x-a)/(b-a)

### Requirement: Universes of Discourse
The system SHALL define typed universes for each variable with correct ranges and steps: Symptom Severity (0–27, step 1), Functional Impairment (0–10, step 0.1), Suicidal Risk (0–10, step 0.1), Symptom Duration (0–12, step 0.1), Social Support (0–10, step 0.1), Stress Load (0–10, step 0.1), Action Level (0–100, step 1).

#### Scenario: Universe generation
- **WHEN** a universe is generated
- **THEN** it is an array of numbers with the specified step over the range

### Requirement: Antecedent Membership Functions
The system SHALL define membership functions for all six antecedents per the notebook: Symptom Severity (Low/Moderate/High), Functional Impairment (Mild/Moderate/Severe), Suicidal Risk (None/Some/High), Symptom Duration (Short/Medium/Long), Social Support (Weak/Moderate/Strong), Stress Load (Low/Moderate/High) with exact trimf parameters from the reference.

#### Scenario: Symptom Severity
- **WHEN** computing membership for Symptom Severity
- **THEN** Low = trimf(x,0,4.5,9), Moderate = trimf(x,7,12,17), High = trimf(x,15,22,27)

### Requirement: Consequent Membership Functions
The system SHALL define membership functions for Action Level: Monitor & Self-care (trapmf 0,0,15,30), Schedule Counseling (trimf 20,37.5,55), Urgent Referral (trimf 45,62.5,80), Emergency Protocol (trapmf 75,90,100,100).

#### Scenario: Consequent sets
- **WHEN** computing membership for Action Level
- **THEN** each set uses the specified trimf or trapmf parameters

### Requirement: Mamdani Fuzzy Rules
The system SHALL implement all 16 rules from the notebook. Each rule SHALL compute firing strength as the minimum of all antecedent membership values (Mamdani AND). Rules SHALL be represented as objects with conditions and consequent set.

#### Scenario: Single-condition rule
- **WHEN** suicidalRisk['High'] fires
- **THEN** consequent is Emergency Protocol

#### Scenario: Multi-condition rule
- **WHEN** suicidalRisk['Some'] AND functionalImpairment['Severe'] both have membership
- **THEN** firing strength = min of the two membership values

### Requirement: Aggregation and Defuzzification
The system SHALL aggregate rule outputs by taking the maximum across all clipped consequent sets at each output point, and SHALL defuzzify using centroid: numerator = sum(x * aggregated[x]), denominator = sum(aggregated[x]); crisp = numerator/denominator.

#### Scenario: Centroid computation
- **WHEN** aggregated output is computed
- **THEN** crisp value is the weighted centroid over the output universe

### Requirement: Result Interpretation
The system SHALL interpret crisp output as: < 25 → Monitor & Self-Care; < 50 → Schedule Counseling; < 75 → Urgent Referral; >= 75 → Emergency Protocol.

#### Scenario: Threshold boundaries
- **WHEN** crisp is 24.9
- **THEN** decision is Monitor & Self-Care
