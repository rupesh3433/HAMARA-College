import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Courses from '../pages/Courses';
import TeacherDashboard from '../pages/TeacherDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import RoleRedirect from './RoleRedirect';
import { useAuth } from '../hooks/useAuth';
import { useUserRole } from '../hooks/useUserRole';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { userRole } = useUserRole();

  // Show loading state while auth is being checked
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      
      {/* Auth routes */}
      <Route 
        path="/auth/sign-in" 
        element={
          isAuthenticated ? 
            <Navigate to={userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'} /> : 
            <SignIn />
        } 
      />
      <Route 
        path="/auth/sign-up" 
        element={
          isAuthenticated ? 
            <Navigate to={userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'} /> : 
            <SignUp />
        } 
      />
      
      {/* Protected routes */}
      <Route 
        path="/teacher-dashboard/*" 
        element={
          <RoleRedirect requiredRole="teacher">
            <TeacherDashboard />
          </RoleRedirect>
        } 
      />
      <Route 
        path="/student-dashboard/*" 
        element={
          <RoleRedirect requiredRole="student">
            <StudentDashboard />
          </RoleRedirect>
        } 
      />
      
      {/* Redirect for authenticated users */}
      <Route 
        path="/dashboard" 
        element={
          <Navigate 
            to={isAuthenticated ? 
                (userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard') : 
                '/auth/sign-in'
              } 
          />
        } 
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;