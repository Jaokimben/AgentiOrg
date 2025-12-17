import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { 
  Network, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  Users,
  Shield,
  Brain,
  Layers
} from "lucide-react";

// Assessment Questions
const assessmentQuestions = [
  {
    id: 1,
    category: "Culture Organisationnelle",
    icon: Users,
    question: "Comment votre organisation perçoit-elle l'intelligence artificielle ?",
    options: [
      { value: 1, label: "Comme une menace pour l'emploi" },
      { value: 2, label: "Comme un outil technique parmi d'autres" },
      { value: 3, label: "Comme un partenaire potentiel pour améliorer la productivité" },
      { value: 4, label: "Comme un collaborateur stratégique pour la transformation" }
    ]
  },
  {
    id: 2,
    category: "Culture Organisationnelle",
    icon: Users,
    question: "Quel est le niveau d'ouverture au changement dans votre organisation ?",
    options: [
      { value: 1, label: "Résistance forte au changement" },
      { value: 2, label: "Acceptation passive des changements imposés" },
      { value: 3, label: "Adaptation proactive aux nouvelles méthodes" },
      { value: 4, label: "Culture d'innovation et d'expérimentation continue" }
    ]
  },
  {
    id: 3,
    category: "Infrastructure Technologique",
    icon: Layers,
    question: "Quel est l'état de votre infrastructure technologique actuelle ?",
    options: [
      { value: 1, label: "Systèmes legacy isolés et peu intégrés" },
      { value: 2, label: "Infrastructure partiellement modernisée" },
      { value: 3, label: "Infrastructure cloud avec APIs et intégrations" },
      { value: 4, label: "Architecture moderne, scalable et prête pour l'IA" }
    ]
  },
  {
    id: 4,
    category: "Infrastructure Technologique",
    icon: Layers,
    question: "Comment gérez-vous vos données organisationnelles ?",
    options: [
      { value: 1, label: "Données dispersées et non structurées" },
      { value: 2, label: "Quelques bases de données centralisées" },
      { value: 3, label: "Data warehouse avec gouvernance de base" },
      { value: 4, label: "Data platform unifiée avec gouvernance mature" }
    ]
  },
  {
    id: 5,
    category: "Gouvernance",
    icon: Shield,
    question: "Avez-vous des politiques de gouvernance pour l'IA ?",
    options: [
      { value: 1, label: "Aucune politique en place" },
      { value: 2, label: "Quelques directives informelles" },
      { value: 3, label: "Politiques documentées en cours de déploiement" },
      { value: 4, label: "Framework de gouvernance IA complet et appliqué" }
    ]
  },
  {
    id: 6,
    category: "Gouvernance",
    icon: Shield,
    question: "Comment sont prises les décisions stratégiques dans votre organisation ?",
    options: [
      { value: 1, label: "Décisions centralisées au sommet uniquement" },
      { value: 2, label: "Délégation limitée avec validation hiérarchique" },
      { value: 3, label: "Décisions distribuées avec cadre de gouvernance" },
      { value: 4, label: "Prise de décision adaptative basée sur les compétences" }
    ]
  },
  {
    id: 7,
    category: "Compétences",
    icon: Brain,
    question: "Quel est le niveau de compétences IA dans votre organisation ?",
    options: [
      { value: 1, label: "Très peu de compétences IA disponibles" },
      { value: 2, label: "Quelques experts isolés" },
      { value: 3, label: "Équipes IA dédiées et programmes de formation" },
      { value: 4, label: "Compétences IA intégrées à tous les niveaux" }
    ]
  },
  {
    id: 8,
    category: "Compétences",
    icon: Brain,
    question: "Comment développez-vous les compétences humaniques (créativité, empathie, jugement) ?",
    options: [
      { value: 1, label: "Pas de focus particulier sur ces compétences" },
      { value: 2, label: "Formations ponctuelles disponibles" },
      { value: 3, label: "Programmes structurés de développement" },
      { value: 4, label: "Culture d'apprentissage continu et valorisation explicite" }
    ]
  },
  {
    id: 9,
    category: "Collaboration",
    icon: Target,
    question: "Comment collaborent actuellement vos équipes avec des outils IA ?",
    options: [
      { value: 1, label: "Utilisation minimale ou inexistante" },
      { value: 2, label: "Utilisation individuelle et non coordonnée" },
      { value: 3, label: "Processus définis pour certaines tâches" },
      { value: 4, label: "Collaboration Humain-IA intégrée aux workflows" }
    ]
  },
  {
    id: 10,
    category: "Collaboration",
    icon: Target,
    question: "Avez-vous expérimenté des projets pilotes impliquant l'IA ?",
    options: [
      { value: 1, label: "Aucun projet pilote" },
      { value: 2, label: "Quelques expérimentations isolées" },
      { value: 3, label: "Projets pilotes structurés avec retours d'expérience" },
      { value: 4, label: "Programme d'innovation continue avec scaling des succès" }
    ]
  }
];

