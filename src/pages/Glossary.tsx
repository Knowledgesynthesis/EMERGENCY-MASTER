import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { BookOpen, Search } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  clinicalContext?: string;
}

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const glossaryTerms: GlossaryTerm[] = [
    {
      term: 'STEMI',
      category: 'ACS',
      definition: 'ST-Elevation Myocardial Infarction',
      clinicalContext: 'Acute MI with ST-segment elevation on ECG, indicating complete coronary artery occlusion requiring immediate reperfusion therapy.',
    },
    {
      term: 'NSTEMI',
      category: 'ACS',
      definition: 'Non-ST-Elevation Myocardial Infarction',
      clinicalContext: 'Myocardial infarction with elevated cardiac biomarkers but without ST-segment elevation. May have ST-depression or T-wave changes.',
    },
    {
      term: 'Troponin',
      category: 'ACS',
      definition: 'Cardiac biomarker released during myocardial injury',
      clinicalContext: 'Sensitive and specific marker for myocardial damage. Elevated in MI, but also in other conditions causing cardiac strain.',
    },
    {
      term: 'FAST Exam',
      category: 'Stroke',
      definition: 'Face, Arms, Speech, Time',
      clinicalContext: 'Rapid screening tool for stroke. Assess facial droop, arm drift, speech abnormalities, and note time of onset.',
    },
    {
      term: 'LVO',
      category: 'Stroke',
      definition: 'Large Vessel Occlusion',
      clinicalContext: 'Blockage of major intracranial artery (MCA, ICA, basilar). May be amenable to mechanical thrombectomy.',
    },
    {
      term: 'tPA',
      category: 'Stroke',
      definition: 'Tissue Plasminogen Activator',
      clinicalContext: 'Thrombolytic medication used in acute ischemic stroke within 4.5 hours of symptom onset (educational reference only).',
    },
    {
      term: 'SOFA Score',
      category: 'Sepsis',
      definition: 'Sequential Organ Failure Assessment',
      clinicalContext: 'Scoring system to assess degree of organ dysfunction in sepsis. Includes respiratory, coagulation, liver, cardiovascular, CNS, and renal function.',
    },
    {
      term: 'qSOFA',
      category: 'Sepsis',
      definition: 'Quick SOFA',
      clinicalContext: 'Bedside screening tool: altered mental status, SBP ≤ 100, RR ≥ 22. Two or more criteria suggest increased risk of poor outcomes.',
    },
    {
      term: 'Lactate',
      category: 'Sepsis',
      definition: 'Byproduct of anaerobic metabolism',
      clinicalContext: 'Elevated in sepsis/shock due to tissue hypoperfusion. Levels > 2 mmol/L indicate higher severity, > 4 very high risk.',
    },
    {
      term: 'Anion Gap',
      category: 'DKA/HHS',
      definition: 'Difference between measured cations and anions',
      clinicalContext: 'Calculated as [Na] - ([Cl] + [HCO3]). Elevated in DKA due to ketoacid accumulation. Normal range typically 8-12.',
    },
    {
      term: 'Ketones',
      category: 'DKA/HHS',
      definition: 'Acidic byproducts of fat metabolism',
      clinicalContext: 'Produced when insulin is insufficient. Strongly positive in DKA, absent or trace in HHS.',
    },
    {
      term: 'Osmolality',
      category: 'DKA/HHS',
      definition: 'Measure of solute concentration in serum',
      clinicalContext: 'Markedly elevated (> 320 mOsm/kg) in HHS due to severe hyperglycemia and dehydration. Variable in DKA.',
    },
    {
      term: 'Wells Score',
      category: 'PE',
      definition: 'Clinical prediction rule for PE probability',
      clinicalContext: 'Stratifies pretest probability of PE. Score > 4 = high risk, proceed to CTPA. Score < 2 = low risk, consider PERC or D-dimer.',
    },
    {
      term: 'PERC Rule',
      category: 'PE',
      definition: 'Pulmonary Embolism Rule-out Criteria',
      clinicalContext: 'Eight criteria that, if ALL met in LOW-risk patients, effectively rule out PE without further testing.',
    },
    {
      term: 'D-dimer',
      category: 'PE',
      definition: 'Fibrin degradation product',
      clinicalContext: 'High sensitivity but low specificity for VTE. Useful for ruling out PE in low/moderate risk patients when negative.',
    },
    {
      term: 'CURB-65',
      category: 'Pneumonia',
      definition: 'Confusion, Urea, Respiratory rate, Blood pressure, age ≥ 65',
      clinicalContext: 'Severity score for CAP. Score 0-1: outpatient treatment. Score 2: consider admission. Score 3-5: severe, hospitalize.',
    },
    {
      term: 'CAP',
      category: 'Pneumonia',
      definition: 'Community-Acquired Pneumonia',
      clinicalContext: 'Pneumonia acquired outside healthcare settings. Common pathogens: S. pneumoniae, H. influenzae, atypicals.',
    },
    {
      term: 'HAP',
      category: 'Pneumonia',
      definition: 'Hospital-Acquired Pneumonia',
      clinicalContext: 'Pneumonia developing ≥ 48 hours after hospital admission. Higher risk of resistant organisms (MRSA, Pseudomonas).',
    },
    {
      term: 'Rovsing Sign',
      category: 'Acute Abdomen',
      definition: 'RLQ pain elicited by LLQ palpation',
      clinicalContext: 'Indicates peritoneal irritation, suggestive of acute appendicitis.',
    },
    {
      term: 'Murphy Sign',
      category: 'Acute Abdomen',
      definition: 'Inspiratory arrest during RUQ palpation',
      clinicalContext: 'Patient stops breathing in due to pain when palpating inflamed gallbladder. Highly specific for acute cholecystitis.',
    },
    {
      term: 'Charcot Triad',
      category: 'Acute Abdomen',
      definition: 'Fever, jaundice, RUQ pain',
      clinicalContext: 'Classic triad for acute cholangitis (ascending biliary infection). Reynold pentad adds hypotension and altered mental status.',
    },
    {
      term: 'Discriminatory Zone',
      category: 'Ectopic',
      definition: 'β-hCG threshold for IUP visualization',
      clinicalContext: 'Typically 1500-2000 mIU/mL. Above this, an IUP should be visible on transvaginal ultrasound if pregnancy is intrauterine.',
    },
    {
      term: 'β-hCG',
      category: 'Ectopic',
      definition: 'Beta-human chorionic gonadotropin',
      clinicalContext: 'Hormone produced by placenta. Levels double every 48-72 hours in normal early pregnancy. Used to evaluate pregnancy location and viability.',
    },
    {
      term: 'HELLP Syndrome',
      category: 'Preeclampsia',
      definition: 'Hemolysis, Elevated Liver enzymes, Low Platelets',
      clinicalContext: 'Severe variant of preeclampsia with high maternal/fetal morbidity. Often presents with RUQ pain and elevated LFTs.',
    },
    {
      term: 'Severe Features',
      category: 'Preeclampsia',
      definition: 'Criteria indicating severe preeclampsia',
      clinicalContext: 'Includes: BP ≥ 160/110, thrombocytopenia, elevated LFTs, renal insufficiency, pulmonary edema, cerebral/visual symptoms.',
    },
    {
      term: 'Eclampsia',
      category: 'Preeclampsia',
      definition: 'Preeclampsia with new-onset seizures',
      clinicalContext: 'Life-threatening complication of preeclampsia. Grand mal seizures without other attributable cause. Requires immediate intervention.',
    },
  ];

  const categories = ['All', ...Array.from(new Set(glossaryTerms.map(t => t.category)))];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort alphabetically
  const sortedTerms = [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-purple-500/10 p-3">
            <BookOpen className="h-8 w-8 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Glossary</h1>
            <p className="text-muted-foreground">
              Quick reference for emergency medicine terms, scores, and criteria
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {sortedTerms.length} of {glossaryTerms.length} terms
      </div>

      {/* Glossary Terms */}
      <div className="grid gap-4 md:grid-cols-2">
        {sortedTerms.map((term, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{term.term}</CardTitle>
                <Badge variant="outline">{term.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-semibold">Definition:</span>
                  <p className="text-sm text-muted-foreground mt-1">{term.definition}</p>
                </div>
                {term.clinicalContext && (
                  <div>
                    <span className="text-sm font-semibold">Clinical Context:</span>
                    <p className="text-sm text-muted-foreground mt-1">{term.clinicalContext}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedTerms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No terms found matching your search.</p>
        </div>
      )}
    </div>
  );
}
