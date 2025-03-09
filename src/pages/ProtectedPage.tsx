import { SignedIn, SignedOut } from "@clerk/clerk-react";

const ProtectedPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SignedIn>
        <h2 className="text-2xl font-semibold">Protected Content</h2>
      </SignedIn>
      <SignedOut>
        <h2 className="text-xl text-red-500">Please Sign In to view this content.</h2>
      </SignedOut>
    </div>
  );
};

export default ProtectedPage;
