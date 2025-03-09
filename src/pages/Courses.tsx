import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { sampleCourses } from "../data/sampleCourses";
import { useUserRole } from "../hooks/useUserRole";
import { useEnrolledCourses } from "../hooks/useEnrolledCourses";
import { CourseProps } from "../types";  // Import CourseProps from the correct file
import LoadingSpinner from "@/components/LoadingSpinner";

const Courses: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter,] = useState("all");
  const [levelFilter,] = useState("all");
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const { userRole } = useUserRole();
  const { enrollInCourse } = useEnrolledCourses();
  const isTeacher = userRole === "teacher";

  useEffect(() => {
    const storedCourses = localStorage.getItem("enrolledCourses");
    if (storedCourses) {
      setEnrolledCourseIds(JSON.parse(storedCourses));
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setCourses(
            sampleCourses.map((course) => ({
              ...course,
              isEnrolled: false,
            }))
          );
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    await enrollInCourse(courseId);
    setEnrolledCourseIds((prev) => [...prev, courseId]);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description ?? "").toLowerCase().includes(searchTerm.toLowerCase()); // ✅ Fix applied
  
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
  
    return matchesSearch && matchesCategory && matchesLevel;
  });
  

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
          <p className="mt-2 text-sm text-gray-500">
            Browse our catalog of {courses.length} available courses
          </p>
        </div>

        {isTeacher && (
          <Link to="/courses/create" className="mt-4 md:mt-0">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Course</span>
            </Button>
          </Link>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner size={3} />
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={{
                ...course,
                isEnrolled: enrolledCourseIds.includes(course.id),
              }}
              onEnroll={handleEnroll}
              isTeacher={isTeacher}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Courses;
