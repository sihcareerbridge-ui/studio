

'use client';

import {
  FileText,
  Bell,
  User as UserIcon,
  CheckCircle,
  ListOrdered,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

export default function StudentDashboardPage() {
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
                    This information will be used to match you with internships.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+1234567890" />
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
                      <Input id="cgpa" type="number" step="0.01" placeholder="8.5" />
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
                      <p className="text-sm text-muted-foreground">Aspirational District:</p>
                      <Badge variant="outline">Auto-set</Badge>
                   </div>
                  <div className="flex justify-end gap-2">
                     <Button variant="outline">Request District Change</Button>
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
                        <Badge>React</Badge>
                        <Badge>Node.js</Badge>
                        <Badge>Python</Badge>
                        <Badge>SQL</Badge>
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
                     <span className="text-muted-foreground">Preferences Submitted:</span>
                     <span className="font-medium">5</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-muted-foreground">Allocation Status:</span>
                      <Badge variant="secondary">Not Allocated</Badge>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-muted-foreground">Last Participated:</span>
                     <span className="font-medium">2023</span>
                   </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Browse internships and rank your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Internship browsing and ranking functionality will be here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Consent</CardTitle>
              <CardDescription>
                Manage your documents and consent settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Document upload and consent management will be here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Allocation Results</CardTitle>
              <CardDescription>
                View your internship allocation results.
              </Description>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Allocation results and actions will be here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Your recent notifications.
              </CardDescription>
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
