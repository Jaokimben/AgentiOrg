import { describe, expect, it } from "vitest";

// Mock sector benchmarks data
const SECTOR_BENCHMARKS = [
  {
    id: 'tech',
    name: 'Technology & Software',
    categories: {
      culture: 82,
      technology: 88,
      governance: 75,
      skills: 80,
      collaboration: 85
    },
    maturityLevel: 'advanced'
  },
  {
    id: 'finance',
    name: 'Financial Services',
    categories: {
      culture: 65,
      technology: 72,
      governance: 85,
      skills: 68,
      collaboration: 62
    },
    maturityLevel: 'progressing'
  }
];

// Test suite for sector benchmarks
describe("Sector Benchmarks", () => {
  describe("Sector Data Structure", () => {
    it("should have all required sectors", () => {
      expect(SECTOR_BENCHMARKS.length).toBeGreaterThan(0);
      expect(SECTOR_BENCHMARKS[0]).toHaveProperty('id');
      expect(SECTOR_BENCHMARKS[0]).toHaveProperty('name');
      expect(SECTOR_BENCHMARKS[0]).toHaveProperty('categories');
    });

    it("should have all required categories for each sector", () => {
      SECTOR_BENCHMARKS.forEach(sector => {
        expect(sector.categories).toHaveProperty('culture');
        expect(sector.categories).toHaveProperty('technology');
        expect(sector.categories).toHaveProperty('governance');
        expect(sector.categories).toHaveProperty('skills');
        expect(sector.categories).toHaveProperty('collaboration');
      });
    });

    it("should have valid score ranges (0-100)", () => {
      SECTOR_BENCHMARKS.forEach(sector => {
        Object.values(sector.categories).forEach(score => {
          expect(score).toBeGreaterThanOrEqual(0);
          expect(score).toBeLessThanOrEqual(100);
        });
      });
    });
  });

  describe("Gap Calculation", () => {
    it("should calculate correct gaps between user and sector scores", () => {
      const userScores = {
        culture: 75,
        technology: 85,
        governance: 70,
        skills: 78,
        collaboration: 80
      };

      const sector = SECTOR_BENCHMARKS[0]; // Tech sector
      const gaps: Record<string, number> = {};

      Object.entries(userScores).forEach(([category, userScore]) => {
        const benchmarkScore = sector.categories[category as keyof typeof sector.categories];
        gaps[category] = userScore - benchmarkScore;
      });

      expect(gaps.culture).toBe(75 - 82); // -7
      expect(gaps.technology).toBe(85 - 88); // -3
      expect(gaps.governance).toBe(70 - 75); // -5
    });

    it("should identify positive gaps (ahead of sector)", () => {
      const userScores = {
        culture: 90,
        technology: 95,
        governance: 80,
        skills: 85,
        collaboration: 90
      };

      const sector = SECTOR_BENCHMARKS[0];
      const aheadCount = Object.entries(userScores).filter(([category, userScore]) => {
        const benchmarkScore = sector.categories[category as keyof typeof sector.categories];
        return userScore > benchmarkScore;
      }).length;

      expect(aheadCount).toBeGreaterThan(0);
    });

    it("should identify negative gaps (behind sector)", () => {
      const userScores = {
        culture: 50,
        technology: 60,
        governance: 55,
        skills: 50,
        collaboration: 45
      };

      const sector = SECTOR_BENCHMARKS[0];
      const behindCount = Object.entries(userScores).filter(([category, userScore]) => {
        const benchmarkScore = sector.categories[category as keyof typeof sector.categories];
        return userScore < benchmarkScore;
      }).length;

      expect(behindCount).toBeGreaterThan(0);
    });
  });

  describe("Sector Comparison", () => {
    it("should correctly identify strongest sector categories", () => {
      const sector = SECTOR_BENCHMARKS[0]; // Tech sector
      const categoryScores = Object.entries(sector.categories).map(([cat, score]) => ({
        category: cat,
        score
      }));

      const strongest = categoryScores.reduce((prev, current) =>
        prev.score > current.score ? prev : current
      );

      expect(strongest.category).toBe('technology');
      expect(strongest.score).toBe(88);
    });

    it("should correctly identify weakest sector categories", () => {
      const sector = SECTOR_BENCHMARKS[0]; // Tech sector
      const categoryScores = Object.entries(sector.categories).map(([cat, score]) => ({
        category: cat,
        score
      }));

      const weakest = categoryScores.reduce((prev, current) =>
        prev.score < current.score ? prev : current
      );

      expect(weakest.category).toBe('governance');
      expect(weakest.score).toBe(75);
    });
  });

  describe("Sector Selection", () => {
    it("should find sector by ID", () => {
      const sectorId = 'tech';
      const sector = SECTOR_BENCHMARKS.find(s => s.id === sectorId);

      expect(sector).toBeDefined();
      expect(sector?.id).toBe('tech');
    });

    it("should return undefined for non-existent sector", () => {
      const sectorId = 'non-existent';
      const sector = SECTOR_BENCHMARKS.find(s => s.id === sectorId);

      expect(sector).toBeUndefined();
    });
  });

  describe("Maturity Level Classification", () => {
    it("should correctly classify sector maturity levels", () => {
      expect(SECTOR_BENCHMARKS[0].maturityLevel).toBe('advanced');
      expect(SECTOR_BENCHMARKS[1].maturityLevel).toBe('progressing');
    });

    it("should determine maturity from average scores", () => {
      const sector = SECTOR_BENCHMARKS[0];
      const avgScore = Object.values(sector.categories).reduce((a, b) => a + b, 0) / 5;

      const getMaturityLevel = (avg: number) => {
        if (avg >= 75) return 'advanced';
        if (avg >= 50) return 'progressing';
        if (avg >= 25) return 'emerging';
        return 'beginner';
      };

      expect(getMaturityLevel(avgScore)).toBe('advanced');
    });
  });

  describe("Benchmark Comparison Analysis", () => {
    it("should calculate average gap across all categories", () => {
      const userScores = {
        culture: 70,
        technology: 80,
        governance: 75,
        skills: 72,
        collaboration: 78
      };

      const sector = SECTOR_BENCHMARKS[0];
      const gaps = Object.entries(userScores).map(([category, userScore]) => {
        const benchmarkScore = sector.categories[category as keyof typeof sector.categories];
        return userScore - benchmarkScore;
      });

      const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;

      expect(avgGap).toBeLessThan(0); // User is behind on average
      expect(avgGap).toBeGreaterThan(-20); // But not too far behind
    });

    it("should identify priority areas for improvement", () => {
      const userScores = {
        culture: 50,
        technology: 85,
        governance: 60,
        skills: 55,
        collaboration: 70
      };

      const sector = SECTOR_BENCHMARKS[0];
      const priorityAreas = Object.entries(userScores)
        .map(([category, userScore]) => ({
          category,
          gap: userScore - sector.categories[category as keyof typeof sector.categories]
        }))
        .filter(item => item.gap < -15)
        .sort((a, b) => a.gap - b.gap);

      expect(priorityAreas.length).toBeGreaterThan(0);
      expect(priorityAreas[0].category).toBe('culture');
    });
  });

  describe("Sector Recommendations Generation", () => {
    it("should generate recommendations for areas behind sector average", () => {
      const userScores = {
        culture: 60,
        technology: 75,
        governance: 70,
        skills: 65,
        collaboration: 72
      };

      const sector = SECTOR_BENCHMARKS[0];
      const recommendations = Object.entries(userScores)
        .filter(([category, userScore]) => {
          const benchmarkScore = sector.categories[category as keyof typeof sector.categories];
          return userScore < benchmarkScore;
        })
        .map(([category]) => ({
          category,
          priority: 'high'
        }));

      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations.some(r => r.category === 'culture')).toBe(true);
    });

    it("should prioritize high-gap areas", () => {
      const userScores = {
        culture: 40,
        technology: 80,
        governance: 70,
        skills: 50,
        collaboration: 75
      };

      const sector = SECTOR_BENCHMARKS[0];
      const priorityMap = Object.entries(userScores)
        .map(([category, userScore]) => ({
          category,
          gap: userScore - sector.categories[category as keyof typeof sector.categories]
        }))
        .sort((a, b) => a.gap - b.gap);

      expect(priorityMap[0].gap).toBeLessThan(priorityMap[1].gap);
    });
  });
});
