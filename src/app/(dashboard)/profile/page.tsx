import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { studentProfile, users } from "@/lib/demo-data";
import { Github, Linkedin, FileText, Twitter, Upload, Link as LinkIcon, Pencil } from "lucide-react";
import Link from 'next/link';

export default function ProfilePage() {
  const user = users.student;

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4" /> Change Photo</Button>
              <div className="flex justify-around pt-2">
                <Link href={studentProfile.links.github} target="_blank" aria-label="GitHub"><Github className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
                <Link href={studentProfile.links.linkedin} target="_blank" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
                <Link href={studentProfile.links.twitter} target="_blank" aria-label="Twitter"><Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
                <Link href={studentProfile.links.kaggle} target="_blank" aria-label="Kaggle"><LinkIcon className="h-6 w-6 text-muted-foreground hover:text-foreground" /></Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {studentProfile.skills.map(skill => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1.5">
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </div>
              <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={studentProfile.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={studentProfile.email} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" rows={4} defaultValue={studentProfile.bio} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
              <CardDescription>Manage your resume and parsing settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6" />
                    <span className="font-medium">{studentProfile.resume}</span>
                  </div>
                  <Button variant="outline">Upload New</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="resume-parsing" className="font-medium">Automatic Resume Parsing</Label>
                  <p className="text-sm text-muted-foreground">Allow our AI to parse your resume for skills and experience.</p>
                </div>
                <Switch id="resume-parsing" defaultChecked={studentProfile.resumeParsed} />
              </div>
              <Separator />
               <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profile-consent" className="font-medium">Profile Sharing Consent</Label>
                  <p className="text-sm text-muted-foreground">Allow host organizations to view your detailed profile.</p>
                </div>
                <Switch id="profile-consent" defaultChecked={studentProfile.consent} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
