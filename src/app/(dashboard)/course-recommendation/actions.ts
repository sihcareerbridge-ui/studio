"use server";

import { recommendCourses } from "@/ai/flows/course-recommendation-flow";
import type { CourseRecommendationInput } from "@/ai/flows/course-recommendation-flow";

export async function getCourseRecommendations(input: CourseRecommendationInput) {
  try {
    const result = await recommendCourses(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting course recommendations:", error);
    return { success: false, error: "Failed to get recommendations. Please try again." };
  }
}
