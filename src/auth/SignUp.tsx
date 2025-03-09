import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import SignUpForm from '../components/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/auth/sign-in" className="text-primary hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;