
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WandSparkles, Target, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AiAdvisorHubPage() {
  return (
    <div className="container mx-auto py-8 flex flex-1 items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
            <div className="inline-block rounded-lg bg-primary/10 p-4 mb-4">
                <WandSparkles className="h-10 w-10 text-primary" />
            </div>
          <h1 className="text-4xl font-bold tracking-tight font-headline">AI Advisor</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Your personal AI-powered assistant for career exploration and skill development.
          </p>
        </div>

        <div className="border rounded-lg p-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold">What is your goal today?</h2>
                <p className="text-muted-foreground">Select the option that best describes you to get started.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/home/ai-advisor/career-quiz" className="group block rounded-lg border p-6 transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <WandSparkles className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">I'm exploring career options.</h3>
                            <p className="text-muted-foreground mb-4">
                                Take a quiz to discover tech careers that align with your interests.
                            </p>
                            <Button variant="link" className="p-0 text-primary">
                                Start Career Quiz <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </Link>

                <Link href="/home/ai-advisor/skill-gap" className="group block rounded-lg border p-6 transition-all duration-300 hover:border-accent hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                        <div className="bg-accent/10 p-3 rounded-full">
                            <Target className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-1">I have a career goal in mind.</h3>
                            <p className="text-muted-foreground mb-4">
                                Assess your skills for a specific job and get course recommendations.
                            </p>
                            <Button variant="link" className="p-0 text-accent">
                                Analyze My Skills <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        
      </div>
    </div>
  );
}
