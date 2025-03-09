import { SignOutButton } from "@clerk/clerk-react";

const SignOutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Sign Out</h1>
      <p className="mb-4">Are you sure you want to sign out?</p>
      <SignOutButton>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  );
};

export default SignOutPage;
