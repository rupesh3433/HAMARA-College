import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,  
  CardFooter  
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      console.log("Submitting:", values); // Debug log before signing in
      const result = await signIn(values.email, values.password);
      console.log("Sign-in result:", result); // Debug log after sign-in
      
      if (result.success && result.user) {
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
        });
  
        const role = result.user.role;
        navigate(role === 'student' ? '/student-dashboard' : '/teacher-dashboard');
      } else {
        toast.error(result.error || 'Invalid email or password.', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      form.setError('root', {
        type: 'manual',
        message: 'Something went wrong. Please try again.',
      });
    }
  };
  
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        {...field}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field}
                        autoComplete="current-password" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.formState.errors.root && (
                <div className="text-sm font-medium text-red-500">
                  {form.formState.errors.root.message}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : "Sign in"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            <Link 
              to="/auth/forgot-password" 
              className="text-primary hover:text-primary/80"
            >
              Forgot password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/sign-up" className="text-primary hover:text-primary/80 font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
