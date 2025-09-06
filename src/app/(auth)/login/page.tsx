
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUserRole } from '@/hooks/use-user-role';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTransition } from 'react';
import { login, requestPasswordReset } from '../actions';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useUserRole();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleLogin = (formData: FormData) => {
    startTransition(async () => {
      const result = await login(formData);
      if (result.success && result.role) {
        setRole(result.role);
        let redirectPath = '/home';
        if (result.role === 'host') redirectPath = '/host';
        if (result.role === 'admin') redirectPath = '/admin';
        router.push(redirectPath);
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: result.error || 'An unknown error occurred.',
        });
      }
    });
  };

  const handlePasswordReset = (formData: FormData) => {
    startTransition(async () => {
        const result = await requestPasswordReset(formData);
        if (result.success) {
            toast({
                title: 'Password Reset Link Sent',
                description: result.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.error,
            });
        }
    });
  };

  return (
    <Card>
      <form action={handleLogin}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Log In</CardTitle>
          <CardDescription>
            Enter your email below to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="ml-auto p-0 h-auto text-sm underline">
                    Forgot your password?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form action={handlePasswordReset}>
                    <DialogHeader>
                      <DialogTitle>Reset Password</DialogTitle>
                      <DialogDescription>
                        Enter your email address below and we&apos;ll send you a link to reset your password.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reset-email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="reset-email"
                          name="email"
                          type="email"
                          className="col-span-3"
                          placeholder="m@example.com"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                         <Button type="submit" disabled={isPending}>
                            {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : "Send Reset Link"}
                         </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Logging In...</> : "Log In"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline hover:text-primary">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
