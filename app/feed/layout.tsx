import dynamic from "next/dynamic";

export const metadata = {
  title: "Meets - Feed",
  description:
    "Recopilation of interesting posts from the users that you follow.",
};

const AuthGuard = dynamic(() => import("@/components/Guards/AuthGuard"));

export default async function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