// Score interpretation
function getScoreInterpretation(score: number) {
  const percentage = (score / 40) * 100;
  
  if (percentage < 25) {
    return {
      level: "Débutant",
      color: "text-red-600",
      bgColor: "bg-red-100",
      description: "Votre organisation est au début de son parcours vers la transformation agentique. Des fondations importantes doivent être établies.",
      recommendations: [
        "Commencer par sensibiliser la direction aux opportunités de l'IA",
        "Évaluer et moderniser l'infrastructure technologique",
        "Développer une vision stratégique pour l'intégration de l'IA",
        "Former les équipes aux concepts de base de l'IA"
      ]
    };
  } else if (percentage < 50) {
    return {
      level: "Émergent",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "Votre organisation a commencé sa transformation mais doit renforcer ses fondations pour progresser efficacement.",
      recommendations: [
        "Établir un cadre de gouvernance IA formel",
        "Lancer des projets pilotes structurés",
        "Investir dans le développement des compétences",
        "Améliorer l'intégration des données"
      ]
    };
  } else if (percentage < 75) {
    return {
      level: "En Progression",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      description: "Votre organisation progresse bien vers la maturité agentique. Focus sur l'expansion et l'optimisation.",
      recommendations: [
        "Considérer la mise en place d'une MAO",
        "Étendre les pratiques de collaboration Humain-IA",
        "Renforcer la gouvernance multi-niveaux",
        "Développer les compétences humaniques"
      ]
    };
  } else {
    return {
      level: "Avancé",
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Votre organisation est bien positionnée pour une transformation agentique complète.",
      recommendations: [
        "Déployer le modèle d'Organisation Agentique à grande échelle",
        "Optimiser les modes de collaboration Humain-IA",
        "Devenir un leader d'opinion dans votre secteur",
        "Partager vos apprentissages et meilleures pratiques"
      ]
    };
  }
}

// Category scores
function getCategoryScores(answers: Record<number, number>) {
  const categories = {
    "Culture Organisationnelle": { total: 0, count: 0, max: 8 },
    "Infrastructure Technologique": { total: 0, count: 0, max: 8 },
    "Gouvernance": { total: 0, count: 0, max: 8 },
    "Compétences": { total: 0, count: 0, max: 8 },
    "Collaboration": { total: 0, count: 0, max: 8 }
  };
  
  assessmentQuestions.forEach(q => {
    if (answers[q.id]) {
      categories[q.category as keyof typeof categories].total += answers[q.id];
      categories[q.category as keyof typeof categories].count += 1;
    }
  });
  
  return Object.entries(categories).map(([name, data]) => ({
    name,
    score: data.total,
    max: data.max,
    percentage: Math.round((data.total / data.max) * 100)
  }));
}

// Header Component
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-navy rounded-lg flex items-center justify-center">
            <Network className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-primary">AgenticOrg</span>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </header>
  );
}

// Results Component
function Results({ answers, onRestart }: { answers: Record<number, number>; onRestart: () => void }) {
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const interpretation = getScoreInterpretation(totalScore);
  const categoryScores = getCategoryScores(answers);
  
  const saveAssessment = trpc.assessment.save.useMutation({
    onSuccess: () => {
      toast.success("Résultats sauvegardés avec succès");
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
      level: interpretation.level,
      categoryScores
    });
  }, []);
  
  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <Card className="border-2 border-accent">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">Résultats de votre Évaluation</CardTitle>
          <CardDescription>Score global de maturité agentique</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-primary mb-2">{totalScore}/40</div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${interpretation.bgColor}`}>
              <span className={`font-semibold ${interpretation.color}`}>
                Niveau : {interpretation.level}
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
          <CardTitle className="text-xl text-primary">Analyse par Catégorie</CardTitle>
          <CardDescription>Détail de votre maturité dans chaque domaine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categoryScores.map((cat) => (
              <div key={cat.name}>
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
            Recommandations Personnalisées
          </CardTitle>
          <CardDescription>Actions prioritaires pour votre transformation</CardDescription>
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
          Refaire l'évaluation
        </Button>
        <Link href="/contact">
          <Button className="bg-gradient-navy hover:opacity-90 gap-2">
            Demander une consultation
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Main Assessment Page
export default function Assessment() {
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
                  <span>Question {currentQuestion + 1} sur {assessmentQuestions.length}</span>
                  <span>{Math.round(progress)}% complété</span>
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
                    <span className="text-sm font-semibold text-accent">{question.category}</span>
                  </div>
                  <CardTitle className="text-xl text-primary">{question.question}</CardTitle>
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
                      >
                        <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                        <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                          {option.label}
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
                  Précédent
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="bg-gradient-navy hover:opacity-90 gap-2"
                >
                  {isLastQuestion ? "Voir les résultats" : "Suivant"}
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
