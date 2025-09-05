"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseRecommendations } from "./actions";
import type { CourseRecommendationOutput } from "@/ai/flows/course-recommendation-flow";
import { studentProfile } from "@/lib/demo-data";
import { Loader2, Wand2, Lightbulb } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  profileSummary: z.string().min(50, "Please provide a more detailed summary."),
  desiredJob: z.string().min(5, "Please specify your desired job."),
});

type FormValues = z.infer<typeof formSchema>;

export default function CourseRecommendationClientPage() {
  const [isPending, startTransition] = useTransition();
  const [recommendations, setRecommendations] =
    useState<CourseRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileSummary: studentProfile.bio,
      desiredJob: "Full-Stack Developer",
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      setError(null);
      setRecommendations(null);
      const result = await getCourseRecommendations(values);
      if (result.success) {
        setRecommendations(result.data);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className="max-w-xl mx-auto w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-6 w-6" />
            <span>Tell us about you</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="profileSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={8}
                        placeholder="e.g., Aspiring software engineer with experience in Python and a passion for machine learning..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Summarize your skills, experience, and career interests.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredJob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Job</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Data Scientist at a tech startup"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What role and industry are you aiming for?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Get Recommendations"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="max-w-xl mx-auto w-full">
        {isPending && (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-96">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4"/>
                <h3 className="text-xl font-semibold">Analyzing your profile...</h3>
                <p className="text-muted-foreground">Our AI is crafting your personalized learning path.</p>
            </CardContent>
          </Card>
        )}
        
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {recommendations && (
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                <span>Your Recommended Learning Path</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Recommended Courses:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recommendations.courses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reasoning:</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{recommendations.reasoning}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {!isPending && !recommendations && !error && (
            <Card>
                 <CardContent className="p-6 flex flex-col items-center justify-center text-center h-96">
                    <Wand2 className="h-12 w-12 text-muted-foreground mb-4"/>
                    <h3 className="text-xl font-semibold">Ready for your recommendations?</h3>
                    <p className="text-muted-foreground">Fill out the form to get started.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
