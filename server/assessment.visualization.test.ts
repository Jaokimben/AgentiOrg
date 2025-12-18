import { describe, expect, it } from "vitest";

// Test suite for assessment visualization components
describe("Assessment Visualization Components", () => {
  describe("Radar Chart Data", () => {
    it("should generate correct radar chart data from category scores", () => {
      const categoryScores = [
        { name: "Culture", value: 75, max: 100 },
        { name: "Technology", value: 60, max: 100 },
        { name: "Governance", value: 80, max: 100 },
        { name: "Skills", value: 50, max: 100 },
        { name: "Collaboration", value: 70, max: 100 }
      ];

      const radarData = categoryScores.map(cat => ({
        name: cat.name,
        value: cat.value,
        max: cat.max
      }));

      expect(radarData).toHaveLength(5);
      expect(radarData[0].value).toBe(75);
      expect(radarData[0].max).toBe(100);
    });

    it("should calculate correct percentages for radar chart", () => {
      const data = [
        { value: 75, max: 100 },
        { value: 60, max: 100 },
        { value: 80, max: 100 }
      ];

      const percentages = data.map(d => (d.value / d.max) * 100);

      expect(percentages).toEqual([75, 60, 80]);
    });
  });

  describe("Heatmap Chart Data", () => {
    it("should generate correct heatmap data with color mapping", () => {
      const heatmapData = [
        { category: "Culture", value: 85, max: 100 },
        { category: "Technology", value: 45, max: 100 },
        { category: "Governance", value: 20, max: 100 }
      ];

      const getColor = (percentage: number) => {
        if (percentage >= 75) return 'green';
        if (percentage >= 50) return 'yellow';
        if (percentage >= 25) return 'orange';
        return 'red';
      };

      expect(getColor(85)).toBe('green');
      expect(getColor(45)).toBe('orange');
      expect(getColor(20)).toBe('red');
    });
  });

  describe("Benchmark Comparison Data", () => {
    it("should calculate gaps correctly", () => {
      const benchmarkData = {
        yourScore: 65,
        industryAverage: 75,
        bestInClass: 95
      };

      const gapToIndustry = benchmarkData.industryAverage - benchmarkData.yourScore;
      const gapToBestInClass = benchmarkData.bestInClass - benchmarkData.yourScore;

      expect(gapToIndustry).toBe(10);
      expect(gapToBestInClass).toBe(30);
    });

    it("should identify if score is above or below industry average", () => {
      const scores = [
        { yourScore: 80, industryAverage: 75 },
        { yourScore: 60, industryAverage: 75 },
        { yourScore: 75, industryAverage: 75 }
      ];

      const isAboveAverage = scores.map(s => s.yourScore > s.industryAverage);

      expect(isAboveAverage).toEqual([true, false, false]);
    });
  });

  describe("Strengths and Weaknesses Classification", () => {
    it("should classify scores as strength, opportunity, or weakness", () => {
      const scores = [
        { category: "Culture", percentage: 85 },
        { category: "Technology", percentage: 65 },
        { category: "Governance", percentage: 35 }
      ];

      const classify = (percentage: number) => {
        if (percentage >= 75) return 'strength';
        if (percentage >= 50) return 'opportunity';
        return 'weakness';
      };

      expect(classify(scores[0].percentage)).toBe('strength');
      expect(classify(scores[1].percentage)).toBe('opportunity');
      expect(classify(scores[2].percentage)).toBe('weakness');
    });
  });

  describe("Recommendation Priority Assignment", () => {
    it("should assign correct priority based on score", () => {
      const scores = [
        { category: "Culture", percentage: 30 },
        { category: "Technology", percentage: 60 },
        { category: "Governance", percentage: 85 }
      ];

      const assignPriority = (percentage: number) => {
        if (percentage < 50) return 'high';
        if (percentage < 75) return 'medium';
        return 'low';
      };

      expect(assignPriority(scores[0].percentage)).toBe('high');
      expect(assignPriority(scores[1].percentage)).toBe('medium');
      expect(assignPriority(scores[2].percentage)).toBe('low');
    });

    it("should assign correct timeline based on priority", () => {
      const priorities = ['high', 'medium', 'low'];

      const getTimeline = (priority: string) => {
        switch (priority) {
          case 'high': return '3-6 months';
          case 'medium': return '6-12 months';
          case 'low': return '12+ months';
          default: return 'unknown';
        }
      };

      expect(getTimeline(priorities[0])).toBe('3-6 months');
      expect(getTimeline(priorities[1])).toBe('6-12 months');
      expect(getTimeline(priorities[2])).toBe('12+ months');
    });
  });

  describe("Overall Score Calculation", () => {
    it("should calculate total score from answers", () => {
      const answers = {
        1: 4,
        2: 3,
        3: 2,
        4: 4,
        5: 3,
        6: 3,
        7: 2,
        8: 4,
        9: 3,
        10: 4
      };

      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
      const percentage = (totalScore / 40) * 100;

      expect(totalScore).toBe(32);
      expect(percentage).toBe(80);
    });

    it("should determine maturity level from percentage", () => {
      const getLevel = (percentage: number) => {
        if (percentage < 25) return 'Beginner';
        if (percentage < 50) return 'Emerging';
        if (percentage < 75) return 'Progressing';
        return 'Advanced';
      };

      expect(getLevel(20)).toBe('Beginner');
      expect(getLevel(40)).toBe('Emerging');
      expect(getLevel(65)).toBe('Progressing');
      expect(getLevel(85)).toBe('Advanced');
    });
  });

  describe("Category Score Aggregation", () => {
    it("should aggregate scores by category", () => {
      const answers = {
        1: 4, // Culture
        2: 3, // Culture
        3: 2, // Tech
        4: 4, // Tech
        5: 3, // Governance
        6: 3, // Governance
        7: 2, // Skills
        8: 4, // Skills
        9: 3, // Collaboration
        10: 4 // Collaboration
      };

      const categoryMap = {
        culture: [1, 2],
        tech: [3, 4],
        governance: [5, 6],
        skills: [7, 8],
        collaboration: [9, 10]
      };

      const categoryScores = Object.entries(categoryMap).map(([category, questionIds]) => {
        const score = questionIds.reduce((sum, id) => sum + (answers[id as any] || 0), 0);
        const max = questionIds.length * 4;
        return {
          category,
          score,
          max,
          percentage: Math.round((score / max) * 100)
        };
      });

      expect(categoryScores).toHaveLength(5);
      expect(categoryScores[0].score).toBe(7); // Culture: 4 + 3
      expect(categoryScores[0].percentage).toBe(88); // 7/8 * 100
    });
  });
});
