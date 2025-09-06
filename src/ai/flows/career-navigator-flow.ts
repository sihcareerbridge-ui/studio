
'use server';
/**
 * @fileOverview A comprehensive career navigator that combines interest assessment and skill analysis.
 *
 * - generateCareerPlusSkillQuiz - Creates a combined quiz flow.
 * - getNavigatorResults - Analyzes both sets of answers for a final recommendation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Input Schemas
const InterestQuizAnswersSchema = z.object({
    answers: z.array(z.object({
        questionText: z.string(),
        selectedAnswers: z.array(z.string()),
    })).describe("The user's selected answers for the career interest part of the quiz."),
});

const SkillQuizAnswersSchema = z.object({
    answers: z.array(z.object({
        questionText: z.string(),
        selectedAnswers: z.array(z.string()),
        correctAnswers: z.array(z.string()),
    })).describe("The user's selected answers for the technical skill part of the quiz."),
});

//Combined Quiz Schema
const CombinedQuizSchema = z.object({
    interestQuiz: z.object({
        questions: z.array(z.object({
            questionText: z.string(),
            options: z.array(z.string()),
            allowMultiple: z.boolean(),
        })),
    }).describe("The career interest and personality portion of the quiz."),
    skillQuiz: z.object({
         questions: z.array(z.object({
            questionText: z.string(),
            options: z.array(z.string()),
            allowMultiple: z.boolean(),
            correctOptionIndex: z.number().optional(),
            correctOptionIndices: z.array(z.number()).optional(),
            explanation: z.string(),
        })),
    }).describe("The technical skill assessment portion of the quiz, tailored to the recommended job.")
});
export type CombinedQuiz = z.infer<typeof CombinedQuizSchema>;


// Output Schema for the final recommendation
const NavigatorOutputSchema = z.object({
  personalityAnalysis: z.object({
    summary: z.string().describe("A summary of the user's personality and interests."),
    traits: z.array(z.object({
      trait: z.string(),
      score: z.number().min(0).max(100),
    })),
  }),
  recommendedJob: z.string().describe("The single, top-recommended job role based on the interest quiz."),
  skillAnalysis: z.object({
    identifiedGaps: z.array(z.string()).describe("High-level skill gaps identified from the technical quiz."),
    skillProficiency: z.array(z.object({
      skillArea: z.string(),
      proficiency: z.number().min(0).max(100),
    })),
  }),
  recommendedCourses: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).describe('A list of 3-5 specific courses to fill knowledge gaps.'),
});
export type NavigatorOutput = z.infer<typeof NavigatorOutputSchema>;


/**
 * Generates a career interest quiz, and then a technical skill quiz based on the results.
 */
export async function generateCareerPlusSkillQuiz(): Promise<CombinedQuiz> {
  return combinedQuizFlow({});
}

const combinedQuizFlow = ai.defineFlow(
    {
        name: 'combinedQuizFlow',
        inputSchema: z.object({}),
        outputSchema: CombinedQuizSchema,
    },
    async () => {
        // Step 1: Generate the interest quiz
        const interestQuizResponse = await ai.generate({
            prompt: `Generate a multiple-choice quiz with 10 questions to help a person understand what kind of tech field they might enjoy. Explore their personality, work style, and preferences. For each question, provide between 2 to 4 plausible options. For most questions, set 'allowMultiple' to false. For a few questions (2-3) where multiple interests could apply, set 'allowMultiple' to true.`,
            output: {
                schema: CombinedQuizSchema.shape.interestQuiz,
            },
        });
        const interestQuiz = interestQuizResponse.output!;

        // Step 2: Use the interest quiz to determine a likely job role
        const jobRoleResponse = await ai.generate({
            prompt: `Based on the following questions designed to gauge tech interests, determine the single most likely job role a person who completes it would be suited for. Choose from: Full-Stack Development, Backend Development, Frontend Development, UI/UX Design, Data Science, Product Management.

            Quiz Questions:
            ${interestQuiz.questions.map(q => `- ${q.questionText}`).join('\n')}
            
            Respond with only the job title.`,
        });
        const recommendedJob = jobRoleResponse.text.trim();

        // Step 3: Generate the skill quiz based on the determined job role
        const skillQuizResponse = await ai.generate({
            prompt: `Generate a multiple-choice quiz with 10 technical questions to assess foundational knowledge for a "${recommendedJob}" role. Cover fundamental concepts. For each question, provide 2 to 4 plausible options. For most questions, provide a single 'correctOptionIndex'. For a few (2-3) questions where multiple options could be correct, provide an array of 'correctOptionIndices'. Provide a concise explanation for each correct answer.`,
            output: {
                schema: CombinedQuizSchema.shape.skillQuiz,
            },
        });
        const skillQuiz = skillQuizResponse.output!;

        return {
            interestQuiz,
            skillQuiz,
        };
    }
);


/**
 * Provides a unified recommendation based on both interest and skill quiz answers.
 */
export async function getNavigatorResults(input: {
    interestAnswers: z.infer<typeof InterestQuizAnswersSchema>,
    skillAnswers: z.infer<typeof SkillQuizAnswersSchema>
}): Promise<NavigatorOutput> {
  return navigatorResultFlow(input);
}


const navigatorResultFlow = ai.defineFlow(
    {
        name: 'navigatorResultFlow',
        inputSchema: z.object({
            interestAnswers: InterestQuizAnswersSchema,
            skillAnswers: SkillQuizAnswersSchema,
        }),
        outputSchema: NavigatorOutputSchema,
    },
    async ({interestAnswers, skillAnswers}) => {
        const { output } = await ai.generate({
            prompt: `A user has completed a two-part quiz.
            
            Part 1 was a career interest quiz. Here are their answers:
            {{#each interestAnswers.answers}}
            - Question: {{this.questionText}}
            - Answer(s): {{#each this.selectedAnswers}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
            {{/each}}

            Part 2 was a technical skill assessment. Here are their results:
            {{#each skillAnswers.answers}}
            - Question: {{this.questionText}}
            - Their Answer(s): {{#each this.selectedAnswers}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
            - Correct Answer(s): {{#each this.correctAnswers}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
            ---
            {{/each}}

            Based on this comprehensive data, perform the following actions:
            1.  **Analyze Interest Answers**: Create a personality profile summary and score the user on these traits (0-100): Analytical, Creative, Structured, Collaborative, User-Focused.
            2.  **Determine Top Job Role**: Based *only* on the interest quiz answers, determine the single best-fit job role.
            3.  **Analyze Skill Gaps**: Based on the *incorrect* answers from the technical quiz, identify 2-3 high-level skill gaps.
            4.  **Create Skill Proficiency Scores**: Categorize the technical questions into 3-5 high-level skill areas relevant to the job role. For each area, calculate a proficiency score from 0 to 100 based on the percentage of correct answers in that category.
            5.  **Recommend Courses**: Recommend 3-5 specific, real-sounding course titles (with fictional IDs like 'course-xx') to address the identified skill gaps.
            `,
            output: {
                schema: NavigatorOutputSchema,
            }
        }, { interestAnswers, skillAnswers });

        return output!;
    }
);
