import { Montserrat } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Meets - Share what you are",
  description:
    "Meets is a social media platform where you can share what you are.",
};

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "500",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${monserrat.className} text-text`}>{children}</body>
    </html>
  );
}
