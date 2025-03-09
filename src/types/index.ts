export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
}

export type UserRole = 'student' | 'teacher';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: { id: string; name: string };
  thumbnail: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: number;
  enrolledStudents: number;
  lessons: Lesson[];
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseProps extends Partial<Course> {
  id: string;
  title: string;
  progress: number;
  isEnrolled?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  videoUrl?: string;
  completed?: boolean;
}
