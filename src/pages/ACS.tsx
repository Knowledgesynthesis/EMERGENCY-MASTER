import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { AlertCircle, Heart } from 'lucide-react';

interface ChestPainCase {
  id: string;
  painQuality: string;
  location: string;
  radiation: string;
  ecg: string;
  troponin: string;
  classification: string;
  keyFeatures: string[];
}

export default function ACS() {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const cases: ChestPainCase[] = [
    {
      id: 'case1',
      painQuality: 'Crushing, substernal pressure',
      location: 'Chest, substernal',
      radiation: 'Left arm and jaw',
      ecg: 'ST-elevation in anterior leads (V2-V4)',
      troponin: 'Elevated (5.2 ng/mL)',
      classification: 'STEMI - Anterior Wall',
      keyFeatures: ['Time-sensitive', 'Activation pathway needed', 'Typical radiation pattern'],
    },
    {
      id: 'case2',
      painQuality: 'Sharp, pressure-like',
      location: 'Substernal',
      radiation: 'None',
      ecg: 'ST-depression in lateral leads, T-wave inversion',
      troponin: 'Elevated (2.8 ng/mL)',
      classification: 'NSTEMI',
      keyFeatures: ['High-risk features', 'Early invasive strategy', 'Antiplatelet therapy'],
    },
    {
      id: 'case3',
      painQuality: 'Pressure, occurs with exertion',
      location: 'Chest',
      radiation: 'Shoulder',
      ecg: 'Normal, no acute changes',
      troponin: 'Normal (< 0.04 ng/mL)',
      classification: 'Unstable Angina',
      keyFeatures: ['Increasing frequency', 'Risk stratification needed', 'Medical optimization'],
    },
  ];

  const redFlags = [
    'Diaphoresis with chest pain',
    'Hypotension',
    'Pulmonary edema / crackles',
    'New murmur (mechanical complication)',
    'Syncope with chest pain',
    'Radiation to jaw, arm, or back',
  ];

  const ecgPatterns = [
    {
      pattern: 'ST-Elevation',
      significance: 'STEMI - Immediate activation pathway',
      location: 'Helps identify culprit artery',
    },
    {
      pattern: 'ST-Depression',
      significance: 'NSTEMI or posterior MI - High risk',
      location: 'May indicate ischemia or reciprocal changes',
    },
    {
      pattern: 'T-Wave Inversion',
      significance: 'May indicate ischemia or recent MI',
      location: 'Territory-specific changes',
    },
    {
      pattern: 'New LBBB',
      significance: 'STEMI equivalent - Consider activation',
      location: 'May mask ST changes',
    },
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-red-500/10 p-3">
            <Heart className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Acute Coronary Syndrome / MI</h1>
            <p className="text-muted-foreground">
              Master chest pain triage, ECG interpretation, and risk stratification
            </p>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-2">STEMI</h3>
              <p className="text-sm text-muted-foreground">
                ST-elevation myocardial infarction requiring immediate reperfusion therapy
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">NSTEMI</h3>
              <p className="text-sm text-muted-foreground">
                Non-ST-elevation MI with elevated biomarkers but no ST elevation
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Unstable Angina</h3>
              <p className="text-sm text-muted-foreground">
                Ischemic chest pain without biomarker elevation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Chest Pain Triage */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Chest Pain Triage Simulator</CardTitle>
          <CardDescription>
            Analyze clinical presentations and classify the type of ACS
          </CardDescription>
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
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Clinical Presentation</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Pain Quality:</span> {currentCase.painQuality}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {currentCase.location}
                  </div>
                  <div>
                    <span className="font-medium">Radiation:</span> {currentCase.radiation}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Diagnostic Findings</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">ECG:</span> {currentCase.ecg}
                  </div>
                  <div>
                    <span className="font-medium">Troponin:</span> {currentCase.troponin}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Classification</h4>
                <Badge variant="destructive" className="text-base px-4 py-2">
                  {currentCase.classification}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Features</h4>
                <ul className="space-y-2">
                  {currentCase.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ECG Patterns */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ECG Pattern Recognition</CardTitle>
          <CardDescription>Conceptual understanding of key ECG findings in ACS</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ecgPatterns.map((pattern, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{pattern.pattern}</h4>
                  <Badge variant="outline">ECG Finding</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Significance:</span>{' '}
                    {pattern.significance}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Location:</span> {pattern.location}
                  </p>
                </div>
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
            <span>Red Flags</span>
          </CardTitle>
          <CardDescription>Critical findings requiring immediate attention</CardDescription>
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
