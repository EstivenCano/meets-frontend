export const metadata = {
  title: "Meets - Authentication",
  description: "Authentication pages for Meets, a social media platform",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex flex-col min-h-screen justify-center items-center bg-gradient-to-tr from-violet-600/20 via-background to-violet-600/20 overflow-hidden'>
      {children}
    </main>
  );
}
