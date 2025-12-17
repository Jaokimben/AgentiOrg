import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createAssessment: vi.fn().mockResolvedValue(1),
  getAssessmentsByUserId: vi.fn().mockResolvedValue([]),
  createContactRequest: vi.fn().mockResolvedValue(1),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("assessment.save", () => {
  it("saves assessment results and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.assessment.save({
      answers: { "1": 3, "2": 4, "3": 2 },
      totalScore: 9,
      level: "Émergent",
      categoryScores: [
        { name: "Culture", score: 7, max: 8, percentage: 87 },
        { name: "Tech", score: 2, max: 8, percentage: 25 },
      ],
    });

    expect(result.success).toBe(true);
    expect(result.sessionId).toBeDefined();
    expect(typeof result.sessionId).toBe("string");
  });
});

describe("contact.submit", () => {
  it("submits contact request and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      company: "Acme Corp",
      role: "CEO",
      interest: "diagnostic",
      message: "Je souhaite en savoir plus sur vos services.",
    });

    expect(result.success).toBe(true);
    expect(result.requestId).toBeDefined();
  });

  it("submits contact request without optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Marie Martin",
      email: "marie@example.com",
      company: "Tech SA",
      interest: "strategy",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Test",
        email: "invalid-email",
        company: "Test Co",
        interest: "mao",
      })
    ).rejects.toThrow();
  });
});
