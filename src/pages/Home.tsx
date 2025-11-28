import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card';
import {
  Heart,
  Brain,
  Droplet,
  Activity,
  Wind,
  Airplay,
  Baby,
  HeartPulse,
  AlertTriangle,
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: any;
  color: string;
}

export default function Home() {
  const modules: Module[] = [
    {
      id: 'acs',
      title: 'ACS / MI',
      description: 'Acute Coronary Syndrome & Myocardial Infarction - ECG patterns, biomarkers, and risk stratification',
      href: '/acs',
      icon: Heart,
      color: 'text-red-500',
    },
    {
      id: 'stroke',
      title: 'Stroke',
      description: 'FAST exam, ischemic vs hemorrhagic, and imaging workflow for acute stroke management',
      href: '/stroke',
      icon: Brain,
      color: 'text-purple-500',
    },
    {
      id: 'sepsis',
      title: 'Sepsis',
      description: 'Early recognition, severity assessment, and source identification in septic patients',
      href: '/sepsis',
      icon: Droplet,
      color: 'text-orange-500',
    },
    {
      id: 'dka-hhs',
      title: 'DKA / HHS',
      description: 'Diabetic Ketoacidosis & Hyperosmolar Hyperglycemic State - metabolic crisis differentiation',
      href: '/dka-hhs',
      icon: Activity,
      color: 'text-blue-500',
    },
    {
      id: 'pe',
      title: 'Pulmonary Embolism',
      description: 'Wells score, PERC rule, and diagnostic pathway for PE evaluation',
      href: '/pe',
      icon: Wind,
      color: 'text-cyan-500',
    },
    {
      id: 'pneumonia',
      title: 'Pneumonia',
      description: 'CAP vs HAP differentiation, severity scoring, and pattern recognition',
      href: '/pneumonia',
      icon: Airplay,
      color: 'text-green-500',
    },
    {
      id: 'acute-abdomen',
      title: 'Acute Abdomen',
      description: 'Appendicitis, cholecystitis, cholangitis - peritoneal signs and imaging findings',
      href: '/acute-abdomen',
      icon: AlertTriangle,
      color: 'text-yellow-500',
    },
    {
      id: 'ectopic',
      title: 'Ectopic Pregnancy',
      description: 'β-hCG interpretation, ultrasound patterns, and rupture red flags',
      href: '/ectopic',
      icon: Baby,
      color: 'text-pink-500',
    },
    {
      id: 'preeclampsia',
      title: 'Preeclampsia / Eclampsia',
      description: 'Severe features, lab patterns, and seizure recognition in pregnancy',
      href: '/preeclampsia',
      icon: HeartPulse,
      color: 'text-rose-500',
    },
  ];

  return (
    <div className="container-custom py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Emergency Master
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          A comprehensive emergency medicine education platform covering high-yield, life-threatening conditions.
          Master rapid triage, danger-sign recognition, and diagnostic pathways.
        </p>
      </div>

      {/* Emergency Modules Grid */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Emergency Modules</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link key={module.id} to={module.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <div className="mb-2 flex items-center space-x-3">
                      <div className={`rounded-lg bg-secondary p-2 ${module.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                    </div>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Learning Tools</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <Link to="/cases">
            <Card className="transition-all hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg">Case Simulations</CardTitle>
                <CardDescription>
                  Practice with branching emergency scenarios and real-world clinical reasoning
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/assessment">
            <Card className="transition-all hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg">Assessment</CardTitle>
                <CardDescription>
                  Test your knowledge with MCQs, vignettes, and lab interpretation questions
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/glossary">
            <Card className="transition-all hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-lg">Glossary</CardTitle>
                <CardDescription>
                  Quick reference for emergency medicine terms, scores, and criteria
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-6">
        <h3 className="mb-2 font-semibold text-yellow-600 dark:text-yellow-500">
          ⚠️ Educational Use Only
        </h3>
        <p className="text-sm text-muted-foreground">
          This application is designed for educational purposes only. All clinical scenarios use synthetic data.
          This tool should not be used for actual patient care, diagnosis, or treatment decisions.
          Always consult with qualified healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
}
