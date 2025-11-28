import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Activity, AlertTriangle } from 'lucide-react';

interface MetabolicCase {
  id: string;
  glucose: number;
  ph: number;
  bicarb: number;
  anionGap: number;
  serum: number;
  ketones: string;
  osmolality: number;
  classification: 'DKA' | 'HHS' | 'Mixed DKA-HHS';
  severity: 'Mild' | 'Moderate' | 'Severe';
}

export default function DKAHHS() {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const cases: MetabolicCase[] = [
    {
      id: 'case1',
      glucose: 485,
      ph: 7.12,
      bicarb: 8,
      anionGap: 28,
      serum: 295,
      ketones: 'Strongly positive (4+)',
      osmolality: 310,
      classification: 'DKA',
      severity: 'Severe',
    },
    {
      id: 'case2',
      glucose: 892,
      ph: 7.34,
      bicarb: 22,
      anionGap: 14,
      serum: 358,
      ketones: 'Negative to trace',
      osmolality: 365,
      classification: 'HHS',
      severity: 'Severe',
    },
    {
      id: 'case3',
      glucose: 625,
      ph: 7.18,
      bicarb: 12,
      anionGap: 24,
      serum: 325,
      ketones: 'Moderate (2+)',
      osmolality: 338,
      classification: 'Mixed DKA-HHS',
      severity: 'Severe',
    },
  ];

  const differentiatingFeatures = [
    {
      feature: 'Glucose',
      dka: 'Usually 250-600 mg/dL',
      hhs: 'Typically > 600 mg/dL (often > 800)',
    },
    {
      feature: 'pH',
      dka: '< 7.30',
      hhs: '> 7.30',
    },
    {
      feature: 'Bicarbonate',
      dka: '< 18 mEq/L',
      hhs: 'Usually > 18 mEq/L',
    },
    {
      feature: 'Anion Gap',
      dka: 'Elevated (> 12)',
      hhs: 'Normal or mildly elevated',
    },
    {
      feature: 'Ketones',
      dka: 'Strongly positive',
      hhs: 'Absent or trace',
    },
    {
      feature: 'Osmolality',
      dka: 'Variable, usually < 320',
      hhs: 'Markedly elevated (> 320)',
    },
    {
      feature: 'Presentation',
      dka: 'Days, nausea/vomiting, Kussmaul breathing',
      hhs: 'Weeks, profound dehydration, AMS',
    },
  ];

  const potassiumConsiderations = [
    'Total body K+ is ALWAYS depleted despite initial serum level',
    'Monitor K+ closely - levels will DROP with insulin therapy',
    'Hold insulin if K+ < 3.3 mEq/L',
    'Add K+ to fluids once K+ < 5.2 mEq/L and patient is making urine',
    'Recheck K+ every 2-4 hours during initial management',
  ];

  const complications = [
    'Cerebral edema (more common in DKA, especially pediatric)',
    'Cardiac arrhythmias (from K+ shifts)',
    'Acute kidney injury',
    'Thrombotic events (especially HHS)',
    'Aspiration pneumonia',
    'ARDS',
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-blue-500/10 p-3">
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">DKA / HHS</h1>
            <p className="text-muted-foreground">
              Diabetic Ketoacidosis & Hyperosmolar Hyperglycemic State
            </p>
          </div>
        </div>
      </div>

      {/* Quick Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>DKA vs HHS: Key Differences</CardTitle>
          <CardDescription>Understand the metabolic distinctions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Feature</th>
                  <th className="text-left p-3 font-semibold">DKA</th>
                  <th className="text-left p-3 font-semibold">HHS</th>
                </tr>
              </thead>
              <tbody>
                {differentiatingFeatures.map((row, idx) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="p-3 font-medium">{row.feature}</td>
                    <td className="p-3 text-muted-foreground">{row.dka}</td>
                    <td className="p-3 text-muted-foreground">{row.hhs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Analyzer */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Metabolic Crisis Analyzer</CardTitle>
          <CardDescription>Differentiate DKA from HHS based on lab values</CardDescription>
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
            <div className="flex items-center space-x-4">
              <Badge variant="destructive" className="text-base px-4 py-2">
                {currentCase.classification}
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                {currentCase.severity}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border p-4 space-y-3">
                <h4 className="font-semibold mb-3">Laboratory Values</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Glucose:</span>
                    <p className="font-semibold text-lg">{currentCase.glucose} mg/dL</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">pH:</span>
                    <p className="font-semibold text-lg">{currentCase.ph}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bicarbonate:</span>
                    <p className="font-semibold text-lg">{currentCase.bicarb} mEq/L</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Anion Gap:</span>
                    <p className="font-semibold text-lg">{currentCase.anionGap}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4 space-y-3">
                <h4 className="font-semibold mb-3">Additional Studies</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Serum Osm:</span>
                    <p className="font-semibold text-lg">{currentCase.osmolality} mOsm/kg</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ketones:</span>
                    <p className="font-medium">{currentCase.ketones}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-primary/10 border border-primary/50 p-4">
              <h4 className="font-semibold mb-2">Clinical Interpretation</h4>
              <p className="text-sm text-muted-foreground">
                {currentCase.classification === 'DKA' &&
                  'Classic DKA with anion gap acidosis and positive ketones. Insulin deficiency leads to ketogenesis and metabolic acidosis.'}
                {currentCase.classification === 'HHS' &&
                  'Hyperosmolar hyperglycemic state with marked hyperglycemia but minimal ketosis. Severe dehydration and hyperosmolality are prominent.'}
                {currentCase.classification === 'Mixed DKA-HHS' &&
                  'Mixed picture with features of both DKA (ketosis, acidosis) and HHS (severe hyperglycemia, hyperosmolality). Requires management of both conditions.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Potassium Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span>Critical: Potassium Management</span>
          </CardTitle>
          <CardDescription>Educational framework for K+ considerations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {potassiumConsiderations.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complications */}
      <Card>
        <CardHeader>
          <CardTitle>Potential Complications</CardTitle>
          <CardDescription>Monitor for these serious complications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {complications.map((complication, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm p-3 rounded-lg border border-border">
                <div className="h-2 w-2 rounded-full bg-destructive flex-shrink-0" />
                <span>{complication}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
