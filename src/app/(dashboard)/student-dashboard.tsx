
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { internships } from "@/lib/demo-data";
import { Bookmark, Briefcase, Building, MapPin, Search } from "lucide-react";
import Image from "next/image";

export default function StudentDashboard() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Find Your Internship</h1>
        <p className="text-muted-foreground">Browse and search for internships that match your profile.</p>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by title, organization, or skill..." className="pl-10" />
        </div>
        <Button>Search</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {internships.map((internship) => (
          <Card key={internship.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Image
                  src={internship.logoUrl}
                  alt={`${internship.organization} logo`}
                  width={64}
                  height={64}
                  className="rounded-lg border"
                />
                <div className="flex-1">
                  <CardTitle className="text-xl">{internship.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 pt-1">
                    <Building className="h-4 w-4" /> {internship.organization}
                  </CardDescription>
                </div>
                {internship.fitScore && (
                     <Badge variant={internship.fitScore > 90 ? 'default' : 'secondary'}>
                        {internship.fitScore}% Fit
                    </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
               <p className="text-sm text-muted-foreground line-clamp-2">
                 {internship.description}
               </p>
               <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4"/>
                        <span>{internship.location}</span>
                    </div>
                     <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4"/>
                        <span>{internship.duration}</span>
                    </div>
               </div>
               <div className="flex flex-wrap gap-2">
                {internship.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
               </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button className="w-full">Apply Now</Button>
              <Button variant="outline" size="icon" aria-label="Save internship">
                <Bookmark className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
