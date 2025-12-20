import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { RadarChart } from "@/components/RadarChart";
import { HeatmapChart } from "@/components/HeatmapChart";
import { BenchmarkComparison } from "@/components/BenchmarkComparison";
import { StrengthsWeaknesses } from "@/components/StrengthsWeaknesses";
import { DetailedRecommendations } from "@/components/DetailedRecommendations";
import { SectorSelector } from "@/components/SectorSelector";
import { SectorComparison } from "@/components/SectorComparison";
import { SectorRecommendations } from "@/components/SectorRecommendations";
import { 
  Network, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  TrendingUp,
  Target,
  Users,
  Shield,
  Brain,
  Layers,
  Download,
  Share2,
  RotateCcw,
  MessageSquare,
  Globe
} from "lucide-react";

// Assessment Questions with translation keys
const assessmentQuestions = [
  {
    id: 1,
    categoryKey: "assessment.category.culture",
    icon: Users,
    questionKey: "assessment.q1",
    options: [
      { value: 1, labelKey: "assessment.q1.o1" },
      { value: 2, labelKey: "assessment.q1.o2" },
      { value: 3, labelKey: "assessment.q1.o3" },
      { value: 4, labelKey: "assessment.q1.o4" }
    ]
  },
  {
    id: 2,
    categoryKey: "assessment.category.culture",
    icon: Users,
    questionKey: "assessment.q2",
    options: [
      { value: 1, labelKey: "assessment.q2.o1" },
      { value: 2, labelKey: "assessment.q2.o2" },
      { value: 3, labelKey: "assessment.q2.o3" },
      { value: 4, labelKey: "assessment.q2.o4" }
    ]
  },
  {
    id: 3,
    categoryKey: "assessment.category.tech",
    icon: Layers,
    questionKey: "assessment.q3",
    options: [
      { value: 1, labelKey: "assessment.q3.o1" },
      { value: 2, labelKey: "assessment.q3.o2" },
      { value: 3, labelKey: "assessment.q3.o3" },
      { value: 4, labelKey: "assessment.q3.o4" }
    ]
  },
  {
    id: 4,
    categoryKey: "assessment.category.tech",
    icon: Layers,
    questionKey: "assessment.q4",
    options: [
      { value: 1, labelKey: "assessment.q4.o1" },
      { value: 2, labelKey: "assessment.q4.o2" },
      { value: 3, labelKey: "assessment.q4.o3" },
      { value: 4, labelKey: "assessment.q4.o4" }
    ]
  },
  {
    id: 5,
    categoryKey: "assessment.category.governance",
    icon: Shield,
    questionKey: "assessment.q5",
    options: [
      { value: 1, labelKey: "assessment.q5.o1" },
      { value: 2, labelKey: "assessment.q5.o2" },
      { value: 3, labelKey: "assessment.q5.o3" },
      { value: 4, labelKey: "assessment.q5.o4" }
    ]
  },
  {
    id: 6,
    categoryKey: "assessment.category.governance",
    icon: Shield,
    questionKey: "assessment.q6",
    options: [
      { value: 1, labelKey: "assessment.q6.o1" },
      { value: 2, labelKey: "assessment.q6.o2" },
      { value: 3, labelKey: "assessment.q6.o3" },
      { value: 4, labelKey: "assessment.q6.o4" }
    ]
  },
  {
    id: 7,
    categoryKey: "assessment.category.skills",
    icon: Brain,
    questionKey: "assessment.q7",
    options: [
      { value: 1, labelKey: "assessment.q7.o1" },
      { value: 2, labelKey: "assessment.q7.o2" },
      { value: 3, labelKey: "assessment.q7.o3" },
      { value: 4, labelKey: "assessment.q7.o4" }
    ]
  },
  {
    id: 8,
    categoryKey: "assessment.category.skills",
    icon: Brain,
    questionKey: "assessment.q8",
    options: [
      { value: 1, labelKey: "assessment.q8.o1" },
      { value: 2, labelKey: "assessment.q8.o2" },
      { value: 3, labelKey: "assessment.q8.o3" },
      { value: 4, labelKey: "assessment.q8.o4" }
    ]
  },
  {
    id: 9,
    categoryKey: "assessment.category.collaboration",
    icon: Target,
    questionKey: "assessment.q9",
    options: [
      { value: 1, labelKey: "assessment.q9.o1" },
      { value: 2, labelKey: "assessment.q9.o2" },
      { value: 3, labelKey: "assessment.q9.o3" },
      { value: 4, labelKey: "assessment.q9.o4" }
    ]
  },
  {
    id: 10,
    categoryKey: "assessment.category.collaboration",
    icon: Target,
    questionKey: "assessment.q10",
    options: [
      { value: 1, labelKey: "assessment.q10.o1" },
      { value: 2, labelKey: "assessment.q10.o2" },
      { value: 3, labelKey: "assessment.q10.o3" },
      { value: 4, labelKey: "assessment.q10.o4" }
    ]
  }
];

