
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
  Briefcase,
  BookOpen,
  Bookmark,
  Heart,
  LayoutDashboard,
  Settings,
  User,
  Users,
  BarChart,
  Upload,
  History,
  FlaskConical,
  MessageSquare,
  Home
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from 'react';


function DashboardNav() {
  const { role } = useUserRole();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || (path !== '/home' && pathname.startsWith(path));

  return (
    <SidebarMenu>
      {role === 'student' && (
        <>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/home')} tooltip="Home">
              <Link href="/home"><Home /> <span>Home</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/courses')} tooltip="Courses">
              <Link href="/courses"><BookOpen /> <span>Courses</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/course-recommendation')} tooltip="AI Recommendations">
              <Link href="/course-recommendation"><Heart /><span>AI Recommendations</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/saved-internships')} tooltip="Saved Internships">
              <Link href="/saved-internships"><Bookmark /> <span>Saved</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      )}

      {role === 'host' && (
        <>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/host')} tooltip="Dashboard">
              <Link href="/host"><LayoutDashboard /> <span>Dashboard</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/host/internships')} tooltip="Internships">
              <Link href="/host/internships"><Briefcase /> <span>Internships</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/host/students')} tooltip="Students">
              <Link href="/host/students"><Users /> <span>Allocated Students</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/host/feedback')} tooltip="Feedback">
              <Link href="/host/feedback"><MessageSquare /> <span>Feedback</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      )}

      {role === 'admin' && (
         <>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin')} tooltip="Results Dashboard">
              <Link href="/admin"><BarChart /> <span>Results Dashboard</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin/data-upload')} tooltip="Data Upload">
              <Link href="/admin/data-upload"><Upload /> <span>Data Upload</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin/simulator')} tooltip="What-If Simulator">
              <Link href="/admin/simulator"><FlaskConical /> <span>What-If Simulator</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/admin/logs')} tooltip="Audit & Logs">
              <Link href="/admin/logs"><History /> <span>Audit & Logs</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      )}
    </SidebarMenu>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserRoleProvider>
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
            <DashboardNav />
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
              {/* Optional: Add Breadcrumbs or Page Title here */}
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
    </UserRoleProvider>
  );
}
