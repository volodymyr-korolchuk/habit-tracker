"use client";

import { useState } from "react";
import TextInput from "@/components/Input/TextInput";

type Props = {};

const isValidInput = (username: string, password: string) => {};

const LoginForm = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
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
  );
};

export default LoginForm;
