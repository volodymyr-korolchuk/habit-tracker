import { FaPlus } from "react-icons/fa";

type CreateHabitButtonProps = {
  onClick: () => void;
};

const CreateHabitButton: React.FC<CreateHabitButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 rounded-md w-full md:h-[50px] h-[40px] flex items-center justify-center hover:bg-green-300"
    >
      <FaPlus size={30} className="md:scale-100 scale-70" />
    </button>
  );
};

export default CreateHabitButton;
