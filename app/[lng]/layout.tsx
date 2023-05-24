import { Montserrat } from "next/font/google";
import "../globals.css";
import AlertsProvider from "@/components/Feedback/AlertsProvider";
import AuthProvider from "@/components/Providers/AuthProvider";
import { getUserFromServer } from "@/services/user.service";
import dynamic from "next/dynamic";
import { dir } from "i18next";

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
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const user = await getUserFromServer();

  return (
    <html lang={lng} dir={dir(lng)} className='h-full box-border'>
      <body className={`${monserrat.className} text-text h-full`}>
        <AuthProvider user={user}>
          <ThemeProvider>
            <div id='modal-root' />
            {children}
            <AlertsProvider />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
