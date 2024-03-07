import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import TextInput from "../Input/TextInput";

interface Props {
  isOpened: boolean;
  onClose: () => void;
}

const isValidInput = (title: string) => {
  if (title.length < 1) {
    toast.error("Title was not provided");
    return false;
  }
};

const CreateHabitModal: React.FC<Props> = ({ isOpened, onClose }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidInput(title)) {
      return;
    }

    try {
      //
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error(error);
      }
    }

    // cleanup
    setTitle("");
    onClose();
  };

  return (
    isOpened && (
      <div
        className={
          "isOpened flex items-center justify-center absolute top-0 left-0 w-screen h-screen z-50 backdrop-blur-sm bg-neutral-900/80"
        }
      >
        <section className="flex flex-col items-center justify-center bg-blue-200 border-2 border-neutral-800 rounded-xl p-2 group">
          <div className="w-full text-end flex items-center justify-between pb-2 pl-2">
            <p className="text-4xl">Create a new Habit!</p>
            <button onClick={onClose} className="hover:bg-rose-400 rounded-md">
              <FaXmark size={45} />
            </button>
          </div>

          <form
            id="new-habit-form"
            className="flex gap-2"
            onSubmit={handleSubmit}
          >
            <TextInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              maxLength={20}
            />

            <button
              form="new-habit-form"
              type="submit"
              className="bg-green-400 hover:bg-green-200 w-32 text-2xl rounded-md"
            >
              Create
            </button>
          </form>
          <p className="pt-2 px-2 text-start w-full group-hover:opacity-100 opacity-0 transition-all text-neutral-700">
            *Choose the title wisely. It won`t be possible to change it later{" "}
            {":)"}
          </p>
        </section>
      </div>
    )
  );
};

export default CreateHabitModal;