// Score interpretation
function useScoreInterpretation(score: number) {
  const { t, language } = useLanguage();
  const percentage = (score / 40) * 100;
  
  if (percentage < 25) {
    return {
      level: t("assessment.level.beginner"),
      levelKey: "beginner",
      color: "text-red-600",
      bgColor: "bg-red-100",
      description: t("assessment.level.beginner.description"),
      recommendations: language === "fr" ? [
        "Commencer par sensibiliser la direction aux opportunités de l'IA",
        "Évaluer et moderniser l'infrastructure technologique",
        "Développer une vision stratégique pour l'intégration de l'IA",
        "Former les équipes aux concepts de base de l'IA"
      ] : [
        "Start by raising management awareness of AI opportunities",
        "Evaluate and modernize technological infrastructure",
        "Develop a strategic vision for AI integration",
        "Train teams on basic AI concepts"
      ]
    };
  } else if (percentage < 50) {
    return {
      level: t("assessment.level.emerging"),
      levelKey: "emerging",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: t("assessment.level.emerging.description"),
      recommendations: language === "fr" ? [
        "Établir un cadre de gouvernance IA formel",
        "Lancer des projets pilotes structurés",
        "Investir dans le développement des compétences",
        "Améliorer l'intégration des données"
      ] : [
        "Establish a formal AI governance framework",
        "Launch structured pilot projects",
        "Invest in skills development",
        "Improve data integration"
      ]
    };
  } else if (percentage < 75) {
    return {
      level: t("assessment.level.progressing"),
      levelKey: "progressing",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      description: t("assessment.level.progressing.description"),
      recommendations: language === "fr" ? [
        "Considérer la mise en place d'une MAO",
        "Étendre les pratiques de collaboration Humain-IA",
        "Renforcer la gouvernance multi-niveaux",
        "Développer les compétences humaniques"
      ] : [
        "Consider implementing a MAO",
        "Extend Human-AI collaboration practices",
        "Strengthen multi-level governance",
        "Develop humanic skills"
      ]
    };
  } else {
    return {
      level: t("assessment.level.advanced"),
      levelKey: "advanced",
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: t("assessment.level.advanced.description"),
      recommendations: language === "fr" ? [
        "Déployer le modèle d'Organisation Agentique à grande échelle",
        "Optimiser les modes de collaboration Humain-IA",
        "Devenir un leader d'opinion dans votre secteur",
        "Partager vos apprentissages et meilleures pratiques"
      ] : [
        "Deploy the Agentic Organization model at scale",
        "Optimize Human-AI collaboration modes",
        "Become a thought leader in your industry",
        "Share your learnings and best practices"
      ]
    };
  }
}

// Category scores
function getCategoryScores(answers: Record<number, number>, t: (key: string) => string) {
  const categories: Record<string, { total: number; count: number; max: number }> = {
    "assessment.category.culture": { total: 0, count: 0, max: 8 },
    "assessment.category.tech": { total: 0, count: 0, max: 8 },
    "assessment.category.governance": { total: 0, count: 0, max: 8 },
    "assessment.category.skills": { total: 0, count: 0, max: 8 },
    "assessment.category.collaboration": { total: 0, count: 0, max: 8 }
  };
  
  assessmentQuestions.forEach(q => {
    if (answers[q.id]) {
      categories[q.categoryKey].total += answers[q.id];
      categories[q.categoryKey].count += 1;
    }
  });
  
  return Object.entries(categories).map(([key, data]) => ({
    key,
    name: t(key),
    score: data.total,
    max: data.max,
    percentage: Math.round((data.total / data.max) * 100)
  }));
}

