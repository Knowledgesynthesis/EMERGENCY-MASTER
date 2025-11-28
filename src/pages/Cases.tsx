import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { FileText, ChevronRight } from 'lucide-react';

interface CaseScenario {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  initialPresentation: string;
  steps: CaseStep[];
}

interface CaseStep {
  id: number;
  description: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function Cases() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const cases: CaseScenario[] = [
    {
      id: 'case1',
      title: 'Chest Pain in the ED',
      category: 'ACS',
      difficulty: 'Intermediate',
      initialPresentation: '68 y/o male presents with 2 hours of substernal chest pressure radiating to left arm. He is diaphoretic and appears uncomfortable.',
      steps: [
        {
          id: 1,
          description: 'Vital signs: BP 148/92, HR 98, RR 20, SpO2 96% on RA. Patient rates pain 8/10.',
          question: 'What is the most appropriate FIRST step?',
          options: [
            'Order troponin and wait for results',
            'Obtain 12-lead ECG immediately',
            'Start nitroglycerin and reassess',
            'Order chest X-ray to rule out pneumothorax',
          ],
          correctAnswer: 1,
          explanation: 'ECG should be obtained within 10 minutes of arrival for suspected ACS. ECG findings guide immediate management and activation of catheterization lab if STEMI is present.',
        },
        {
          id: 2,
          description: 'ECG shows ST-elevation in leads V2, V3, V4. Troponin is elevated.',
          question: 'What is the diagnosis?',
          options: [
            'NSTEMI',
            'Unstable angina',
            'STEMI - Anterior wall',
            'Pericarditis',
          ],
          correctAnswer: 2,
          explanation: 'ST-elevation in anterior leads (V2-V4) indicates STEMI affecting the anterior wall, likely due to LAD occlusion. This requires immediate reperfusion therapy.',
        },
        {
          id: 3,
          description: 'You have confirmed anterior STEMI.',
          question: 'What is the next critical action?',
          options: [
            'Admit to telemetry and monitor',
            'Activate cardiac catheterization lab',
            'Start heparin drip and observe',
            'Repeat ECG in 30 minutes',
          ],
          correctAnswer: 1,
          explanation: 'STEMI requires immediate reperfusion therapy. Activating the cath lab for primary PCI is the priority in facilities with this capability. Time to reperfusion directly impacts outcomes.',
        },
      ],
    },
    {
      id: 'case2',
      title: 'Sudden Weakness and Speech Difficulty',
      category: 'Stroke',
      difficulty: 'Advanced',
      initialPresentation: '72 y/o female brought in by EMS with sudden onset right-sided weakness and difficulty speaking. Last known well was 90 minutes ago.',
      steps: [
        {
          id: 1,
          description: 'FAST exam shows left facial droop, right arm drift, and expressive aphasia.',
          question: 'What imaging should be obtained FIRST?',
          options: [
            'MRI brain with diffusion-weighted imaging',
            'Non-contrast CT head',
            'CT angiography head and neck',
            'Carotid ultrasound',
          ],
          correctAnswer: 1,
          explanation: 'Non-contrast CT head is the first imaging study to rule out hemorrhage before considering thrombolytic therapy. It is fast and readily available.',
        },
        {
          id: 2,
          description: 'CT head shows no hemorrhage. Patient is within the time window for intervention.',
          question: 'What should be done next?',
          options: [
            'Admit to stroke unit for observation',
            'Proceed with CTA to evaluate for large vessel occlusion',
            'Start aspirin immediately',
            'Wait 24 hours before further intervention',
          ],
          correctAnswer: 1,
          explanation: 'After ruling out hemorrhage, CTA should be obtained to identify large vessel occlusion (LVO) which may be amenable to thrombectomy. This guides further treatment decisions.',
        },
      ],
    },
    {
      id: 'case3',
      title: 'Fever and Hypotension',
      category: 'Sepsis',
      difficulty: 'Intermediate',
      initialPresentation: '65 y/o male with fever, confusion, and hypotension. He has a history of diabetes and was recently treated for a UTI.',
      steps: [
        {
          id: 1,
          description: 'Vitals: BP 82/48, HR 128, Temp 39.8°C, RR 26. Lactate is 4.2 mmol/L.',
          question: 'What is the most likely diagnosis?',
          options: [
            'Hypovolemic shock',
            'Septic shock',
            'Cardiogenic shock',
            'Neurogenic shock',
          ],
          correctAnswer: 1,
          explanation: 'Fever, hypotension, elevated lactate, and suspected infection (recent UTI) indicate septic shock. This requires immediate resuscitation and broad-spectrum antibiotics.',
        },
        {
          id: 2,
          description: 'You diagnose septic shock from urinary source.',
          question: 'What is the appropriate initial fluid resuscitation?',
          options: [
            '250 mL bolus and reassess',
            'No fluids, start vasopressors immediately',
            '30 mL/kg crystalloid bolus',
            'Albumin only',
          ],
          correctAnswer: 2,
          explanation: 'Sepsis bundles recommend 30 mL/kg crystalloid within the first 3 hours for septic shock. Reassess frequently and titrate to response.',
        },
      ],
    },
    {
      id: 'case4',
      title: 'RLQ Pain in Young Adult',
      category: 'Acute Abdomen',
      difficulty: 'Beginner',
      initialPresentation: '22 y/o female with 24 hours of periumbilical pain that has migrated to RLQ. She has nausea and low-grade fever.',
      steps: [
        {
          id: 1,
          description: 'Exam shows RLQ tenderness with rebound and guarding. Rovsing sign is positive.',
          question: 'What is the most likely diagnosis?',
          options: [
            'Ovarian cyst',
            'Acute appendicitis',
            'Gastroenteritis',
            'Kidney stone',
          ],
          correctAnswer: 1,
          explanation: 'Periumbilical pain migrating to RLQ with peritoneal signs is classic for acute appendicitis. Positive Rovsing sign further supports this diagnosis.',
        },
        {
          id: 2,
          description: 'CT shows inflamed appendix with surrounding fat stranding.',
          question: 'What is the appropriate management?',
          options: [
            'Discharge with antibiotics',
            'Observe for 24 hours',
            'Surgical consultation for appendectomy',
            'Colonoscopy',
          ],
          correctAnswer: 2,
          explanation: 'Acute appendicitis confirmed by imaging requires surgical consultation for appendectomy to prevent perforation and peritonitis.',
        },
      ],
    },
  ];

