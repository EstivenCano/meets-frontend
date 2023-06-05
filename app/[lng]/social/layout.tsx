import { MeetsTitle } from "@/components/Display/MeetsTitle";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Meets - Social",
  description:
    "Social media platform to share your thoughts and ideas with the world.",
};

const AuthGuard = dynamic(() => import("@/components/Guards/AuthGuard"), {
  loading: () => (
    <div className='h-full w-full flex flex-col items-center justify-center gap-1'>
      <MeetsTitle size='md' />
    </div>
  ),
  ssr: false,
});
const AppBar = dynamic(() => import("@/components/Surfaces/AppBar"));

export default async function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppBar />
      <main
        id='main-layout'
        className='flex flex-col items-center h-[calc(100%-80px)] bg-gradient-to-tr from-violet-600/20 via-background to-violet-600/20 shadow-inner shadow-gray-400 dark:shadow-gray-600 overflow-y-auto overflow-x-hidden'>
        {children}
      </main>
    </AuthGuard>
  );
}
