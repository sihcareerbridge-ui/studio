
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Search, Wand2, Target } from "lucide-react";
import Link from "next/link";

export default function AiAdvisorHubPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">AI Advisor</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          Your personal AI-powered assistant for career exploration and skill development. Choose a tool below to get started.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        <Link href="/home/ai-advisor/career-quiz" className="group block">
          <Card className="h-full transition-all duration-300 group-hover:border-primary group-hover:shadow-2xl group-hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="mx-auto bg-primary/10 p-5 rounded-full w-fit mb-6">
                  <Wand2 className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Career Advisor Quiz</h2>
              <p className="text-muted-foreground mb-6">
                Not sure where to start? Take a personality and interest quiz to discover tech careers that align with you.
              </p>
              <Button size="lg" tabIndex={-1}>
                  Start Career Quiz <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/home/ai-advisor/skill-gap" className="group block">
           <Card className="h-full transition-all duration-300 group-hover:border-accent group-hover:shadow-2xl group-hover:-translate-y-2">
            <CardContent className="p-8 text-center">
               <div className="mx-auto bg-accent/10 p-5 rounded-full w-fit mb-6">
                  <Target className="h-12 w-12 text-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Skill Gap Analysis</h2>
              <p className="text-muted-foreground mb-6">
                Already have a job in mind? Take a technical quiz to identify your knowledge gaps and get course recommendations.
              </p>
              <Button size="lg" variant="secondary" tabIndex={-1}>
                 Analyze Skill Gaps <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Button>
            </CardContent>
          </Card>
        </Link>
        
      </div>
    </div>
  );
}
