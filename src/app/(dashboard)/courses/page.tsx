
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses } from "@/lib/demo-data";
import { Clock, Search, Star, Tag } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

export default function CoursesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">Upskill yourself with these recommended courses.</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10" />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="web-dev">Web Development</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="pm">Product Management</SelectItem>
                </SelectContent>
            </Select>
            <Button>Filter</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
               <Image
                  src={course.logoUrl}
                  alt={`${course.provider} logo`}
                  width={400}
                  height={200}
                  data-ai-hint="abstract texture"
                  className="rounded-t-lg aspect-video object-cover -mt-6 -mx-6 -mb-2"
                />
              <CardTitle className="text-lg pt-2">{course.title}</CardTitle>
              <CardDescription>{course.provider}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4"/>
                        <span>{course.category}</span>
                    </div>
                     <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4"/>
                        <span>{course.duration}</span>
                    </div>
                     <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                        <span>{course.rating}</span>
                    </div>
                </div>
               <p className="text-muted-foreground line-clamp-3">
                 {course.description}
               </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/courses/${course.id}`}>View Course</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
