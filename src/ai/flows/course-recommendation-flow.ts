
'use server';

/**
 * @fileOverview Recommends courses to students based on profile weaknesses.
 *
 * - recommendCourses - A function that recommends courses to students.
 * - CourseRecommendationInput - The input type for the recommendCourses function.
 * - CourseRecommendationOutput - The return type for the recommendCourses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CourseRecommendationInputSchema = z.object({
  profileSummary: z
    .string()
    .describe(
      'A summary of the student profile, highlighting skills and experience.'
    ),
  desiredJob: z
    .string()
    .describe(
      'The type of job the student is seeking.  This should include the role and industry.'
    ),
});
export type CourseRecommendationInput = z.infer<
  typeof CourseRecommendationInputSchema
>;

const CourseRecommendationOutputSchema = z.object({
  courses: z
    .array(z.string())
    .describe(
      'A list of course names that would help the student improve their skills and employability.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the course recommendations, explaining how each course addresses specific weaknesses in the student profile.'
    ),
});
export type CourseRecommendationOutput = z.infer<
  typeof CourseRecommendationOutputSchema
>;

export async function recommendCourses(
  input: CourseRecommendationInput
): Promise<CourseRecommendationOutput> {
  return recommendCoursesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'courseRecommendationPrompt',
  input: {schema: CourseRecommendationInputSchema},
  output: {schema: CourseRecommendationOutputSchema},
  prompt: `You are a career advisor specializing in helping students improve their employability. You will receive a summary of the student's profile and their desired job. Based on this information, you will recommend a list of courses that would help the student improve their skills and increase their employability. Also explain the reasoning behind each course recommendation.

Student Profile Summary: {{{profileSummary}}}
Desired Job: {{{desiredJob}}}

Courses:`,
});

const recommendCoursesFlow = ai.defineFlow(
  {
    name: 'recommendCoursesFlow',
    inputSchema: CourseRecommendationInputSchema,
    outputSchema: CourseRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
