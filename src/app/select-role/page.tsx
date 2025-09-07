
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { User, Building } from 'lucide-react';
import { setRoleAction } from '@/app/(auth)/actions';
import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import type { Role } from '@/lib/types';

export default function SelectRolePage() {
    const [isPending, startTransition] = useTransition();
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    const handleRoleSelection = (role: Role) => {
        setSelectedRole(role);
        startTransition(async () => {
            // Store role in sessionStorage so the next page can access it.
            // In a real app, you might handle this differently (e.g., another DB call).
            sessionStorage.setItem('userRole', role);
            await setRoleAction(role);
        });
    };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">One last step!</h1>
        <p className="text-muted-foreground mb-8">
          To personalize your experience, please tell us who you are.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover:border-primary transition-colors duration-300">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <User className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">I am a Student</CardTitle>
              <CardDescription>
                I'm looking for internships, courses, and career guidance to launch my professional journey.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={() => handleRoleSelection('student')} disabled={isPending}>
                {isPending && selectedRole === 'student' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Continue as Student"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:border-primary transition-colors duration-300">
            <CardHeader className="items-center">
               <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Building className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">I am a Host</CardTitle>
              <CardDescription>
                My organization is looking to post internships, create courses, and find talented students.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={() => handleRoleSelection('host')} disabled={isPending}>
                 {isPending && selectedRole === 'host' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Continue as Host"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
