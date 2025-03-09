import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

export interface Course {
  id: string;
  title: string;
  progress: number;
}

export const useEnrolledCourses = () => {
  const { user, isAuthenticated } = useAuth();
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure storageKey is valid only when the user is available
  const storageKey = user ? `enrolledCourses-${user.id}` : null;

  useEffect(() => {
    if (!isAuthenticated || !user || !storageKey) {
      setEnrolledCourseIds([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const storedCourses = localStorage.getItem(storageKey);
      setEnrolledCourseIds(storedCourses ? JSON.parse(storedCourses) : []);
    } catch (error) {
      console.error('Error loading enrolled courses:', error);
      setEnrolledCourseIds([]);
    }
    setIsLoading(false);
  }, [user?.id, isAuthenticated]); // Depend only on necessary values

  useEffect(() => {
    if (isAuthenticated && user && storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(enrolledCourseIds));
    }
  }, [enrolledCourseIds, user?.id]); // Save only when `user.id` changes

  const updateEnrollment = (courseId: string, enroll: boolean) => {
    if (!isAuthenticated || !storageKey) {
      console.error('User not authenticated');
      return false;
    }

    setEnrolledCourseIds(prev =>
      enroll ? [...new Set([...prev, courseId])] : prev.filter(id => id !== courseId)
    );

    return true;
  };

  const enrollInCourse = useCallback((courseId: string) => updateEnrollment(courseId, true), []);
  const unenrollFromCourse = useCallback((courseId: string) => updateEnrollment(courseId, false), []);
  const isEnrolledInCourse = useCallback((courseId: string) => enrolledCourseIds.includes(courseId), [enrolledCourseIds]);

  return {
    enrolledCourseIds,
    enrollInCourse,
    unenrollFromCourse,
    isEnrolledInCourse,
    isLoading,
  };
};

export default useEnrolledCourses;
