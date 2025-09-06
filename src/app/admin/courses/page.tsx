
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
import { courses as initialCourses, hostProfile } from "@/lib/demo-data";
import { MoreHorizontal, PlusCircle, ShieldOff, ShieldCheck, Phone, Eye, Send } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CourseWithStatus = typeof initialCourses[0] & { status: 'Active' | 'Blocked' };

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<CourseWithStatus[]>(initialCourses.map(c => ({...c, status: 'Active'})));
    const { toast } = useToast();
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const [selectedHost, setSelectedHost] = useState('');

    const handleToggleBlock = (courseId: string) => {
        setCourses(courses.map(c => {
            if (c.id === courseId) {
                const newStatus = c.status === 'Active' ? 'Blocked' : 'Active';
                toast({
                    title: `Course ${newStatus}`,
                    description: `"${c.title}" has been ${newStatus.toLowerCase()}.`
                });
                return { ...c, status: newStatus };
            }
            return c;
        }));
    };

    const handleContactHost = (hostName: string) => {
        setSelectedHost(hostName);
        setIsContactDialogOpen(true);
    };

    const handleSendMessage = () => {
        toast({
            title: "Message Sent!",
            description: `Your message has been delivered to ${selectedHost}.`,
        });
        setIsContactDialogOpen(false);
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
                    <Badge variant={course.status === 'Active' ? 'default' : 'destructive'}>{course.status}</Badge>
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
                           {course.status === 'Active' ? (
                                <><ShieldOff className="mr-2 h-4 w-4 text-red-500" /> Block</>
                            ) : (
                                <><ShieldCheck className="mr-2 h-4 w-4 text-green-500" /> Unblock</>
                            )}
                        </DropdownMenuItem>
                         <DropdownMenuItem onSelect={() => handleContactHost(course.provider)}>
                            <Phone className="mr-2 h-4 w-4" /> Contact Host
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
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Contact {selectedHost}</DialogTitle>
                    <DialogDescription>
                        Your message will be sent to the primary contact for this organization.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="e.g., Question about a course" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" rows={5} placeholder="Your message..." />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleSendMessage}>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
