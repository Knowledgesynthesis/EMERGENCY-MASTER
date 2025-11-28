import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { useThemeStore } from '../store/themeStore';
import { Settings as SettingsIcon, Sun, Moon, Info, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="rounded-lg bg-gray-500/10 p-3">
            <SettingsIcon className="h-8 w-8 text-gray-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Customize your app experience
            </p>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the visual theme of the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Current theme: {theme === 'dark' ? 'Dark' : 'Light'}
                </p>
              </div>
            </div>
            <Button onClick={toggleTheme} variant="outline">
              {theme === 'dark' ? (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Switch to Light
                </>
              ) : (
                <>
                  <Moon className="mr-2 h-4 w-4" />
                  Switch to Dark
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>About Emergency Master</span>
          </CardTitle>
          <CardDescription>Learn more about this educational platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Purpose</h3>
              <p className="text-muted-foreground">
                Emergency Master is a comprehensive educational platform designed to teach emergency medicine
                concepts, clinical reasoning, and diagnostic pathways for life-threatening conditions. The app
                covers high-yield topics across internal medicine, critical care, neurology, pulmonology,
                OB/GYN, and infectious disease.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Interactive case-based learning modules for 9 critical emergency conditions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Clinical decision tools and risk calculators (Wells score, CURB-65, SOFA, etc.)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Branching case simulations to practice clinical reasoning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Comprehensive assessment questions with detailed explanations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Glossary of emergency medicine terms and concepts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Mobile-first design for learning on-the-go</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Target Audience</h3>
              <p className="text-muted-foreground">
                This app is designed for medical students, emergency medicine residents, internal medicine
                residents, and healthcare professionals studying for board examinations or seeking to improve
                their emergency medicine knowledge.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Version</h3>
              <p className="text-muted-foreground">Emergency Master v1.0.0</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimers */}
      <Card className="border-yellow-500/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-500">
            <AlertTriangle className="h-5 w-5" />
            <span>Important Disclaimers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
              <h3 className="font-semibold mb-2">Educational Use Only</h3>
              <p className="text-muted-foreground">
                <strong>This application is for educational purposes only.</strong> It is not intended to be
                used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the
                advice of qualified healthcare providers with any questions regarding medical conditions or
                patient care.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
              <h3 className="font-semibold mb-2">No Treatment Recommendations</h3>
              <p className="text-muted-foreground">
                This app does not provide specific medication dosing, treatment protocols, or clinical management
                recommendations. All clinical content is presented in a conceptual, educational framework using
                synthetic patient data. Never use this app to make real patient care decisions.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
              <h3 className="font-semibold mb-2">Synthetic Data</h3>
              <p className="text-muted-foreground">
                All patient cases, vital signs, laboratory values, and imaging descriptions presented in this
                app are synthetic and created for educational purposes. They do not represent real patients or
                actual clinical encounters.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
              <h3 className="font-semibold mb-2">Clinical Guidelines</h3>
              <p className="text-muted-foreground">
                While content is informed by established clinical guidelines and evidence-based medicine, it is
                presented in a simplified educational format. Always refer to current, official clinical practice
                guidelines and institutional protocols for actual patient care.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
              <h3 className="font-semibold mb-2">Liability</h3>
              <p className="text-muted-foreground">
                The developers and distributors of this application assume no liability for any injury, loss,
                or damage incurred as a consequence, directly or indirectly, of the use or application of any
                information contained in this app. Users assume full responsibility for their use of this
                educational tool.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/50">
              <h3 className="font-semibold mb-2">Emergency Situations</h3>
              <p className="text-muted-foreground">
                <strong>In case of a medical emergency, always call emergency services (911 in the US) immediately.</strong>
                Do not rely on this app for guidance in actual emergency situations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Privacy & Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Emergency Master does not collect, store, or transmit any personal data, usage statistics, or user
            information. All app functionality is local to your device. Your theme preference is stored locally
            in your browser's local storage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
