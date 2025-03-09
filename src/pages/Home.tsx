import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to My App</h1>

      <SignedOut>
        <SignIn />
      </SignedOut>

      <SignedIn>
        <UserButton />
        <p className="mt-4">You are signed in!</p>
      </SignedIn>
    </div>
  );
};

export default Home;
