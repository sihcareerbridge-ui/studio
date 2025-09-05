
'use client';

import {
  FileText,
  Bell,
  User as UserIcon,
  CheckCircle,
  ListOrdered,
  Search,
  MapPin,
  Building,
  PlusCircle,
  GripVertical,
  Trash2,
  Bookmark,
  Upload,
  Lightbulb,
  Award,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { internships, studentProfile, courses } from '@/lib/demo-data';
import Image from 'next/image';
import { useState } from 'react';
import type { Internship } from '@/lib/types';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function StudentDashboardPage() {
  const [rankedInternships, setRankedInternships] = useState<Internship[]>([]);
  const [allocationStatus, setAllocationStatus] = useState<'allocated' | 'not_allocated' | 'pending'>('allocated');
  const allocatedInternship = internships[0]; // Demo data
  const completedCourses = courses.slice(0, 2); // Demo data

  const handleAddToPreferences = (internship: Internship) => {
    if (!rankedInternships.find(i => i.id === internship.id)) {
        if (rankedInternships.length < 5) { // Example limit
            setRankedInternships([...rankedInternships, internship]);
        } else {
            // Here you would show a toast notification
            console.log("You can only rank up to 5 internships.");
        }
    }
  };

  const handleRemoveFromPreferences = (internshipId: string) => {
    setRankedInternships(rankedInternships.filter(i => i.id !== internshipId));
  };


  return (
    <>
      <div className="container mx-auto py-8">
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="profile">
              <UserIcon className="mr-2 h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <ListOrdered className="mr-2 h-4 w-4" /> Preferences
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="mr-2 h-4 w-4" /> Documents & Consent
            </TabsTrigger>
            <TabsTrigger value="results">
              <CheckCircle className="mr-2 h-4 w-4" /> Allocation Results
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>
                      This information will be used to match you with
                      internships.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue={studentProfile.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={studentProfile.email}
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1234567890"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="university">University</Label>
                        <Input id="university" placeholder="State University" />
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="college">College</Label>
                        <Input id="college" placeholder="College of Engineering" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="degree">Degree</Label>
                        <Input id="degree" placeholder="B.Tech" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branch">Branch</Label>
                        <Input id="branch" placeholder="Computer Science" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" type="number" placeholder="3" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cgpa">CGPA</Label>
                        <Input
                          id="cgpa"
                          type="number"
                          step="0.01"
                          placeholder="8.5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="credits">Credits Earned</Label>
                        <Input id="credits" type="number" placeholder="120" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dist1">District 1</SelectItem>
                          <SelectItem value="dist2">District 2</SelectItem>
                          <SelectItem value="dist3">District 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-muted-foreground">
                        Aspirational District:
                      </p>
                      <Badge variant="outline">Auto-set</Badge>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">
                        Request District Change
                      </Button>
                      <Button>Save Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume & Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full">Upload Resume (PDF)</Button>
                    <Progress value={40} className="w-full" />
                    <p className="text-xs text-center text-muted-foreground">
                      Parsing skills...
                    </p>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Your Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {studentProfile.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Edit Skills
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Preferences Submitted:
                      </span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Allocation Status:
                      </span>
                      <Badge variant={allocationStatus === 'allocated' ? 'default' : 'secondary'}>{allocationStatus === 'allocated' ? 'Allocated' : 'Not Allocated'}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Last Participated:
                      </span>
                      <span className="font-medium">2023</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preferences">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <Card>
                <CardHeader>
                    <CardTitle>Browse Internships</CardTitle>
                    <CardDescription>Search, filter, and add internships to your ranked list.</CardDescription>
                     <div className="pt-4 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Search by title or organization..." className="pl-10" />
                        </div>
                        <Select>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="ny">New York, NY</SelectItem>
                                <SelectItem value="sf">San Francisco, CA</SelectItem>
                            </SelectContent>
                        </Select>
                         <Button variant="secondary">Filter</Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                    {internships.map(internship => (
                        <div key={internship.id} className="border rounded-lg p-4 flex items-start gap-4">
                             <Image
                                src={internship.logoUrl}
                                alt={`${internship.organization} logo`}
                                width={48}
                                height={48}
                                className="rounded-md border"
                                />
                            <div className="flex-1">
                                <h3 className="font-semibold">{internship.title}</h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1"><Building className="h-4 w-4"/>{internship.organization}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-4 w-4"/>{internship.location}</p>
                                <div className="flex items-center gap-4 mt-2">
                                     <Badge variant={internship.fitScore && internship.fitScore > 90 ? "default" : "secondary"}>Fit Score: {internship.fitScore || 'N/A'}%</Badge>
                                     <div className="flex flex-wrap gap-1">
                                        {internship.tags.slice(0, 2).map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                                     </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button size="sm" variant="outline" asChild><Link href="#">Details</Link></Button>
                                <Button size="sm" onClick={() => handleAddToPreferences(internship)}><PlusCircle className="mr-2 h-4 w-4"/> Add</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle>Your Ranked Preferences ({rankedInternships.length}/5)</CardTitle>
                    <CardDescription>Drag to reorder. The #1 spot is your top choice.</CardDescription>
                </CardHeader>
                <CardContent>
                    {rankedInternships.length > 0 ? (
                        <div className="space-y-3">
                            {rankedInternships.map((internship, index) => (
                                <div key={internship.id} className="border rounded-lg p-3 flex items-center gap-3 bg-secondary/50">
                                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                    <span className="font-bold text-lg">{index + 1}</span>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm">{internship.title}</h4>
                                        <p className="text-xs text-muted-foreground">{internship.organization}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveFromPreferences(internship.id)}>
                                        <Trash2 className="h-4 w-4 text-red-500"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg py-12">
                            <Bookmark className="h-12 w-12 text-muted-foreground mb-3" />
                            <h3 className="text-lg font-semibold">Start Ranking</h3>
                            <p className="text-muted-foreground text-sm">Add internships from the list on the left.</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button disabled={rankedInternships.length === 0}>Submit Preferences</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="documents">
             <Card>
                <CardHeader>
                  <CardTitle>Documents & Consent</CardTitle>
                  <CardDescription>
                    Manage your resume and data sharing preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                     <h3 className="text-lg font-medium">Resume Management</h3>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <p className="font-medium">{studentProfile.resume}</p>
                                <p className="text-xs text-muted-foreground">Uploaded on 1st July 2024</p>
                            </div>
                          </div>
                          <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload New</Button>
                      </div>
                  </div>
                  <Separator />
                   <div className="space-y-4">
                     <h3 className="text-lg font-medium">Consent Settings</h3>
                      <div className="flex items-start justify-between rounded-lg border p-4">
                        <div>
                          <Label htmlFor="resume-parsing" className="font-medium">Automatic Resume Parsing</Label>
                          <p className="text-sm text-muted-foreground max-w-md pt-1">Allow our AI to parse your resume for skills and experience to improve internship matching and recommendations.</p>
                        </div>
                        <Switch id="resume-parsing" defaultChecked={studentProfile.resumeParsed} />
                      </div>
                       <div className="flex items-start justify-between rounded-lg border p-4">
                        <div>
                          <Label htmlFor="profile-consent" className="font-medium">Profile Sharing Consent</Label>
                          <p className="text-sm text-muted-foreground max-w-md pt-1">Allow host organizations to view your detailed profile, including your resume and skills, once you are allocated to them.</p>
                        </div>
                        <Switch id="profile-consent" defaultChecked={studentProfile.consent} />
                      </div>
                  </div>
                </CardContent>
              </Card>
          </TabsContent>
          <TabsContent value="results">
            <div className="space-y-8">
                {allocationStatus === 'allocated' && allocatedInternship ? (
                  <Card className="bg-secondary/50 border-primary">
                    <CardHeader>
                      <Badge className="w-fit mb-2">Congratulations!</Badge>
                      <CardTitle className="text-2xl">You have been allocated an internship!</CardTitle>
                      <CardDescription>
                        Please review the details below and take action before the deadline.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start gap-6 rounded-lg border bg-background p-4">
                        <Image
                            src={allocatedInternship.logoUrl}
                            alt={`${allocatedInternship.organization} logo`}
                            width={64}
                            height={64}
                            className="rounded-lg border"
                        />
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">{allocatedInternship.title}</h3>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                <Building className="h-4 w-4" /> {allocatedInternship.organization}
                            </p>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> {allocatedInternship.location}
                            </p>
                        </div>
                      </div>
                      
                      <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Why you were matched</AlertTitle>
                        <AlertDescription>
                          Your profile shows a strong proficiency in <strong>React, Python, and AI</strong> which aligns perfectly with the requirements for this role. Your high Fit Score of <strong>{allocatedInternship.fitScore}%</strong> indicates a great potential for success.
                        </AlertDescription>
                      </Alert>

                    </CardContent>
                    <CardFooter className="gap-4">
                        <Button size="lg">Accept Offer</Button>
                        <Button size="lg" variant="destructive">Decline Offer</Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="#">View Internship Details</Link>
                        </Button>
                    </CardFooter>
                  </Card>
                ) : (
                   <Card>
                    <CardHeader>
                      <CardTitle>Allocation Pending</CardTitle>
                      <CardDescription>
                        The allocation process is not yet complete. Please check back later for results.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center text-center py-16">
                      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Results will be published here once available.</p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-6 w-6"/>
                            Completed Courses
                        </CardTitle>
                        <CardDescription>A record of the courses you have successfully completed.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {completedCourses.map(course => (
                             <div key={course.id} className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-4">
                                    <Image src={course.logoUrl} alt={course.provider} width={40} height={40} className="rounded-md" />
                                    <div>
                                        <p className="font-semibold">{course.title}</p>
                                        <p className="text-sm text-muted-foreground">{course.provider}</p>
                                    </div>
                                </div>
                                <Button variant="outline">View Certificate</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Your recent notifications.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Notification timeline will be here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
