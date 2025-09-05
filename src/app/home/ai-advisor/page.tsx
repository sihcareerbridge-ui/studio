
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Search, Wand2 } from "lucide-react";
import Link from "next/link";

export default function AiAdvisorHubPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">AI Advisor</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Your personal AI-powered assistant for career exploration and skill development.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                <Wand2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle>Career Advisor Quiz</CardTitle>
            <CardDescription>Not sure where to start? Take a personality and interest quiz to discover tech careers that align with you.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild size="lg">
                <Link href="/home/ai-advisor/career-quiz">Start Career Quiz</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit mb-4">
                <Search className="h-10 w-10 text-accent" />
            </div>
            <CardTitle>Skill Gap Analysis</CardTitle>
            <CardDescription>Already have a job in mind? Take a technical quiz to identify your knowledge gaps and get course recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild size="lg" variant="secondary">
                 <Link href="/home/ai-advisor/skill-gap">Analyze Skill Gaps</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
