import dynamic from "next/dynamic";

export const metadata = {
  title: "Meets - Social",
  description:
    "Social media platform to share your thoughts and ideas with the world.",
};

const SocialTabs = dynamic(() => import("@/components/Display/SocialTabs"));

export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SocialTabs />
      {children}
    </>
  );
}
