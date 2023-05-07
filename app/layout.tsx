import { Montserrat } from "next/font/google";
import "./globals.css";
import AlertsProvider from "@/components/Feedback/AlertsProvider";
import AuthProvider from "@/components/Providers/AuthProvider";
import { getUserFromServer } from "@/services/user.service";
import dynamic from "next/dynamic";

const ThemeProvider = dynamic(
  () => import("@/components/Providers/ThemeProvider")
);

export const metadata = {
  title: "Meets - Share what you are",
  description:
    "Meets is a social media platform where you can share what you are.",
};

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "500",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromServer();

  return (
    <html lang='en'>
      <AuthProvider user={user}>
        <body className={`${monserrat.className} text-text`}>
          <ThemeProvider>
            <div id='modal-root' />
            {children}
            <AlertsProvider />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
