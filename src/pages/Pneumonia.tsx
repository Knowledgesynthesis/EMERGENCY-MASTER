import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Airplay, AlertCircle } from 'lucide-react';

interface PneumoniaCase {
  id: string;
  presentation: string;
  timing: string;
  riskFactors: string[];
  vitals: { temp: number; hr: number; rr: number; bp: string; spo2: number };
  classification: 'CAP' | 'HAP' | 'VAP';
  curbScore: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
}

export default function Pneumonia() {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const cases: PneumoniaCase[] = [
    {
      id: 'case1',
      presentation: 'Cough, fever, pleuritic chest pain, productive sputum',
      timing: 'Onset at home, no recent hospitalization',
      riskFactors: ['Age 68', 'COPD', 'Current smoker'],
      vitals: { temp: 38.9, hr: 95, rr: 22, bp: '128/78', spo2: 92 },
      classification: 'CAP',
      curbScore: 2,
      severity: 'Moderate',
    },
    {
      id: 'case2',
      presentation: 'New fever, increased purulent sputum, infiltrate on CXR',
      timing: 'Day 6 of hospitalization for CHF exacerbation',
      riskFactors: ['Recent admission', 'Aspiration risk', 'Age 75'],
      vitals: { temp: 39.2, hr: 108, rr: 24, bp: '110/65', spo2: 90 },
      classification: 'HAP',
      curbScore: 3,
      severity: 'Severe',
    },
    {
      id: 'case3',
      presentation: 'Worsening oxygenation, purulent secretions on suctioning',
      timing: 'Day 3 of mechanical ventilation (post-operative)',
      riskFactors: ['Intubated > 48 hours', 'ICU setting', 'Post-surgical'],
      vitals: { temp: 38.7, hr: 115, rr: 28, bp: '95/58', spo2: 88 },
      classification: 'VAP',
      curbScore: 4,
      severity: 'Severe',
    },
  ];

  const capVsHapDifferences = [
    {
      feature: 'Timing',
      cap: 'Acquired in community setting',
      hap: 'Onset ≥ 48 hours after hospital admission',
    },
    {
      feature: 'Common Pathogens',
      cap: 'S. pneumoniae, H. influenzae, atypicals (Mycoplasma, Legionella)',
      hap: 'MRSA, Pseudomonas, other resistant gram-negatives',
    },
    {
      feature: 'Risk Factors',
      cap: 'Age, smoking, COPD, immunosuppression',
      hap: 'Prolonged hospitalization, intubation, aspiration',
    },
    {
      feature: 'Severity Assessment',
      cap: 'CURB-65, PSI score',
      hap: 'Clinical criteria, ICU admission often needed',
    },
  ];

  const curbCriteria = [
    { item: 'Confusion (new onset)', present: 'C', points: 1 },
    { item: 'Urea > 7 mmol/L (BUN > 19 mg/dL)', present: 'U', points: 1 },
    { item: 'Respiratory rate ≥ 30/min', present: 'R', points: 1 },
    { item: 'Blood pressure: SBP < 90 or DBP ≤ 60', present: 'B', points: 1 },
    { item: 'Age ≥ 65 years', present: '65', points: 1 },
  ];

  const radiographicPatterns = [
    {
      pattern: 'Lobar Consolidation',
      description: 'Dense opacity in one or more lobes',
      typical: 'S. pneumoniae, Klebsiella',
    },
    {
      pattern: 'Interstitial/Patchy',
      description: 'Diffuse, bilateral infiltrates',
      typical: 'Atypical pathogens (Mycoplasma, viruses)',
    },
    {
      pattern: 'Cavitation',
      description: 'Air-filled cavity within consolidation',
      typical: 'Anaerobes (aspiration), Staph aureus, TB',
    },
    {
      pattern: 'Pleural Effusion',
      description: 'Parapneumonic fluid collection',
      typical: 'S. pneumoniae, complicated pneumonia',
    },
  ];

  const severeCapCriteria = [
    'Respiratory failure requiring intubation',
    'Septic shock requiring vasopressors',
    'Multilobar infiltrates',
    'Confusion/altered mental status',
    'Severe hypoxemia (PaO2/FiO2 < 250)',
    'Leukopenia (WBC < 4K)',
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-green-500/10 p-3">
            <Airplay className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Pneumonia</h1>
            <p className="text-muted-foreground">
              CAP vs HAP differentiation, severity scoring, and pattern recognition
            </p>
          </div>
        </div>
      </div>

      {/* CAP vs HAP Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>CAP vs HAP: Key Distinctions</CardTitle>
          <CardDescription>Understand the critical differences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Feature</th>
                  <th className="text-left p-3 font-semibold">CAP</th>
                  <th className="text-left p-3 font-semibold">HAP/VAP</th>
                </tr>
              </thead>
              <tbody>
                {capVsHapDifferences.map((row, idx) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="p-3 font-medium">{row.feature}</td>
                    <td className="p-3 text-muted-foreground">{row.cap}</td>
                    <td className="p-3 text-muted-foreground">{row.hap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Cases */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pneumonia Classification Tool</CardTitle>
          <CardDescription>Analyze timing and context to classify pneumonia type</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Case Selector */}
          <div className="mb-6 flex space-x-2">
            {cases.map((c, idx) => (
              <Button
                key={c.id}
                variant={selectedCase === idx ? 'default' : 'outline'}
                onClick={() => setSelectedCase(idx)}
              >
                Case {idx + 1}
              </Button>
            ))}
          </div>

          {/* Case Details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Badge
                variant={
                  currentCase.classification === 'CAP'
                    ? 'secondary'
                    : currentCase.severity === 'Severe'
                    ? 'destructive'
                    : 'warning'
                }
                className="text-base px-4 py-2"
              >
                {currentCase.classification}
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                {currentCase.severity} Severity
              </Badge>
              <div className="text-sm">
                <span className="font-medium">CURB-65:</span>{' '}
                <span className="text-lg font-bold text-primary">{currentCase.curbScore}</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-3">Clinical Presentation</h4>
                  <p className="text-sm text-muted-foreground mb-3">{currentCase.presentation}</p>
                  <div className="pt-3 border-t border-border">
                    <span className="font-medium text-sm">Timing:</span>
                    <p className="text-sm text-primary font-medium mt-1">{currentCase.timing}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-3">Risk Factors</h4>
                  <ul className="space-y-2">
                    {currentCase.riskFactors.map((factor, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-3">Vital Signs</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Temperature:</span>
                    <span className="font-medium">{currentCase.vitals.temp}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heart Rate:</span>
                    <span className="font-medium">{currentCase.vitals.hr} bpm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Respiratory Rate:</span>
                    <span className="font-medium">{currentCase.vitals.rr}/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Blood Pressure:</span>
                    <span className="font-medium">{currentCase.vitals.bp} mmHg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SpO2:</span>
                    <span className="font-medium">{currentCase.vitals.spo2}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CURB-65 Score */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>CURB-65 Severity Score (CAP)</CardTitle>
          <CardDescription>Risk stratification for community-acquired pneumonia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            {curbCriteria.map((criteria, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="font-mono">
                      {criteria.present}
                    </Badge>
                    <span className="text-sm">{criteria.item}</span>
                  </div>
                </div>
                <Badge variant="secondary">{criteria.points} pt</Badge>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
            <div>
              <strong>Score 0-1:</strong> Low risk - Consider outpatient treatment
            </div>
            <div>
              <strong>Score 2:</strong> Moderate risk - Consider short hospitalization or close outpatient follow-up
            </div>
            <div>
              <strong>Score 3-5:</strong> High risk - Hospitalize, consider ICU for score 4-5
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Radiographic Patterns */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Radiographic Patterns</CardTitle>
          <CardDescription>Chest X-ray findings and typical pathogens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {radiographicPatterns.map((pattern, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-2">{pattern.pattern}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="text-muted-foreground">{pattern.description}</p>
                  </div>
                  <div>
                    <span className="font-medium">Typical Pathogens:</span>
                    <p className="text-muted-foreground">{pattern.typical}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Severe CAP Criteria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span>Severe CAP Criteria</span>
          </CardTitle>
          <CardDescription>Features indicating ICU-level care</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {severeCapCriteria.map((criteria, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm p-3 rounded-lg border border-border">
                <div className="h-2 w-2 rounded-full bg-destructive flex-shrink-0" />
                <span>{criteria}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/50">
            <p className="text-sm">
              <strong>Major Criteria:</strong> Respiratory failure requiring mechanical ventilation or septic shock requiring vasopressors.
              Presence of either major criterion indicates severe CAP requiring ICU admission.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
