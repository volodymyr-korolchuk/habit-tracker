"use client";

import React from "react";
import SignupForm from "@/components/Forms/SignupForm";
import { getGretting } from "@/utils/getGreeting";
import Link from "next/link";

interface Props {}

const Signup = (props: Props) => {
  const greeting = getGretting();

  return (
    <section className="flex flex-col items-center justify-center gap-5 p-6 rounded-lg backdrop-blur-xl bg-sky-200/40 border-2 border-neutral-700">
      <h2 className="select-none text-4xl font-semibold w-full pb-2 text-neutral-900/90">
        {greeting}
      </h2>
      <SignupForm />

      <p className="text-left w-full px-2">
        Already have an account?{" "}
        <Link href="/login">
          <strong>Log In</strong>
        </Link>
      </p>
    </section>
  );
};

export default Signup;
