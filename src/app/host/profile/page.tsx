
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hostProfile, internships } from "@/lib/demo-data";
import { Briefcase, Building, Mail, MapPin, Pencil, Phone, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function HostProfilePage() {

    const activeInternships = internships.slice(0, 3);

    return (
        <div className="container mx-auto py-8 space-y-8">
             <div>
                <h1 className="text-3xl font-bold tracking-tight">Organization Profile</h1>
                <p className="text-muted-foreground">Manage your company's public information.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1 space-y-8">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Image
                                src={hostProfile.logoUrl}
                                alt={`${hostProfile.name} logo`}
                                width={96}
                                height={96}
                                className="rounded-full border p-2 mb-4"
                            />
                            <CardTitle>{hostProfile.name}</CardTitle>
                             <div className="flex items-center gap-2 mt-2">
                                <CheckBadgeIcon className="h-6 w-6 text-primary" />
                                <span className="text-sm font-medium text-primary">Verified by PM Internship Scheme</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4" /> Change Logo</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Email</p>
                                    <a href={`mailto:${hostProfile.email}`} className="text-muted-foreground hover:underline">{hostProfile.email}</a>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-muted-foreground">{hostProfile.phone}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-muted-foreground">{hostProfile.address}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
                <div className="md:col-span-2 space-y-8">
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1.5">
                                <CardTitle>About {hostProfile.name}</CardTitle>
                                <CardDescription>Update your organization's description and details.</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            <p>{hostProfile.bio}</p>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Active Internships</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {activeInternships.map(internship => (
                                <div key={internship.id} className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-muted p-2 rounded-md">
                                            <Briefcase className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <Link href={`/host/internships/${internship.id}/edit`} className="font-semibold hover:underline">{internship.title}</Link>
                                            <p className="text-sm text-muted-foreground">{internship.location}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" asChild>
                                        <Link href={`/host/students?internshipId=${internship.id}`}>View Applicants</Link>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Using a different icon for verification as CheckBadge is not in lucide-react by default
const CheckBadgeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12.75 2.25c-2.39 0-4.583.9-6.22 2.396a.75.75 0 00.865 1.208A7.493 7.493 0 0112.75 4.5a.75.75 0 000-1.5z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M8.243 4.643a.75.75 0 011.06 0l.253.253a.75.75 0 010 1.06l-.253.253a.75.75 0 01-1.06 0l-.253-.253a.75.75 0 010-1.06l.253-.253zM14.49 8.49a.75.75 0 011.06 0l.253.253a.75.75 0 010 1.06l-.253.253a.75.75 0 01-1.06 0l-.253-.253a.75.75 0 010-1.06l.253-.253z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M2.515 9.422a.75.75 0 01.866-.499 11.23 11.23 0 018.683-1.634.75.75 0 01.696 1.442 9.73 9.73 0 00-7.55 1.423.75.75 0 01-1.196-.932zM15.42 15.682a.75.75 0 01.866-.499 11.23 11.23 0 018.683-1.634.75.75 0 01.696 1.442 9.73 9.73 0 00-7.55 1.423.75.75 0 01-1.196-.932z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M10.463 2.146a.75.75 0 01.218 1.039 9.734 9.734 0 00-3.354 5.242.75.75 0 01-1.41-.433 11.234 11.234 0 013.86-6.03.75.75 0 01.686.182zM21.854 13.537a.75.75 0 01.218 1.039 9.734 9.734 0 00-3.354 5.242.75.75 0 11-1.41-.433 11.234 11.234 0 013.86-6.03.75.75 0 01.686.182z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M8.902 14.505a.75.75 0 01.037 1.06l-.253.253a.75.75 0 01-1.06 0l-.253-.253a.75.75 0 011.06-1.06l.253.253a.75.75 0 01-.036 0zM12 15.75a.75.75 0 00-.75.75v5.25a.75.75 0 001.5 0v-5.25a.75.75 0 00-.75-.75z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M14.171 13.434a.75.75 0 011.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-1.5-1.5a.75.75 0 111.06-1.06l.97.97 3.22-3.22z"
      clipRule="evenodd"
    />
  </svg>
);
