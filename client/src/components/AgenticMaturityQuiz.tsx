import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  TrendingUp,
  AlertCircle,
  Target
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  questionEn: string;
  options: Array<{
    value: number;
    label: string;
    labelEn: string;
  }>;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quel est le niveau d'automatisation actuel dans votre organisation ?",
    questionEn: "What is the current level of automation in your organization?",
    options: [
      { value: 1, label: "Processus manuels prédominants", labelEn: "Predominantly manual processes" },
      { value: 2, label: "Automatisation basique de tâches répétitives", labelEn: "Basic automation of repetitive tasks" },
      { value: 3, label: "Automatisation avancée avec IA supervisée", labelEn: "Advanced automation with supervised AI" },
      { value: 4, label: "Agents IA autonomes avec prise de décision", labelEn: "Autonomous AI agents with decision-making" }
    ]
  },
  {
    id: 2,
    question: "Comment décririez-vous la culture organisationnelle vis-à-vis de l'IA ?",
    questionEn: "How would you describe your organizational culture regarding AI?",
    options: [
      { value: 1, label: "Résistance ou méconnaissance de l'IA", labelEn: "Resistance or lack of AI knowledge" },
      { value: 2, label: "Curiosité mais adoption limitée", labelEn: "Curiosity but limited adoption" },
      { value: 3, label: "Expérimentation active et soutien managérial", labelEn: "Active experimentation and managerial support" },
      { value: 4, label: "Culture d'innovation IA intégrée à tous les niveaux", labelEn: "AI innovation culture integrated at all levels" }
    ]
  },
  {
    id: 3,
    question: "Disposez-vous d'un cadre de gouvernance pour l'IA ?",
    questionEn: "Do you have an AI governance framework?",
    options: [
      { value: 1, label: "Aucun cadre formalisé", labelEn: "No formal framework" },
      { value: 2, label: "Politiques informelles ou en cours d'élaboration", labelEn: "Informal policies or under development" },
      { value: 3, label: "Cadre de gouvernance établi mais non testé", labelEn: "Established governance framework but untested" },
      { value: 4, label: "Gouvernance mature avec métriques et adaptation continue", labelEn: "Mature governance with metrics and continuous adaptation" }
    ]
  },
  {
    id: 4,
    question: "Quel est le niveau d'expérimentation avec des agents IA ?",
    questionEn: "What is your level of experimentation with AI agents?",
    options: [
      { value: 1, label: "Aucune expérimentation", labelEn: "No experimentation" },
      { value: 2, label: "Projets pilotes isolés", labelEn: "Isolated pilot projects" },
      { value: 3, label: "Plusieurs cas d'usage en test", labelEn: "Multiple use cases being tested" },
      { value: 4, label: "Déploiement en production avec mesure d'impact", labelEn: "Production deployment with impact measurement" }
    ]
  },
  {
    id: 5,
    question: "Comment gérez-vous les données pour alimenter l'IA ?",
    questionEn: "How do you manage data to feed AI?",
    options: [
      { value: 1, label: "Données silotées et non structurées", labelEn: "Siloed and unstructured data" },
      { value: 2, label: "Début de consolidation avec qualité variable", labelEn: "Starting consolidation with variable quality" },
      { value: 3, label: "Infrastructure data centralisée et gouvernée", labelEn: "Centralized and governed data infrastructure" },
      { value: 4, label: "Data mesh ou architecture moderne temps réel", labelEn: "Data mesh or modern real-time architecture" }
    ]
  },
  {
    id: 6,
    question: "Quelle est la capacité de votre organisation à mesurer l'impact de l'IA ?",
    questionEn: "What is your organization's ability to measure AI impact?",
    options: [
      { value: 1, label: "Pas de métriques définies", labelEn: "No defined metrics" },
      { value: 2, label: "Métriques basiques (utilisation, satisfaction)", labelEn: "Basic metrics (usage, satisfaction)" },
      { value: 3, label: "KPIs métier liés à l'IA suivis régulièrement", labelEn: "Business KPIs linked to AI tracked regularly" },
      { value: 4, label: "Dashboard ROI temps réel et optimisation continue", labelEn: "Real-time ROI dashboard and continuous optimization" }
    ]
  },
  {
    id: 7,
    question: "Disposez-vous de compétences internes en IA et agents ?",
    questionEn: "Do you have internal AI and agent expertise?",
    options: [
      { value: 1, label: "Aucune compétence dédiée", labelEn: "No dedicated expertise" },
      { value: 2, label: "Quelques profils techniques isolés", labelEn: "Few isolated technical profiles" },
      { value: 3, label: "Équipe IA structurée avec compétences variées", labelEn: "Structured AI team with varied skills" },
      { value: 4, label: "Centre d'excellence IA avec formation continue", labelEn: "AI center of excellence with continuous training" }
    ]
  }
];

