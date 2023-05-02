export const metadata = {
  title: "Meets - Profile",
  description:
    "Profile page of a user, where you can see their information and posts.",
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex flex-col items-center max-w-6xl w-full px-2 py-4'>
      {children}
    </main>
  );
}
