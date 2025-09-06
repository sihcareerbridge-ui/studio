
'use client';

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { courses as initialCourses } from "@/lib/demo-data";
import { MoreHorizontal, PlusCircle, ShieldOff, ShieldCheck, Phone, Eye } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/lib/types";

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const { toast } = useToast();

    const handleToggleBlock = (courseId: string) => {
        const course = courses.find((c) => c.id === courseId);
        if (!course) return;

        let newStatus: Course['status'];
        let toastTitle: string;
        let toastDescription: string;

        if (course.status === 'Blocked') {
            newStatus = 'Inactive';
            toastTitle = 'Course Unblocked';
            toastDescription = `"${course.title}" has been unblocked and is now inactive.`;
        } else {
            newStatus = 'Blocked';
            toastTitle = 'Course Blocked';
            toastDescription = `"${course.title}" has been blocked.`;
        }
        
        setCourses((current) =>
            current.map((c) =>
                c.id === courseId ? { ...c, status: newStatus } : c
            )
        );

        toast({
            title: toastTitle,
            description: toastDescription,
        });
    };
    
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
            <p className="text-muted-foreground">Add, edit, or block courses on the platform.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
        </Button>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.provider}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                        course.status === 'Active' ? 'default' :
                        course.status === 'Blocked' ? 'destructive' :
                        'secondary'
                    }>{course.status}</Badge>
                  </TableCell>
                  <TableCell>
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
                            <Link href={`/admin/courses/${course.id}`}><Eye className="mr-2 h-4 w-4" /> View Course Page</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleBlock(course.id)}>
                           {course.status === 'Blocked' ? (
                                <><ShieldCheck className="mr-2 h-4 w-4 text-green-500" /> Unblock</>
                            ) : (
                                <><ShieldOff className="mr-2 h-4 w-4 text-red-500" /> Block</>
                            )}
                        </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                            <Link href={`/admin/contact?host=${course.provider}`}><Phone className="mr-2 h-4 w-4" /> Contact Host</Link>
                         </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
