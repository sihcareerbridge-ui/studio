
"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { generateSkillQuizAction, getRecommendationsFromSkillQuizAction } from "./actions";
import type { SkillQuiz, SkillGapRecommendationOutput } from "@/ai/flows/skill-gap-flow";
import { Loader2, Wand2, Lightbulb, ChevronLeft, ChevronRight, BookOpen, Search, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const jobFormSchema = z.object({
  desiredJob: z.string().min(3, "Please enter a valid job title."),
});
type JobFormValues = z.infer<typeof jobFormSchema>;

const quizFormSchema = z.object({
  answers: z.array(z.object({
    questionIndex: z.number(),
    selectedOptionIndex: z.number().optional(),
    selectedOptionIndices: z.array(z.number()).optional(),
  })),
});
type QuizFormValues = z.infer<typeof quizFormSchema>;

type PageState = "idle" | "generating_quiz" | "quiz" | "generating_recommendations" | "recommendations" | "error";

export default function SkillGapClientPage() {
  const [isPending, startTransition] = useTransition();
  const [pageState, setPageState] = useState<PageState>("idle");
  const [quiz, setQuiz] = useState<SkillQuiz | null>(null);
  const [desiredJob, setDesiredJob] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recommendations, setRecommendations] = useState<SkillGapRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const jobForm = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: { desiredJob: "" },
  });

  const quizForm = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: { answers: [] },
  });
  
  const handleStartAssessment = (values: JobFormValues) => {
    setDesiredJob(values.desiredJob);
    startTransition(async () => {
      setPageState("generating_quiz");
      setError(null);
      const result = await generateSkillQuizAction(values.desiredJob);
      if (result.success && result.data) {
        setQuiz(result.data);
        quizForm.reset({
          answers: result.data.questions.map((q, index) => ({
            questionIndex: index,
            selectedOptionIndex: undefined,
            selectedOptionIndices: q.allowMultiple ? [] : undefined,
          })),
        });
        setCurrentQuestion(0);
        setPageState("quiz");
      } else {
        setError(result.error);
        setPageState("error");
      }
    });
  };

  const handleQuizSubmit = (values: QuizFormValues) => {
    if (!quiz) return;
    startTransition(async () => {
        setPageState("generating_recommendations");
        setError(null);
        setRecommendations(null);

        const result = await getRecommendationsFromSkillQuizAction(quiz, values, desiredJob);
        if (result.success && result.data) {
            setRecommendations(result.data);
            setPageState("recommendations");
        } else {
            setError(result.error);
            setPageState("error");
        }
    });
  };
  
  const goToNextQuestion = async () => {
    const isSingleChoice = !quiz?.questions[currentQuestion].allowMultiple;
    const fieldToValidate = `answers.${currentQuestion}.selectedOptionIndex`;
    const isValid = isSingleChoice 
      ? quizForm.getValues(fieldToValidate) !== undefined
      : true;

    if (quiz && currentQuestion < quiz.questions.length - 1) {
        if(isValid) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
             quizForm.setError(fieldToValidate as any, { type: 'manual', message: 'Please select an option.' });
        }
    }
  }

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
    }
  }

  const handleReset = () => {
    setPageState('idle');
    setQuiz(null);
    setRecommendations(null);
    setError(null);
    setCurrentQuestion(0);
    setDesiredJob("");
    jobForm.reset();
  }

  const renderContent = () => {
    switch (pageState) {
      case "idle":
        return (
          <Card>
            <Form {...jobForm}>
                <form onSubmit={jobForm.handleSubmit(handleStartAssessment)}>
                    <CardHeader>
                        <CardTitle>AI Skill Assessment</CardTitle>
                        <CardDescription>
                            Enter your desired job role to get a personalized technical quiz from our AI.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={jobForm.control}
                            name="desiredJob"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Desired Job Role</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., Full-Stack Developer"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Be specific for the best results (e.g., "React Native Developer", "Backend Python Engineer").
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isPending} size="lg">
                            {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Starting...</> : "Start Skill Assessment"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
          </Card>
        );

      case "generating_quiz":
      case "generating_recommendations":
        return (
          <Card className="flex flex-col items-center justify-center p-8 h-96">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h3 className="text-xl font-semibold">
              {pageState === 'generating_quiz' ? `Building Quiz for ${desiredJob}...` : 'Analyzing Your Skills...'}
            </h3>
            <p className="text-muted-foreground text-center">
               {pageState === 'generating_quiz' ? 'Our AI is preparing technical questions for you.' : 'Our AI is identifying your knowledge gaps.'}
            </p>
          </Card>
        );
      
      case "quiz":
        if (!quiz) return null;
        const question = quiz.questions[currentQuestion];
        const answers = quizForm.watch('answers');
        return (
          <Card>
            <Form {...quizForm}>
              <form onSubmit={quizForm.handleSubmit(handleQuizSubmit)}>
                <CardHeader>
                    <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="h-2"/>
                    <CardTitle className="pt-4">Question {currentQuestion + 1}/{quiz.questions.length}</CardTitle>
                    <CardDescription>Technical Assessment for: {desiredJob}</CardDescription>
                </CardHeader>
                <CardContent className="min-h-[250px]">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">{question.questionText}</Label>
                         {question.allowMultiple ? (
                            <Controller
                                name={`answers.${currentQuestion}.selectedOptionIndices`}
                                control={quizForm.control}
                                render={({ field }) => (
                                    <div className="flex flex-col space-y-2">
                                        {question.options.map((option, index) => {
                                            const uniqueId = `q${currentQuestion}-option${index}`;
                                            return (
                                                <Label
                                                    key={uniqueId}
                                                    htmlFor={uniqueId}
                                                    className="flex w-full cursor-pointer items-center space-x-3 space-y-0 rounded-md border p-3 hover:border-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/10"
                                                >
                                                    <Checkbox
                                                        id={uniqueId}
                                                        checked={field.value?.includes(index)}
                                                        onCheckedChange={(checked) => {
                                                          const currentSelection = field.value || [];
                                                          if (checked) {
                                                              field.onChange([...currentSelection, index]);
                                                          } else {
                                                              field.onChange(currentSelection.filter((i) => i !== index));
                                                          }
                                                        }}
                                                    />
                                                    <span className="font-normal">{option}</span>
                                                </Label>
                                            );
                                        })}
                                    </div>
                                )}
                            />
                        ) : (
                             <Controller
                                name={`answers.${currentQuestion}.selectedOptionIndex`}
                                control={quizForm.control}
                                render={({ field }) => (
                                    <RadioGroup
                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                        className="flex flex-col space-y-2"
                                        value={field.value !== undefined ? String(field.value) : undefined}
                                    >
                                        {question.options.map((option, index) => {
                                            const uniqueId = `q${currentQuestion}-option${index}`;
                                            return (
                                                <Label
                                                    key={uniqueId}
                                                    htmlFor={uniqueId}
                                                    className="flex w-full cursor-pointer items-center space-x-3 space-y-0 rounded-md border p-3 hover:border-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/10"
                                                >
                                                    <RadioGroupItem value={String(index)} id={uniqueId} />
                                                    <span className="font-normal">{option}</span>
                                                </Label>
                                            );
                                        })}
                                    </RadioGroup>
                                )}
                            />
                        )}
                        <FormMessage>{quizForm.formState.errors.answers?.[currentQuestion]?.selectedOptionIndex?.message}</FormMessage>
                    </div>
                </CardContent>
                <CardFooter className="justify-between">
                    <Button type="button" variant="outline" onClick={goToPrevQuestion} disabled={currentQuestion === 0}>
                        <ChevronLeft /> Previous
                    </Button>
                    {currentQuestion < quiz.questions.length - 1 ? (
                        <Button type="button" onClick={goToNextQuestion}>
                            Next <ChevronRight />
                        </Button>
                    ) : (
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Analyze My Skills"}
                        </Button>
                    )}
                </CardFooter>
              </form>
            </Form>
          </Card>
        );

      case "recommendations":
        return (
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-accent" />
                  <span>Your Personalized Learning Plan</span>
                </CardTitle>
                <CardDescription>Based on your quiz results for the {desiredJob} role, here are your identified skill gaps and recommended courses.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-lg flex items-center gap-2"><Search/> Identified Skill Gaps</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendations?.identifiedGaps.map((gap) => (
                      <Badge key={gap} variant="destructive">{gap}</Badge>
                    ))}
                  </div>
                </div>
                 <div>
                  <h3 className="font-semibold mb-2 text-lg">Analysis</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{recommendations?.reasoning}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-lg flex items-center gap-2"><BookOpen /> Recommended Courses</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recommendations?.recommendedCourses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleReset}>Start a New Analysis</Button>
              </CardFooter>
            </Card>
        );

      case "error":
        return (
          <Card>
            <CardContent className="p-6">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                 <Button onClick={handleReset} variant="outline" className="mt-4">Try Again</Button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {renderContent()}
    </div>
  );
}

    

    