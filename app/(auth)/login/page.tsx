"use client";

import TextInput from "@/components/Input/TextInput";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";

interface Props {}

const isValidInput = (username: string, password: string) => {
  /* TODO */
};

const Login: React.FC<Props> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const time = new Date().getHours();
  let greeting = "";

  if (time >= 0 && time < 11) {
    greeting = "Good morning! 😎";
  } else if (time >= 11 && time < 18) {
    greeting = "Hi there! 👋";
  } else {
    greeting = "Good Evening! 🌜";
  }

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
        className="animate-[bounce_2s_ease-in-out_infinite] absolute w-48 h-48 bg-sky-400 rounded-full"
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

  return (
    <div className="w-full relative h-screen flex flex-col bg-skys-100">
      {background}
      <div className="flex-1 z-10 flex items-center justify-center">
        <section className="flex flex-col items-center justify-center gap-5 p-4 rounded-lg backdrop-blur-xl bg-neutral-400/40 border-2 border-neutral-700">
          <h2 className="select-none text-4xl font-semibold w-full">
            {greeting}
          </h2>

          <form className="flex flex-col items-center justify-center rounded-lg gap-2">
            <TextInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
              placeholder="Username"
            />
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              maxLength={20}
            />

            <button className="bg-green-400 hover:bg-green-500 transition-colors w-full h-14 text-2xl rounded-md">
              Log In
            </button>
          </form>
        </section>
      </div>

      <footer className="w-full z-10 flex gap-2 items-center justify-center p-2">
        <p className="text-neutral-600">
          Created by <strong>Volodymyr Korolchuk</strong>
        </p>
        <a
          href="https://github.com/volodymyr-korolchuk/habit-tracker"
          target="_blank"
        >
          <FaGithub
            size={30}
            className="text-neutral-700 hover:text-neutral-900 transition-colors"
          />
        </a>
      </footer>
    </div>
  );
};

export default Login;
