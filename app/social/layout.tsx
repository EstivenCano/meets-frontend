import dynamic from "next/dynamic";

export const metadata = {
  title: "Meets - Social",
  description:
    "Social media platform to share your thoughts and ideas with the world.",
};

const AuthGuard = dynamic(() => import("@/components/Guards/AuthGuard"));
const AppBar = dynamic(() => import("@/components/Surfaces/AppBar"));

export default async function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppBar />
      <main className='flex flex-col items-center h-[calc(100vh-80px)] bg-gradient-to-tr from-violet-600/20 via-background to-violet-600/20 shadow-inner shadow-gray-400 dark:shadow-gray-600 py-4 px-2'>
        {children}
      </main>
    </AuthGuard>
  );
}
