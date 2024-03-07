import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import TextInput from "@/components/Input/TextInput";
import Button from "../Buttons/Button";
import Link from "next/link";

const isValidInput = (username: string, password: string) => {
  if (username.length < 1) {
    toast.error("Username is required");
    return false;
  }

  if (password.length < 1) {
    toast.error("Password is required");
    return false;
  }

  return true;
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidInput(username, password)) {
      return;
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center rounded-lg gap-3"
        onSubmit={handleSubmit}
      >
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

        <Button type="submit" text="Log In" />
      </form>

      <p className="text-left w-full px-2">
        Haven't registered yet?{" "}
        <Link href="/signup">
          <strong>Sign Up</strong>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
