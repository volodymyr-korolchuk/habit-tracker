"use client";

import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { useTracker } from "./context/TrackerContext";

import Habit from "@/components/Tracker/Habits/Habit";
import Tracker from "@/components/Tracker/Tracker";
import MonthsContainer from "@/components/Tracker/Months/MonthsContainer";
import CreateHabitModal from "@/components/Modals/CreateHabitModal";

import useModal from "@/hooks/useModal";
import { FaChartLine, FaNoteSticky, FaStopwatch } from "react-icons/fa6";

const TrackerPage = () => {
  const { titles } = useTracker();

  const { isOpened, openModal, closeModal } = useModal();

  const header = <MonthsContainer />;

  const buttons = {
    Stats: <FaChartLine size={25} />,
    Notes: <FaNoteSticky size={25} />,
    Deadline: <FaStopwatch size={25} />,
  };

  const sidebar = (
    <ul className="flex flex-col gap-1">
      {Object.entries(buttons).map((button) => (
        <Button key={button[0]} className="flex items-center justify-start">
          {button[1]}
          <p className="px-2 font-normal">{button[0]}</p>
        </Button>
      ))}
    </ul>
  );

  const aside = titles.map((title) => <Habit key={title} label={title} />);

  return (
    <div className="relative flex w-full h-full items-center justify-center">
      <Image
        width={1920}
        height={1080}
        src="/images/leafs-bg.jpg"
        className="absolute z-0 object-cover w-full h-full"
        loading="eager"
        alt="leafs background"
      />
      <CreateHabitModal isOpened={isOpened} onClose={closeModal} />
      <div className="flex items-center justify-center w-full h-full">
        <Tracker
          header={header}
          aside={aside}
          content={null}
          sidebar={sidebar}
          daysOfMonth={null}
          openModal={openModal}
        />
        <button
          onClick={() => signOut()}
          className="z-50 absolute bottom-2 bg-rose-700 rounded-md p-2 px-2 m-2 text-xl"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default TrackerPage;
