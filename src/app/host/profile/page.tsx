
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hostProfile, internships } from "@/lib/demo-data";
import { Briefcase, Building, Mail, MapPin, Pencil, Phone, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


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
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4" /> Change Logo</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Upload New Logo</DialogTitle>
                                        <DialogDescription>
                                            Select a new image file to use as your organization's logo. Recommended size: 200x200 pixels.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 py-4">
                                        <Label htmlFor="logo-upload">Logo Image</Label>
                                        <Input id="logo-upload" type="file" />
                                    </div>
                                    <DialogFooter>
                                         <DialogClose asChild>
                                            <Button type="button" variant="secondary">
                                            Cancel
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button type="submit">Save</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
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
      d="M8.968 7.153a.75.75 0 01.992 0l1.263 1.264a.75.75 0 001.06 0l2.1-2.1a.75.75 0 111.06 1.06l-2.1 2.1a2.25 2.25 0 01-3.182 0l-1.263-1.264a.75.75 0 010-.992z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.75 11.25a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0v-2.25z"
      clipRule="evenodd"
    />
  </svg>
);

    