// Header Component
function Header() {
  const { t } = useLanguage();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-navy rounded-lg flex items-center justify-center">
            <Network className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-primary">AgenticOrg</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("nav.backHome")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

// Detailed Results Component
function DetailedResults({ answers, onRestart }: { answers: Record<number, number>; onRestart: () => void }) {
  const { t, language } = useLanguage();
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const interpretation = useScoreInterpretation(totalScore);
  const categoryScores = getCategoryScores(answers, t);
  
  // Convert category scores to user scores object for sector comparison
  const userScores: Record<string, number> = {
    culture: categoryScores.find(c => c.key === 'assessment.category.culture')?.percentage || 0,
    technology: categoryScores.find(c => c.key === 'assessment.category.tech')?.percentage || 0,
    governance: categoryScores.find(c => c.key === 'assessment.category.governance')?.percentage || 0,
    skills: categoryScores.find(c => c.key === 'assessment.category.skills')?.percentage || 0,
    collaboration: categoryScores.find(c => c.key === 'assessment.category.collaboration')?.percentage || 0
  };
  
  const saveAssessment = trpc.assessment.save.useMutation({
    onSuccess: () => {
      toast.success(t("assessment.saved"));
    },
    onError: () => {
      // Silent fail - results are still shown to user
    }
  });
  
  useEffect(() => {
    // Save assessment results when component mounts
    saveAssessment.mutate({
      answers,
      totalScore,
      level: interpretation.levelKey,
      categoryScores
    });
  }, []);

  // Generate benchmark data
  const benchmarkData = categoryScores.map(cat => ({
    yourScore: cat.percentage,
    industryAverage: Math.round(cat.percentage * 0.85), // Simulated industry average
    bestInClass: 95,
    category: cat.name
  }));

  // Generate strengths/weaknesses
  const strengthsWeaknesses = categoryScores.map(cat => ({
    category: cat.name,
    percentage: cat.percentage,
    type: cat.percentage >= 75 ? 'strength' as const : cat.percentage >= 50 ? 'opportunity' as const : 'weakness' as const,
    description: language === 'fr' 
      ? `Votre score dans cette catégorie est ${cat.percentage >= 75 ? 'excellent' : cat.percentage >= 50 ? 'bon' : 'à améliorer'}.`
      : `Your score in this category is ${cat.percentage >= 75 ? 'excellent' : cat.percentage >= 50 ? 'good' : 'needs improvement'}.`
  }));

  // Generate detailed recommendations
  const detailedRecommendations = categoryScores.map((cat, idx) => ({
    id: `rec-${idx}`,
    title: language === 'fr' ? `Améliorer ${cat.name}` : `Improve ${cat.name}`,
    description: language === 'fr'
      ? `Développer votre maturité dans le domaine de ${cat.name.toLowerCase()}.`
      : `Develop your maturity in the field of ${cat.name.toLowerCase()}.`,
    priority: cat.percentage < 50 ? 'high' as const : cat.percentage < 75 ? 'medium' as const : 'low' as const,
    timeline: language === 'fr' 
      ? (cat.percentage < 50 ? '3-6 mois' : cat.percentage < 75 ? '6-12 mois' : '12+ mois')
      : (cat.percentage < 50 ? '3-6 months' : cat.percentage < 75 ? '6-12 months' : '12+ months'),
    impact: language === 'fr' 
      ? (cat.percentage < 50 ? 'Impact élevé' : cat.percentage < 75 ? 'Impact moyen' : 'Impact faible')
      : (cat.percentage < 50 ? 'High impact' : cat.percentage < 75 ? 'Medium impact' : 'Low impact'),
    effort: language === 'fr'
      ? (cat.percentage < 50 ? 'Effort important' : cat.percentage < 75 ? 'Effort modéré' : 'Effort minimal')
      : (cat.percentage < 50 ? 'High effort' : cat.percentage < 75 ? 'Moderate effort' : 'Low effort'),
    category: cat.name,
    actions: language === 'fr' ? [
      'Définir des objectifs clairs et mesurables',
      'Allouer les ressources nécessaires',
      'Mettre en place un suivi régulier',
      'Impliquer les parties prenantes clés'
    ] : [
      'Define clear and measurable objectives',
      'Allocate necessary resources',
      'Implement regular monitoring',
      'Involve key stakeholders'
    ],
    successMetrics: language === 'fr' ? [
      'Augmentation du score de maturité',
      'Amélioration des indicateurs clés',
      'Adoption par les équipes',
      'Retour sur investissement positif'
    ] : [
      'Increased maturity score',
      'Improved key indicators',
      'Team adoption',
      'Positive return on investment'
    ]
  }));

  // If sector is selected, show sector comparison
  if (selectedSector) {
    return (
      <div className="space-y-8">
        <Button
          variant="outline"
          onClick={() => setSelectedSector(null)}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'fr' ? 'Retour aux resultats' : 'Back to results'}
        </Button>
        <SectorComparison userScores={userScores} sectorId={selectedSector} />
        <SectorRecommendations userScores={userScores} sectorId={selectedSector} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overall Score Card */}
      <Card className="border-2 border-accent bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="pt-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${((totalScore / 40) * 100) * 5.53} 553`}
                  className="text-accent transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-primary">{Math.round((totalScore / 40) * 100)}%</span>
                <span className="text-sm text-muted-foreground">{t("assessment.results.level")}</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-4 py-2 bg-accent/20 rounded-full mb-4">
                <span className="text-lg font-semibold text-accent">{interpretation.level}</span>
              </div>
              <p className="text-lg text-muted-foreground">
                {interpretation.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-primary">{language === 'fr' ? 'Vue d\'ensemble des catégories' : 'Category Overview'}</CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Visualisation de votre maturité par domaine' : 'Visualization of your maturity by domain'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadarChart
            data={categoryScores.map(cat => ({
              name: cat.name,
              value: cat.percentage,
              max: 100
            }))}
          />
        </CardContent>
      </Card>

      {/* Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-primary">{language === 'fr' ? 'Analyse détaillée' : 'Detailed Analysis'}</CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Score détaillé par catégorie' : 'Detailed score by category'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HeatmapChart
            data={categoryScores.map(cat => ({
              category: cat.name,
              value: cat.percentage,
              max: 100
            }))}
          />
        </CardContent>
      </Card>

      {/* Benchmark Comparison */}
      <BenchmarkComparison data={benchmarkData} language={language as 'fr' | 'en'} />

      {/* Strengths & Weaknesses */}
      <StrengthsWeaknesses data={strengthsWeaknesses} language={language as 'fr' | 'en'} />

      {/* Detailed Recommendations */}
      <DetailedRecommendations recommendations={detailedRecommendations} language={language as 'fr' | 'en'} />

      {/* Sector Comparison Section */}
      <Card className="border-2 border-accent/50 bg-gradient-to-r from-accent/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-primary">
            <Globe className="w-6 h-6 text-accent" />
            {language === 'fr' ? 'Comparer avec votre secteur' : 'Compare with your sector'}
          </CardTitle>
          <CardDescription>
            {language === 'fr'
              ? 'Decouvrez comment vous vous positionnez par rapport aux standards de votre industrie'
              : 'See how you compare against your industry standards'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/comparison">
            <Button className="bg-gradient-navy hover:opacity-90 gap-2 w-full sm:w-auto">
              <Globe className="w-4 h-4" />
              {language === 'fr' ? 'Selectionner votre secteur' : 'Select your sector'}
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Button variant="outline" onClick={onRestart} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          {t("assessment.results.restart")}
        </Button>
        <Link href="/contact">
          <Button className="bg-gradient-navy hover:opacity-90 gap-2 w-full sm:w-auto">
            <MessageSquare className="w-4 h-4" />
            {t("assessment.results.consultation")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Quiz Component
function AssessmentQuiz({ onComplete }: { onComplete: (answers: Record<number, number>) => void }) {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const isLastQuestion = currentQuestion === assessmentQuestions.length - 1;
  const canProceed = answers[question?.id] !== undefined;
  
  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: parseInt(value)
    }));
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>{t("assessment.question")} {currentQuestion + 1} {t("assessment.of")} {assessmentQuestions.length}</span>
          <span>{Math.round(progress)}% {t("assessment.completed")}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Question Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
              <question.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-semibold text-accent">{t(question.categoryKey)}</span>
          </div>
          <CardTitle className="text-xl text-primary">{t(question.questionKey)}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id]?.toString() || ""}
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <div
                key={option.value}
                className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                  answers[question.id] === option.value
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/50"
                }`}
                onClick={() => handleAnswer(option.value.toString())}
              >
                <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                  {t(option.labelKey)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("assessment.previous")}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="bg-gradient-navy hover:opacity-90 gap-2"
        >
          {isLastQuestion ? t("assessment.seeResults") : t("assessment.next")}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
}

// Main Assessment Page
export default function Assessment() {
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleComplete = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers);
    setCompleted(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setCompleted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          {completed ? (
            <DetailedResults answers={answers} onRestart={handleRestart} />
          ) : (
            <AssessmentQuiz onComplete={handleComplete} />
          )}
        </div>
      </main>
    </div>
  );
}
