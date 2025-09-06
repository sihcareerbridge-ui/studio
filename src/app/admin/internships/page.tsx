
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { MoreHorizontal, Trash2, Eye, ShieldCheck, ShieldOff, Search, Phone, Send } from 'lucide-react';

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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useToast } from '@/hooks/use-toast';
import { internships as allInternships } from '@/lib/demo-data';
import { Input } from '@/components/ui/input';
import type { Internship } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export default function AdminInternshipsPage() {
    const [internships, setInternships] = useState<Internship[]>(allInternships);
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();
    const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
    const [selectedHost, setSelectedHost] = useState('');

    const filteredInternships = useMemo(() => {
        return internships.filter(internship =>
            internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            internship.organization.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [internships, searchQuery]);
    
    const handleToggleBlock = (internshipId: string) => {
        const internship = internships.find((i) => i.id === internshipId);
        if (!internship) return;
    
        const newStatus = internship.status === 'Active' ? 'Closed' : 'Active';
        
        toast({
            title: `Internship ${newStatus === 'Active' ? 'Unblocked' : 'Blocked'}`,
            description: `"${internship.title}" has been ${newStatus === 'Active' ? 'unblocked' : 'blocked'}.`,
        });
    
        setInternships((current) =>
            current.map((i) =>
                i.id === internshipId ? { ...i, status: newStatus } : i
            )
        );
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
          <h1 className="text-3xl font-bold tracking-tight">Manage Internships</h1>
          <p className="text-muted-foreground">View, block, or unblock internships on the platform.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Internship Postings</CardTitle>
          <CardDescription>A list of all internships posted by all organizations.</CardDescription>
           <div className="relative pt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search by title or organization..." 
                    className="pl-10 max-w-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInternships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell className="font-medium">{internship.title}</TableCell>
                  <TableCell>{internship.organization}</TableCell>
                  <TableCell>{internship.location}</TableCell>
                  <TableCell>
                    <Badge variant={internship.status === 'Active' ? 'default' : 'destructive'}>
                      {internship.status}
                    </Badge>
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
                            <Link href={`/home/internships/${internship.id}`}><Eye className="mr-2 h-4 w-4" /> View as Student</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleBlock(internship.id)}>
                           {internship.status === 'Active' ? (
                                <><ShieldOff className="mr-2 h-4 w-4 text-red-500" /> Block</>
                            ) : (
                                <><ShieldCheck className="mr-2 h-4 w-4 text-green-500" /> Unblock</>
                            )}
                        </DropdownMenuItem>
                         <DropdownMenuItem onSelect={() => handleContactHost(internship.organization)}>
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
                        <Input id="subject" placeholder="e.g., Question about an internship" />
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
