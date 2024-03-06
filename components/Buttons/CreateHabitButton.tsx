import { FaPlus } from "react-icons/fa";

type CreateHabitButtonProps = {
  onClick: () => void;
};

const CreateHabitButton: React.FC<CreateHabitButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 rounded-md w-full md:h-[50px] h-[40px] flex items-center justify-center hover:bg-green-300 group transition"
    >
      <FaPlus
        size={22}
        className="transition group-hover:scale-125 md:scale-100 scale-70"
      />
    </button>
  );
};

export default CreateHabitButton;
