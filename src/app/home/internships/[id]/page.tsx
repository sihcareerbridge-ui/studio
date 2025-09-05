
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { internships } from "@/lib/demo-data";
import { Building, Calendar, MapPin, Briefcase, PlusCircle, Bookmark, Check, Award, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { notFound } from "next/navigation";

export default function InternshipDetailsPage({ params }: { params: { id: string } }) {
  const internship = internships.find(i => i.id === params.id);

  if (!internship) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-8">
                <div className="mb-6">
                    <Link href="/home" className="text-sm text-primary hover:underline mb-4 inline-block">
                        &larr; Back to Dashboard
                    </Link>
                     <div className="flex items-start gap-6">
                        <Image 
                            src={internship.logoUrl}
                            alt={`${internship.organization} logo`}
                            width={80}
                            height={80}
                            className="rounded-lg border bg-background"
                        />
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight font-headline">{internship.title}</h1>
                            <p className="text-lg text-muted-foreground mt-1 flex items-center gap-2">
                                <Building className="h-5 w-5" />
                                {internship.organization}
                            </p>
                        </div>
                    </div>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>About {internship.organization}</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                        <p>
                            {internship.organization} is a leader in its field, known for innovation and a commitment to excellence. 
                            Joining our team means you'll be part of a dynamic environment where you can learn, grow, and make a real impact.
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Internship Description</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                        <p>{internship.description}</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Key Responsibilities</CardTitle>
                        <CardDescription>What you'll do on a day-to-day basis.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ul className="space-y-3">
                           <li className="flex items-start gap-3">
                               <Check className="h-5 w-5 text-primary mt-1" />
                               <span>Collaborate with senior engineers to design, develop, and test new features.</span>
                           </li>
                           <li className="flex items-start gap-3">
                               <Check className="h-5 w-5 text-primary mt-1" />
                               <span>Write clean, maintainable, and well-documented code.</span>
                           </li>
                           <li className="flex items-start gap-3">
                               <Check className="h-5 w-5 text-primary mt-1" />
                               <span>Participate in code reviews to maintain code quality and share knowledge.</span>
                           </li>
                            <li className="flex items-start gap-3">
                               <Check className="h-5 w-5 text-primary mt-1" />
                               <span>Debug and resolve technical issues.</span>
                           </li>
                       </ul>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Qualifications</CardTitle>
                        <CardDescription>Skills and experience we're looking for.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3">Required Skills</h4>
                             <div className="flex flex-wrap gap-2">
                                {internship.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-base py-1 px-3">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-3">Preferred Qualifications</h4>
                            <ul className="space-y-3">
                               <li className="flex items-start gap-3">
                                   <Award className="h-5 w-5 text-muted-foreground mt-1" />
                                   <span>Currently pursuing a degree in Computer Science, Engineering, or a related field.</span>
                               </li>
                               <li className="flex items-start gap-3">
                                   <GraduationCap className="h-5 w-5 text-muted-foreground mt-1" />
                                   <span>Previous internship or project experience is a plus.</span>
                               </li>
                               <li className="flex items-start gap-3">
                                   <GraduationCap className="h-5 w-5 text-muted-foreground mt-1" />
                                   <span>Strong problem-solving skills and a passion for technology.</span>
                               </li>
                           </ul>
                        </div>
                    </CardContent>
                </Card>

            </div>
            <div className="md:col-span-1 space-y-6 sticky top-20">
                <Card>
                    <CardHeader>
                        <CardTitle>Internship Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Location</p>
                                <p className="text-muted-foreground">{internship.location}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                             <div>
                                <p className="font-medium">Duration</p>
                                <p className="text-muted-foreground">{internship.duration}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Briefcase className="h-5 w-5 text-muted-foreground" />
                             <div>
                                <p className="font-medium">Type</p>
                                <p className="text-muted-foreground">Internship</p>
                            </div>
                        </div>
                         {internship.fitScore && (
                            <div className="flex items-center gap-3">
                                <Badge variant={internship.fitScore > 90 ? 'default' : 'secondary'} className="text-lg">
                                    {internship.fitScore}%
                                </Badge>
                                <div>
                                    <p className="font-medium">Fit Score</p>
                                    <p className="text-muted-foreground">Based on your profile</p>
                                </div>
                            </div>
                         )}
                         <Separator />
                        <div className="flex flex-col gap-2 pt-2">
                            <Button size="lg"><PlusCircle className="mr-2 h-4 w-4"/> Add to Preferences</Button>
                            <Button size="lg" variant="outline"><Bookmark className="mr-2 h-4 w-4"/> Save for Later</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
