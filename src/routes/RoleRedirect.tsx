import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserRole } from '../hooks/useUserRole';
import { useAuth } from '../hooks/useAuth';

interface RoleRedirectProps {
  children: React.ReactNode;
  requiredRole: string;
}

const RoleRedirect: React.FC<RoleRedirectProps> = ({ children, requiredRole }) => {
  const { userRole } = useUserRole();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RoleRedirect;
