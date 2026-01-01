import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { 
  Network, 
  Users, 
  Shield, 
  Layers, 
  Brain, 
  Building2, 
  ArrowRight, 
  CheckCircle2,
  Target,
  Lightbulb,
  Handshake,
  GraduationCap,
  ChevronRight,
  Sparkles,
  ClipboardCheck,
  UserCheck,
  Code,
  BarChart3,
  AlertTriangle,
  Download,
  BookOpen,
  FileText,
  TrendingUp
} from "lucide-react";

// Navigation Header Component
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
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about">
            <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("nav.about")}</span>
          </Link>
          <a href="#concepts" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.concepts")}</a>
          <a href="#governance" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.governance")}</a>
          <a href="#implementation" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.implementation")}</a>
          <a href="#collaboration" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.collaboration")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link href="/evaluation">
            <Button variant="outline" className="hidden sm:flex">{t("nav.assessment")}</Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-gradient-navy hover:opacity-90">{t("nav.contact")}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

// Hero Section
function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-sm text-accent-foreground mb-6">
            <Lightbulb className="w-4 h-4" />
            <span>{t("hero.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.title2")}</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground">{t("hero.subtitle")}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t("hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/evaluation">
              <Button size="lg" className="bg-gradient-navy hover:opacity-90 gap-2">
                {t("hero.cta1")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#concepts">
              <Button size="lg" variant="outline" className="gap-2">
                {t("hero.cta2")}
                <ChevronRight className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// How to Work With Us Section
function HowToWorkSection() {
  const { t } = useLanguage();
  
  const steps = [
    {
      number: 1,
      icon: BookOpen,
      titleKey: "howToWork.step1.title",
      descriptionKey: "howToWork.step1.description",
      ctaKey: "howToWork.step1.cta",
      link: "#concepts"
    },
    {
      number: 2,
      icon: ClipboardCheck,
      titleKey: "howToWork.step2.title",
      descriptionKey: "howToWork.step2.description",
      ctaKey: "howToWork.step2.cta",
      link: "/evaluation"
    },
    {
      number: 3,
      icon: UserCheck,
      titleKey: "howToWork.step3.title",
      descriptionKey: "howToWork.step3.description",
      ctaKey: "howToWork.step3.cta",
      link: "/contact"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary to-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("howToWork.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("howToWork.description")}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-accent">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 relative">
                    <div className="w-20 h-20 bg-gradient-navy rounded-full flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-primary">{t(step.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-base">{t(step.descriptionKey)}</CardDescription>
                  <Link href={step.link}>
                    <Button className="w-full bg-gradient-navy hover:opacity-90" size="sm">
                      {t(step.ctaKey)}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-accent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Use Cases Section
function UseCasesSection() {
  const { t } = useLanguage();
  
  const useCases = [
    {
      icon: Users,
      titleKey: "useCases.case1.title",
      descriptionKey: "useCases.case1.description",
      metricsKey: "useCases.case1.metrics",
      color: "text-blue-600"
    },
    {
      icon: BarChart3,
      titleKey: "useCases.case2.title",
      descriptionKey: "useCases.case2.description",
      metricsKey: "useCases.case2.metrics",
      color: "text-green-600"
    },
    {
      icon: AlertTriangle,
      titleKey: "useCases.case3.title",
      descriptionKey: "useCases.case3.description",
      metricsKey: "useCases.case3.metrics",
      color: "text-orange-600"
    },
    {
      icon: TrendingUp,
      titleKey: "useCases.case4.title",
      descriptionKey: "useCases.case4.description",
      metricsKey: "useCases.case4.metrics",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("useCases.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("useCases.description")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-accent">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0`}>
                    <useCase.icon className={`w-8 h-8 ${useCase.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-primary mb-2">{t(useCase.titleKey)}</CardTitle>
                    <CardDescription className="text-base">{t(useCase.descriptionKey)}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-accent/5 rounded-lg p-4 border-l-4 border-accent">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-foreground">{t(useCase.metricsKey)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Tooling & Stack Section
function ToolingSection() {
  const { t } = useLanguage();
  
  const tools = [
    {
      icon: Code,
      titleKey: "tooling.orchestrators.title",
      descriptionKey: "tooling.orchestrators.description"
    },
    {
      icon: Shield,
      titleKey: "tooling.governance.title",
      descriptionKey: "tooling.governance.description"
    },
    {
      icon: BarChart3,
      titleKey: "tooling.monitoring.title",
      descriptionKey: "tooling.monitoring.description"
    },
    {
      icon: Layers,
      titleKey: "tooling.integration.title",
      descriptionKey: "tooling.integration.description"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("tooling.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("tooling.description")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-accent">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-gradient-navy rounded-full flex items-center justify-center mb-4">
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-primary">{t(tool.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{t(tool.descriptionKey)}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Resources Section
function ResourcesSection() {
  const { t } = useLanguage();
  
  const resources = [
    {
      icon: FileText,
      titleKey: "resources.whitepaper.title",
      descriptionKey: "resources.whitepaper.description",
      ctaKey: "resources.whitepaper.cta"
    },
    {
      icon: BookOpen,
      titleKey: "resources.playbook.title",
      descriptionKey: "resources.playbook.description",
      ctaKey: "resources.playbook.cta"
    },
    {
      icon: Target,
      titleKey: "resources.guide.title",
      descriptionKey: "resources.guide.description",
      ctaKey: "resources.guide.cta"
    }
  ];

  return (
    <section className="py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("resources.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("resources.description")}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-accent">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-navy rounded-full flex items-center justify-center mb-4">
                  <resource.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-primary">{t(resource.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-center">{t(resource.descriptionKey)}</CardDescription>
                <Button className="w-full bg-gradient-navy hover:opacity-90" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  {t(resource.ctaKey)}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">{t("resources.leadMagnet.description")}</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder={t("resources.leadMagnet.placeholder")} 
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button className="bg-gradient-navy hover:opacity-90">
              {t("resources.leadMagnet.cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Six Core Concepts Section
function ConceptsSection() {
  const { t } = useLanguage();
  
  const concepts = [
    {
      id: "AO",
      titleKey: "concepts.ao.title",
      descriptionKey: "concepts.ao.description",
      plainKey: "concepts.ao.plain",
      icon: Building2,
      levelKey: "concepts.level.strategic"
    },
    {
      id: "AT",
      titleKey: "concepts.at.title",
      descriptionKey: "concepts.at.description",
      plainKey: "concepts.at.plain",
      icon: Users,
      levelKey: "concepts.level.network"
    },
    {
      id: "AMO",
      titleKey: "concepts.amo.title",
      descriptionKey: "concepts.amo.description",
      plainKey: "concepts.amo.plain",
      icon: Layers,
      levelKey: "concepts.level.agent"
    },
    {
      id: "SAIFE",
      titleKey: "concepts.saife.title",
      descriptionKey: "concepts.saife.description",
      plainKey: "concepts.saife.plain",
      icon: Shield,
      levelKey: "concepts.level.strategic"
    },
    {
      id: "HS",
      titleKey: "concepts.hs.title",
      descriptionKey: "concepts.hs.description",
      plainKey: "concepts.hs.plain",
      icon: Brain,
      levelKey: "concepts.level.agent"
    },
    {
      id: "MAO",
      titleKey: "concepts.mao.title",
      descriptionKey: "concepts.mao.description",
      plainKey: "concepts.mao.plain",
      icon: Target,
      levelKey: "concepts.level.network"
    }
  ];

  return (
    <section id="concepts" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("concepts.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("concepts.description")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <Card key={concept.id} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-accent">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <concept.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    {t(concept.levelKey)}
                  </span>
                </div>
                <CardTitle className="text-xl text-primary mt-4">
                  <span className="text-accent font-bold">{concept.id}</span> - {t(concept.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-3">
                  {t(concept.descriptionKey)}
                </CardDescription>
                <div className="mt-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm text-foreground font-medium italic">
                    {t(concept.plainKey)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Governance Architecture Section
function GovernanceSection() {
  const { t } = useLanguage();
  
  const governanceLevels = [
    {
      level: t("concepts.level.strategic"),
      titleKey: "governance.strategic.title",
      descriptionKey: "governance.strategic.description",
      exampleKey: "governance.strategic.example",
      items: [
        "governance.strategic.item1",
        "governance.strategic.item2",
        "governance.strategic.item3",
        "governance.strategic.item4"
      ]
    },
    {
      level: t("concepts.level.network"),
      titleKey: "governance.network.title",
      descriptionKey: "governance.network.description",
      exampleKey: "governance.network.example",
      items: [
        "governance.network.item1",
        "governance.network.item2",
        "governance.network.item3",
        "governance.network.item4"
      ]
    },
    {
      level: t("concepts.level.agent"),
      titleKey: "governance.agent.title",
      descriptionKey: "governance.agent.description",
      exampleKey: "governance.agent.example",
      items: [
        "governance.agent.item1",
        "governance.agent.item2",
        "governance.agent.item3",
        "governance.agent.item4"
      ]
    }
  ];

  return (
    <section id="governance" className="py-24 bg-gradient-to-b from-background to-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("governance.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("governance.description")}
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {governanceLevels.map((gov, index) => (
            <div key={gov.level} className="relative">
              <div className="bg-card rounded-xl p-8 h-full border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-navy flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <span className="text-sm text-accent font-semibold">{gov.level}</span>
                    <h3 className="text-xl font-bold text-primary">{t(gov.titleKey)}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{t(gov.descriptionKey)}</p>
                <ul className="space-y-3 mb-4">
                  {gov.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{t(item)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm text-foreground italic">
                    <Lightbulb className="w-4 h-4 inline mr-2 text-accent" />
                    {t(gov.exampleKey)}
                  </p>
                </div>
              </div>
              {index < governanceLevels.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-accent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Implementation Strategy Section
function ImplementationSection() {
  const { t } = useLanguage();
  
  const implementationPhases = [
    {
      phase: "Phase 1",
      titleKey: "implementation.phase1.title",
      durationKey: "implementation.phase1.duration",
      descriptionKey: "implementation.phase1.description",
      activities: [
        "implementation.phase1.item1",
        "implementation.phase1.item2",
        "implementation.phase1.item3",
        "implementation.phase1.item4"
      ]
    },
    {
      phase: "Phase 2",
      titleKey: "implementation.phase2.title",
      durationKey: "implementation.phase2.duration",
      descriptionKey: "implementation.phase2.description",
      activities: [
        "implementation.phase2.item1",
        "implementation.phase2.item2",
        "implementation.phase2.item3",
        "implementation.phase2.item4"
      ]
    },
    {
      phase: "Phase 3",
      titleKey: "implementation.phase3.title",
      durationKey: "implementation.phase3.duration",
      descriptionKey: "implementation.phase3.description",
      activities: [
        "implementation.phase3.item1",
        "implementation.phase3.item2",
        "implementation.phase3.item3",
        "implementation.phase3.item4"
      ]
    }
  ];

  return (
    <section id="implementation" className="py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("implementation.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("implementation.description")}
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/50"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {implementationPhases.map((phase, index) => (
              <div key={phase.phase} className="relative">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-navy text-white font-bold text-lg relative z-10">
                    {index + 1}
                  </div>
                </div>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-accent">{phase.phase}</span>
                      <span className="text-sm text-muted-foreground">{t(phase.durationKey)}</span>
                    </div>
                    <CardTitle className="text-2xl text-primary">{t(phase.titleKey)}</CardTitle>
                    <CardDescription className="text-base">{t(phase.descriptionKey)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.activities.map((activity) => (
                        <li key={activity} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{t(activity)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// MAO Section
function MAOSection() {
  const { t } = useLanguage();
  
  return (
    <section id="mao" className="py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-accent mb-2 block">{t("mao.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t("mao.title")}
            </h2>
            <div className="section-divider mb-6"></div>
            <p className="text-lg text-muted-foreground mb-6">
              {t("mao.description")}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t("mao.feature1.title")}</h4>
                  <p className="text-muted-foreground">{t("mao.feature1.description")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t("mao.feature2.title")}</h4>
                  <p className="text-muted-foreground">{t("mao.feature2.description")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t("mao.feature3.title")}</h4>
                  <p className="text-muted-foreground">{t("mao.feature3.description")}</p>
                </div>
              </div>
            </div>
            <Link href="/evaluation">
              <Button className="bg-gradient-navy hover:opacity-90 gap-2">
                {t("mao.cta")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-xl font-bold text-primary mb-6">{t("mao.benefits")}</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-muted-foreground">{t("mao.autonomy")}</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">Min</div>
                <div className="text-sm text-muted-foreground">{t("mao.risk")}</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">Max</div>
                <div className="text-sm text-muted-foreground">{t("mao.learning")}</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">3</div>
                <div className="text-sm text-muted-foreground">{t("mao.processes")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Collaboration Spectrum Section
function CollaborationSection() {
  const { t } = useLanguage();
  
  const collaborationPillars = [
    {
      titleKey: "collaboration.pillar1.title",
      descriptionKey: "collaboration.pillar1.description",
      icon: Target
    },
    {
      titleKey: "collaboration.pillar2.title",
      descriptionKey: "collaboration.pillar2.description",
      icon: Shield
    },
    {
      titleKey: "collaboration.pillar3.title",
      descriptionKey: "collaboration.pillar3.description",
      icon: Handshake
    },
    {
      titleKey: "collaboration.pillar4.title",
      descriptionKey: "collaboration.pillar4.description",
      icon: GraduationCap
    }
  ];

  return (
    <section id="collaboration" className="py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("collaboration.title")}
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("collaboration.description")}
          </p>
        </div>
        
        {/* Collaboration Modes */}
        <div className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-xl font-bold text-primary mb-6 text-center">{t("collaboration.modes")}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                <div className="text-2xl font-bold text-primary mb-2">{t("collaboration.humanLed")}</div>
                <div className="text-4xl font-bold text-accent mb-2">40%</div>
                <p className="text-sm text-muted-foreground mb-2">{t("collaboration.humanLed.description")}</p>
                <p className="text-xs text-foreground italic bg-white/50 p-2 rounded">{t("collaboration.humanLed.example")}</p>
              </div>
              <div className="text-center p-6 bg-accent/10 rounded-lg border-2 border-accent/30">
                <div className="text-2xl font-bold text-primary mb-2">{t("collaboration.peerToPeer")}</div>
                <div className="text-4xl font-bold text-accent mb-2">35%</div>
                <p className="text-sm text-muted-foreground mb-2">{t("collaboration.peerToPeer.description")}</p>
                <p className="text-xs text-foreground italic bg-white/50 p-2 rounded">{t("collaboration.peerToPeer.example")}</p>
              </div>
              <div className="text-center p-6 bg-muted rounded-lg border-2 border-border">
                <div className="text-2xl font-bold text-primary mb-2">{t("collaboration.aiLed")}</div>
                <div className="text-4xl font-bold text-accent mb-2">25%</div>
                <p className="text-sm text-muted-foreground mb-2">{t("collaboration.aiLed.description")}</p>
                <p className="text-xs text-foreground italic bg-white/50 p-2 rounded">{t("collaboration.aiLed.example")}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Four Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collaborationPillars.map((pillar) => (
            <Card key={pillar.titleKey} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-gradient-navy rounded-full flex items-center justify-center mb-4">
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-primary">{t(pillar.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t(pillar.descriptionKey)}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Quiz CTA Section
function QuizCTASection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-accent shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm text-accent font-semibold mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>{t("quiz.badge")}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  {t("quiz.title")}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  {t("quiz.description")}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold text-accent mb-2">5-7</div>
                  <div className="text-sm text-muted-foreground">{t("quiz.feature1")}</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold text-accent mb-2">3min</div>
                  <div className="text-sm text-muted-foreground">{t("quiz.feature2")}</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold text-accent mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">{t("quiz.feature3")}</div>
                </div>
              </div>
              <div className="text-center">
                <Link href="/quiz">
                  <Button size="lg" className="bg-gradient-navy hover:opacity-90 gap-2">
                    <Sparkles className="w-5 h-5" />
                    {t("quiz.cta")}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Enhanced CTA Section
function CTASection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 bg-gradient-navy">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl opacity-90 mb-8">
            {t("cta.description")}
          </p>
          
          {/* Assessment Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 text-left">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5" />
                  {t("cta.assessment.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90 space-y-2">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("cta.assessment.feature1")}</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("cta.assessment.feature2")}</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("cta.assessment.feature3")}</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("cta.assessment.feature4")}</span>
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {t("cta.audience.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/90 space-y-2">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("cta.audience.role1")}</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("cta.audience.role2")}</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("cta.audience.role3")}</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" />
                  <span>{t("cta.audience.role4")}</span>
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/evaluation">
              <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
                {t("cta.button1")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
                {t("cta.button2")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Final CTA Section (before footer)
function FinalCTASection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            {t("finalCta.title")}
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            {t("finalCta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/evaluation">
              <Button size="lg" className="bg-gradient-navy hover:opacity-90 gap-2">
                <ClipboardCheck className="w-5 h-5" />
                {t("finalCta.button1")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                <UserCheck className="w-5 h-5" />
                {t("finalCta.button2")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-navy rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-primary">AgenticOrg</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.concepts")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#concepts" className="hover:text-primary transition-colors">{t("footer.sixConcepts")}</a></li>
              <li><a href="#governance" className="hover:text-primary transition-colors">{t("footer.multiLevelGovernance")}</a></li>
              <li><a href="#mao" className="hover:text-primary transition-colors">{t("footer.mao")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#implementation" className="hover:text-primary transition-colors">{t("footer.implementationStrategy")}</a></li>
              <li><a href="#collaboration" className="hover:text-primary transition-colors">{t("footer.humanAICollaboration")}</a></li>
              <li><Link href="/evaluation" className="hover:text-primary transition-colors">{t("footer.assessmentTool")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t("footer.requestConsultation")}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t("footer.contactUs")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

// Main Home Page
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HowToWorkSection />
        <ConceptsSection />
        <GovernanceSection />
        <ImplementationSection />
        <MAOSection />
        <CollaborationSection />
        <QuizCTASection />
        <UseCasesSection />
        <ToolingSection />
        <ResourcesSection />
        <CTASection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
