
"use server";

import { getCourseRecommendationsForInternships } from "@/ai/flows/course-recommendation-flow";
import type { CourseRecommendationForInternshipsInput } from "@/ai/flows/course-recommendation-flow";

export async function getCourseRecommendationsForInternshipsAction(input: CourseRecommendationForInternshipsInput) {
  try {
    const result = await getCourseRecommendationsForInternships(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting course recommendations:", error);
    return { success: false, error: "Failed to get recommendations. Please try again." };
  }
}

// Keep the existing functions for other pages that might still use them,
// or refactor them if they are fully replaced. For now, we add the new one.
export { getCourseRecommendationsForInternships };
