interface NumberTileProps {
  value: number;
}

const NumberTile: React.FC<NumberTileProps> = ({ value }) => {
  return (
    <div className="flex items-center justify-center md:w-16 w-12 md:h-full h-12 bg-neutral-300 rounded-sm text-[30px]">
      <p>{value}</p>
    </div>
  );
};

export default NumberTile;
