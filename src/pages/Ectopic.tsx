import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Baby, AlertCircle } from 'lucide-react';

interface EctopicCase {
  id: string;
  presentation: string;
  betaHCG: number;
  ultrasound: string;
  vitals: { bp: string; hr: number };
  symptoms: string[];
  risk: 'High - Rupture Suspected' | 'Moderate - Unruptured Ectopic' | 'Low - Further Workup Needed';
  management: string;
}

export default function Ectopic() {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const cases: EctopicCase[] = [
    {
      id: 'case1',
      presentation: '28 y/o with lower abdominal pain and vaginal spotting, LMP 7 weeks ago',
      betaHCG: 2800,
      ultrasound: 'No intrauterine pregnancy, adnexal mass with free fluid',
      vitals: { bp: '108/68', hr: 88 },
      symptoms: ['Lower abdominal pain', 'Vaginal spotting', 'Mild shoulder pain'],
      risk: 'Moderate - Unruptured Ectopic',
      management: 'OB/GYN consultation for medical vs surgical management',
    },
    {
      id: 'case2',
      presentation: '32 y/o with sudden severe abdominal pain and syncope',
      betaHCG: 3500,
      ultrasound: 'No IUP, moderate free fluid in pelvis, complex adnexal mass',
      vitals: { bp: '86/54', hr: 124 },
      symptoms: ['Severe abdominal pain', 'Syncope', 'Shoulder pain', 'Tachycardia', 'Hypotension'],
      risk: 'High - Rupture Suspected',
      management: 'Emergent surgical intervention - ruptured ectopic',
    },
    {
      id: 'case3',
      presentation: '25 y/o with mild cramping, positive home pregnancy test',
      betaHCG: 1200,
      ultrasound: 'No IUP visualized, no adnexal mass, no free fluid',
      vitals: { bp: '118/72', hr: 76 },
      symptoms: ['Mild cramping', 'No bleeding'],
      risk: 'Low - Further Workup Needed',
      management: 'Serial β-hCG monitoring, repeat ultrasound if appropriate',
    },
  ];

  const discriminatoryZone = {
    threshold: 1500-2000,
    description: 'β-hCG level above which IUP should be visible on transvaginal ultrasound',
    clinical: 'If β-hCG > discriminatory zone and no IUP seen → concern for ectopic pregnancy',
  };

  const riskFactors = [
    'Prior ectopic pregnancy',
    'History of PID or STIs',
    'Previous tubal surgery',
    'Current IUD use',
    'Assisted reproductive technology',
    'Smoking',
    'Tubal ligation failure',
    'Endometriosis',
  ];

  const ruptureRedFlags = [
    'Hypotension or orthostatic changes',
    'Tachycardia',
    'Severe or worsening abdominal pain',
    'Shoulder pain (diaphragmatic irritation)',
    'Syncope or near-syncope',
    'Peritoneal signs on exam',
    'Moderate to large free fluid on ultrasound',
  ];

  const ultrasoundFindings = [
    {
      finding: 'IUP Present',
      significance: 'Effectively rules out ectopic (heterotopic < 1%)',
      action: 'Confirm viability, exclude other pathology',
    },
    {
      finding: 'No IUP + Adnexal Mass',
      significance: 'Highly suspicious for ectopic pregnancy',
      action: 'OB/GYN consultation',
    },
    {
      finding: 'No IUP + Free Fluid',
      significance: 'Concern for ruptured ectopic',
      action: 'Assess hemodynamic stability, urgent OB/GYN',
    },
    {
      finding: 'No IUP + Empty Adnexa',
      significance: 'Early IUP vs ectopic vs spontaneous abortion',
      action: 'Serial β-hCG, repeat imaging',
    },
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-pink-500/10 p-3">
            <Baby className="h-8 w-8 text-pink-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Ectopic Pregnancy</h1>
            <p className="text-muted-foreground">
              β-hCG interpretation, ultrasound patterns, and rupture red flags
            </p>
          </div>
        </div>
      </div>

      {/* Discriminatory Zone */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>β-hCG Discriminatory Zone</CardTitle>
          <CardDescription>Critical concept for ectopic pregnancy diagnosis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-primary/50 bg-primary/10 p-6">
            <div className="flex items-baseline space-x-3 mb-4">
              <span className="text-4xl font-bold text-primary">{discriminatoryZone.threshold}</span>
              <span className="text-muted-foreground">mIU/mL</span>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Definition:</span>
                <p className="text-muted-foreground">{discriminatoryZone.description}</p>
              </div>
              <div>
                <span className="font-medium">Clinical Application:</span>
                <p className="text-muted-foreground">{discriminatoryZone.clinical}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted">
            <p className="text-sm">
              <strong>Note:</strong> The discriminatory zone is a guideline. Clinical context, serial β-hCG trends,
              and ultrasound quality all factor into decision-making. No single β-hCG value definitively rules in or out ectopic pregnancy.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Cases */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ectopic Pregnancy Case Simulator</CardTitle>
          <CardDescription>Analyze β-hCG, ultrasound, and clinical presentation</CardDescription>
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
            <div>
              <Badge
                variant={
                  currentCase.risk.includes('High')
                    ? 'destructive'
                    : currentCase.risk.includes('Moderate')
                    ? 'warning'
                    : 'secondary'
                }
                className="text-base px-4 py-2"
              >
                {currentCase.risk}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-3">Presentation</h4>
                  <p className="text-sm text-muted-foreground mb-3">{currentCase.presentation}</p>
                  <div className="pt-3 border-t border-border">
                    <h5 className="font-medium text-sm mb-2">Symptoms:</h5>
                    <ul className="space-y-1">
                      {currentCase.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-3">Vital Signs</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Blood Pressure:</span>
                      <span className="font-medium">{currentCase.vitals.bp} mmHg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heart Rate:</span>
                      <span className="font-medium">{currentCase.vitals.hr} bpm</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-3">Diagnostic Findings</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">β-hCG:</span>
                      <p className="text-lg font-bold text-primary">{currentCase.betaHCG} mIU/mL</p>
                    </div>
                    <div>
                      <span className="font-medium">Ultrasound:</span>
                      <p className="text-muted-foreground">{currentCase.ultrasound}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-primary/50 bg-primary/10 p-4">
                  <h4 className="font-semibold mb-2">Management</h4>
                  <p className="text-sm">{currentCase.management}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ultrasound Findings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ultrasound Findings & Interpretation</CardTitle>
          <CardDescription>Key findings and clinical significance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ultrasoundFindings.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{item.finding}</h4>
                  <Badge variant="outline">Ultrasound</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Significance:</span>
                    <p className="text-muted-foreground">{item.significance}</p>
                  </div>
                  <div>
                    <span className="font-medium">Next Step:</span>
                    <p className="text-primary font-medium">{item.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ectopic Pregnancy Risk Factors</CardTitle>
          <CardDescription>Conditions that increase ectopic risk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {riskFactors.map((factor, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm p-3 rounded-lg border border-border">
                <div className="h-2 w-2 rounded-full bg-pink-500 flex-shrink-0" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rupture Red Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span>Rupture Red Flags</span>
          </CardTitle>
          <CardDescription>Signs of ruptured ectopic pregnancy requiring emergency intervention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {ruptureRedFlags.map((flag, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm p-3 rounded-lg border border-destructive bg-destructive/5">
                <div className="h-2 w-2 rounded-full bg-destructive flex-shrink-0" />
                <span>{flag}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/50">
            <p className="text-sm">
              <strong>Emergency Management:</strong> Ruptured ectopic is a life-threatening emergency.
              Immediate resuscitation, blood product availability, and emergent surgical consultation are critical.
              Do not delay intervention for additional imaging in unstable patients.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
