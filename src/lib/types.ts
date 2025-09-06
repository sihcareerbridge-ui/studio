export type Role = 'student' | 'host' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: Role;
}

export interface Internship {
  id: string;
  title: string;
  organization: string;
  logoUrl: string;
  location: string;
  duration: string;
  fitScore?: number;
  description: string;
  tags: string[];
}

export interface Course {
    id: string;
    title: string;
    provider: string;
    logoUrl: string;
    category: string;
    duration: string;
    rating: number;
    description: string;
    modules: {
        title: string;
        duration: string;
    }[];
}

export interface Feedback {
  id: string;
  studentName: string;
  studentAvatarUrl: string;
  targetType: 'internship' | 'course';
  targetId: string;
  targetName: string;
  rating: number;
  comment: string;
  date: string;
}
