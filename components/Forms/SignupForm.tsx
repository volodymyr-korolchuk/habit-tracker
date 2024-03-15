import Link from "next/link";

import * as z from "zod";

import Button from "../Buttons/Button";
import { register } from "@/actions/register";
import { RegisterSchema } from "@/schemas";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormFields = z.infer<typeof RegisterSchema>;

const SignupForm = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormFields) => {
    try {
      await register(values).then((data) => {
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
          {...form.register("username")}
          type="text"
          placeholder="Username"
          maxLength={20}
        />

        <input {...form.register("email")} type="email" placeholder="Email" />

        <input
          {...form.register("password")}
          type="password"
          placeholder="Password"
          maxLength={28}
        />

        {Object.keys(form.formState.errors).map((item) => (
          <p className="bg-rose-400/70 p-1 z-50 font-normal rounded-md px-4">
            {/*TODO: fix type warning*/}
            {/* @ts-ignore */}
            {form.formState.errors[item].message as string}
          </p>
        ))}

        {/* disable when submitting */}
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
