
'use client';

import { useState, useMemo, Suspense } from 'react';
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
import { useSearchParams } from 'next/navigation';

export const allApplicants = [
    { ...studentProfile, id: 'user-student-01', avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe', internshipId: 'int-001', status: 'Allocated' },
    { name: 'Ben Carter', email: 'ben.carter@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=bencarter', id: 'user-student-02', internshipId: 'int-001', status: 'Pending Review', university: 'Tech University', college: 'School of IT', degree: 'B.Sc. IT', branch: 'Information Technology', year: 4, cgpa: 8.2, credits: 140, skills: ['Java', 'Spring', 'MySQL'], bio: 'Detail-oriented Java developer with experience in building enterprise-level applications.' },
    { name: 'Chloe Davis', email: 'chloe.davis@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=chloedavis', id: 'user-student-03', internshipId: 'int-002', status: 'Interviewing', university: 'Design Institute', college: 'School of Design', degree: 'B.Des', branch: 'Product Design', year: 3, cgpa: 9.1, credits: 110, skills: ['Figma', 'User Research', 'Prototyping'], bio: 'Creative product designer focused on creating user-centric and impactful digital experiences.' },
    { name: 'David Evans', email: 'david.evans@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=davidevans', id: 'user-student-04', internshipId: 'int-003', status: 'Offer Extended', university: 'Data Science College', college: 'Dept. of Statistics', degree: 'M.Sc.', branch: 'Data Science', year: 1, cgpa: 9.5, credits: 40, skills: ['Python', 'TensorFlow', 'Scikit-learn'], bio: 'Data scientist with a knack for finding patterns in complex datasets and building predictive models.' },
    { name: 'Emily Harris', email: 'emily.harris@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=emilyharris', id: 'user-student-05', internshipId: 'int-001', status: 'Rejected', university: 'State University', college: 'College of Engineering', degree: 'B.Tech', branch: 'Computer Science', year: 3, cgpa: 7.9, credits: 120, skills: ['JavaScript', 'HTML', 'CSS'], bio: 'Frontend developer with a good eye for design and a passion for web standards.' },
    { name: 'Frank Green', email: 'frank.green@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=frankgreen', id: 'user-student-06', internshipId: 'int-004', status: 'Pending Review', university: 'State University', college: 'College of Engineering', degree: 'B.Tech', branch: 'Computer Science', year: 3, cgpa: 8.5, credits: 122, skills: ['React Native', 'Firebase', 'GraphQL'], bio: 'Mobile developer focused on building cross-platform applications with a great user experience.' },
];

function ApplicantsPageContent() {
  const searchParams = useSearchParams();
  const internshipQuery = searchParams.get('internshipId');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedInternship, setSelectedInternship] = useState(internshipQuery || 'all');

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

  const handleDownloadCsv = () => {
    const headers = ['Name', 'Email', 'Internship Applied For', 'Status', 'University', 'Degree', 'CGPA', 'Skills'];
    
    const csvRows = [headers.join(',')];

    filteredApplicants.forEach(applicant => {
        const internship = internships.find(i => i.id === applicant.internshipId);
        const row = [
            `"${applicant.name}"`,
            `"${applicant.email}"`,
            `"${internship?.title || 'N/A'}"`,
            `"${applicant.status}"`,
            `"${applicant.university}"`,
            `"${applicant.degree}, ${applicant.branch}"`,
            applicant.cgpa,
            `"${applicant.skills?.join(', ') || ''}"`
        ];
        csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'applicants.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Applicants</h1>
            <p className="text-muted-foreground">Manage and review all student applications.</p>
        </div>
        <Button onClick={handleDownloadCsv}>
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
                 <Select onValueChange={setSelectedInternship} value={selectedInternship}>
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

export default function AllocatedStudentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApplicantsPageContent />
        </Suspense>
    );
}
