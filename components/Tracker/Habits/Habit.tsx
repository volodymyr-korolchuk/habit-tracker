interface Props {
  label: string;
  primary?: boolean;
}

const Habit: React.FC<Props> = ({ label, primary }) => {
  return (
    <button
      className={`bg-neutral-300 rounded-md text-center text-neutral-800 w-full hover:bg-neutral-100 md:h-16 h-12 px-5 md:text-2xl text-lg overflow-hidden whitespace-nowrap  text-ellipsis${
        primary ? "font-semibold" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default Habit;
