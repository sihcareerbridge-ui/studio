
"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { generateQuizAction, getRecommendationsFromQuizAction } from "./actions";
import type { Quiz, CareerRecommendationOutput } from "@/ai/flows/skill-assessment-flow";
import { Loader2, Wand2, Lightbulb, ChevronLeft, ChevronRight, Briefcase, BookOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const quizFormSchema = z.object({
  answers: z.array(z.object({
    questionIndex: z.number(),
    selectedOptionIndex: z.number().optional(),
    selectedOptionIndices: z.array(z.number()).optional(),
  })),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

type PageState = "idle" | "generating_quiz" | "quiz" | "generating_recommendations" | "recommendations" | "error";

export default function CareerQuizClientPage() {
  const [isPending, startTransition] = useTransition();
  const [pageState, setPageState] = useState<PageState>("idle");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recommendations, setRecommendations] = useState<CareerRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const quizForm = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: { answers: [] },
  });
  
  const handleStartAssessment = () => {
    startTransition(async () => {
      setPageState("generating_quiz");
      setError(null);
      const result = await generateQuizAction();
      if (result.success && result.data) {
        setQuiz(result.data);
        quizForm.reset({
          answers: result.data.questions.map((q, index) => ({
            questionIndex: index,
            selectedOptionIndex: undefined,
            selectedOptionIndices: [],
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

        const result = await getRecommendationsFromQuizAction(quiz, values);
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
      const fieldToValidate = quiz?.questions[currentQuestion].allowMultiple
      ? `answers.${currentQuestion}.selectedOptionIndices`
      : `answers.${currentQuestion}.selectedOptionIndex`;
      
    const isValid = quiz?.questions[currentQuestion].allowMultiple
      ? true
      : quizForm.getValues(fieldToValidate as `answers.${number}.selectedOptionIndex`) !== undefined;

    if (quiz && currentQuestion < quiz.questions.length - 1) {
        if(isValid) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            quizForm.setError(`answers.${currentQuestion}.selectedOptionIndex`, { type: 'manual', message: 'Please select an option.' });
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
  }

  const renderContent = () => {
    switch (pageState) {
      case "idle":
        return (
          <Card>
            <CardHeader>
              <CardTitle>AI Career Advisor</CardTitle>
              <CardDescription>
                Discover your ideal tech career path with a personalized quiz. Our AI will analyze your personality and interests to recommend job roles and courses.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Wand2 className="h-16 w-16 text-primary mb-4" />
              <p className="mb-6 text-muted-foreground">Ready to find your match in the tech world?</p>
              <Button onClick={handleStartAssessment} disabled={isPending} size="lg">
                {isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Starting...</>
                ) : (
                  "Start Career Quiz"
                )}
              </Button>
            </CardContent>
          </Card>
        );

      case "generating_quiz":
      case "generating_recommendations":
        return (
          <Card className="flex flex-col items-center justify-center p-8 h-96">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h3 className="text-xl font-semibold">
              {pageState === 'generating_quiz' ? 'Generating Your Quiz...' : 'Analyzing Your Results...'}
            </h3>
            <p className="text-muted-foreground text-center">
               {pageState === 'generating_quiz' ? 'Our AI is creating questions just for you.' : 'Our AI is crafting your personalized career path.'}
            </p>
          </Card>
        );
      
      case "quiz":
        if (!quiz) return null;
        const question = quiz.questions[currentQuestion];
        return (
          <Card>
            <Form {...quizForm}>
              <form onSubmit={quizForm.handleSubmit(handleQuizSubmit)}>
                <CardHeader>
                    <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="h-2"/>
                    <CardTitle className="pt-4">Question {currentQuestion + 1}/{quiz.questions.length}</CardTitle>
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
                            {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Get Recommendations"}
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
                  <span>Your Personalized Career Path</span>
                </CardTitle>
                <CardDescription>Based on your quiz results, here are our recommendations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Personality & Interest Analysis</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{recommendations?.reasoning}</p>
                </div>
                 <div>
                  <h3 className="font-semibold mb-3 text-lg flex items-center gap-2"><Briefcase/> Recommended Job Roles</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recommendations?.recommendedJobs.map((job) => (
                      <li key={job}>{job}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-lg flex items-center gap-2"><BookOpen /> Recommended Courses</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recommendations?.courses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleReset}>Start Over</Button>
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

    