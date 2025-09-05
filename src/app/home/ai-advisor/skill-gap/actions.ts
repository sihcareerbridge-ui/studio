
"use server";

import { 
  generateSkillAssessmentQuiz,
  getRecommendationsFromSkillQuiz
} from "@/ai/flows/skill-gap-flow";
import type { SkillQuiz, SkillQuizAnswers, SkillGapRecommendationOutput } from "@/ai/flows/skill-gap-flow";

export async function generateSkillQuizAction(desiredJob: string) {
  try {
    const result = await generateSkillAssessmentQuiz(desiredJob);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating skill assessment quiz:", error);
    return { success: false, error: "Failed to generate quiz. Please try again." };
  }
}

export async function getRecommendationsFromSkillQuizAction(quiz: SkillQuiz, answers: SkillQuizAnswers, desiredJob: string): Promise<{ success: boolean; data?: SkillGapRecommendationOutput; error?: string }> {
    try {
      const result = await getRecommendationsFromSkillQuiz({ quiz, answers, desiredJob });
      return { success: true, data: result };
    } catch (error) {
      console.error("Error getting recommendations from skill quiz:", error);
      return { success: false, error: "Failed to get recommendations. Please try again." };
    }
}
