import dynamic from "next/dynamic";

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
    <main className='flex flex-col items-center max-w-6xl w-full'>
      {children}
    </main>
  );
}
