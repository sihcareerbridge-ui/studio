
'use client';

import { Logo } from '@/components/logo';
import { UserRoleProvider } from '@/hooks/use-user-role';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserRoleProvider>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold"
            >
              <Logo className="h-8 w-8" />
              <span>CareerMatch</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </UserRoleProvider>
  );
}
