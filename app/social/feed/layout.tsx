import dynamic from "next/dynamic";

export const metadata = {
  title: "Meets - Feed",
  description:
    "Recopilation of interesting posts from the users that you follow, or things that could be interesting for you.",
};

export default async function FeedLayout({
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
