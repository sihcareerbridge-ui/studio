
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Users,
  Briefcase,
  MessageSquare,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { users, internships } from '@/lib/demo-data';
import Link from 'next/link';

const applicantData = [
  {
    id: 'user-student-02',
    name: 'Ben Carter',
    email: 'ben.carter@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=bencarter',
    appliedFor: 'Software Engineer Intern',
    date: '2 days ago',
  },
  {
    id: 'user-student-03',
    name: 'Chloe Davis',
    email: 'chloe.davis@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=chloedavis',
    appliedFor: 'Product Manager Intern',
    date: '3 days ago',
  },
  {
    id: 'user-student-04',
    name: 'David Evans',
    email: 'david.evans@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=davidevans',
    appliedFor: 'Data Science Intern',
    date: '5 days ago',
  },
];


export default function HostDashboard() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Host Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your internships and students.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Internships
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 new applicants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Allocated Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">View profiles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Feedback
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
              <CardDescription>
                The latest students who have applied to your internships.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Applied For</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicantData.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={applicant.avatarUrl}
                              alt={applicant.name}
                            />
                            <AvatarFallback>
                              {applicant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{applicant.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {applicant.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{applicant.appliedFor}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/host/students">
                  View All Applicants <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/host/internships/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create New Internship
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/host/students">
                  <Users className="mr-2 h-4 w-4" /> View All Students
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
