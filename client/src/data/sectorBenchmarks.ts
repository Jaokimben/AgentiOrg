export interface SectorBenchmark {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  categories: {
    culture: number;
    technology: number;
    governance: number;
    skills: number;
    collaboration: number;
  };
  maturityLevel: 'beginner' | 'emerging' | 'progressing' | 'advanced';
  sampleSize: number;
  lastUpdated: string;
}

export const SECTOR_BENCHMARKS: SectorBenchmark[] = [
  {
    id: 'tech',
    name: 'Technologie & Logiciels',
    nameEn: 'Technology & Software',
    description: 'Entreprises de développement logiciel, cloud computing et services numériques',
    descriptionEn: 'Software development, cloud computing and digital services companies',
    categories: {
      culture: 82,
      technology: 88,
      governance: 75,
      skills: 80,
      collaboration: 85
    },
    maturityLevel: 'advanced',
    sampleSize: 245,
    lastUpdated: '2024-12-01'
  },
  {
    id: 'finance',
    name: 'Services Financiers',
    nameEn: 'Financial Services',
    description: 'Banques, assurances, fintech et gestion d\'actifs',
    descriptionEn: 'Banks, insurance, fintech and asset management',
    categories: {
      culture: 65,
      technology: 72,
      governance: 85,
      skills: 68,
      collaboration: 62
    },
    maturityLevel: 'progressing',
    sampleSize: 189,
    lastUpdated: '2024-12-01'
  },
  {
    id: 'manufacturing',
    name: 'Industrie & Fabrication',
    nameEn: 'Manufacturing & Industry',
    description: 'Secteur manufacturier, industrie 4.0 et supply chain',
    descriptionEn: 'Manufacturing, Industry 4.0 and supply chain',
    categories: {
      culture: 58,
      technology: 62,
      governance: 68,
      skills: 55,
      collaboration: 60
    },
    maturityLevel: 'emerging',
    sampleSize: 156,
    lastUpdated: '2024-12-01'
  },
  {
    id: 'healthcare',
    name: 'Santé & Pharma',
    nameEn: 'Healthcare & Pharma',
    description: 'Hôpitaux, cliniques, laboratoires et industrie pharmaceutique',
    descriptionEn: 'Hospitals, clinics, laboratories and pharmaceutical industry',
    categories: {
      culture: 62,
      technology: 68,
      governance: 82,
      skills: 70,
      collaboration: 65
    },
    maturityLevel: 'progressing',
    sampleSize: 143,
    lastUpdated: '2024-12-01'
  },
  {
    id: 'retail',
    name: 'Commerce & Retail',
    nameEn: 'Retail & Commerce',
    description: 'E-commerce, distribution et commerce de détail',
    descriptionEn: 'E-commerce, distribution and retail commerce',
    categories: {
      culture: 70,
      technology: 75,
      governance: 65,
      skills: 68,
      collaboration: 72
    },
    maturityLevel: 'progressing',
    sampleSize: 198,
    lastUpdated: '2024-12-01'
  },
  {
    id: 'energy',
    name: 'Énergie & Utilities',
    nameEn: 'Energy & Utilities',
    description: 'Électricité, gaz, énergies renouvelables et eau',
    descriptionEn: 'Electricity, gas, renewable energy and water',
    categories: {
      culture: 55,
      technology: 60,
      governance: 75,
      skills: 58,
      collaboration: 56
    },
    maturityLevel: 'emerging',
    sampleSize: 98,
    lastUpdated: '2024-12-01'
  },
  {
    id: 'telecom',
    name: 'Télécommunications',
    nameEn: 'Telecommunications',
    description: 'Opérateurs télécom, fournisseurs d\'accès internet et services mobiles',
    descriptionEn: 'Telecom operators, internet providers and mobile services',
    categories: {
      culture: 72,
      technology: 80,
      governance: 78,
      skills: 75,
      collaboration: 74
    },
    maturityLevel: 'progressing',
    sampleSize: 127,
    lastUpdated: '2024-12-01'
  },
  {
    id: 'education',
    name: 'Éducation & Recherche',
    nameEn: 'Education & Research',
    description: 'Universités, écoles, centres de recherche et formation',
    descriptionEn: 'Universities, schools, research centers and training',
    categories: {
      culture: 68,
      technology: 65,
      governance: 70,
      skills: 75,
      collaboration: 72
    },
    maturityLevel: 'progressing',
    sampleSize: 112,
    lastUpdated: '2024-12-01'
  },
  {
    id: 'consulting',
    name: 'Conseil & Services Pro',
    nameEn: 'Consulting & Professional Services',
    description: 'Cabinets de conseil, audit, expertise comptable et services professionnels',
    descriptionEn: 'Consulting firms, audit, accounting and professional services',
    categories: {
      culture: 78,
      technology: 76,
      governance: 80,
      skills: 82,
      collaboration: 79
    },
    maturityLevel: 'advanced',
    sampleSize: 167,
    lastUpdated: '2024-12-01'
  },
  {
    id: 'media',
    name: 'Médias & Divertissement',
    nameEn: 'Media & Entertainment',
    description: 'Presse, audiovisuel, streaming et industrie créative',
    descriptionEn: 'Press, audiovisual, streaming and creative industry',
    categories: {
      culture: 80,
      technology: 82,
      governance: 68,
      skills: 81,
      collaboration: 83
    },
    maturityLevel: 'advanced',
    sampleSize: 134,
    lastUpdated: '2024-12-01'
  }
];

