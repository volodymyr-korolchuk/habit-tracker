"use client";

import LoginForm from "@/components/Forms/LoginForm";
import { getGretting } from "@/utils/getGreeting";

const Login: React.FC = () => {
  const greeting = getGretting();

  return (
    <section className="flex flex-col items-center justify-center gap-5 p-6 rounded-lg backdrop-blur-xl bg-sky-200/40 border-2 border-neutral-700">
      <h2 className="select-none text-4xl font-semibold w-full pb-2 text-neutral-900/90">
        {greeting}
      </h2>
      <LoginForm />
    </section>
  );
};

export default Login;
