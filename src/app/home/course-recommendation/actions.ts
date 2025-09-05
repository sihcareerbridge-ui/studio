
"use server";

import { 
  generateSkillAssessmentQuiz,
  getRecommendationsFromQuizResults
} from "@/ai/flows/skill-assessment-flow";
import type { Quiz, QuizAnswers } from "@/ai/flows/skill-assessment-flow";

export async function generateQuizAction(desiredJob: string) {
  try {
    const result = await generateSkillAssessmentQuiz({ desiredJob });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating skill assessment quiz:", error);
    return { success: false, error: "Failed to generate quiz. Please try again." };
  }
}

export async function getRecommendationsFromQuizAction(quiz: Quiz, answers: QuizAnswers, desiredJob: string) {
    try {
      const result = await getRecommendationsFromQuizResults({ quiz, answers, desiredJob });
      return { success: true, data: result };
    } catch (error) {
      console.error("Error getting recommendations from quiz:", error);
      return { success: false, error: "Failed to get recommendations. Please try again." };
    }
  }

