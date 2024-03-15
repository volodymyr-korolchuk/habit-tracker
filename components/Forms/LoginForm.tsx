"use client";

import * as z from "zod";

import Button from "../Buttons/Button";
import Link from "next/link";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormFields = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormFields) => {
    try {
      await login(values).then((data) => {
        if (data?.error) {
          form.setError("root", {
            message: data.error,
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        form.setError("root", {
          message: error.message,
        });
      }
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center rounded-lg gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <input
          {...form.register("email")}
          type="text"
          placeholder="Email"
          maxLength={20}
        />

        <input
          {...form.register("password")}
          type="password"
          placeholder="Password"
          maxLength={20}
        />

        {Object.keys(form.formState.errors).map((item) => (
          <p className="bg-rose-400/70 p-1 z-50 font-normal rounded-md px-4">
            {/*TODO: fix type warning*/}
            {/* @ts-ignore */}
            {form.formState.errors[item].message as string}
          </p>
        ))}

        {/* disable when submitting */}
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
