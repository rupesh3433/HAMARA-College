import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const ClerkProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>;
};

export default ClerkProviderWrapper;
