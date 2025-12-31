import { ArrowRight, TrendingUp, Home, DollarSign, PieChart, BarChart3, MapPin, Calendar, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("moyenne");

  const neighborhoods = {
    moyenne: {
      name: "Moyenne Alicante",
      pricePerM2: 2509,
      rentPerM2: 13,
      description: "Moyenne de tous les quartiers d'Alicante - Référence pour comparaison",
      color: "slate",
      colorClass: "bg-slate-50 border-l-slate-700",
      accentColor: "text-slate-700",
      buyPrice: 175630,
      monthlyBuyCost: 590,
      monthlyRent: 910,
      rentalYield: 6.2,
      growth: "+15-18% (1 an)",
      prestige: "Mixte",
      marketTemp: "Chaud",
      properties: 1200,
      rentProperties: 450,
      source: "Idealista Novembre 2025",
      negotiationTarget: "5-8%",
      negotiationArgs: [
        "Le marché d'Alicante a connu une croissance moyenne de 15-18% en 1 an. Même avec une réduction de 5-10%, l'investissement reste rentable à long terme.",
        "Comparé à la moyenne nationale (2.605 €/m²), Alicante reste 4% moins cher. Cela montre que le marché n'est pas surcoté.",
        "Les rendements locatifs à Alicante (6,2%) dépassent la moyenne espagnole (5,4%). C'est un bon indicateur de rentabilité.",
        "Avec 1.200+ propriétés en vente et 450+ en location, il y a une bonne liquidité. Cela vous donne du pouvoir de négociation."
      ]
    },
    campoamor: {
      name: "Campoamor",
      pricePerM2: 2357,
      rentPerM2: 11,
      description: "Quartier résidentiel moderne avec excellente accessibilité et prestige élevé",
      color: "amber",
      colorClass: "bg-amber-50 border-l-amber-700",
      accentColor: "text-amber-700",
      buyPrice: 164990,
      monthlyBuyCost: 545,
      monthlyRent: 770,
      rentalYield: 5.6,
      growth: "+17-28% (1 an)",
      prestige: "Élevé",
      marketTemp: "Chaud",
      properties: 204,
      rentProperties: 41,
      source: "Fotocasa Décembre 2025",
      negotiationTarget: "3-7%",
      negotiationArgs: [
        "Campoamor est 6% MOINS CHER que la moyenne d'Alicante (2.357 vs 2.509 €/m²). C'est déjà un bon prix de départ.",
        "Avec une croissance de +17-28% en 1 an, Campoamor surperforme la moyenne (+15-18%). C'est un quartier en forte demande.",
        "Le rendement locatif (5,6%) est excellent pour un quartier résidentiel de prestige. Cela justifie un prix compétitif.",
        "Seulement 204 propriétés en vente (vs 1.200 en moyenne). L'offre est limitée, mais peu de propriétés en location (41) signifie peu de comparables."
      ]
    },
    mercado: {
      name: "Mercado",
      pricePerM2: 3055,
      rentPerM2: 14,
      description: "Centre-ville historique, quartier urbain avec forte dynamique commerciale et loyers premium",
      color: "rose",
      colorClass: "bg-rose-50 border-l-rose-700",
      accentColor: "text-rose-700",
      buyPrice: 213850,
      monthlyBuyCost: 675,
      monthlyRent: 980,
      rentalYield: 5.5,
      growth: "+8-17% (1 an)",
      prestige: "Modéré-Élevé",
      marketTemp: "Chaud",
      properties: 217,
      rentProperties: 68,
      source: "Fotocasa Décembre 2025",
      negotiationTarget: "10-15%",
      negotiationArgs: [
        "Mercado est 22% PLUS CHER que la moyenne d'Alicante (3.055 vs 2.509 €/m²). Ce prix premium doit être justifié.",
        "La croissance de Mercado (+8-17%) est INFÉRIEURE à la moyenne (+15-18%). C'est un signal d'alerte sur la dynamique du marché.",
        "Le rendement locatif (5,5%) est MOINS BON que Campoamor (5,6%) et San Antón (5,6%). Pourquoi payer plus pour moins de rendement?",
        "Les loyers (14 €/m²) ne sont que 1 €/m² plus élevés que Campoamor (11 €/m²). Le premium de prix n'est pas justifié par les loyers."
      ]
    },
    sananton: {
      name: "San Antón",
      pricePerM2: 2977,
      rentPerM2: 14,
      description: "Quartier résidentiel avec potentiel de croissance, prestige modéré",
      color: "blue",
      colorClass: "bg-blue-50 border-l-blue-700",
      accentColor: "text-blue-700",
      buyPrice: 208390,
      monthlyBuyCost: 660,
      monthlyRent: 980,
      rentalYield: 5.6,
      growth: "+11-20% (1 an)",
      prestige: "Modéré",
      marketTemp: "Chaud",
      properties: 59,
      rentProperties: 17,
      source: "Fotocasa Décembre 2025 (données approximatives)",
      negotiationTarget: "8-12%",
      negotiationArgs: [
        "San Antón a une TRÈS FAIBLE offre: seulement 59 propriétés en vente (vs 204 à Campoamor). Peu de comparables = plus de pouvoir de négociation.",
        "Seulement 17 propriétés en location. Les données de loyers sont APPROXIMATIVES (Fotocasa utilise Centro). Cela crée une incertitude sur le rendement réel.",
        "Le rendement (5,6%) est égal à Campoamor, mais vous payez 26% plus cher (2.977 vs 2.357 €/m²). C'est une mauvaise affaire.",
        "La croissance (+11-20%) est INFÉRIEURE à la moyenne (+15-18%). San Antón n'est pas un quartier en forte dynamique."
      ]
    }
  };

  const current = neighborhoods[selectedNeighborhood as keyof typeof neighborhoods];

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
              Comparez les coûts d'achat et de location pour des appartements de 65-75 m² dans les meilleurs quartiers. Données fiables de Fotocasa - Décembre 2025
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

      {/* Neighborhood Selector */}
      <section className="container py-12 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Sélectionnez un Quartier</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(neighborhoods).map(([key, neighborhood]) => (
            <button
              key={key}
              onClick={() => setSelectedNeighborhood(key)}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedNeighborhood === key
                  ? neighborhood.color === "amber"
                    ? "border-amber-700 bg-amber-50"
                    : neighborhood.color === "rose"
                    ? "border-rose-700 bg-rose-50"
                    : neighborhood.color === "blue"
                    ? "border-blue-700 bg-blue-50"
                    : "border-slate-700 bg-slate-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="text-left">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{neighborhood.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{neighborhood.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700"><strong>{neighborhood.pricePerM2} €/m²</strong></span>
                  <span className="text-gray-700"><strong>{neighborhood.rentPerM2} €/m²</strong></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Key Metrics */}
      <section className="container py-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Métriques Clés - {current.name}</h3>
        <div className="text-sm text-gray-600 mb-6 p-4 bg-gray-50 rounded-lg">
          <p><strong>Source:</strong> {current.source} | <strong>Propriétés:</strong> {current.properties} en vente, {current.rentProperties} en location</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`p-6 border-l-4 ${current.colorClass} bg-white rounded-lg shadow-sm`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Prix Moyen Achat</p>
                <p className="text-3xl font-bold text-gray-900">{current.buyPrice.toLocaleString()} €</p>
                <p className={`text-sm ${current.accentColor} mt-2 font-accent`}>Pour 70 m²</p>
              </div>
              <Home className={`w-8 h-8 ${current.accentColor} opacity-20`} />
            </div>
          </div>

          <div className={`p-6 border-l-4 ${current.colorClass} bg-white rounded-lg shadow-sm`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Loyer Mensuel</p>
                <p className="text-3xl font-bold text-gray-900">{current.monthlyRent} €</p>
                <p className={`text-sm ${current.accentColor} mt-2 font-accent`}>70 m²</p>
              </div>
              <DollarSign className={`w-8 h-8 ${current.accentColor} opacity-20`} />
            </div>
          </div>

          <div className={`p-6 border-l-4 ${current.colorClass} bg-white rounded-lg shadow-sm`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Coût Mensuel Achat</p>
                <p className="text-3xl font-bold text-gray-900">{current.monthlyBuyCost} €</p>
                <p className={`text-sm ${current.accentColor} mt-2 font-accent`}>Prêt + Charges</p>
              </div>
              <TrendingUp className={`w-8 h-8 ${current.accentColor} opacity-20`} />
            </div>
          </div>

          <div className={`p-6 border-l-4 ${current.colorClass} bg-white rounded-lg shadow-sm`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Rendement Locatif</p>
                <p className="text-3xl font-bold text-gray-900">{current.rentalYield} %</p>
                <p className={`text-sm ${current.accentColor} mt-2 font-accent`}>Rendement Brut</p>
              </div>
              <PieChart className={`w-8 h-8 ${current.accentColor} opacity-20`} />
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
              Notre analyse comparative pour {current.name} révèle les différences clés entre l'achat et la location. Le coût mensuel d'achat inclut la mensualité du prêt (25 ans, 3,5% TAE), les charges et les taxes.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-full ${current.color === 'amber' ? 'bg-amber-100' : current.color === 'rose' ? 'bg-rose-100' : current.color === 'blue' ? 'bg-blue-100' : 'bg-slate-100'} flex items-center justify-center flex-shrink-0`}>
                  <span className={`${current.accentColor} font-bold`}>1</span>
                </div>
                <div>
                  <h4 className="font-accent text-gray-900 mb-1">Économies Mensuelles</h4>
                  <p className="text-gray-600">L'achat coûte {Math.abs(current.monthlyRent - current.monthlyBuyCost)} € {current.monthlyRent > current.monthlyBuyCost ? 'de moins' : 'de plus'} par mois que la location</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-full ${current.color === 'amber' ? 'bg-amber-100' : current.color === 'rose' ? 'bg-rose-100' : current.color === 'blue' ? 'bg-blue-100' : 'bg-slate-100'} flex items-center justify-center flex-shrink-0`}>
                  <span className={`${current.accentColor} font-bold`}>2</span>
                </div>
                <div>
                  <h4 className="font-accent text-gray-900 mb-1">Patrimoine Net</h4>
                  <p className="text-gray-600">~45-50 000 € de patrimoine créé en 10 ans</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-full ${current.color === 'amber' ? 'bg-amber-100' : current.color === 'rose' ? 'bg-rose-100' : current.color === 'blue' ? 'bg-blue-100' : 'bg-slate-100'} flex items-center justify-center flex-shrink-0`}>
                  <span className={`${current.accentColor} font-bold`}>3</span>
                </div>
                <div>
                  <h4 className="font-accent text-gray-900 mb-1">Marché Dynamique</h4>
                  <p className="text-gray-600">{current.name} connaît une appréciation de {current.growth}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="/images/campoamor_neighborhood.jpg" 
              alt={current.name}
              className="w-full rounded-lg shadow-lg"
            />
            <div className={`absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl border-l-4 ${current.colorClass} max-w-xs`}>
              <p className="text-sm text-gray-600 mb-2">Quartier {current.name}</p>
              <p className="text-2xl font-bold text-gray-900">{current.pricePerM2} €/m²</p>
              <p className={`text-xs ${current.accentColor} mt-2 font-accent`}>Prix moyen - Décembre 2025</p>
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
                <span className="font-bold text-gray-900">{current.buyPrice.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Apport Nécessaire (20%)</span>
                <span className="font-bold text-gray-900">{(current.buyPrice * 0.2).toLocaleString()} €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Mensualité Prêt (25 ans, 3.5%)</span>
                <span className="font-bold text-gray-900">~{Math.round(current.monthlyBuyCost * 0.8)} €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Charges Mensuelles</span>
                <span className="font-bold text-gray-900">~{Math.round(current.monthlyBuyCost * 0.2)} €</span>
              </div>
              <div className="flex justify-between items-center pt-4 bg-amber-50 -mx-8 px-8 py-4 rounded-b-lg">
                <span className="font-accent text-gray-900">Coût Total Mensuel</span>
                <span className="text-2xl font-bold text-amber-700">{current.monthlyBuyCost} €</span>
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
                <span className="text-gray-700">Loyer Mensuel ({current.rentPerM2} €/m²)</span>
                <span className="font-bold text-gray-900">{current.monthlyRent} €</span>
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
                <span className="text-2xl font-bold text-blue-700">{current.monthlyRent + 15} €</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent my-16"></div>

      {/* Comparison Table */}
      <section className="container py-16">
        <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Comparaison Multi-Quartiers
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-left font-bold text-gray-900">Critère</th>
                <th className="p-4 text-center font-bold text-slate-700">Moyenne</th>
                <th className="p-4 text-center font-bold text-amber-700">Campoamor</th>
                <th className="p-4 text-center font-bold text-rose-700">Mercado</th>
                <th className="p-4 text-center font-bold text-blue-700">San Antón</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-gray-700">Prix Achat (€/m²)</td>
                <td className="p-4 text-center font-bold text-slate-900">2.509 €</td>
                <td className="p-4 text-center font-bold text-gray-900">2.357 €</td>
                <td className="p-4 text-center font-bold text-gray-900">3.055 €</td>
                <td className="p-4 text-center font-bold text-gray-900">2.977 €</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-gray-700">Loyer (€/m²)</td>
                <td className="p-4 text-center font-bold text-slate-900">13,0 €</td>
                <td className="p-4 text-center font-bold text-gray-900">11 €</td>
                <td className="p-4 text-center font-bold text-gray-900">14 €</td>
                <td className="p-4 text-center font-bold text-gray-900">14 €</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-gray-700">Coût Mensuel Achat</td>
                <td className="p-4 text-center font-bold text-slate-700">590 €</td>
                <td className="p-4 text-center font-bold text-amber-700">545 €</td>
                <td className="p-4 text-center font-bold text-rose-700">675 €</td>
                <td className="p-4 text-center font-bold text-blue-700">660 €</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-gray-700">Loyer Mensuel</td>
                <td className="p-4 text-center font-bold text-slate-900">910 €</td>
                <td className="p-4 text-center font-bold text-gray-900">770 €</td>
                <td className="p-4 text-center font-bold text-gray-900">980 €</td>
                <td className="p-4 text-center font-bold text-gray-900">980 €</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-gray-700">Rendement Locatif</td>
                <td className="p-4 text-center font-bold text-slate-900">6,2%</td>
                <td className="p-4 text-center font-bold text-gray-900">5,6%</td>
                <td className="p-4 text-center font-bold text-gray-900">5,5%</td>
                <td className="p-4 text-center font-bold text-gray-900">5,6%</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-gray-700">Prestige</td>
                <td className="p-4 text-center font-bold text-slate-900">Mixte</td>
                <td className="p-4 text-center font-bold text-gray-900">Élevé</td>
                <td className="p-4 text-center font-bold text-gray-900">Modéré-Élevé</td>
                <td className="p-4 text-center font-bold text-gray-900">Modéré</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 text-gray-700 font-bold">Potentiel Croissance</td>
                <td className="p-4 text-center font-bold text-slate-700">+15-18%</td>
                <td className="p-4 text-center font-bold text-amber-700">+17-28%</td>
                <td className="p-4 text-center font-bold text-rose-700">+8-17%</td>
                <td className="p-4 text-center font-bold text-blue-700">+11-20%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 border-l-4 border-l-blue-700 rounded-lg">
          <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <strong>Source des données:</strong> Fotocasa (quartiers) & Idealista (moyenne) - Décembre 2025
          </p>
          <p className="text-sm text-gray-600 mb-2">Les données sont basées sur les prix officiels du marché immobilier. Les calculs incluent un prêt hypothécaire à 3,5% TAE sur 25 ans avec un apport de 20%.</p>
          <p className="text-sm text-gray-600"><strong>Moyenne Alicante:</strong> Référence pour comparer les quartiers spécifiques. Campoamor est 6% moins cher que la moyenne, tandis que Mercado et San Antón sont respectivement 22% et 19% plus chers.</p>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent my-16"></div>

      {/* Negotiation Arguments */}
      <section className="container py-16">
        <h3 className="text-4xl font-bold text-gray-900 mb-6">Argumentaire de Négociation</h3>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          Utilisez ces arguments basés sur les données de marché pour négocier un meilleur prix avec le vendeur.
        </p>

        <div className={`p-8 bg-white border-l-4 ${current.colorClass} rounded-lg mb-8`}>
          <h4 className="text-2xl font-bold text-gray-900 mb-4">{current.name}</h4>
          <div className="space-y-4 mb-6">
            {(current.negotiationArgs as string[]).map((arg, idx) => (
              <div key={idx} className="flex gap-3">
                <CheckCircle className={`w-5 h-5 ${current.accentColor} flex-shrink-0 mt-0.5`} />
                <p className="text-gray-700">{arg}</p>
              </div>
            ))}
          </div>
          <div className={`p-4 ${current.colorClass} rounded-lg`}>
            <p className={`font-bold ${current.accentColor}`}>Réduction cible: {(current.negotiationTarget as string)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-amber-50 border-l-4 border-l-amber-700 rounded-lg">
            <h5 className="font-bold text-gray-900 mb-3">Tactiques Universelles</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0" /> Utiliser la moyenne comme référence</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0" /> Comparer les rendements (pas seulement prix)</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0" /> Utiliser la croissance comme argument</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0" /> Mettre l'accent sur les comparables</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0" /> Proposer paiement rapide/comptant</li>
            </ul>
          </div>

          <div className="p-6 bg-rose-50 border-l-4 border-l-rose-700 rounded-lg">
            <h5 className="font-bold text-gray-900 mb-3">Erreurs à Éviter</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><span className="text-rose-700 font-bold">✕</span> Ne pas négocier sur le prix seul</li>
              <li className="flex gap-2"><span className="text-rose-700 font-bold">✕</span> Ignorer la liquidité du marché</li>
              <li className="flex gap-2"><span className="text-rose-700 font-bold">✕</span> Oublier les coûts additionnels</li>
              <li className="flex gap-2"><span className="text-rose-700 font-bold">✕</span> Accepter données approximatives</li>
              <li className="flex gap-2"><span className="text-rose-700 font-bold">✕</span> Négliger l'inspection approfondie</li>
            </ul>
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
              {current.name === "Moyenne Alicante" 
                ? "Représentation moyenne des appartements à Alicante. Les quartiers spécifiques offrent des caractéristiques et prestige différents."
                : `Un appartement typique de ${current.name} offrant un excellent rapport qualité-prix. Design minimaliste Scandinavien avec accents méditerranéens, luminosité naturelle généreuse, et finitions modernes.`
              }
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
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Propriétés disponibles:</strong> {current.properties} en vente, {current.rentProperties} en location
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Quartier {current.name} offre une excellente qualité de vie avec proximité des commerces, transports et services.
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
            Pour un horizon temporel supérieur à quelques années, l'achat d'un appartement à {current.name} est fortement recommandé. Le coût mensuel est inférieur ou comparable à la location, et vous construisez progressivement un patrimoine immobilier.
          </p>

          <div className="bg-amber-50 border-l-4 border-l-amber-700 p-8 rounded-lg mb-8">
            <p className="text-gray-900 font-accent mb-4">Points Clés pour {current.name}</p>
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" /> Coût mensuel {current.monthlyRent > current.monthlyBuyCost ? 'inférieur' : 'comparable'} de {Math.abs(current.monthlyRent - current.monthlyBuyCost)} € comparé à la location</li>
              <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" /> Création de ~45-50 000 € de patrimoine net en 10 ans</li>
              <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" /> Rendement locatif brut attractif de {current.rentalYield}%</li>
              <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" /> Quartier en croissance avec appréciation de {current.growth}</li>
              <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" /> Marché {current.marketTemp} avec forte liquidité</li>
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
              <p className="text-sm">Analyse immobilière basée sur les données officielles du marché d'Alicante. Mise à jour: Décembre 2025</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Source des Données</h5>
              <p className="text-sm">Fotocasa (portail immobilier officiel), données de marché décembre 2025. Calculs basés sur hypothèse de prêt 3,5% TAE sur 25 ans.</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Disclaimer</h5>
              <p className="text-sm">Cette analyse est fournie à titre informatif. Consultez un professionnel avant toute décision d'investissement immobilier.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 Analyse Immobilière Alicante. Données fiables Fotocasa. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Button({ children, variant = "default", className = "" }: { children: React.ReactNode; variant?: string; className?: string }) {
  return (
    <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}>
      {children}
    </button>
  );
}
