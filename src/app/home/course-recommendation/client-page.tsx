
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { generateQuizAction, getRecommendationsFromQuizAction } from "./actions";
import type { Quiz, QuizAnswers } from "@/ai/flows/skill-assessment-flow";
import { Loader2, Wand2, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";

const answerSchema = z.object({
  questionIndex: z.number(),
  selectedOptionIndex: z.number().optional(),
  selectedOptionIndices: z.array(z.number()).optional(),
}).refine(data => {
    if(data.selectedOptionIndices !== undefined) {
      return data.selectedOptionIndices.length > 0;
    }
    return data.selectedOptionIndex !== undefined;
}, {
    message: "Please select an option.",
    path: ["selectedOptionIndex"] // show error on the field
});

const quizFormSchema = z.object({
  answers: z.array(answerSchema).min(1),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

type PageState = "idle" | "generating_quiz" | "quiz" | "generating_recommendations" | "submitting" | "error";

export default function CareerQuizClientPage() {
  const [isPending, startTransition] = useTransition();
  const [pageState, setPageState] = useState<PageState>("idle");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

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
            selectedOptionIndices: q.allowMultiple ? [] : undefined,
          })),
        });
        setCurrentQuestion(0);
        setPageState("quiz");
      } else {
        setError(result.error || "An unknown error occurred.");
        setPageState("error");
      }
    });
  };

  const processQuizSubmission = (values: QuizFormValues) => {
    if (!quiz) return;
    setPageState("submitting");
    startTransition(async () => {
        setError(null);
        
        const formattedAnswers: QuizAnswers = {
            answers: quiz.questions.map((q, index) => {
              const answer = values.answers[index];
              const selectedAnswers: string[] = [];
              if (q.allowMultiple) {
                answer.selectedOptionIndices?.forEach(i => selectedAnswers.push(q.options[i]));
              } else if (answer.selectedOptionIndex !== undefined) {
                selectedAnswers.push(q.options[answer.selectedOptionIndex]);
              }
              return {
                questionText: q.questionText,
                selectedAnswers,
              };
            }),
        };
        
        setPageState("generating_recommendations");
        const result = await getRecommendationsFromQuizAction(quiz, formattedAnswers);
        if (result.success && result.data) {
            sessionStorage.setItem('careerQuizResults', JSON.stringify({
              quiz,
              answers: formattedAnswers,
              recommendations: result.data
            }));
            router.push('/home/ai-advisor/career-quiz/result');
        } else {
            setError(result.error || "An unknown error occurred.");
            setPageState("error");
        }
    });
  };

  const goToNextQuestion = async () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      const is_valid = await quizForm.trigger(`answers.${currentQuestion}`);
      if(is_valid)
        setCurrentQuestion(currentQuestion + 1);
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
    setError(null);
    setCurrentQuestion(0);
    quizForm.reset();
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
              <form onSubmit={quizForm.handleSubmit(processQuizSubmission)}>
                <CardHeader>
                    <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="h-2"/>
                    <CardTitle className="pt-4">Question {currentQuestion + 1}/{quiz.questions.length}</CardTitle>
                </CardHeader>
                <CardContent className="min-h-[250px]" key={currentQuestion}>
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">{question.questionText}</Label>
                        {question.allowMultiple ? (
                             <FormField
                                name={`answers.${currentQuestion}.selectedOptionIndices`}
                                control={quizForm.control}
                                render={({ field, fieldState }) => (
                                    <FormItem>
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
                                                          return checked
                                                            ? field.onChange([...(field.value || []), index])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                  (value) => value !== index
                                                                )
                                                              )
                                                        }}
                                                    />
                                                    <span className="font-normal">{option}</span>
                                                </Label>
                                            );
                                        })}
                                    </div>
                                     <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        ) : (
                             <FormField
                                name={`answers.${currentQuestion}.selectedOptionIndex`}
                                control={quizForm.control}
                                render={({ field, fieldState }) => (
                                  <FormItem>
                                    <RadioGroup
                                        onValueChange={(value) => field.onChange(parseInt(value, 10))}
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
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                  </FormItem>
                                )}
                            />
                        )}
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
                        <Button type="submit">Submit</Button>
                    )}
                </CardFooter>
              </form>
            </Form>
          </Card>
        );

      case "submitting":
        return (
          <Card className="flex flex-col items-center justify-center p-8 h-96">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h3 className="text-xl font-semibold">Submitting...</h3>
            <p className="text-muted-foreground text-center">
              Please wait while we analyze your answers...
            </p>
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
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {renderContent()}
    </div>
  );
}
