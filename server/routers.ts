import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createAssessment, getAssessmentsByUserId, createContactRequest } from "./db";
import { nanoid } from "nanoid";

// Assessment input schema
const assessmentInputSchema = z.object({
  answers: z.record(z.string(), z.number()),
  totalScore: z.number(),
  level: z.string(),
  categoryScores: z.array(z.object({
    name: z.string(),
    score: z.number(),
    max: z.number(),
    percentage: z.number()
  }))
});

// Contact request input schema
const contactRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  role: z.string().optional(),
  interest: z.string().min(1),
  message: z.string().optional()
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Assessment router
  assessment: router({
    // Save assessment results (public - no auth required)
    save: publicProcedure
      .input(assessmentInputSchema)
      .mutation(async ({ input, ctx }) => {
        const sessionId = nanoid();
        const userId = ctx.user?.id || null;
        
        const assessmentId = await createAssessment({
          sessionId,
          userId,
          totalScore: input.totalScore,
          maxScore: 40,
          level: input.level,
          answers: input.answers,
          categoryScores: input.categoryScores
        });
        
        return {
          success: true,
          sessionId,
          assessmentId
        };
      }),
    
    // Get user's assessment history (requires auth)
    history: protectedProcedure.query(async ({ ctx }) => {
      const assessments = await getAssessmentsByUserId(ctx.user.id);
      return assessments;
    })
  }),

  // Contact router
  contact: router({
    // Submit contact request (public)
    submit: publicProcedure
      .input(contactRequestSchema)
      .mutation(async ({ input }) => {
        const requestId = await createContactRequest({
          name: input.name,
          email: input.email,
          company: input.company,
          role: input.role || null,
          interest: input.interest,
          message: input.message || null
        });
        
        return {
          success: true,
          requestId
        };
      })
  })
});

export type AppRouter = typeof appRouter;
