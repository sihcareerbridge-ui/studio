
'use server';
/**
 * @fileOverview Generates a technical skill assessment quiz and provides course recommendations.
 *
 * - generateSkillAssessmentQuiz - Creates a quiz based on a desired job role.
 * - getRecommendationsFromSkillQuiz - Analyzes quiz answers to identify skill gaps and recommend courses.
 * - SkillQuiz - The type for the generated technical quiz.
 * - SkillQuizAnswers - The type for the user's submitted answers for the skill quiz.
 * - SkillGapRecommendationOutput - The return type for the recommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Schema for a single question in the skill quiz
const SkillQuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('A list of possible answers.'),
  correctOptionIndex: z.number().describe('The index of the correct option in the options array.'),
  explanation: z.string().describe('A brief explanation for the correct answer.')
});

// Schema for the entire skill quiz
const SkillQuizSchema = z.object({
  questions: z.array(SkillQuestionSchema).describe('A list of 15 technical questions related to the job role.'),
});
export type SkillQuiz = z.infer<typeof SkillQuizSchema>;

// Schema for the user's answers to the skill quiz
const SkillQuizAnswersSchema = z.object({
    answers: z.array(z.object({
        questionIndex: z.number(),
        selectedOptionIndex: z.number(),
    })).describe("The user's selected answers for each question."),
});
export type SkillQuizAnswers = z.infer<typeof SkillQuizAnswersSchema>;


// Schema for the final course recommendations based on skill gaps
const SkillGapRecommendationOutputSchema = z.object({
  identifiedGaps: z.array(z.string()).describe("A list of 2-3 specific skill gaps identified from the user's incorrect answers."),
  recommendedCourses: z.array(z.string()).describe('A list of 3-5 specific course names to help the user fill their identified knowledge gaps.'),
  reasoning: z.string().describe('A brief analysis of the results, explaining how the recommended courses address the identified skill gaps.'),
});
export type SkillGapRecommendationOutput = z.infer<typeof SkillGapRecommendationOutputSchema>;


/**
 * Generates a technical skill assessment quiz based on a job role.
 */
export async function generateSkillAssessmentQuiz(desiredJob: string): Promise<SkillQuiz> {
  return generateSkillQuizFlow({desiredJob});
}

const generateSkillQuizPrompt = ai.definePrompt({
    name: 'generateSkillAssessmentQuizPrompt',
    input: { schema: z.object({ desiredJob: z.string() }) },
    output: { schema: SkillQuizSchema },
    prompt: `You are an expert in creating technical skill assessments for software and tech jobs.
    
    Generate a multiple-choice quiz with 15 questions to assess a candidate's foundational knowledge for a "{{desiredJob}}" role.
    
    - The questions should be technical and relevant to the core skills required for the role.
    - Cover fundamental concepts, tools, and technologies.
    - For each question, provide 4 plausible options.
    - For each question, clearly identify the correct option and provide a concise explanation for why it's correct.
    `
});

const generateSkillQuizFlow = ai.defineFlow(
    {
        name: 'generateSkillQuizFlow',
        inputSchema: z.object({ desiredJob: z.string() }),
        outputSchema: SkillQuizSchema,
    },
    async (input) => {
        const { output } = await generateSkillQuizPrompt(input);
        return output!;
    }
);


/**
 * Provides course recommendations based on the user's answers to the skill quiz.
 */
export async function getRecommendationsFromSkillQuiz({ quiz, answers, desiredJob }: { quiz: SkillQuiz; answers: SkillQuizAnswers, desiredJob: string }): Promise<SkillGapRecommendationOutput> {
    return recommendCoursesFromSkillQuizFlow({ quiz, answers, desiredJob });
}

const recommendationsFromSkillQuizPrompt = ai.definePrompt({
    name: 'recommendationsFromSkillQuizPrompt',
    input: { schema: z.object({ quiz: SkillQuizSchema, answers: SkillQuizAnswersSchema, desiredJob: z.string() }) },
    output: { schema: SkillGapRecommendationOutputSchema },
    prompt: `You are an expert career advisor and tech educator. A student has taken a technical skill assessment for a "{{desiredJob}}" role.
    
    Your task is to analyze their incorrect answers to identify knowledge gaps and recommend specific courses to fill those gaps.
    
    1.  **Identify Skill Gaps**: Based on the questions the user answered incorrectly, identify 2-3 high-level skill gaps. For example, if they missed questions on React hooks and state management, the gap is "Advanced React Concepts".
    2.  **Recommend Courses**: Recommend 3-5 specific, real-sounding course titles to address these gaps.
    3.  **Provide Reasoning**: Write a brief analysis explaining how the quiz results point to these gaps and how the recommended courses will help.
    
    Here is the quiz they took and the answers they provided:
    
    {{#each quiz.questions}}
    Question {{add @index 1}}: {{this.questionText}}
    Correct Answer: {{lookup this.options this.correctOptionIndex}}
    Student's Answer: {{lookup this.options (lookup ../answers.answers @index 'selectedOptionIndex')}}
    {{#if (isIncorrect (lookup ../answers.answers @index 'selectedOptionIndex') this.correctOptionIndex)}}
    (Incorrect)
    {{/if}}
    ---
    {{/each}}
    
    Based on the incorrect answers, provide the identified skill gaps, specific course recommendations, and reasoning.`,
  });
  

const recommendCoursesFromSkillQuizFlow = ai.defineFlow(
    {
        name: 'recommendCoursesFromSkillQuizFlow',
        inputSchema: z.object({ quiz: SkillQuizSchema, answers: SkillQuizAnswersSchema, desiredJob: z.string() }),
        outputSchema: SkillGapRecommendationOutputSchema,
    },
    async (input) => {
        const { output } = await recommendationsFromSkillQuizPrompt(input);
        return output!;
    }
);

// Custom Handlebars helpers
import Handlebars from 'handlebars';

Handlebars.registerHelper('add', function(a, b) {
    return a + b;
});

Handlebars.registerHelper('lookup', function(obj, index, field) {
    if (Array.isArray(obj)) {
        const item = obj.find((o) => o.questionIndex === index);
        return item && field ? item[field] : obj[index];
    }
    return obj && field ? obj[field] : obj;
});

Handlebars.registerHelper('isIncorrect', function(selectedIndex, correctIndex) {
    return selectedIndex !== correctIndex;
});
