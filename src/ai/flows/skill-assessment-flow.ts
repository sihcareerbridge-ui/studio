
'use server';
/**
 * @fileOverview Generates a career interest quiz and provides job and course recommendations.
 *
 * - generateCareerInterestQuiz - Creates a quiz to assess personality and tech interests.
 * - getRecommendationsFromQuizResults - Analyzes quiz answers to recommend job roles and courses.
 * - Quiz - The type for the generated quiz.
 * - QuizAnswers - The type for the user's submitted answers.
 * - CareerRecommendationOutput - The return type for the recommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Schema for a single question in the quiz
const QuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('A list of possible answers.'),
  // Note: correctOptionIndex is no longer relevant for a personality quiz,
  // but we'll keep the field in the schema to avoid breaking other parts of the app for now.
  // It won't be used in the new logic.
  correctOptionIndex: z.number().describe('The index of the correct option in the options array. Not used for this quiz type.'),
});

// Schema for the entire quiz
const QuizSchema = z.object({
  questions: z.array(QuestionSchema).describe('A list of 25 personality and interest-based quiz questions.'),
});
export type Quiz = z.infer<typeof QuizSchema>;

// Schema for the user's answers
const QuizAnswersSchema = z.object({
    answers: z.array(z.object({
        questionIndex: z.number(),
        selectedOptionIndex: z.number(),
    })).describe("The user's selected answers for each question."),
});
export type QuizAnswers = z.infer<typeof QuizAnswersSchema>;


// Schema for the final course recommendations
const CareerRecommendationOutputSchema = z.object({
  recommendedJobs: z.array(z.string()).describe('A list of 2-3 job roles that would be a good fit based on the user\'s personality and interests.'),
  courses: z
    .array(z.string())
    .describe('A list of 3-5 foundational course names to help the user get started in the recommended fields.'),
  reasoning: z
    .string()
    .describe('An analysis of the user\'s personality and interests based on their answers, and how the recommendations align with them.'),
});
export type CareerRecommendationOutput = z.infer<typeof CareerRecommendationOutputSchema>;


/**
 * Generates a career interest and personality quiz.
 */
export async function generateCareerInterestQuiz(): Promise<Quiz> {
  return generateQuizFlow({});
}

const generateQuizPrompt = ai.definePrompt({
    name: 'generateCareerInterestQuizPrompt',
    input: { schema: z.object({}) },
    output: { schema: QuizSchema },
    prompt: `You are a helpful assistant for creating career interest and personality assessments. 
    
    Generate a multiple-choice quiz with 25 questions to help a person understand what kind of tech field they might enjoy. 
    
    The questions should explore their personality, work style, and preferences. For example:
    - Problem-solving style (e.g., "When facing a complex problem, do you prefer to A) Dive deep into data and analysis, or B) Brainstorm creative, out-of-the-box solutions?").
    - Work environment preference (e.g., "Would you rather A) Work on a single, long-term project, or B) Juggle multiple exciting projects at once?").
    - Interests (e.g., "Are you more fascinated by A) How things work internally (backend systems), or B) How things look and feel to the user (frontend design)?").

    The goal is to gather insights into whether they are more analytical, creative, structured, user-focused, data-driven, etc. 
    For every question, ensure you set 'correctOptionIndex' to 0, as there is no single correct answer.`
});

const generateQuizFlow = ai.defineFlow(
    {
        name: 'generateQuizFlow',
        inputSchema: z.object({}),
        outputSchema: QuizSchema,
    },
    async (input) => {
        const { output } = await generateQuizPrompt(input);
        return output!;
    }
);


/**
 * Provides job and course recommendations based on the user's answers to the interest quiz.
 */
export async function getRecommendationsFromQuizResults({ quiz, answers }: { quiz: Quiz; answers: QuizAnswers }): Promise<CareerRecommendationOutput> {
    return recommendCareersFromQuizFlow({ quiz, answers });
}

const recommendationsFromQuizPrompt = ai.definePrompt({
    name: 'recommendationsFromQuizPrompt',
    input: { schema: z.object({ quiz: QuizSchema, answers: QuizAnswersSchema }) },
    output: { schema: CareerRecommendationOutputSchema },
    prompt: `You are an expert career advisor specializing in the tech industry. A student has taken a personality and interest quiz.
    
    Your task is to analyze their answers to create a personality profile and recommend suitable career paths and foundational courses.
    
    1.  **Analyze the Answers**: Based on the user's choices, write a summary of their personality and interests as they relate to a tech career. For example: "Your answers suggest you are a highly analytical and structured thinker who enjoys deep problem-solving. You seem motivated by data and logic."
    2.  **Recommend Job Roles**: Based on your analysis, suggest 2-3 specific tech job roles that would be a good fit. Examples: "Software Engineer (Backend)", "Data Scientist", "UX/UI Designer", "Product Manager".
    3.  **Recommend Courses**: Recommend 3-5 foundational courses that would help them get started in these recommended fields.
    
    Here is the quiz they took and the answers they provided:
    
    {{#each quiz.questions}}
    Question {{add @index 1}}: {{this.questionText}}
    Options:
    {{#each this.options}}
      - {{this}}
    {{/each}}
    Student's Answer: {{lookup ../answers.answers @index 'selectedOptionIndex' | lookup this.options}}
    ---
    {{/each}}
    
    Based on your analysis, provide the personality summary, job recommendations, and course recommendations.`,
  });
  

const recommendCareersFromQuizFlow = ai.defineFlow(
    {
        name: 'recommendCareersFromQuizFlow',
        inputSchema: z.object({ quiz: QuizSchema, answers: QuizAnswersSchema }),
        outputSchema: CareerRecommendationOutputSchema,
    },
    async (input) => {
        const { output } = await recommendationsFromQuizPrompt(input);
        return output!;
    }
);

// Custom Handlebars helpers
import Handlebars from 'handlebars';

Handlebars.registerHelper('add', function(a, b) {
    return a + b;
});

Handlebars.registerHelper('lookup', function(obj, index, field) {
    const item = obj.find((o) => o.questionIndex === index);
    return item ? item[field] : '';
});
