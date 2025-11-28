import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Brain, AlertTriangle, Clock } from 'lucide-react';

interface StrokeCase {
  id: string;
  presentation: string;
  onsetTime: string;
  fastExam: {
    face: string;
    arm: string;
    speech: string;
    time: string;
  };
  imaging: string;
  classification: string;
  urgency: 'critical' | 'high' | 'moderate';
}

export default function Stroke() {
  const [selectedCase, setSelectedCase] = useState<number>(0);
  const [imagingStep, setImagingStep] = useState<number>(0);

  const cases: StrokeCase[] = [
    {
      id: 'case1',
      presentation: '68 y/o with sudden right-sided weakness and aphasia',
      onsetTime: '45 minutes ago',
      fastExam: {
        face: 'Left facial droop',
        arm: 'Right arm drift, unable to hold against gravity',
        speech: 'Expressive aphasia, difficulty forming words',
        time: 'Last known well: 45 minutes ago',
      },
      imaging: 'Non-contrast CT: No hemorrhage. CTA: Left MCA occlusion',
      classification: 'Acute Ischemic Stroke - Large Vessel Occlusion (LVO)',
      urgency: 'critical',
    },
    {
      id: 'case2',
      presentation: '72 y/o with sudden severe headache and decreased consciousness',
      onsetTime: '1 hour ago',
      fastExam: {
        face: 'No asymmetry',
        arm: 'Decreased movement bilaterally',
        speech: 'Confused, dysarthric',
        time: 'Sudden onset 1 hour ago',
      },
      imaging: 'Non-contrast CT: Hyperdensity in subarachnoid space',
      classification: 'Hemorrhagic Stroke - Subarachnoid Hemorrhage',
      urgency: 'critical',
    },
    {
      id: 'case3',
      presentation: '55 y/o with transient left arm weakness, now resolved',
      onsetTime: '3 hours ago, symptoms lasted 15 minutes',
      fastExam: {
        face: 'Normal, symmetric',
        arm: 'Full strength bilaterally (now)',
        speech: 'Normal',
        time: 'Symptoms resolved, occurred 3 hours ago',
      },
      imaging: 'Non-contrast CT: No acute changes. MRI with DWI: Small punctate infarct',
      classification: 'TIA vs Small Stroke - High Risk for Recurrence',
      urgency: 'high',
    },
  ];

  const imagingPathway = [
    {
      step: 'Non-Contrast CT Head',
      purpose: 'Rule out hemorrhage',
      findings: 'Exclude bleeding, mass effect, early ischemic changes',
      nextStep: 'If no hemorrhage → proceed to vascular imaging',
    },
    {
      step: 'CT Angiography (CTA)',
      purpose: 'Identify large vessel occlusion',
      findings: 'Evaluate for LVO in anterior or posterior circulation',
      nextStep: 'If LVO → consider thrombectomy candidacy',
    },
    {
      step: 'CT Perfusion (Optional)',
      purpose: 'Assess salvageable tissue',
      findings: 'Core infarct vs penumbra',
      nextStep: 'Helps extend intervention window in select cases',
    },
  ];

  const posteriorStrokeClues = [
    'Vertigo with neurologic signs',
    'Diplopia, visual field defects',
    'Ataxia, dysphagia',
    'Crossed findings (face one side, body opposite)',
    'Nystagmus with acute onset',
    'Severe imbalance',
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-purple-500/10 p-3">
            <Brain className="h-8 w-8 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Stroke</h1>
            <p className="text-muted-foreground">
              FAST exam, imaging workflow, and time-sensitive stroke management
            </p>
          </div>
        </div>
      </div>

      {/* FAST Exam Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>FAST Exam - Rapid Stroke Assessment</CardTitle>
          <CardDescription>Systematic approach to stroke recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold mb-2">Face</h3>
              <p className="text-sm text-muted-foreground">Ask patient to smile. Look for facial droop or asymmetry</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold mb-2">Arms</h3>
              <p className="text-sm text-muted-foreground">Ask patient to raise both arms. Look for drift or weakness</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold mb-2">Speech</h3>
              <p className="text-sm text-muted-foreground">Ask patient to repeat phrase. Assess for slurring or aphasia</p>
            </div>
            <div className="rounded-lg border border-border p-4 bg-destructive/10">
              <h3 className="font-semibold mb-2 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Time</span>
              </h3>
              <p className="text-sm text-muted-foreground">Note time of symptom onset or last known well</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Case Simulator */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Stroke Case Simulator</CardTitle>
          <CardDescription>Practice FAST exam and classification</CardDescription>
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
              <Badge variant={currentCase.urgency === 'critical' ? 'destructive' : 'warning'} className="mb-3">
                {currentCase.urgency.toUpperCase()} URGENCY
              </Badge>
              <h3 className="font-semibold text-lg mb-2">Presentation</h3>
              <p className="text-muted-foreground">{currentCase.presentation}</p>
              <div className="mt-2 flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-destructive" />
                <span className="font-medium">Time: {currentCase.onsetTime}</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-3">FAST Exam Findings</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Face:</span> {currentCase.fastExam.face}
                  </div>
                  <div>
                    <span className="font-medium">Arms:</span> {currentCase.fastExam.arm}
                  </div>
                  <div>
                    <span className="font-medium">Speech:</span> {currentCase.fastExam.speech}
                  </div>
                  <div className="pt-2 border-t border-border">
                    <span className="font-medium">Time:</span> {currentCase.fastExam.time}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold mb-3">Imaging & Classification</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Imaging:</span>
                    <p className="mt-1 text-muted-foreground">{currentCase.imaging}</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <span className="font-medium">Classification:</span>
                    <p className="mt-1 font-semibold text-primary">{currentCase.classification}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Imaging Pathway Navigator */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Stroke Imaging Pathway</CardTitle>
          <CardDescription>Step-by-step imaging workflow for acute stroke</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex space-x-2">
            {imagingPathway.map((_, idx) => (
              <Button
                key={idx}
                variant={imagingStep === idx ? 'default' : 'outline'}
                size="sm"
                onClick={() => setImagingStep(idx)}
              >
                Step {idx + 1}
              </Button>
            ))}
          </div>

          <div className="rounded-lg border border-primary/50 bg-primary/5 p-6">
            <h3 className="font-semibold text-lg mb-2">{imagingPathway[imagingStep].step}</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Purpose:</span>
                <p className="text-muted-foreground">{imagingPathway[imagingStep].purpose}</p>
              </div>
              <div>
                <span className="font-medium">Key Findings:</span>
                <p className="text-muted-foreground">{imagingPathway[imagingStep].findings}</p>
              </div>
              <div>
                <span className="font-medium">Next Step:</span>
                <p className="text-muted-foreground">{imagingPathway[imagingStep].nextStep}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posterior Stroke Clues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span>Posterior Stroke Clues</span>
          </CardTitle>
          <CardDescription>Don't miss posterior circulation strokes!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {posteriorStrokeClues.map((clue, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-yellow-500 flex-shrink-0" />
                <span>{clue}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
            <p className="text-sm">
              <strong>Key Point:</strong> Isolated dizziness can be a posterior stroke, especially with risk factors or additional neurologic signs. Consider HINTS exam (Head Impulse, Nystagmus, Test of Skew) when evaluating acute vertigo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
