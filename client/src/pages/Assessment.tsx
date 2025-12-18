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
  Layers
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

// Results Component
function Results({ answers, onRestart }: { answers: Record<number, number>; onRestart: () => void }) {
  const { t } = useLanguage();
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const interpretation = useScoreInterpretation(totalScore);
  const categoryScores = getCategoryScores(answers, t);
  
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
  
  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <Card className="border-2 border-accent">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">{t("assessment.results.title")}</CardTitle>
          <CardDescription>{t("assessment.results.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-primary mb-2">{totalScore}/40</div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${interpretation.bgColor}`}>
              <span className={`font-semibold ${interpretation.color}`}>
                {t("assessment.results.level")} : {interpretation.level}
              </span>
            </div>
          </div>
          <Progress value={(totalScore / 40) * 100} className="h-4 mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {interpretation.description}
          </p>
        </CardContent>
      </Card>
      
      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-primary">{t("assessment.results.categoryTitle")}</CardTitle>
          <CardDescription>{t("assessment.results.categorySubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categoryScores.map((cat) => (
              <div key={cat.key}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-foreground">{cat.name}</span>
                  <span className="text-muted-foreground">{cat.score}/{cat.max}</span>
                </div>
                <Progress value={cat.percentage} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            {t("assessment.results.recommendationsTitle")}
          </CardTitle>
          <CardDescription>{t("assessment.results.recommendationsSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {interpretation.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <span className="text-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRestart} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t("assessment.results.restart")}
        </Button>
        <Link href="/contact">
          <Button className="bg-gradient-navy hover:opacity-90 gap-2">
            {t("assessment.results.consultation")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Main Assessment Page
export default function Assessment() {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  
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
      setShowResults(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-3xl">
          {!showResults ? (
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
          ) : (
            <Results answers={answers} onRestart={handleRestart} />
          )}
        </div>
      </main>
    </div>
  );
}
