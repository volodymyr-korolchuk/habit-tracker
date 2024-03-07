"use client";

import Navbar from "@/components/Navigation/Navbar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const background = (
    <>
      <div
        key={"0#"}
        className="animate-pulse absolute w-36 h-36 bg-sky-400 rounded-full"
        style={{
          top: "-10%",
          left: "10%",
          zIndex: 0,
          filter: "blur(20px)",
        }}
      ></div>
      <div
        key={"1#"}
        className="animate-[bounce_2s_ease-in-out_infinite] absolute w-48 h-48 bg-sky-400 rounded-full"
        style={{
          top: "20%",
          left: "20%",
          zIndex: 0,
          filter: "blur(30px)",
        }}
      ></div>
      <div
        key={"2#"}
        className="animate-pulse delay-250 absolute w-72 h-72 bg-sky-400 rounded-full"
        style={{
          top: "60%",
          left: "0%",
          zIndex: 0,
          filter: "blur(40px)",
        }}
      ></div>
      <div
        key={"3#"}
        className="animate-pulse delay-150 absolute w-64 h-64 bg-sky-400 rounded-full"
        style={{
          top: "10%",
          left: "90%",
          zIndex: 0,
          filter: "blur(50px)",
        }}
      ></div>
      <div
        key={"4#"}
        className="animate-[bounce_3s_ease-in-out_infinite] duration-500 absolute w-96 h-96 bg-sky-400 rounded-full"
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

  console.log(path);

  return (
    <div>
      <Toaster />

      <div className="w-full relative h-screen flex flex-col bg-sky-100">
        {background}
        <Navbar activePage={path} />

        {/* Form */}
        <div className="flex-1 z-10 flex items-center justify-center">
          {children}
        </div>

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
    </div>
  );
}
