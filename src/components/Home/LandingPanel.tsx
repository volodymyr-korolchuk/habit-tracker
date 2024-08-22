"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/components/Home/SignUpForm";
import SignInForm from "@/components/Home/SignInForm";

const LandingPanel = () => {
  return (
    <div className="relative z-10 grid h-fit w-[90%] animate-[roll-up_1s_cubic-bezier(1,-0.1,.34,1.2)] grid-cols-1 place-items-center overflow-hidden rounded-xl bg-neutral-100 p-6 shadow-md md:h-[80%] md:w-[70%] md:grid-cols-2 md:p-8 xl:p-16">
      <h2 className="z-10 text-2xl font-medium text-green-950 max-md:pb-8 md:mb-16 md:text-5xl lg:text-6xl xl:text-7xl">
        Let&apos;s get started...
      </h2>

      <div className="mx-auto my-auto min-h-[400px] w-full">
        <Tabs
          className="flex w-full flex-col justify-around"
          defaultValue="sign-up"
        >
          <TabsList className="grid grid-cols-2 bg-transparent pb-12">
            <TabsTrigger
              className="relative overflow-visible !bg-transparent py-2 !shadow-none before:absolute before:h-2 before:w-2 before:rounded-full before:bg-MayanJade before:opacity-0 before:transition-all [&[data-state='active']]:before:w-8 [&[data-state='active']]:before:-translate-y-6 [&[data-state='active']]:before:opacity-100 [&[data-state='active']]:before:content-['']"
              value="sign-up"
            >
              Sign Up
            </TabsTrigger>
            <TabsTrigger
              className="relative overflow-visible !bg-transparent py-2 !shadow-none before:absolute before:h-2 before:w-2 before:rounded-full before:bg-MayanJade before:opacity-0 before:transition-all [&[data-state='active']]:before:w-8 [&[data-state='active']]:before:-translate-y-6 [&[data-state='active']]:before:opacity-100 [&[data-state='active']]:before:content-['']"
              value="sign-in"
            >
              Log In
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sign-up">
            <SignUpForm />
          </TabsContent>
          <TabsContent value="sign-in">
            <SignInForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LandingPanel;
