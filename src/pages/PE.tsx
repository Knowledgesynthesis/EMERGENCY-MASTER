import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Wind, AlertCircle } from 'lucide-react';

interface PECase {
  id: string;
  presentation: string;
  riskFactors: string[];
  wellsScore: number;
  percCriteria: { met: boolean; reason?: string }[];
  dDimer: string;
  recommendation: string;
  severity: 'Massive' | 'Submassive' | 'Low Risk';
}

export default function PE() {
  const [selectedCase, setSelectedCase] = useState<number>(0);
  const [calculatorValues, setCalculatorValues] = useState({
    clinicalSigns: false,
    alternativeLess: false,
    heartRate: false,
    immobilization: false,
    previousPE: false,
    hemoptysis: false,
    malignancy: false,
  });

  const cases: PECase[] = [
    {
      id: 'case1',
      presentation: 'Sudden dyspnea, pleuritic chest pain, tachycardia',
      riskFactors: ['Recent surgery (hip replacement 2 weeks ago)', 'Age 72'],
      wellsScore: 7.5,
      percCriteria: [{ met: false }],
      dDimer: 'Not indicated - High pretest probability',
      recommendation: 'Proceed directly to CTPA',
      severity: 'Submassive',
    },
    {
      id: 'case2',
      presentation: 'Chest pain, mild dyspnea, no hemodynamic instability',
      riskFactors: ['Oral contraceptive use', 'Recent long flight'],
      wellsScore: 3.0,
      percCriteria: [{ met: true }],
      dDimer: 'Elevated (850 ng/mL)',
      recommendation: 'D-dimer elevated - proceed to CTPA',
      severity: 'Low Risk',
    },
    {
      id: 'case3',
      presentation: 'Hypotension, severe dyspnea, syncope',
      riskFactors: ['Active cancer', 'Recent chemotherapy'],
      wellsScore: 8.5,
      percCriteria: [{ met: false }],
      dDimer: 'Not indicated - Massive PE suspected',
      recommendation: 'CTPA + assess for thrombolysis candidacy',
      severity: 'Massive',
    },
  ];

  const wellsCriteria = [
    { item: 'Clinical signs of DVT', points: 3.0 },
    { item: 'PE most likely diagnosis (or equally likely)', points: 3.0 },
    { item: 'Heart rate > 100', points: 1.5 },
    { item: 'Immobilization ≥ 3 days or surgery in past 4 weeks', points: 1.5 },
    { item: 'Previous PE or DVT', points: 1.5 },
    { item: 'Hemoptysis', points: 1.0 },
    { item: 'Malignancy', points: 1.0 },
  ];

  const percRule = [
    'Age < 50',
    'Heart rate < 100',
    'SpO2 ≥ 95%',
    'No hemoptysis',
    'No estrogen use',
    'No prior VTE',
    'No unilateral leg swelling',
    'No surgery/trauma in past 4 weeks',
  ];

  const imagingDecisions = [
    {
      scenario: 'Low Wells Score (< 2) + PERC negative',
      action: 'PE ruled out - No further testing needed',
    },
    {
      scenario: 'Low/Moderate Wells (< 4) + PERC positive',
      action: 'Check D-dimer. If negative, PE unlikely',
    },
    {
      scenario: 'High Wells Score (> 4)',
      action: 'Proceed directly to CTPA (skip D-dimer)',
    },
    {
      scenario: 'Elevated D-dimer',
      action: 'Proceed to CTPA for definitive imaging',
    },
  ];

  const massiveVsSubmassive = [
    {
      category: 'Massive PE',
      definition: 'Sustained hypotension (SBP < 90) or requiring pressors',
      implications: 'Consider thrombolysis - high mortality risk',
    },
    {
      category: 'Submassive PE',
      definition: 'Hemodynamically stable but RV dysfunction or elevated biomarkers',
      implications: 'Intermediate risk - close monitoring, consider interventions',
    },
    {
      category: 'Low-Risk PE',
      definition: 'Stable vitals, no RV strain, normal biomarkers',
      implications: 'Anticoagulation, may be candidate for early discharge',
    },
  ];

  const currentCase = cases[selectedCase];

  const calculateWells = () => {
    let score = 0;
    if (calculatorValues.clinicalSigns) score += 3.0;
    if (calculatorValues.alternativeLess) score += 3.0;
    if (calculatorValues.heartRate) score += 1.5;
    if (calculatorValues.immobilization) score += 1.5;
    if (calculatorValues.previousPE) score += 1.5;
    if (calculatorValues.hemoptysis) score += 1.0;
    if (calculatorValues.malignancy) score += 1.0;
    return score;
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-cyan-500/10 p-3">
            <Wind className="h-8 w-8 text-cyan-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Pulmonary Embolism</h1>
            <p className="text-muted-foreground">
              Risk stratification, PERC rule, and diagnostic pathways
            </p>
          </div>
        </div>
      </div>

      {/* Wells Score Calculator */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Wells Score Calculator</CardTitle>
          <CardDescription>Calculate pretest probability for PE</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            {wellsCriteria.map((criteria, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <label className="flex items-center space-x-3 flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={Object.values(calculatorValues)[idx]}
                    onChange={(e) => {
                      const keys = Object.keys(calculatorValues);
                      setCalculatorValues({
                        ...calculatorValues,
                        [keys[idx]]: e.target.checked,
                      });
                    }}
                  />
                  <span className="text-sm">{criteria.item}</span>
                </label>
                <Badge variant="outline">{criteria.points} pts</Badge>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-primary/10 border border-primary/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Total Wells Score:</span>
              <span className="text-2xl font-bold text-primary">{calculateWells().toFixed(1)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {calculateWells() < 2 && '< 2: Low probability'}
              {calculateWells() >= 2 && calculateWells() < 6 && '2-6: Moderate probability'}
              {calculateWells() >= 6 && '> 6: High probability'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PE Cases */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>PE Risk Assessment Cases</CardTitle>
          <CardDescription>Analyze pretest probability and imaging decisions</CardDescription>
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
                  currentCase.severity === 'Massive'
                    ? 'destructive'
                    : currentCase.severity === 'Submassive'
                    ? 'warning'
                    : 'secondary'
                }
                className="text-base px-4 py-2"
              >
                {currentCase.severity}
              </Badge>
              <div className="text-sm">
                <span className="font-medium">Wells Score:</span>{' '}
                <span className="text-lg font-bold text-primary">{currentCase.wellsScore}</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-3">Clinical Presentation</h4>
                <p className="text-sm text-muted-foreground mb-3">{currentCase.presentation}</p>
                <div>
                  <span className="font-medium text-sm">Risk Factors:</span>
                  <ul className="mt-2 space-y-1">
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
                <h4 className="font-semibold mb-3">Diagnostic Approach</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">D-dimer:</span>
                    <p className="text-muted-foreground">{currentCase.dDimer}</p>
                  </div>
                  <div>
                    <span className="font-medium">Recommendation:</span>
                    <p className="font-medium text-primary">{currentCase.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PERC Rule */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>PERC Rule (Pulmonary Embolism Rule-out Criteria)</CardTitle>
          <CardDescription>All 8 criteria must be met to rule out PE without testing (in low-risk patients)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {percRule.map((criteria, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm p-3 rounded-lg border border-border">
                <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                <span>{criteria}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted">
            <p className="text-sm">
              <strong>Important:</strong> PERC should only be applied in LOW-risk patients (Wells score {'<'} 2 or clinical gestalt low).
              If any PERC criterion is not met, proceed with D-dimer or imaging.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Imaging Decisions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Imaging Decision Pathway</CardTitle>
          <CardDescription>When to use D-dimer vs CTPA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {imagingDecisions.map((decision, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-2">{decision.scenario}</h4>
                <p className="text-sm text-primary font-medium">{decision.action}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Massive vs Submassive */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span>PE Severity Classification</span>
          </CardTitle>
          <CardDescription>Risk stratification for management decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {massiveVsSubmassive.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-2">{item.category}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Definition:</span>
                    <p className="text-muted-foreground">{item.definition}</p>
                  </div>
                  <div>
                    <span className="font-medium">Clinical Implications:</span>
                    <p className="text-muted-foreground">{item.implications}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
