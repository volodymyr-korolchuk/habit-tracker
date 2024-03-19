interface Props {
  label: string;
  primary?: boolean;
}

const Habit: React.FC<Props> = ({ label, primary }) => {
  return (
    <button
      className={`bg-neutral-300 rounded-md text-center text-neutral-800 w-full hover:bg-neutral-100 md:h-14 h-12 md:px-5 md:text-xl text-sm overflow-hidden whitespace-nowrap text-ellipsis${
        primary ? "font-semibold" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default Habit;
