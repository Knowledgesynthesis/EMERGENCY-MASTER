import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { AlertTriangle } from 'lucide-react';

interface AbdominalCase {
  id: string;
  presentation: string;
  painLocation: string;
  painCharacter: string;
  physicalExam: string[];
  labsImaging: string[];
  diagnosis: string;
  urgency: 'Emergent' | 'Urgent' | 'Semi-urgent';
}

export default function AcuteAbdomen() {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const cases: AbdominalCase[] = [
    {
      id: 'case1',
      presentation: '24 y/o with periumbilical pain migrating to RLQ',
      painLocation: 'Initially periumbilical, now right lower quadrant',
      painCharacter: 'Sharp, constant, worsening',
      physicalExam: ['Rebound tenderness RLQ', 'Positive Rovsing sign', 'Guarding', 'Low-grade fever'],
      labsImaging: ['WBC 15.2 K/μL', 'CT: Dilated appendix with fat stranding', 'No free air'],
      diagnosis: 'Acute Appendicitis',
      urgency: 'Emergent',
    },
    {
      id: 'case2',
      presentation: '58 y/o with sudden RUQ pain after fatty meal',
      painLocation: 'Right upper quadrant',
      painCharacter: 'Colicky, severe, radiates to right shoulder',
      physicalExam: ['Positive Murphy sign', 'RUQ tenderness', 'No jaundice', 'Tachycardia'],
      labsImaging: [
        'WBC 13.8 K/μL',
        'Normal bilirubin',
        'Ultrasound: Gallstones, thickened wall, pericholecystic fluid',
      ],
      diagnosis: 'Acute Cholecystitis',
      urgency: 'Urgent',
    },
    {
      id: 'case3',
      presentation: '72 y/o with RUQ pain, fever, and confusion',
      painLocation: 'Right upper quadrant',
      painCharacter: 'Severe, constant',
      physicalExam: ['RUQ tenderness', 'Jaundice', 'Fever 39.5°C', 'Altered mental status'],
      labsImaging: [
        'WBC 22.5 K/μL',
        'Total bilirubin 5.2 mg/dL',
        'Alk phos elevated',
        'Ultrasound: Dilated CBD, stones',
      ],
      diagnosis: 'Acute Cholangitis',
      urgency: 'Emergent',
    },
  ];

  const appendicitisSigns = [
    {
      sign: 'Rovsing Sign',
      description: 'RLQ pain with palpation of LLQ',
      significance: 'Peritoneal irritation',
    },
    {
      sign: 'Psoas Sign',
      description: 'Pain with right hip extension',
      significance: 'Retrocecal appendix',
    },
    {
      sign: 'Obturator Sign',
      description: 'Pain with internal rotation of flexed right hip',
      significance: 'Pelvic appendix',
    },
    {
      sign: 'McBurney Point',
      description: 'Tenderness 1/3 distance from ASIS to umbilicus',
      significance: 'Classic appendicitis location',
    },
  ];

  const biliaryConditions = [
    {
      condition: 'Biliary Colic',
      presentation: 'Intermittent RUQ pain, no fever, normal labs',
      pathology: 'Temporary cystic duct obstruction',
    },
    {
      condition: 'Acute Cholecystitis',
      presentation: 'Persistent RUQ pain, fever, Murphy sign',
      pathology: 'Sustained cystic duct obstruction with inflammation',
    },
    {
      condition: 'Cholangitis',
      presentation: 'Charcot triad: fever, jaundice, RUQ pain',
      pathology: 'CBD obstruction with infection (Reynold pentad adds shock and AMS)',
    },
    {
      condition: 'Choledocholithiasis',
      presentation: 'RUQ pain, elevated bilirubin, may have pancreatitis',
      pathology: 'Stone in common bile duct',
    },
  ];

  const charcotTriad = [
    { component: 'Fever', details: 'Often with rigors' },
    { component: 'Jaundice', details: 'Elevated bilirubin' },
    { component: 'RUQ Pain', details: 'Abdominal tenderness' },
  ];

  const redFlags = [
    'Peritoneal signs (rigid abdomen, rebound)',
    'Hypotension or signs of shock',
    'High fever with altered mental status',
    'Free air on imaging (perforation)',
    'Severe persistent vomiting',
    'Absent bowel sounds',
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-yellow-500/10 p-3">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Acute Abdomen</h1>
            <p className="text-muted-foreground">
              Appendicitis, cholecystitis, cholangitis - peritoneal signs and diagnosis
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Cases */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Acute Abdomen Case Simulator</CardTitle>
          <CardDescription>Analyze pain location, exam findings, and imaging</CardDescription>
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
                variant={currentCase.urgency === 'Emergent' ? 'destructive' : 'warning'}
                className="text-base px-4 py-2"
              >
                {currentCase.urgency}
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                {currentCase.diagnosis}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-3">Presentation</h4>
                  <p className="text-sm text-muted-foreground mb-3">{currentCase.presentation}</p>
                  <div className="space-y-2 text-sm pt-3 border-t border-border">
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="text-muted-foreground">{currentCase.painLocation}</p>
                    </div>
                    <div>
                      <span className="font-medium">Character:</span>
                      <p className="text-muted-foreground">{currentCase.painCharacter}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-3">Physical Exam</h4>
                  <ul className="space-y-2">
                    {currentCase.physicalExam.map((finding, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-3">Labs & Imaging</h4>
                <ul className="space-y-2">
                  {currentCase.labsImaging.map((finding, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{finding}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="font-medium text-sm">Diagnosis:</span>
                  <p className="text-lg font-semibold text-primary mt-1">{currentCase.diagnosis}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appendicitis Signs */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Appendicitis: Physical Exam Signs</CardTitle>
          <CardDescription>Classic signs for appendicitis diagnosis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appendicitisSigns.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{item.sign}</h4>
                  <Badge variant="outline">Physical Exam</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <div>
                    <span className="font-medium">Significance:</span>
                    <p className="text-muted-foreground">{item.significance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted">
            <p className="text-sm">
              <strong>Classic Presentation:</strong> Pain migration from periumbilical → RLQ is highly suggestive of appendicitis.
              Sensitivity of individual signs varies, but clustering of findings increases diagnostic accuracy.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Biliary Conditions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Biliary Tract Conditions Spectrum</CardTitle>
          <CardDescription>From biliary colic to cholangitis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {biliaryConditions.map((condition, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-2">{condition.condition}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Presentation:</span>
                    <p className="text-muted-foreground">{condition.presentation}</p>
                  </div>
                  <div>
                    <span className="font-medium">Pathology:</span>
                    <p className="text-muted-foreground">{condition.pathology}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charcot Triad */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Charcot Triad (Cholangitis)</CardTitle>
          <CardDescription>Classic triad for ascending cholangitis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 mb-4">
            {charcotTriad.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-destructive bg-destructive/5 p-4 text-center">
                <h4 className="font-semibold text-lg mb-1">{item.component}</h4>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50">
            <p className="text-sm mb-2">
              <strong>Reynold Pentad:</strong> Charcot triad + Hypotension + Altered mental status
            </p>
            <p className="text-sm">
              Indicates severe cholangitis with septic shock. Requires urgent biliary decompression (ERCP or percutaneous drainage).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Red Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span>Acute Abdomen Red Flags</span>
          </CardTitle>
          <CardDescription>Findings requiring immediate surgical consultation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {redFlags.map((flag, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm p-3 rounded-lg border border-border">
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
