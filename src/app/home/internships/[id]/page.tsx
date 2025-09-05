
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { internships } from "@/lib/demo-data";
import { Building, Calendar, Clock, MapPin, Briefcase, PlusCircle, Bookmark } from "lucide-react";
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
            <div className="md:col-span-2">
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
                        <CardTitle>Internship Description</CardTitle>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none">
                        <p>{internship.description}</p>
                    </CardContent>
                </Card>

                 <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Required Skills</CardTitle>
                        <CardDescription>Skills needed to succeed in this role.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {internship.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-base py-1 px-3">{tag}</Badge>
                        ))}
                    </CardContent>
                </Card>

            </div>
            <div className="md:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Internship Details</CardTitle>
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

    