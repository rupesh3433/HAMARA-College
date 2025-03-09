import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sampleCourses } from '../data/sampleCourses';
import CourseCard from '../components/CourseCard';
import { BarChart, LineChart, PieChart, Compass, Users, BookOpen, BookPlus } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

const TeacherDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teacherCourses, setTeacherCourses] = useState<any[]>([]);
  
  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Filter courses as if they belong to the logged-in teacher
      setTeacherCourses(sampleCourses.slice(0, 4));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock statistics for the dashboard
  const stats = {
    totalStudents: 347,
    totalCourses: teacherCourses.length,
    totalRevenue: 8925.50,
    averageRating: 4.7,
    completionRate: 78
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your courses and track your student performance</p>
        </div>
        <Link to="/courses/create">
          <Button className="mt-4 md:mt-0">
            <BookPlus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size={2.5} />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Students</p>
                  <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Courses</p>
                  <h3 className="text-2xl font-bold">{stats.totalCourses}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                  <h3 className="text-2xl font-bold">{stats.completionRate}%</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-row items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg. Rating</p>
                  <h3 className="text-2xl font-bold">{stats.averageRating}</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="courses" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacherCourses.length > 0 ? (
                  teacherCourses.map(course => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      isTeacher={true} 
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-lg font-medium mb-2">You haven't created any courses yet</h3>
                    <p className="text-gray-500 mb-4">Get started by creating your first course</p>
                    <Link to="/courses/create">
                      <Button>Create Your First Course</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Engagement</CardTitle>
                    <CardDescription>Average completion rates over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex justify-center items-center">
                    <div className="text-center p-8 bg-gray-50 rounded-lg w-full">
                      <LineChart className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500">Engagement analytics visualization would appear here</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Course Popularity</CardTitle>
                    <CardDescription>Enrollment distribution by course</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex justify-center items-center">
                    <div className="text-center p-8 bg-gray-50 rounded-lg w-full">
                      <PieChart className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500">Course popularity visualization would appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>View and manage your enrolled students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium mb-2">Student management dashboard would appear here</h3>
                    <p className="text-gray-500">Track progress, send announcements, and respond to questions</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="earnings">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Track your revenue and payment history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Total Earnings</h3>
                      <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                    
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <BarChart className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500">Earnings visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">New student enrolled</p>
                    <p className="text-sm text-gray-500">Sarah Johnson enrolled in "Advanced Web Development"</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Course milestone reached</p>
                    <p className="text-sm text-gray-500">"JavaScript Fundamentals" has reached 100 enrollments</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <BarChart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Monthly report available</p>
                    <p className="text-sm text-gray-500">Your February earnings report is ready to view</p>
                    <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TeacherDashboard;