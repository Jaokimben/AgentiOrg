import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Home, DollarSign, PieChart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-amber-700" />
            <h1 className="text-xl font-bold text-gray-900">Alicante Real Estate</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-gray-700">Accueil</Button>
            <Button className="bg-amber-700 hover:bg-amber-800 text-white">Analyse Complète</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero_alicante.jpg" 
            alt="Alicante Coastline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        </div>
        
        <div className="relative container py-32 flex flex-col justify-center min-h-96">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
              Analyse Immobilière Alicante
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Comparez les coûts d'achat et de location pour des appartements de 65-75 m² dans le quartier de Campoamor
            </p>
            <div className="flex gap-4">
              <Button 
                className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 text-lg flex items-center gap-2"
              >
                Découvrir l'Analyse <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3 text-lg">
                En Savoir Plus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 border-l-4 border-l-amber-700 bg-white rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Prix Moyen Achat</p>
                <p className="text-3xl font-bold text-gray-900">147 000 €</p>
                <p className="text-sm text-amber-700 mt-2 font-accent">Pour 70 m²</p>
              </div>
              <Home className="w-8 h-8 text-amber-700 opacity-20" />
            </div>
          </div>

          <div className="p-6 border-l-4 border-l-blue-700 bg-white rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Loyer Mensuel</p>
                <p className="text-3xl font-bold text-gray-900">805 €</p>
                <p className="text-sm text-blue-700 mt-2 font-accent">Estimation</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-700 opacity-20" />
            </div>
          </div>

          <div className="p-6 border-l-4 border-l-amber-700 bg-white rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Coût Mensuel Achat</p>
                <p className="text-3xl font-bold text-gray-900">770 €</p>
                <p className="text-sm text-amber-700 mt-2 font-accent">Prêt + Charges</p>
              </div>
              <TrendingUp className="w-8 h-8 text-amber-700 opacity-20" />
            </div>
          </div>

          <div className="p-6 border-l-4 border-l-blue-700 bg-white rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Rendement Locatif</p>
                <p className="text-3xl font-bold text-gray-900">6.57 %</p>
                <p className="text-sm text-blue-700 mt-2 font-accent">Rendement Brut</p>
              </div>
              <PieChart className="w-8 h-8 text-blue-700 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent"></div>

      {/* Analysis Section */}
      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Achat vs. Location
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Notre analyse comparative révèle que l'achat d'un appartement de 70 m² à Campoamor est légèrement plus économique que la location sur une base mensuelle. Cependant, l'avantage principal réside dans la création de patrimoine à long terme.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-700 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-accent text-gray-900 mb-1">Économies Mensuelles</h4>
                  <p className="text-gray-600">L'achat coûte 50 € de moins par mois que la location</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-accent text-gray-900 mb-1">Patrimoine Net</h4>
                  <p className="text-gray-600">52 910 € de patrimoine créé en 10 ans</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-700 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-accent text-gray-900 mb-1">Marché Dynamique</h4>
                  <p className="text-gray-600">Campoamor connaît une appréciation de 2% par an</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="/images/campoamor_neighborhood.jpg" 
              alt="Quartier Campoamor" 
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl border-l-4 border-l-amber-700 max-w-xs">
              <p className="text-sm text-gray-600 mb-2">Quartier Campoamor</p>
              <p className="text-2xl font-bold text-gray-900">2 100 €/m²</p>
              <p className="text-xs text-amber-700 mt-2 font-accent">Prix moyen fin 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent my-16"></div>

      {/* Market Data */}
      <section className="container py-16">
        <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Données du Marché
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Achat */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Home className="w-6 h-6 text-amber-700" />
              Achat
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Prix Total (70 m²)</span>
                <span className="font-bold text-gray-900">166 110 €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Apport Nécessaire (20%)</span>
                <span className="font-bold text-gray-900">33 222 €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Mensualité Prêt (25 ans, 3.5%)</span>
                <span className="font-bold text-gray-900">665 €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Charges Mensuelles</span>
                <span className="font-bold text-gray-900">105 €</span>
              </div>
              <div className="flex justify-between items-center pt-4 bg-amber-50 -mx-8 px-8 py-4 rounded-b-lg">
                <span className="font-accent text-gray-900">Coût Total Mensuel</span>
                <span className="text-2xl font-bold text-amber-700">770 €</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-blue-700" />
              Location
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Loyer Mensuel (11.5 €/m²)</span>
                <span className="font-bold text-gray-900">805 €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Assurance Locataire</span>
                <span className="font-bold text-gray-900">15 €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Pas d'apport initial</span>
                <span className="font-bold text-gray-900">0 €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Pas de patrimoine créé</span>
                <span className="font-bold text-gray-900">—</span>
              </div>
              <div className="flex justify-between items-center pt-4 bg-blue-50 -mx-8 px-8 py-4 rounded-b-lg">
                <span className="font-accent text-gray-900">Coût Total Mensuel</span>
                <span className="text-2xl font-bold text-blue-700">820 €</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent my-16"></div>

      {/* Apartment Showcase */}
      <section className="container py-16">
        <h3 className="text-4xl font-bold text-gray-900 mb-12">
          Exemple d'Appartement
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/images/modern_apartment.jpg" 
              alt="Appartement Moderne" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h4 className="text-3xl font-bold text-gray-900 mb-6">
              70 m² - 2-3 Chambres
            </h4>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Un appartement typique de Campoamor offrant un excellent rapport qualité-prix. Design minimaliste Scandinavien avec accents méditerranéens, luminosité naturelle généreuse, et finitions modernes.
            </p>

            <div className="space-y-6">
              <div>
                <h5 className="font-accent text-gray-900 mb-2">Caractéristiques</h5>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-amber-700">✓</span>
                    <span>Salon-cuisine ouvert avec vue</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-700">✓</span>
                    <span>2-3 chambres spacieuses</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-700">✓</span>
                    <span>Salle de bain moderne</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-700">✓</span>
                    <span>Accès terrasse/balcon</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-700">✓</span>
                    <span>Parking inclus</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Quartier Campoamor offre une excellente qualité de vie avec proximité des commerces, transports et services.
                </p>
                <Button className="bg-amber-700 hover:bg-amber-800 text-white w-full py-3 text-lg">
                  Voir Annonces Similaires
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent my-16"></div>

      {/* Conclusion */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">
            Recommandation
          </h3>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Pour un horizon temporel supérieur à quelques années, l'achat d'un appartement à Campoamor est fortement recommandé. Le coût mensuel est inférieur à la location, et vous construisez progressivement un patrimoine immobilier.
          </p>

          <div className="bg-amber-50 border-l-4 border-l-amber-700 p-8 rounded-lg mb-8">
            <p className="text-gray-900 font-accent mb-2">Points Clés</p>
            <ul className="text-left space-y-2 text-gray-700">
              <li>✓ Coût mensuel inférieur de 50 € comparé à la location</li>
              <li>✓ Création de 52 910 € de patrimoine net en 10 ans</li>
              <li>✓ Rendement locatif brut attractif de 6.57 %</li>
              <li>✓ Quartier en forte croissance avec appréciation de 2% par an</li>
            </ul>
          </div>

          <Button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 text-lg">
            Télécharger le Rapport Complet
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h5 className="text-white font-bold mb-4">À Propos</h5>
              <p className="text-sm">Analyse immobilière basée sur les données du marché d'Alicante fin 2025.</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Données</h5>
              <p className="text-sm">Sources : Idealista, Indomio, Fotocasa, Engel & Völkers</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Disclaimer</h5>
              <p className="text-sm">Cette analyse est fournie à titre informatif. Consultez un professionnel avant toute décision.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 Analyse Immobilière Alicante. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