interface MaturityLevel {
  level: string;
  levelEn: string;
  color: string;
  bgColor: string;
  description: string;
  descriptionEn: string;
  recommendations: string[];
  recommendationsEn: string[];
}

const maturityLevels: Record<string, MaturityLevel> = {
  beginner: {
    level: "Débutant",
    levelEn: "Beginner",
    color: "text-red-600",
    bgColor: "bg-red-100",
    description: "Votre organisation est au début de son parcours agentique. Les fondations sont à construire.",
    descriptionEn: "Your organization is at the beginning of its agentic journey. Foundations need to be built.",
    recommendations: [
      "Sensibiliser la direction aux opportunités de l'IA agentique",
      "Évaluer et moderniser l'infrastructure technologique",
      "Développer une vision stratégique pour l'intégration de l'IA",
      "Former les équipes aux concepts de base de l'IA"
    ],
    recommendationsEn: [
      "Raise management awareness of agentic AI opportunities",
      "Assess and modernize technological infrastructure",
      "Develop a strategic vision for AI integration",
      "Train teams on basic AI concepts"
    ]
  },
  emerging: {
    level: "Émergent",
    levelEn: "Emerging",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    description: "Votre organisation expérimente avec l'IA mais manque de structure et de gouvernance.",
    descriptionEn: "Your organization experiments with AI but lacks structure and governance.",
    recommendations: [
      "Établir un cadre de gouvernance IA formel",
      "Lancer des projets pilotes structurés (approche MAO)",
      "Investir dans le développement des compétences",
      "Améliorer l'intégration et la qualité des données"
    ],
    recommendationsEn: [
      "Establish a formal AI governance framework",
      "Launch structured pilot projects (MAO approach)",
      "Invest in skills development",
      "Improve data integration and quality"
    ]
  },
  progressing: {
    level: "En Progression",
    levelEn: "Progressing",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    description: "Votre organisation a des bases solides et est prête pour une transformation agentique structurée.",
    descriptionEn: "Your organization has solid foundations and is ready for structured agentic transformation.",
    recommendations: [
      "Déployer une Organisation Agentique Minimale (MAO)",
      "Étendre les pratiques de collaboration Humain-IA",
      "Renforcer la gouvernance multi-niveaux",
      "Développer les compétences humaniques (créativité, éthique)"
    ],
    recommendationsEn: [
      "Deploy a Minimum Agentic Organization (MAO)",
      "Extend Human-AI collaboration practices",
      "Strengthen multi-level governance",
      "Develop humanic skills (creativity, ethics)"
    ]
  },
  advanced: {
    level: "Avancé",
    levelEn: "Advanced",
    color: "text-green-600",
    bgColor: "bg-green-100",
    description: "Votre organisation est mature et prête pour un déploiement à grande échelle.",
    descriptionEn: "Your organization is mature and ready for large-scale deployment.",
    recommendations: [
      "Déployer le modèle d'Organisation Agentique à grande échelle",
      "Optimiser les modes de collaboration Humain-IA",
      "Devenir un leader d'opinion dans votre secteur",
      "Partager vos apprentissages et meilleures pratiques"
    ],
    recommendationsEn: [
      "Deploy the Agentic Organization model at scale",
      "Optimize Human-AI collaboration modes",
      "Become a thought leader in your industry",
      "Share your learnings and best practices"
    ]
  }
};

function getMaturityLevel(totalScore: number, maxScore: number): MaturityLevel {
  const percentage = (totalScore / maxScore) * 100;
  
  if (percentage < 25) return maturityLevels.beginner;
  if (percentage < 50) return maturityLevels.emerging;
  if (percentage < 75) return maturityLevels.progressing;
  return maturityLevels.advanced;
}

interface AgenticMaturityQuizProps {
  language?: 'fr' | 'en';
  onClose?: () => void;
}

