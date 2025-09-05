
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WandSparkles, Target, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function AiAdvisorHubPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8 flex flex-col">
       <div className="w-full">
         <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
       </div>
      <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight font-headline">AI Advisor</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Your personal AI-powered assistant for career exploration and skill development.
          </p>
        </div>

        <Card className="shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">What is your goal today?</CardTitle>
                <CardDescription>Select the option that best describes you to get started.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 pt-2">
                <Link href="/home/ai-advisor/career-quiz" className="group block">
                     <div className="h-full rounded-lg border bg-background p-6 text-center transition-all duration-300 group-hover:border-primary group-hover:shadow-2xl group-hover:-translate-y-1">
                        <div className="mx-auto bg-primary/10 p-5 rounded-full w-fit mb-6">
                            <WandSparkles className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">I'm exploring career options.</h3>
                        <p className="text-muted-foreground mb-6">
                            Take a personality quiz to discover tech careers that align with your interests and work style.
                        </p>
                        <Button variant="ghost" className="text-primary group-hover:underline">
                            Start Career Quiz <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </div>
                </Link>

                <Link href="/home/ai-advisor/skill-gap" className="group block">
                     <div className="h-full rounded-lg border bg-background p-6 text-center transition-all duration-300 group-hover:border-accent group-hover:shadow-2xl group-hover:-translate-y-1">
                        <div className="mx-auto bg-accent/10 p-5 rounded-full w-fit mb-6">
                            <Target className="h-10 w-10 text-accent transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">I have a career goal in mind.</h3>
                        <p className="text-muted-foreground mb-6">
                            Take a technical quiz to identify knowledge gaps for a specific job and get course recommendations.
                        </p>
                         <Button variant="ghost" className="text-accent group-hover:underline">
                            Analyze My Skills <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </div>
                </Link>

            </CardContent>
        </Card>
        
      </div>
      </div>
    </div>
  );
}
