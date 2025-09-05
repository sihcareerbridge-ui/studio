
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { internships } from "@/lib/demo-data";
import { Bookmark, Building, MapPin, Trash2 } from "lucide-react";
import Image from "next/image";

export default function SavedInternshipsPage() {
    const savedInternships = internships.slice(1, 3); // Demo data

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Saved Internships</h1>
        <p className="text-muted-foreground">Your bookmarked internships for future reference.</p>
      </div>

       {savedInternships.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedInternships.map((internship) => (
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
                    </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {internship.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4"/>
                            <span>{internship.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {internship.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                    <Button className="w-full">Apply Now</Button>
                    <Button variant="destructive" size="icon" aria-label="Remove saved internship">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg py-24">
                <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold">No Saved Internships</h2>
                <p className="text-muted-foreground mt-2">You haven&apos;t bookmarked any internships yet.</p>
            </div>
        )}
    </div>
  );
}
