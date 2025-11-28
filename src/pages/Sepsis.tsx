import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Droplet, AlertCircle, TrendingUp } from 'lucide-react';

interface SepsisCase {
  id: string;
  vitals: {
    bp: string;
    hr: number;
    rr: number;
    temp: number;
    spo2: number;
  };
  labs: {
    lactate: string;
    wbc: string;
    creatinine: string;
  };
  source: string;
  severity: 'Sepsis' | 'Septic Shock' | 'Severe Sepsis';
  sofaScore: number;
}

export default function Sepsis() {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const cases: SepsisCase[] = [
    {
      id: 'case1',
      vitals: { bp: '86/52', hr: 124, rr: 24, temp: 39.2, spo2: 94 },
      labs: { lactate: '3.8 mmol/L', wbc: '18.2 K/μL', creatinine: '1.8 mg/dL' },
      source: 'Urinary tract infection',
      severity: 'Septic Shock',
      sofaScore: 8,
    },
    {
      id: 'case2',
      vitals: { bp: '102/68', hr: 110, rr: 22, temp: 38.8, spo2: 96 },
      labs: { lactate: '2.2 mmol/L', wbc: '15.8 K/μL', creatinine: '1.2 mg/dL' },
      source: 'Pneumonia (right lower lobe)',
      severity: 'Sepsis',
      sofaScore: 4,
    },
    {
      id: 'case3',
      vitals: { bp: '78/45', hr: 135, rr: 28, temp: 39.8, spo2: 91 },
      labs: { lactate: '5.2 mmol/L', wbc: '22.5 K/μL', creatinine: '2.4 mg/dL' },
      source: 'Intra-abdominal (suspected cholangitis)',
      severity: 'Septic Shock',
      sofaScore: 11,
    },
  ];

  const sofaCriteria = [
    { organ: 'Respiration', criteria: 'PaO2/FiO2 ratio < 400', points: '1-4' },
    { organ: 'Coagulation', criteria: 'Platelets < 150K', points: '1-4' },
    { organ: 'Liver', criteria: 'Bilirubin elevation', points: '1-4' },
    { organ: 'Cardiovascular', criteria: 'Hypotension, vasopressors', points: '1-4' },
    { organ: 'CNS', criteria: 'GCS < 15', points: '1-4' },
    { organ: 'Renal', criteria: 'Creatinine or urine output', points: '1-4' },
  ];

  const commonSources = [
    { source: 'Pneumonia', clues: 'Cough, dyspnea, infiltrate on CXR' },
    { source: 'Urinary', clues: 'Dysuria, CVA tenderness, UA findings' },
    { source: 'Abdominal', clues: 'Peritoneal signs, imaging findings' },
    { source: 'Skin/Soft Tissue', clues: 'Cellulitis, abscess, wound' },
    { source: 'Catheter/Line', clues: 'Line site infection, bacteremia' },
    { source: 'CNS', clues: 'Meningeal signs, altered mental status' },
  ];

  const redFlags = [
    'Hypotension despite fluids (shock)',
    'Lactate > 4 mmol/L',
    'Altered mental status',
    'Acute kidney injury',
    'Respiratory failure',
    'Coagulopathy',
  ];

  const currentCase = cases[selectedCase];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Septic Shock':
        return 'destructive';
      case 'Severe Sepsis':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-orange-500/10 p-3">
            <Droplet className="h-8 w-8 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Sepsis</h1>
            <p className="text-muted-foreground">
              Early recognition, severity assessment, and source identification
            </p>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sepsis Definitions (Sepsis-3)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold mb-2">Sepsis</h3>
              <p className="text-sm text-muted-foreground">
                Life-threatening organ dysfunction caused by dysregulated host response to infection (SOFA score ≥ 2)
              </p>
            </div>
            <div className="rounded-lg border border-destructive bg-destructive/5 p-4">
              <h3 className="font-semibold mb-2">Septic Shock</h3>
              <p className="text-sm text-muted-foreground">
                Sepsis with persistent hypotension requiring vasopressors to maintain MAP ≥ 65 mmHg AND lactate {'>'} 2 mmol/L despite adequate fluid resuscitation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Severity Engine */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sepsis Severity Analyzer</CardTitle>
          <CardDescription>Assess severity and identify organ dysfunction</CardDescription>
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

          {/* Case Analysis */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge variant={getSeverityColor(currentCase.severity)} className="text-base px-4 py-2">
                {currentCase.severity}
              </Badge>
              <div className="text-sm">
                <span className="font-medium">SOFA Score:</span>{' '}
                <span className="text-lg font-bold text-primary">{currentCase.sofaScore}</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Vital Signs</span>
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>BP:</span>
                    <span className="font-medium">{currentCase.vitals.bp} mmHg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HR:</span>
                    <span className="font-medium">{currentCase.vitals.hr} bpm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RR:</span>
                    <span className="font-medium">{currentCase.vitals.rr}/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temp:</span>
                    <span className="font-medium">{currentCase.vitals.temp}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SpO2:</span>
                    <span className="font-medium">{currentCase.vitals.spo2}%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-3">Laboratory Values</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lactate:</span>
                    <span className="font-medium">{currentCase.labs.lactate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>WBC:</span>
                    <span className="font-medium">{currentCase.labs.wbc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Creatinine:</span>
                    <span className="font-medium">{currentCase.labs.creatinine}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-3">Suspected Source</h4>
                <p className="text-sm font-medium text-primary">{currentCase.source}</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Early source control and appropriate antibiotics are critical
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SOFA Score Reference */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>SOFA Score (Sequential Organ Failure Assessment)</CardTitle>
          <CardDescription>Conceptual framework for organ dysfunction assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sofaCriteria.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex-1">
                  <span className="font-semibold">{item.organ}</span>
                  <p className="text-sm text-muted-foreground">{item.criteria}</p>
                </div>
                <Badge variant="outline">{item.points} points</Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted">
            <p className="text-sm">
              <strong>Clinical Use:</strong> SOFA score ≥ 2 indicates organ dysfunction. Higher scores correlate with increased mortality. Used to identify sepsis and track progression.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Common Sources */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Common Infection Sources</CardTitle>
          <CardDescription>Source identification guides antibiotic selection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {commonSources.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-2">{item.source}</h4>
                <p className="text-sm text-muted-foreground">{item.clues}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Red Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span>Red Flags for Severe Sepsis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {redFlags.map((flag, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-destructive flex-shrink-0" />
                <span>{flag}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
