import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "student" | "teacher";
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "student" | "teacher";
}

interface SignInResult {
  success: boolean;
  user?: AuthUser;
  redirectTo?: string;
  error?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // ✅ Restore session on page load
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser: AuthUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error restoring session:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Sign In Function
  const signIn = useCallback(async (email: string, password: string): Promise<SignInResult> => {
    setIsLoading(true);
    try {
      console.log("Attempting sign-in:", email);

      // Hardcoded credentials (Replace with API call later)
      let loggedInUser: AuthUser | null = null;

      if (email === "teacher@example.com" && password === "password") {
        loggedInUser = {
          id: "teacher-1",
          email,
          firstName: "John",
          lastName: "Doe",
          role: "teacher",
        };
      } else if (email === "student@example.com" && password === "password") {
        loggedInUser = {
          id: "student-1",
          email,
          firstName: "Jane",
          lastName: "Smith",
          role: "student",
        };
      }

      if (loggedInUser) {
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        setIsAuthenticated(true);

        // ✅ Redirect after login
        const redirectTo = loggedInUser.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard";
        navigate(redirectTo); // Auto redirect
        return { success: true, user: loggedInUser, redirectTo };
      }

      console.log("Invalid credentials.");
      return { success: false, error: "Invalid email or password" };
    } catch (error) {
      console.error("Sign-in error:", error);
      return { success: false, error: "Something went wrong. Please try again." };
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // ✅ Sign Up Function
  const signUp = useCallback(async (data: SignUpData): Promise<SignInResult> => {
    setIsLoading(true);
    try {
      const newUser: AuthUser = {
        id: `user-${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);

      // ✅ Redirect after sign-up
      const redirectTo = data.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard";
      navigate(redirectTo);
      return { success: true, user: newUser, redirectTo };
    } catch (error) {
      console.error("Sign-up error:", error);
      return { success: false, error: "Sign-up failed. Please try again." };
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // ✅ Sign Out Function
  const signOut = useCallback(() => {
    setIsLoading(true);
    try {
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/"); // Redirect to home on logout
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
};

export default useAuth;
