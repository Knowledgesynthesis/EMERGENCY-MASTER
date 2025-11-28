import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: string;
  category: string;
  type: 'MCQ' | 'Vignette';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function Assessment() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const questions: Question[] = [
    {
      id: 'q1',
      category: 'ACS',
      type: 'MCQ',
      question: 'A 65-year-old male presents with crushing chest pain radiating to the left arm. ECG shows ST-elevation in leads II, III, and aVF. What is the most likely diagnosis?',
      options: [
        'Anterior STEMI',
        'Inferior STEMI',
        'Lateral STEMI',
        'Posterior STEMI',
      ],
      correctAnswer: 1,
      explanation: 'ST-elevation in leads II, III, and aVF indicates inferior wall STEMI, typically due to right coronary artery occlusion.',
    },
    {
      id: 'q2',
      category: 'Stroke',
      type: 'Vignette',
      question: 'A 70-year-old woman has sudden onset right-sided weakness and aphasia. Last known well was 2 hours ago. Non-contrast CT shows no hemorrhage. What is the next best step?',
      options: [
        'Admit for observation',
        'Start aspirin and discharge',
        'CTA to evaluate for large vessel occlusion',
        'MRI brain before any intervention',
      ],
      correctAnswer: 2,
      explanation: 'After ruling out hemorrhage with CT, CTA should be performed to identify large vessel occlusion which may be amenable to thrombectomy, especially within the intervention window.',
    },
    {
      id: 'q3',
      category: 'Sepsis',
      type: 'MCQ',
      question: 'Which of the following is a component of the SOFA score?',
      options: [
        'Temperature',
        'White blood cell count',
        'PaO2/FiO2 ratio',
        'Heart rate',
      ],
      correctAnswer: 2,
      explanation: 'The SOFA score includes respiratory function (PaO2/FiO2), coagulation (platelets), liver function (bilirubin), cardiovascular (hypotension/pressors), CNS (GCS), and renal function (creatinine/urine output). Temperature, WBC, and heart rate are not SOFA components.',
    },
    {
      id: 'q4',
      category: 'DKA/HHS',
      type: 'MCQ',
      question: 'What is the KEY distinguishing feature between DKA and HHS?',
      options: [
        'Glucose level',
        'Presence of ketones and degree of acidosis',
        'Patient age',
        'Insulin deficiency',
      ],
      correctAnswer: 1,
      explanation: 'The key distinction is that DKA has significant ketosis and metabolic acidosis (pH < 7.30), while HHS has minimal ketones and normal or near-normal pH despite severe hyperglycemia.',
    },
    {
      id: 'q5',
      category: 'PE',
      type: 'Vignette',
      question: 'A 45-year-old woman with recent long flight has dyspnea and pleuritic chest pain. Wells score is 1.5. All PERC criteria are met. What is the appropriate next step?',
      options: [
        'CTPA immediately',
        'D-dimer',
        'VQ scan',
        'PE ruled out, no further testing',
      ],
      correctAnswer: 3,
      explanation: 'With low Wells score (< 2) and all PERC criteria met (negative PERC rule), PE is effectively ruled out and no further testing is needed.',
    },
    {
      id: 'q6',
      category: 'Pneumonia',
      type: 'MCQ',
      question: 'Which finding on CURB-65 indicates a score of 1 point?',
      options: [
        'Age > 50',
        'Heart rate > 100',
        'Respiratory rate ≥ 30',
        'WBC > 15K',
      ],
      correctAnswer: 2,
      explanation: 'CURB-65 includes: Confusion, Urea > 7 mmol/L (BUN > 19), Respiratory rate ≥ 30, Blood pressure (SBP < 90 or DBP ≤ 60), and age ≥ 65. Each criterion scores 1 point.',
    },
    {
      id: 'q7',
      category: 'Acute Abdomen',
      type: 'MCQ',
      question: 'A patient has RLQ pain that worsens when you palpate the LLQ. What sign is this?',
      options: [
        'McBurney sign',
        'Rovsing sign',
        'Psoas sign',
        'Murphy sign',
      ],
      correctAnswer: 1,
      explanation: 'Rovsing sign is RLQ pain elicited by palpation of the LLQ, indicating peritoneal irritation and is suggestive of appendicitis.',
    },
    {
      id: 'q8',
      category: 'Acute Abdomen',
      type: 'Vignette',
      question: 'A 58-year-old with fever, jaundice, RUQ pain, and altered mental status. What is the most likely diagnosis?',
      options: [
        'Acute cholecystitis',
        'Choledocholithiasis',
        'Acute cholangitis (Reynold pentad)',
        'Acute hepatitis',
      ],
      correctAnswer: 2,
      explanation: 'Reynold pentad is Charcot triad (fever, jaundice, RUQ pain) plus hypotension and altered mental status, indicating severe ascending cholangitis with septic shock.',
    },
    {
      id: 'q9',
      category: 'Ectopic',
      type: 'MCQ',
      question: 'At what β-hCG level should an intrauterine pregnancy be visible on transvaginal ultrasound?',
      options: [
        '500-1000 mIU/mL',
        '1500-2000 mIU/mL',
        '3000-4000 mIU/mL',
        '5000-6000 mIU/mL',
      ],
      correctAnswer: 1,
      explanation: 'The discriminatory zone is typically 1500-2000 mIU/mL. Above this level, an IUP should be visualized on transvaginal ultrasound if the pregnancy is intrauterine.',
    },
    {
      id: 'q10',
      category: 'Preeclampsia',
      type: 'MCQ',
      question: 'Which of the following is a severe feature of preeclampsia?',
      options: [
        'BP 142/92',
        'Mild headache',
        'Platelets < 100 K/μL',
        'Trace pedal edema',
      ],
      correctAnswer: 2,
      explanation: 'Thrombocytopenia (platelets < 100 K/μL) is a severe feature indicating HELLP syndrome or severe preeclampsia. Other severe features include BP ≥ 160/110, severe headache, visual changes, elevated liver enzymes, and renal insufficiency.',
    },
  ];

  const categories = ['All', ...Array.from(new Set(questions.map(q => q.category)))];

  const filteredQuestions = selectedCategory === 'All'
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  const currentQ = filteredQuestions[currentQuestion];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-green-500/10 p-3">
            <BookOpen className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Assessment</h1>
            <p className="text-muted-foreground">
              Test your knowledge with MCQs and clinical vignettes
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filter by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">
                Question {currentQuestion + 1} of {filteredQuestions.length}
              </Badge>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{currentQ.category}</Badge>
                <Badge variant="outline">{currentQ.type}</Badge>
              </div>
            </div>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedAnswer === index
                        ? index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-red-500 bg-red-500/10'
                        : showExplanation && index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-border hover:border-primary hover:bg-accent'
                    } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                      <span>{option}</span>
                      {showExplanation && index === currentQ.correctAnswer && (
                        <CheckCircle className="ml-auto h-5 w-5 text-green-500 flex-shrink-0" />
                      )}
                      {selectedAnswer === index && index !== currentQ.correctAnswer && (
                        <XCircle className="ml-auto h-5 w-5 text-red-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/50">
                <h4 className="font-semibold mb-2 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Explanation</span>
                </h4>
                <p className="text-sm">{currentQ.explanation}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {filteredQuestions.length}
              </span>
              <Button
                onClick={handleNext}
                disabled={currentQuestion === filteredQuestions.length - 1}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
          <p className="text-sm text-center">
            ℹ️ This assessment is for educational purposes only. No scores are tracked or saved.
          </p>
        </div>
      </div>
    </div>
  );
}
