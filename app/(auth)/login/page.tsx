"use client";

import LoginForm from "@/components/Forms/LoginForm";
import { getGretting } from "@/utils/getGreeting";
import Link from "next/link";

const Login: React.FC = () => {
  const greeting = getGretting();

  return (
    <section className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl backdrop-blur-xl bg-sky-200/20 border-[1px] border-neutral-800 w-[350px]">
      <h2 className="select-none text-4xl font-semibold w-full text-neutral-900/90">
        {greeting}
      </h2>

      <LoginForm />
      <p className="text-left w-full px-2">
        Haven&apos;t registered yet?{" "}
        <Link href="/signup">
          <strong>Sign Up</strong>
        </Link>
      </p>
    </section>
  );
};

export default Login;
