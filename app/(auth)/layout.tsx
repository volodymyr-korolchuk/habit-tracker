"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Toaster } from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";

import Navbar from "@/components/Navigation/Navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const background = (
    <>
      <div
        className="animate-pulse absolute w-36 h-36 bg-sky-400 rounded-full"
        style={{
          top: "-10%",
          left: "10%",
          zIndex: 0,
          filter: "blur(20px)",
        }}
      ></div>
      <div
        className="animate-[bounce_2s_ease-in-out_infinite]  absolute w-48 h-48 bg-sky-300 rounded-full"
        style={{
          top: "20%",
          left: "20%",
          zIndex: 0,
          filter: "blur(30px)",
        }}
      ></div>
      <div
        className="animate-pulse delay-250 absolute w-72 h-72 bg-sky-400 rounded-full"
        style={{
          top: "60%",
          left: "0%",
          zIndex: 0,
          filter: "blur(40px)",
        }}
      ></div>
      <div
        className="animate-pulse delay-150 absolute w-64 h-64 bg-sky-400 rounded-full"
        style={{
          top: "10%",
          left: "90%",
          zIndex: 0,
          filter: "blur(50px)",
        }}
      ></div>
      <div
        className="animate-bounce duration-[5s] absolute w-96 h-96 bg-sky-400 rounded-full"
        style={{
          top: "80%",
          left: "60%",
          zIndex: 0,
          filter: "blur(60px)",
        }}
      ></div>
    </>
  );

  const path = usePathname();

  return (
    <>
      <Toaster />
      <div className="w-full relative h-screen flex flex-col bg-sky-100 overflow-hidden">
        {background}
        <header>
          <Navbar activePage={path} />
        </header>

        {/* Form */}
        <main className="flex-1 z-10 flex items-center justify-center">
          {children}
        </main>

        <footer className="w-full z-10 flex gap-2 items-center justify-center p-2">
          <p className="text-neutral-600">
            Created by <strong>Volodymyr Korolchuk</strong>
          </p>
          <Link
            href="https://github.com/volodymyr-korolchuk/habit-tracker"
            target="_blank"
          >
            <FaGithub
              size={30}
              className="text-neutral-700 hover:text-neutral-900 transition-colors"
            />
          </Link>
        </footer>
      </div>
    </>
  );
}
