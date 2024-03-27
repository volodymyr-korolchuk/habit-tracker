import { signOut } from "next-auth/react";
import { useState } from "react";

const Island = () => {
  const [islandOpened, setIslandOpened] = useState(false);

  return (
    <div
      onClick={() => setIslandOpened((prev) => !prev)}
      className={`absolute top-5 flex items-center p-3 justify-between rounded-full  transition-all ${
        islandOpened
          ? "w-96 h-16 bg-black"
          : "hover:bg-black/50 w-8 h-8 bg-black/20"
      }`}
    >
      {islandOpened ? (
        <div className="w-full h-full flex items-center justify-between bg-blue-400/0">
          <p className="text-2xl px-4 flex items-center h-full text-white bg-neutral-800 rounded-full select-none">
            {new Date().toLocaleDateString()}
          </p>

          <button
            onClick={() => signOut()}
            className={`bg-red-500 transition-all hover:bg-red-400 text-clip rounded-full p-2 px-4`}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Island;
