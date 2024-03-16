"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";

import { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/actions/login";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FormError } from "@/components/Forms/FormError";

type FormFields = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [isPending, setPending] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<FormFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormFields) => {
    setError("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
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
        <Button
          type="submit"
          className="w-full h-12 text-lg my-2"
          disabled={isPending}
        >
          Log in
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
