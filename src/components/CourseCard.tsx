import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen } from "lucide-react";
import { Progress } from "./ui/progress";
import { CourseProps } from "@/types";

interface CourseCardProps {
  course: CourseProps;
  onEnroll?: (courseId: string) => void;
  isTeacher?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
  isTeacher = false,
}) => {
  const {
    id,
    title,
    description = "No description available",
    instructor = { id: "", name: "Unknown Instructor" },
    thumbnail = "/api/placeholder/400/200",
    enrolledStudents = 0,
    duration = "N/A",
    lessons = [],
    progress = 0,
    isEnrolled = false,
  } = course;

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        {isEnrolled && (
          <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 text-xs font-medium">
            Enrolled
          </div>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">by {instructor.name}</p>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2 flex-grow">
          {description}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </div>
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            {lessons.length} lessons
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {enrolledStudents} students
          </div>
        </div>

        {isEnrolled && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        <div className="mt-auto pt-3 flex">
          <Link to={`/courses/${id}`} className="flex-grow">
            <Button variant="outline" className="w-full">
              {isEnrolled ? "Continue" : "View Details"}
            </Button>
          </Link>

          {!isEnrolled && !isTeacher && onEnroll && (
            <Button className="ml-2 flex-grow" onClick={() => onEnroll(id)}>
              Enroll
            </Button>
          )}

          {isTeacher && (
            <Link to={`/courses/${id}/edit`} className="ml-2 flex-grow">
              <Button variant="secondary" className="w-full">
                Edit
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
