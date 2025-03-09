import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useUserRole = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [userRole, setUserRole] = useState<'teacher' | 'student' | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const determineUserRole = async () => {
      setIsLoading(true);
      try {
        if (!authLoading) {
          if (isAuthenticated && user) {
            setUserRole(user.role);
          } else {
            setUserRole(null);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error determining user role:', error);
        setUserRole(null);
        setIsLoading(false);
      }
    };

    determineUserRole();
  }, [user, isAuthenticated, authLoading]);

  return {
    userRole,
    isTeacher: userRole === 'teacher',
    isStudent: userRole === 'student',
    isLoading
  };
};

export default useUserRole;