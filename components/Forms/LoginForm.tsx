import { FormEvent, useState } from "react";
import TextInput from "@/components/Input/TextInput";
import Button from "../Buttons/Button";
import toast from "react-hot-toast";

type Props = {};

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

const LoginForm = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidInput(username, password)) {
      return;
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center rounded-lg gap-2"
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
  );
};

export default LoginForm;
