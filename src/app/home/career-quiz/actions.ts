
"use server";

import { 
  generateCareerInterestQuiz,
  getRecommendationsFromQuizResults
} from "@/ai/flows/career-interest-flow";
import type { Quiz, QuizAnswers, CareerRecommendationOutput } from "@/ai/flows/career-interest-flow";

export async function generateQuizAction() {
  try {
    const result = await generateCareerInterestQuiz();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating career interest quiz:", error);
    return { success: false, error: "Failed to generate quiz. Please try again." };
  }
}

export async function getRecommendationsFromQuizAction(quiz: Quiz, answers: QuizAnswers): Promise<{ success: boolean; data?: CareerRecommendationOutput; error?: string }> {
    try {
      const result = await getRecommendationsFromQuizResults({ quiz, answers });
      return { success: true, data: result };
    } catch (error) {
      console.error("Error getting recommendations from quiz:", error);
      return { success: false, error: "Failed to get recommendations. Please try again." };
    }
  }
