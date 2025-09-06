
'use server';
/**
 * @fileOverview Generates course recommendations based on skill gaps between a student's profile and their desired internships.
 *
 * - getCourseRecommendationsForInternships - Analyzes skill gaps and suggests courses.
 * - CourseRecommendationForInternshipsInput - The input type for the function.
 * - CourseRecommendationForInternshipsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const InternshipRequirementSchema = z.object({
  title: z.string().describe('The title of the internship.'),
  requiredSkills: z.array(z.string()).describe('A list of skills required for the internship.'),
});

export const CourseRecommendationForInternshipsInputSchema = z.object({
  studentSkills: z.array(z.string()).describe("The student's current skills."),
  internshipRequirements: z
    .array(InternshipRequirementSchema)
    .describe('A list of internships the student is interested in, with their required skills.'),
});
export type CourseRecommendationForInternshipsInput = z.infer<
  typeof CourseRecommendationForInternshipsInputSchema
>;

export const CourseRecommendationForInternshipsOutputSchema = z.object({
  recommendedCourses: z.array(z.string()).describe('A list of 3-5 course names that would help the student fill their skill gaps for the desired internships.'),
  reasoning: z.string().describe("The reasoning behind the course recommendations, explaining how each course addresses specific skill gaps based on the student's ranked internships."),
});
export type CourseRecommendationForInternshipsOutput = z.infer<
  typeof CourseRecommendationForInternshipsOutputSchema
>;

export async function getCourseRecommendationsForInternships(
  input: CourseRecommendationForInternshipsInput
): Promise<CourseRecommendationForInternshipsOutput> {
  return courseRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'courseRecommendationForInternshipsPrompt',
  input: {schema: CourseRecommendationForInternshipsInputSchema},
  output: {schema: CourseRecommendationForInternshipsOutputSchema},
  prompt: `You are an expert career advisor. A student has provided their current skills and a list of internships they are interested in. 
  
  Your task is to:
  1.  Identify the skill gaps between the student's profile and the requirements of their chosen internships.
  2.  Recommend a list of 3-5 specific, real-sounding course titles that will help them fill these gaps.
  3.  Provide a brief reasoning for your recommendations, explaining which skill gaps the courses will address.
  
  Student's Current Skills:
  {{#each studentSkills}}
  - {{this}}
  {{/each}}
  
  Ranked Internships and Their Requirements:
  {{#each internshipRequirements}}
  - **{{this.title}}**: Requires {{#each this.requiredSkills}}{{#if @last}} and {{/if}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}.
  {{/each}}
  
  Analyze the gap and provide your recommendations.`,
});

const courseRecommendationFlow = ai.defineFlow(
  {
    name: 'courseRecommendationForInternshipsFlow',
    inputSchema: CourseRecommendationForInternshipsInputSchema,
    outputSchema: CourseRecommendationForInternshipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
