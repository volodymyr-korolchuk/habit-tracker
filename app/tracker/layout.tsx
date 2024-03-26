import type { Metadata } from "next";
import "./../globals.css";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
