import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { HeartPulse, AlertCircle } from 'lucide-react';

interface PreeclampsiaCase {
  id: string;
  presentation: string;
  gestationalAge: string;
  bp: string;
  labs: {
    protein: string;
    plt: string;
    ast: string;
    alt: string;
    cr: string;
  };
  symptoms: string[];
  classification: 'Preeclampsia' | 'Preeclampsia with Severe Features' | 'Eclampsia' | 'HELLP Syndrome';
  severity: 'Mild' | 'Severe' | 'Critical';
}

export default function Preeclampsia() {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const cases: PreeclampsiaCase[] = [
    {
      id: 'case1',
      presentation: '32 y/o G2P1 at 36 weeks with new-onset hypertension and headache',
      gestationalAge: '36 weeks',
      bp: '162/104 mmHg',
      labs: {
        protein: '2+ on dipstick',
        plt: '185 K/μL',
        ast: '48 U/L',
        alt: '52 U/L',
        cr: '0.9 mg/dL',
      },
      symptoms: ['Severe headache', 'Visual changes (scotomata)', 'RUQ pain'],
      classification: 'Preeclampsia with Severe Features',
      severity: 'Severe',
    },
    {
      id: 'case2',
      presentation: '28 y/o G1P0 at 38 weeks with elevated BP on routine visit',
      gestationalAge: '38 weeks',
      bp: '148/94 mmHg',
      labs: {
        protein: '1+ on dipstick',
        plt: '220 K/μL',
        ast: '28 U/L',
        alt: '32 U/L',
        cr: '0.8 mg/dL',
      },
      symptoms: ['Mild headache', 'Mild peripheral edema'],
      classification: 'Preeclampsia',
      severity: 'Mild',
    },
    {
      id: 'case3',
      presentation: '35 y/o G3P2 at 34 weeks with seizure witnessed at home',
      gestationalAge: '34 weeks',
      bp: '178/112 mmHg',
      labs: {
        protein: '4+ on dipstick',
        plt: '92 K/μL',
        ast: '245 U/L',
        alt: '198 U/L',
        cr: '1.6 mg/dL',
      },
      symptoms: ['Generalized tonic-clonic seizure', 'Severe headache', 'Visual changes', 'Epigastric pain'],
      classification: 'Eclampsia',
      severity: 'Critical',
    },
  ];

  const severeFeatures = [
    {
      category: 'Blood Pressure',
      features: ['SBP ≥ 160 mmHg or DBP ≥ 110 mmHg on two occasions, 4 hours apart'],
    },
    {
      category: 'Symptoms',
      features: [
        'Severe persistent headache',
        'Visual disturbances (scotomata, blurred vision)',
        'RUQ or epigastric pain',
      ],
    },
    {
      category: 'Laboratory',
      features: [
        'Thrombocytopenia (platelets < 100 K/μL)',
        'Elevated liver enzymes (≥ 2x normal)',
        'Serum creatinine > 1.1 mg/dL or doubling',
        'Pulmonary edema',
      ],
    },
  ];

  const hellpSyndrome = {
    definition: 'Hemolysis, Elevated Liver enzymes, Low Platelets',
    criteria: [
      'Hemolysis (schistocytes, elevated LDH, low haptoglobin)',
      'Elevated liver enzymes (AST/ALT elevated)',
      'Low platelets (< 100 K/μL)',
    ],
    significance: 'Severe variant of preeclampsia with high maternal/fetal morbidity',
  };

  const diagnosticCriteria = [
    {
      condition: 'Preeclampsia',
      criteria: 'SBP ≥ 140 or DBP ≥ 90 (on 2 occasions, ≥ 4 hours apart) after 20 weeks + Proteinuria OR severe features',
    },
    {
      condition: 'Severe Features',
      criteria: 'Severe HTN, thrombocytopenia, renal insufficiency, liver dysfunction, pulmonary edema, or cerebral/visual symptoms',
    },
    {
      condition: 'Eclampsia',
      criteria: 'Preeclampsia + new-onset grand mal seizures (no other cause)',
    },
  ];

  const managementPrinciples = [
    'Delivery is the definitive treatment',
    'Timing depends on gestational age and severity',
    'Magnesium sulfate for seizure prophylaxis (severe features or eclampsia)',
    'Antihypertensive therapy for severe hypertension',
    'Close maternal and fetal monitoring',
    'Assess for HELLP syndrome and other complications',
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-rose-500/10 p-3">
            <HeartPulse className="h-8 w-8 text-rose-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Preeclampsia / Eclampsia</h1>
            <p className="text-muted-foreground">
              Severe features, laboratory patterns, and seizure recognition in pregnancy
            </p>
          </div>
        </div>
      </div>

      {/* Diagnostic Criteria */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Diagnostic Criteria</CardTitle>
          <CardDescription>Definitions and classification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {diagnosticCriteria.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-2">{item.condition}</h4>
                <p className="text-sm text-muted-foreground">{item.criteria}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted">
            <p className="text-sm">
              <strong>Key Point:</strong> Preeclampsia can be diagnosed without proteinuria if severe features are present.
              The presence of any severe feature upgrades the diagnosis to preeclampsia with severe features.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Cases */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Preeclampsia Severity Assessment</CardTitle>
          <CardDescription>Analyze BP, labs, and symptoms to classify severity</CardDescription>
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
                  currentCase.severity === 'Critical'
                    ? 'destructive'
                    : currentCase.severity === 'Severe'
                    ? 'warning'
                    : 'secondary'
                }
                className="text-base px-4 py-2"
              >
                {currentCase.severity}
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                {currentCase.classification}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-3">Presentation</h4>
                  <p className="text-sm text-muted-foreground mb-3">{currentCase.presentation}</p>
                  <div className="space-y-2 text-sm pt-3 border-t border-border">
                    <div className="flex justify-between">
                      <span>Gestational Age:</span>
                      <span className="font-medium">{currentCase.gestationalAge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blood Pressure:</span>
                      <span className="font-medium">{currentCase.bp}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-3">Symptoms</h4>
                  <ul className="space-y-2">
                    {currentCase.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-3">Laboratory Values</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Protein:</span>
                    <span className="font-medium">{currentCase.labs.protein}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platelets:</span>
                    <span className="font-medium">{currentCase.labs.plt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AST:</span>
                    <span className="font-medium">{currentCase.labs.ast}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ALT:</span>
                    <span className="font-medium">{currentCase.labs.alt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Creatinine:</span>
                    <span className="font-medium">{currentCase.labs.cr}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Severe Features */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span>Severe Features</span>
          </CardTitle>
          <CardDescription>Criteria that indicate preeclampsia with severe features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {severeFeatures.map((category, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-3">{category.category}</h4>
                <div className="space-y-2">
                  {category.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start space-x-2 text-sm p-3 rounded-lg border border-destructive bg-destructive/5">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* HELLP Syndrome */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>HELLP Syndrome</CardTitle>
          <CardDescription>{hellpSyndrome.definition}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            {hellpSyndrome.criteria.map((criteria, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-sm p-3 rounded-lg border border-border">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span>{criteria}</span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50">
            <p className="text-sm">
              <strong>Clinical Significance:</strong> {hellpSyndrome.significance}
            </p>
            <p className="text-sm mt-2">
              Patients may present with RUQ/epigastric pain, nausea/vomiting. Risk of hepatic rupture, DIC, and maternal death.
              Delivery is usually indicated regardless of gestational age.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Management Principles */}
      <Card>
        <CardHeader>
          <CardTitle>Management Principles (Educational Overview)</CardTitle>
          <CardDescription>Conceptual framework for preeclampsia management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {managementPrinciples.map((principle, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {idx + 1}
                </div>
                <p className="text-sm">{principle}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
            <p className="text-sm">
              <strong>⚠️ Important:</strong> This is educational content only. Actual management requires individualized
              assessment by obstetric providers, considering gestational age, maternal and fetal status, and institutional protocols.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
