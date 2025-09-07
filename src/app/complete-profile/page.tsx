
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserRole } from '@/hooks/use-user-role';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CompleteProfilePage() {
    const router = useRouter();
    // In a real app, this might come from a hook that safely reads from the session.
    // For this demo, we'll just simulate getting the role.
    const [role, setRole] = useState<'student' | 'host' | null>(null);

    useEffect(() => {
        // This is a stand-in for getting the actual user role from the session after login.
        const storedRole = window.sessionStorage.getItem('userRole') as 'student' | 'host' | null;
        const simulatedRole = storedRole || 'student'; // Default to student for demo
        setRole(simulatedRole);
    }, []);

    const handleSubmit = () => {
        // In a real app, this would be a server action to save profile data
        if (role === 'student') {
            router.push('/home');
        } else if (role === 'host') {
            router.push('/host');
        }
    };

    const renderStudentFields = () => (
        <>
            <div className="grid gap-2">
                <Label htmlFor="university">University</Label>
                <Input id="university" placeholder="e.g., State University" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" placeholder="e.g., B.Tech in Computer Science" />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="skills">Key Skills (comma-separated)</Label>
                <Input id="skills" placeholder="e.g., React, Node.js, Python" />
            </div>
        </>
    );

    const renderHostFields = () => (
        <>
            <div className="grid gap-2">
                <Label htmlFor="organization">Organization Name</Label>
                <Input id="organization" placeholder="e.g., InnovateTech Inc." />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="e.g., https://innovatetech.com" />
            </div>
        </>
    );

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <Card className="w-full max-w-lg">
                 <CardHeader>
                    <CardTitle>Complete Your Profile</CardTitle>
                    <CardDescription>
                        Just a few more details to get you started.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                   {role === 'student' && renderStudentFields()}
                   {role === 'host' && renderHostFields()}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleSubmit}>
                        Finish and Go to Dashboard
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

