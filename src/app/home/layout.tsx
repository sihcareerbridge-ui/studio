
"use client";

import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { useUserRole, UserRoleProvider } from "@/hooks/use-user-role";
import {
  BookOpen,
  Bookmark,
  Briefcase,
  Heart,
  Home,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from 'react';


function StudentNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || pathname.startsWith(path) && (path !== '/home' || pathname === '/home');


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/home')} tooltip="Home">
          <Link href="/home"><Home /> <span>Dashboard</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
       <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/home/internships')} tooltip="Internships">
          <Link href="/home/internships"><Briefcase /> <span>Internships</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/home/courses')} tooltip="Courses">
          <Link href="/home/courses"><BookOpen /> <span>Courses</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/home/course-recommendation')} tooltip="AI Recommendations">
          <Link href="/home/course-recommendation"><Heart /><span>AI Recommendations</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/home/saved-internships')} tooltip="Saved Internships">
          <Link href="/home/saved-internships"><Bookmark /> <span>Saved</span></Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <div className="flex items-center gap-2" >
              <Button variant="ghost" asChild className="h-8 w-8 p-0">
                  <Link href="/">
                      <Logo className="h-6 w-6" />
                  </Link>
              </Button>
              <span className="font-bold text-lg">CareerMatch</span>
           </div>
        </SidebarHeader>
        <SidebarContent>
          <StudentNav />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
              <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Profile">
                      <Link href="/profile"><User /> <span>Profile</span></Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                      <Settings /> <span>Settings</span>
                  </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
           <SidebarTrigger className="sm:hidden"/>
          <div className="flex-1">
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserRoleProvider>
      <InnerLayout>{children}</InnerLayout>
    </UserRoleProvider>
  );
}
