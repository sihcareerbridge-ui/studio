
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { signup } from '../actions';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignup = (formData: FormData) => {
    startTransition(async () => {
      const result = await signup(formData);

      if (result.success) {
        setShowConfirmation(true);
      } else {
        toast({
          variant: 'destructive',
          title: 'Signup Failed',
          description: result.error,
        });
      }
    });
  };

  return (
    <>
      <Card>
        <form action={handleSignup}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your information to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required minLength={8} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating Account...</> : "Sign Up"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="underline hover:text-primary">
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check your email</DialogTitle>
            <DialogDescription>
              We've sent a confirmation link to your email address. Please click the link to continue.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
