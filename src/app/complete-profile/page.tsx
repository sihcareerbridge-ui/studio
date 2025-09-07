
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserRole } from '@/hooks/use-user-role';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { completeProfileAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import type { Role } from '@/lib/types';

export default function CompleteProfilePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    
    // In a real app, role would come from the user session/JWT.
    // For this demo, we'll read it from sessionStorage where we put it during role selection.
    const [role, setRole] = useState<Role | null>(null);

    useEffect(() => {
        // This is a stand-in for getting the actual user role from a secure session.
        const storedRole = sessionStorage.getItem('userRole') as Role | null;
        if (storedRole) {
            setRole(storedRole);
        } else {
            // If no role, maybe they landed here by mistake.
            // Redirect them to select a role.
            router.push('/select-role');
        }
    }, [router]);

    const handleSubmit = (formData: FormData) => {
        if (!role) return;

        startTransition(async () => {
            const result = await completeProfileAction(formData, role);

            if (result.success) {
                toast({
                    title: 'Profile Saved!',
                    description: "You're all set up.",
                });
                // The redirection is now handled inside the server action
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error saving profile',
                    description: result.error,
                });
            }
        });
    };

    const renderStudentFields = () => (
        <>
            <div className="grid gap-2">
                <Label htmlFor="university">University</Label>
                <Input id="university" name="university" placeholder="e.g., State University" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" name="degree" placeholder="e.g., B.Tech in Computer Science" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="skills">Key Skills (comma-separated)</Label>
                <Input id="skills" name="skills" placeholder="e.g., React, Node.js, Python" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea id="bio" name="bio" placeholder="A brief introduction about yourself..." />
            </div>
        </>
    );

    const renderHostFields = () => (
        <>
            <div className="grid gap-2">
                <Label htmlFor="organization">Organization Name</Label>
                <Input id="organization" name="organization" placeholder="e.g., InnovateTech Inc." required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" type="url" placeholder="e.g., https://innovatetech.com" required/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="bio">About your organization</Label>
                <Textarea id="bio" name="bio" placeholder="What your organization does, its mission, etc." />
            </div>
        </>
    );

    if (!role) {
        return (
             <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
                <Loader2 className="h-8 w-8 animate-spin" />
             </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <Card className="w-full max-w-lg">
                <form action={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Complete Your Profile</CardTitle>
                        <CardDescription>
                            Just a few more details to get you started as a <span className="font-semibold">{role}</span>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                    {role === 'student' && renderStudentFields()}
                    {role === 'host' && renderHostFields()}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Saving...</> : 'Finish and Go to Dashboard'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
