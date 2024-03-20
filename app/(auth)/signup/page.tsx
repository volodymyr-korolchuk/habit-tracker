"use client";

import React from "react";
import SignupForm from "@/components/Forms/SignupForm";
import { getGretting } from "@/utils";
import Link from "next/link";

interface Props {}

const Signup = (props: Props) => {
  const greeting = getGretting();

  return (
    <section className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl backdrop-blur-2xl bg-sky-200/20 w-[380px] border-[1px] border-neutral-800">
      <h2 className="select-none text-4xl font-semibold w-full text-neutral-900/90">
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