  const currentCase = selectedCase !== null ? cases[selectedCase] : null;
  const currentCaseStep = currentCase ? currentCase.steps[currentStep] : null;

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNextStep = () => {
    if (currentCase && currentStep < currentCase.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleBackToCases = () => {
    setSelectedCase(null);
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-blue-500/10 p-3">
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Case Simulations</h1>
            <p className="text-muted-foreground">
              Practice with branching emergency scenarios and clinical reasoning
            </p>
          </div>
        </div>
      </div>

      {/* Cases List */}
      {selectedCase === null && (
        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((caseItem, index) => (
            <div key={caseItem.id} onClick={() => setSelectedCase(index)}>
              <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{caseItem.title}</CardTitle>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline">{caseItem.category}</Badge>
                    <Badge
                      variant={
                        caseItem.difficulty === 'Beginner'
                          ? 'success'
                          : caseItem.difficulty === 'Intermediate'
                          ? 'warning'
                          : 'destructive'
                      }
                    >
                      {caseItem.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{caseItem.initialPresentation}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Case Player */}
      {selectedCase !== null && currentCase && currentCaseStep && (
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={handleBackToCases} className="mb-6">
            ← Back to Cases
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl">{currentCase.title}</CardTitle>
                <Badge variant="outline">
                  Step {currentStep + 1} of {currentCase.steps.length}
                </Badge>
              </div>
              <CardDescription>{currentCase.initialPresentation}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step {currentStep + 1}</CardTitle>
              <CardDescription>{currentCaseStep.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-semibold mb-4">{currentCaseStep.question}</h3>
                <div className="space-y-3">
                  {currentCaseStep.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedAnswer === index
                          ? index === currentCaseStep.correctAnswer
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                          : showExplanation && index === currentCaseStep.correctAnswer
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-border hover:border-primary hover:bg-accent'
                      } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {showExplanation && (
                <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/50">
                  <h4 className="font-semibold mb-2">Explanation</h4>
                  <p className="text-sm">{currentCaseStep.explanation}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={handleRestart}>
                  Restart Case
                </Button>
                {showExplanation && currentStep < currentCase.steps.length - 1 && (
                  <Button onClick={handleNextStep}>
                    Next Step
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {showExplanation && currentStep === currentCase.steps.length - 1 && (
                  <Button onClick={handleBackToCases}>Complete</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
