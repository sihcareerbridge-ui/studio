
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { courses } from "@/lib/demo-data";
import { CheckCircle, Clock, Star, Tag } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { notFound } from "next/navigation";

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const course = courses.find(c => c.id === params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <div className="mb-6">
                    <Link href="/courses" className="text-sm text-primary hover:underline mb-2 inline-block">
                        &larr; Back to courses
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tight font-headline">{course.title}</h1>
                    <p className="text-lg text-muted-foreground mt-1">By {course.provider}</p>
                </div>
                
                <Image 
                    src={`https://picsum.photos/seed/${course.id}/1200/600`}
                    alt={course.title}
                    width={1200}
                    height={600}
                    data-ai-hint="abstract learning"
                    className="aspect-video object-cover rounded-lg mb-6"
                />

                <div className="prose dark:prose-invert max-w-none">
                    <p className="lead">{course.description}</p>
                </div>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Course Modules</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {course.modules.map((module, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-semibold">{module.title}</p>
                                        <p className="text-sm text-muted-foreground">{module.duration}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>About this course</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Tag className="h-5 w-5 text-muted-foreground" />
                            <Badge>{course.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm">{course.duration} total hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm">{course.rating}/5 rating</span>
                        </div>
                         <Separator />
                         <Image 
                            src={course.logoUrl}
                            alt={`${course.provider} logo`}
                            width={100}
                            height={100}
                            className="rounded-md"
                        />
                        <p className="text-sm font-semibold">{course.provider}</p>
                        <Button className="w-full" size="lg">Start Learning</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
