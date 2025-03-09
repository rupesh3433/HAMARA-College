import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { sampleCourses } from '../data/sampleCourses';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../hooks/useAuth';
import { useUserRole } from '../hooks/useUserRole';
import { CardFooter } from '@/components/ui/card';

const featuredCourses = sampleCourses.slice(0, 3);

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { userRole } = useUserRole();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/20 to-primary/5 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Learn anything, <span className="text-primary">anytime</span>, 
                <span className="text-primary"> anywhere</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Access thousands of high-quality courses taught by expert instructors and transform your skills today.
              </p>
              <div className="flex flex-wrap gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link to="/auth/sign-up">
                      <Button className="px-8">Get Started</Button>
                    </Link>
                    <Link to="/courses">
                      <Button variant="outline">Explore Courses</Button>
                    </Link>
                  </>
                ) : userRole === 'student' ? (
                  <>
                    <Link to="/courses">
                      <Button variant="outline">Explore Courses</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/teacher-dashboard">
                      <Button className="px-8">Teacher Dashboard</Button>
                    </Link>
                    <Link to="/courses/create">
                      <Button variant="outline">Create a Course</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/api/placeholder/600/400" 
                alt="Learning illustration" 
                className="rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Link to="/courses">
              <Button variant="link">View all courses</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Learn With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
              <p className="text-gray-600">
                All courses are created and reviewed by experts in their field to ensure you get the best learning experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn at Your Pace</h3>
              <p className="text-gray-600">
                Access your courses anytime, anywhere. Learn at your own pace with lifetime access to content.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Certificates</h3>
              <p className="text-gray-600">
                Earn certificates upon course completion to showcase your skills and boost your professional profile.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CardFooter className="flex flex-col"></CardFooter>
    </div>
  );
};

export default Home;