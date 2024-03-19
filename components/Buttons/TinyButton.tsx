interface Props {
  label: string;
  primary?: boolean;
  onClick?: () => void;
}

const TinyButton: React.FC<Props> = ({ label, primary, onClick }) => {
  const classes = `rounded-lg text-center text-neutral-900 w-full flex-1 w-[45px] md:text-xl md:h-12 text-sm hover:bg-neutral-300 transition ${
    primary ? "font-semibold bg-neutral-100 text-neutral-900 text-[18px]" : ""
  }`;

  return (
    <button onClick={onClick} className={classes}>
      {label}
    </button>
  );
};

export default TinyButton;
