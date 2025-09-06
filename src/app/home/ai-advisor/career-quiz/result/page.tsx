
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Briefcase, BookOpen, User, ChevronLeft } from 'lucide-react';
import type { CareerRecommendationOutput, Quiz, QuizAnswers } from '@/ai/flows/skill-assessment-flow';

type ResultData = {
    quiz: Quiz;
    answers: QuizAnswers;
    recommendations: CareerRecommendationOutput;
}

export default function CareerQuizResultPage() {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedResults = sessionStorage.getItem('careerQuizResults');
        if (storedResults) {
            setResultData(JSON.parse(storedResults));
        } else {
            // Redirect if no data, maybe show a toast
            router.push('/home/ai-advisor/career-quiz');
        }
    }, [router]);

    if (!resultData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Lightbulb className="h-12 w-12 animate-spin" />
            </div>
        );
    }
    
    const { recommendations } = resultData;

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline">Your Career Quiz Results</h1>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Here's a personalized career path based on your personality and interests.
                </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User /> Your Personality & Interest Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{recommendations.reasoning}</p>
                    </CardContent>
                </Card>

                 <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Briefcase /> Recommended Job Roles</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2">
                                {recommendations.recommendedJobs.map((job) => (
                                <li key={job} className="text-lg">{job}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BookOpen /> Your Learning Path</CardTitle>
                            <CardDescription>Start with these foundational courses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {recommendations.courses.map((course) => (
                                    <li key={course} className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full">
                                            <BookOpen className="h-5 w-5 text-primary" />
                                        </div>
                                       <span>{course}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center pt-4 space-x-4">
                    <Button onClick={() => router.push('/home/ai-advisor/career-quiz')}>
                        <ChevronLeft className="mr-2" /> Retake Quiz
                    </Button>
                     <Button variant="secondary" onClick={() => router.push('/home/courses')}>
                        Explore All Courses
                    </Button>
                </div>
            </div>
        </div>
    );
}
