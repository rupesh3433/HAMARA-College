import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedPage from "../pages/ProtectedPage";
import SignOutPage from "../pages/SignOut";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Home Page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard (Protected) */}
        <Route path="/dashboard" element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <h2 className="text-center mt-10 text-red-500">
                Please sign in to access the dashboard.
              </h2>
            </SignedOut>
          </>
        } />

        {/* Protected Page */}
        <Route path="/protected" element={
          <>
            <SignedIn>
              <ProtectedPage />
            </SignedIn>
            <SignedOut>
              <h2 className="text-center mt-10 text-red-500">
                Please sign in to view this page.
              </h2>
            </SignedOut>
          </>
        } />

        {/* Sign Out Page */}
        <Route path="/signout" element={<SignOutPage />} />

        {/* 404 Not Found */}
        <Route path="*" element={<h2 className="text-center mt-10">404 Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
