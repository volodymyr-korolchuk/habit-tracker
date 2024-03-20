import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { createHabit } from "@/data/habit";

interface Props {
  isOpened: boolean;
  onClose: () => void;
}

const isValidInput = (title: string) => {
  if (title.length < 1) {
    toast.error("Title was not provided");
    return false;
  }
  return true;
};

const CreateHabitModal: React.FC<Props> = ({ isOpened, onClose }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidInput(title)) {
      return;
    }

    try {
      const data = await createHabit(title);

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("New habit created!");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setTitle("");
      onClose();
    }
  };

  return (
    isOpened && (
      <div
        className={
          "isOpened flex items-center justify-center absolute top-0 left-0 w-screen h-screen z-50 backdrop-blur-sm bg-neutral-900/80"
        }
      >
        <section className="flex flex-col items-center bg-neutral-100 backdrop-blur-xl rounded-xl p-3">
          <div className="w-full flex items-center justify-between pb-2 pl-1 gap-2">
            <p className="text-3xl">Create a new Habit!</p>
            <button onClick={onClose} className="hover:bg-red-500 rounded-md">
              <FaXmark size={35} />
            </button>
          </div>

          <form
            id="new-habit-form"
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit}
          >
            <div>
              <Label htmlFor="habit-title" className="text-md">
                Title
              </Label>
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                id="habit-title"
                className="h-14 text-xl shadow-none border-[1px] border-neutral-500"
                maxLength={28}
              />
            </div>
            <Button
              type="submit"
              form="new-habit-form"
              className="bg-green-400 hover:bg-green-200 w-full h-14 p-2 px-4 text-2xl rounded-md"
            >
              Create
            </Button>
          </form>
        </section>
      </div>
    )
  );
};

export default CreateHabitModal;
