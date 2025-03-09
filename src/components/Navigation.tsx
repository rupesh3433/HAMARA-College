import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUserRole } from '../hooks/useUserRole';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, BookOpen } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, signOut } = useAuth(); // ✅ Include isLoading
  const { userRole } = useUserRole();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // ✅ Prevent UI flicker while checking auth status
  if (isLoading) {
    return null; // Or add a loader component if needed
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">LearnPlatform</span>
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'} className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/courses" className="w-full">
                      My Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-4">
                <Link to="/auth/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/auth/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
