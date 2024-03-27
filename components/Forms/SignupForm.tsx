"use client";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { register } from "@/actions/register";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "../ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FormError } from "@/components/Forms/FormError";
import { FormSuccess } from "@/components/Forms/FormSuccess";

type FormFields = z.infer<typeof RegisterSchema>;

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<FormFields>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormFields) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.succeess);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center rounded-lg gap-2 w-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-12 border-neutral-900/50 w-full text-xl bg-neutral-100/40"
                  type="text"
                  placeholder="johndoe217"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-12 border-neutral-900/50 w-full text-xl bg-neutral-100/40"
                  type="email"
                  placeholder="johndoe@example.com"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-12 border-neutral-900/50 w-full text-xl bg-neutral-100/40"
                  type="password"
                  placeholder="******"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="w-full h-12 text-lg my-2"
          disabled={isPending}
        >
          Register
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
