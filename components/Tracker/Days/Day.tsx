interface Props {
  value: number;
}

const Day: React.FC<Props> = ({ value }) => (
  <div className="md:h-14 md:w-14 h-12 w-12 bg-neutral-300 flex items-center justify-center text-2xl rounded-sm">
    {value}
  </div>
);

export default Day;