export function getSectorBenchmark(sectorId: string): SectorBenchmark | undefined {
  return SECTOR_BENCHMARKS.find(b => b.id === sectorId);
}

export function getAllSectors() {
  return SECTOR_BENCHMARKS;
}

export function calculateGaps(
  userScores: Record<string, number>,
  sectorBenchmark: SectorBenchmark
) {
  const gaps: Record<string, { gap: number; percentage: number; status: 'ahead' | 'behind' }> = {};

  Object.entries(userScores).forEach(([category, userScore]) => {
    const benchmarkScore = sectorBenchmark.categories[category as keyof typeof sectorBenchmark.categories];
    const gap = userScore - benchmarkScore;
    const percentage = benchmarkScore > 0 ? (gap / benchmarkScore) * 100 : 0;

    gaps[category] = {
      gap,
      percentage,
      status: gap >= 0 ? 'ahead' : 'behind'
    };
  });

  return gaps;
}

export function getGapAnalysis(
  userScores: Record<string, number>,
  sectorBenchmark: SectorBenchmark,
  language: 'fr' | 'en' = 'fr'
) {
  const gaps = calculateGaps(userScores, sectorBenchmark);
  const categories = Object.keys(gaps);

  const aheadCategories = categories.filter(c => gaps[c].status === 'ahead');
  const behindCategories = categories.filter(c => gaps[c].status === 'behind');

  const avgGap = Object.values(gaps).reduce((sum, g) => sum + g.gap, 0) / categories.length;

  const labels = {
    fr: {
      ahead: 'Vous êtes en avance dans ce domaine',
      behind: 'Vous êtes en retard dans ce domaine',
      atPar: 'Vous êtes au niveau du secteur',
      summary: `Vous êtes en moyenne ${Math.abs(avgGap).toFixed(1)} points ${avgGap >= 0 ? 'au-dessus' : 'en-dessous'} de la moyenne sectorielle`
    },
    en: {
      ahead: 'You are ahead in this area',
      behind: 'You are behind in this area',
      atPar: 'You are at sector level',
      summary: `You are on average ${Math.abs(avgGap).toFixed(1)} points ${avgGap >= 0 ? 'above' : 'below'} the sector average`
    }
  };

  return {
    gaps,
    aheadCategories,
    behindCategories,
    avgGap,
    labels: labels[language]
  };
}