export function AgenticMaturityQuiz({ language = 'fr', onClose }: AgenticMaturityQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const canProceed = answers[question?.id] !== undefined;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (isLastQuestion && canProceed) {
      setShowResults(true);
    } else if (canProceed) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  if (showResults) {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = quizQuestions.length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);
    const maturity = getMaturityLevel(totalScore, maxScore);

    return (
      <Card className="max-w-3xl mx-auto border-2 border-accent">
        <CardHeader className="text-center">
          <div className={`inline-block px-6 py-3 ${maturity.bgColor} rounded-full mb-4`}>
            <span className={`text-xl font-bold ${maturity.color}`}>
              {language === 'fr' ? maturity.level : maturity.levelEn}
            </span>
          </div>
          <CardTitle className="text-3xl text-primary mb-4">
            {language === 'fr' ? 'Votre Score de Maturité Agentique' : 'Your Agentic Maturity Score'}
          </CardTitle>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${percentage * 3.52} 352`}
                  className={maturity.color.replace('text-', 'text-')}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{percentage}%</span>
              </div>
            </div>
          </div>
          <CardDescription className="text-lg">
            {language === 'fr' ? maturity.description : maturity.descriptionEn}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recommendations */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              {language === 'fr' ? 'Recommandations Prioritaires' : 'Priority Recommendations'}
            </h3>
            <ul className="space-y-3">
              {(language === 'fr' ? maturity.recommendations : maturity.recommendationsEn).map((rec, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Section */}
          <Card className="border-2 border-accent/30 bg-gradient-to-r from-accent/5 to-transparent">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-primary mb-3">
                {language === 'fr' 
                  ? 'Prêt à Accélérer Votre Transformation ?' 
                  : 'Ready to Accelerate Your Transformation?'}
              </h4>
              <p className="text-muted-foreground mb-4">
                {language === 'fr'
                  ? 'Nos experts peuvent vous accompagner dans votre parcours agentique avec un atelier de cadrage personnalisé.'
                  : 'Our experts can support you in your agentic journey with a personalized scoping workshop.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/evaluation" className="flex-1">
                  <Button className="w-full bg-gradient-navy hover:opacity-90 gap-2">
                    <Sparkles className="w-4 h-4" />
                    {language === 'fr' ? 'Évaluation Complète' : 'Full Assessment'}
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button className="w-full bg-accent hover:bg-accent/90 gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {language === 'fr' ? 'Planifier un Atelier' : 'Schedule Workshop'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={handleRestart} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {language === 'fr' ? 'Recommencer' : 'Restart'}
            </Button>
            {onClose && (
              <Button variant="ghost" onClick={onClose}>
                {language === 'fr' ? 'Fermer' : 'Close'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            <CardTitle className="text-2xl text-primary">
              {language === 'fr' ? 'Quiz de Maturité Agentique' : 'Agentic Maturity Quiz'}
            </CardTitle>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          )}
        </div>
        <CardDescription>
          {language === 'fr' 
            ? 'Répondez à 7 questions pour découvrir le niveau de maturité agentique de votre organisation'
            : 'Answer 7 questions to discover your organization\'s agentic maturity level'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              {language === 'fr' ? 'Question' : 'Question'} {currentQuestion + 1} / {quizQuestions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">
            {language === 'fr' ? question.question : question.questionEn}
          </h3>
          <RadioGroup
            value={answers[question.id]?.toString() || ""}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div
                key={option.value}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  answers[question.id] === option.value
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/50 hover:bg-secondary"
                }`}
                onClick={() => handleAnswer(option.value.toString())}
              >
                <RadioGroupItem 
                  value={option.value.toString()} 
                  id={`option-${option.value}`}
                  className="mt-1"
                />
                <Label 
                  htmlFor={`option-${option.value}`} 
                  className="flex-1 cursor-pointer text-base"
                >
                  {language === 'fr' ? option.label : option.labelEn}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Info Box */}
        {!canProceed && (
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              {language === 'fr' 
                ? 'Sélectionnez une réponse pour continuer' 
                : 'Select an answer to continue'}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'fr' ? 'Précédent' : 'Previous'}
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="bg-gradient-navy hover:opacity-90 gap-2"
          >
            {isLastQuestion 
              ? (language === 'fr' ? 'Voir les Résultats' : 'See Results')
              : (language === 'fr' ? 'Suivant' : 'Next')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
