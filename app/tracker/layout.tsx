import type { Metadata } from "next";
import "./../globals.css";

import { TrackerContextProvider } from "./context/TrackerContext";

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TrackerContextProvider>{children}</TrackerContextProvider>;
}
