import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Easily track your daily habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/svgs/flower-.svg" sizes="any" />
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
