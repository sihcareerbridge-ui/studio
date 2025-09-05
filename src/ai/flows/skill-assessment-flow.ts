
'use server';
/**
 * @fileOverview Generates a skill assessment quiz and provides course recommendations based on the results.
 *
 * - generateSkillAssessmentQuiz - Creates a quiz based on a desired job role.
 * - getRecommendationsFromQuizResults - Analyzes quiz answers to recommend courses.
 * - Quiz - The type for the generated quiz.
 * - QuizAnswers - The type for the user's submitted answers.
 * - CourseRecommendationOutput - The return type for the recommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Schema for a single question in the quiz
const QuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('A list of possible answers.'),
  // Note: We ask the LLM for the correct answer index to validate the question's quality,
  // but we don't use it directly in the recommendation logic to avoid bias.
  // The recommendation is based on the user's choices, not just right/wrong.
  correctOptionIndex: z.number().describe('The index of the correct option in the options array.'),
});

// Schema for the entire quiz
const QuizSchema = z.object({
  questions: z.array(QuestionSchema).describe('A list of 5 to 7 quiz questions.'),
});
export type Quiz = z.infer<typeof QuizSchema>;

// Schema for generating the quiz
const GenerateQuizInputSchema = z.object({
  desiredJob: z.string().describe('The job role the user is interested in.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

// Schema for the user's answers
const QuizAnswersSchema = z.object({
    answers: z.array(z.object({
        questionIndex: z.number(),
        selectedOptionIndex: z.number(),
    })).describe("The user's selected answers for each question."),
});
export type QuizAnswers = z.infer<typeof QuizAnswersSchema>;


// Schema for the final course recommendations
const CourseRecommendationOutputSchema = z.object({
  courses: z
    .array(z.string())
    .describe('A list of 3-5 course names that would help the student improve their skills.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the recommendations, explaining how each course addresses gaps identified in the quiz.'),
});
export type CourseRecommendationOutput = z.infer<typeof CourseRecommendationOutputSchema>;


/**
 * Generates a skill assessment quiz tailored to a specific job role.
 */
export async function generateSkillAssessmentQuiz(input: GenerateQuizInput): Promise<Quiz> {
  return generateQuizFlow(input);
}

const generateQuizPrompt = ai.definePrompt({
    name: 'generateQuizPrompt',
    input: { schema: GenerateQuizInputSchema },
    output: { schema: QuizSchema },
    prompt: `You are a helpful assistant for creating skill assessments. Generate a multiple-choice quiz with 5-7 questions to evaluate a person's foundational knowledge for a "{{{desiredJob}}}" role. The questions should cover key concepts and skills required for this job. Ensure the options are plausible but only one is correct.`
});

const generateQuizFlow = ai.defineFlow(
    {
        name: 'generateQuizFlow',
        inputSchema: GenerateQuizInputSchema,
        outputSchema: QuizSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);


/**
 * Provides course recommendations based on the user's answers to a skill assessment quiz.
 */
export async function getRecommendationsFromQuizResults({ quiz, answers, desiredJob }: { quiz: Quiz; answers: QuizAnswers, desiredJob: string }): Promise<CourseRecommendationOutput> {
    return recommendCoursesFromQuizFlow({ quiz, answers, desiredJob });
}

const recommendationsFromQuizPrompt = ai.definePrompt({
    name: 'recommendationsFromQuizPrompt',
    input: { schema: z.object({ quiz: QuizSchema, answers: QuizAnswersSchema, desiredJob: z.string() }) },
    output: { schema: CourseRecommendationOutputSchema },
    prompt: `You are a career advisor. A student has taken a skill assessment quiz for their desired role of "{{{desiredJob}}}". Analyze their answers to identify potential knowledge gaps. Based on their incorrect answers, recommend 3-5 specific courses to help them improve. For each recommendation, provide a brief reasoning connecting it to the questions they answered incorrectly.

Here is the quiz they took and the answers they provided:

{{#each quiz.questions}}
Question {{add @index 1}}: {{this.questionText}}
Options:
{{#each this.options}}
  - {{this}}
{{/each}}
Correct Answer Index: {{this.correctOptionIndex}}
Student's Answer Index: {{@answers.answers.[@index].selectedOptionIndex}}
---
{{/each}}

Based on the analysis of the incorrect answers, provide your course recommendations and reasoning.`,
  });
  

const recommendCoursesFromQuizFlow = ai.defineFlow(
    {
        name: 'recommendCoursesFromQuizFlow',
        inputSchema: z.object({ quiz: QuizSchema, answers: QuizAnswersSchema, desiredJob: z.string() }),
        outputSchema: CourseRecommendationOutputSchema,
    },
    async (input) => {
        const { output } = await recommendationsFromQuizPrompt(input);
        return output!;
    }
);

// Custom Handlebars helper to add two numbers.
// Needed for displaying question index correctly in the prompt.
import Handlebars from 'handlebars';
Handlebars.registerHelper('add', function(a, b) {
    return a + b;
});
