import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useEnrolledCourses } from "../hooks/useEnrolledCourses";
import CourseCard from "../components/CourseCard";
import {
  CheckCircle,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock API call to get enrolled courses (Replace with actual API call)
const fetchEnrolledCourses = async (courseIds: string[]) => {
  return courseIds.map((id) => ({
    id,
    title: `Course ${id}`,
    description: `Description for Course ${id}`,
    instructor: `Instructor ${id}`,
    thumbnail: `https://via.placeholder.com/150`,
    category: "Programming",
    duration: "10 hours",
    level: "Beginner",
    progress: Math.floor(Math.random() * 101), // Random progress
    enrolledStudents: Math.floor(Math.random() * 500), // Random student count
  }));
};


const StudentDashboard: React.FC = () => {
  const { enrolledCourseIds, isLoading: coursesLoading } = useEnrolledCourses();
  const [enrolledCourses, setEnrolledCourses] = useState<
    { id: string; title: string; progress: number }[]
  >([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    if (enrolledCourseIds.length > 0) {
      fetchEnrolledCourses(enrolledCourseIds).then((courses) => {
        setEnrolledCourses(courses);
        setLoadingCourses(false);
      });
    } else {
      setLoadingCourses(false);
    }
  }, [enrolledCourseIds]);

  // Mock statistics for the dashboard
  const stats = {
    coursesInProgress: enrolledCourses.filter(
      (course) => course.progress > 0 && course.progress < 100
    ).length,
    completedCourses: enrolledCourses.filter(
      (course) => course.progress === 100
    ).length,
    overallProgress:
      enrolledCourses.length > 0
        ? Math.floor(
            enrolledCourses.reduce((sum, c) => sum + c.progress, 0) /
              enrolledCourses.length
          )
        : 0,
    certificatesEarned: 2,
    nextDeadlines: [
      {
        course: "Advanced JavaScript",
        assignment: "Final Project",
        dueDate: "Mar 15, 2025",
      },
      {
        course: "UI/UX Fundamentals",
        assignment: "Wireframe Design",
        dueDate: "Mar 20, 2025",
      },
    ],
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-gray-500 mt-1">Track your learning journey</p>
        </div>
        <Link to="/courses">
          <Button className="mt-4 md:mt-0">
            <BookOpen className="mr-2 h-4 w-4" />
            Explore Courses
          </Button>
        </Link>
      </div>

      {coursesLoading || loadingCourses ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size={2.5} />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                title: "Courses in Progress",
                value: stats.coursesInProgress,
                icon: BookOpen,
              },
              {
                title: "Completed Courses",
                value: stats.completedCourses,
                icon: CheckCircle,
              },
              {
                title: "Overall Progress",
                value: `${stats.overallProgress}%`,
                icon: GraduationCap,
              },
              {
                title: "Certificates",
                value: stats.certificatesEarned,
                icon: Award,
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="flex flex-row items-center p-6">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {item.title}
                    </p>
                    <h3 className="text-2xl font-bold">{item.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Courses Enrolled */}
          {enrolledCourses.length === 0 ? (
            <Card className="mb-8">
              <CardContent className="flex flex-col items-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  You haven't enrolled in any courses yet
                </h3>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                  Start your learning journey by exploring our courses.
                </p>
                <Link to="/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Course Tabs */}
              <Tabs defaultValue="in-progress" className="mb-8">
                <TabsList className="mb-6">
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                </TabsList>

                <TabsContent value="in-progress">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses
                      .filter((course) => course.progress > 0 && course.progress < 100)
                      .map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="completed">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses
                      .filter((course) => course.progress === 100)
                      .map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
