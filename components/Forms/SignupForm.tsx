import { FormEvent, useState } from "react";
import Link from "next/link";

import toast from "react-hot-toast";

import TextInput from "@/components/Input/TextInput";
import Button from "../Buttons/Button";
import { validateSignupForm } from "@/libs/validators";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const check = validateSignupForm(
      username,
      email,
      password,
      confirmPassword
    );

    if (!check?.valid) {
      toast.error(check.message);
      return;
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <TextInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          maxLength={28}
        />
        <TextInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          maxLength={28}
        />

        <Button type="submit" text="Sign Up" />
      </form>

      <p className="text-left w-full px-2">
        Already have an account?{" "}
        <Link href="/login">
          <strong>Log In</strong>
        </Link>
      </p>
    </>
  );
};

export default SignupForm;
