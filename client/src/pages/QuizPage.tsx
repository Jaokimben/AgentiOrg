import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { AgenticMaturityQuiz } from "@/components/AgenticMaturityQuiz";
import { Network, ArrowLeft } from "lucide-react";

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

export default function QuizPage() {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          <AgenticMaturityQuiz language={language as 'fr' | 'en'} />
        </div>
      </main>
    </div>
  );
}
