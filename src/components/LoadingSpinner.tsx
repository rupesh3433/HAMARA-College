import React from "react";

interface LoadingSpinnerProps {
  size?: number; // Size in rem
  course?: {
    id: string;
    title: string;
    description: string;
    instructor: string;
  };
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 2, course }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className="border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
        style={{ width: `${size}rem`, height: `${size}rem`, borderWidth: `${size / 5}rem` }}
      ></div>
      {course && <span>Loading {course.title}...</span>}
    </div>
  );
};

export default LoadingSpinner;
