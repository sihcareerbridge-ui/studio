
'use client';

import { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, FileDown, Search } from "lucide-react";
import { internships, studentProfile } from "@/lib/demo-data";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const allApplicants = [
    { ...studentProfile, id: 'user-student-01', internshipId: 'int-001', status: 'Allocated' },
    { name: 'Ben Carter', email: 'ben.carter@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=bencarter', id: 'user-student-02', internshipId: 'int-001', status: 'Pending Review' },
    { name: 'Chloe Davis', email: 'chloe.davis@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=chloedavis', id: 'user-student-03', internshipId: 'int-002', status: 'Interviewing' },
    { name: 'David Evans', email: 'david.evans@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=davidevans', id: 'user-student-04', internshipId: 'int-003', status: 'Offer Extended' },
    { name: 'Emily Harris', email: 'emily.harris@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=emilyharris', id: 'user-student-05', internshipId: 'int-001', status: 'Rejected' },
    { name: 'Frank Green', email: 'frank.green@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=frankgreen', id: 'user-student-06', internshipId: 'int-004', status: 'Pending Review' },
];

export default function AllocatedStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedInternship, setSelectedInternship] = useState('all');

  const filteredApplicants = useMemo(() => {
    return allApplicants.filter(applicant => {
      const internship = internships.find(i => i.id === applicant.internshipId);
      const lowerCaseQuery = searchQuery.toLowerCase();

      const matchesSearch = 
        applicant.name.toLowerCase().includes(lowerCaseQuery) ||
        applicant.email.toLowerCase().includes(lowerCaseQuery) ||
        (internship && internship.title.toLowerCase().includes(lowerCaseQuery));

      const matchesStatus = selectedStatus === 'all' || applicant.status.toLowerCase().replace(' ', '-') === selectedStatus;
      const matchesInternship = selectedInternship === 'all' || applicant.internshipId === selectedInternship;

      return matchesSearch && matchesStatus && matchesInternship;
    });
  }, [searchQuery, selectedStatus, selectedInternship]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Applicants</h1>
            <p className="text-muted-foreground">Manage and review all student applications.</p>
        </div>
        <Button>
          <FileDown className="mr-2 h-4 w-4" /> Download as CSV
        </Button>
      </div>
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search by name, email, or internship..." 
                        className="pl-10"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select onValueChange={setSelectedStatus} defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending-review">Pending Review</SelectItem>
                        <SelectItem value="interviewing">Interviewing</SelectItem>
                        <SelectItem value="offer-extended">Offer Extended</SelectItem>
                        <SelectItem value="allocated">Allocated</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
                 <Select onValueChange={setSelectedInternship} defaultValue="all">
                    <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Filter by Internship" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Internships</SelectItem>
                        {internships.map(i => <SelectItem key={i.id} value={i.id}>{i.title}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Internship Applied For</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.map((student) => {
                const internship = internships.find(i => i.id === student.internshipId);
                return (
                    <TableRow key={student.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={student.avatarUrl} alt={student.name} />
                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{student.name}</p>
                                    <p className="text-sm text-muted-foreground">{student.email}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{internship?.title || 'N/A'}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{student.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href={`/host/students/${student.id}`}>View Application</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Contact Student</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                Reject Application
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
