import { IconType } from "react-icons/lib";

interface NavTile {
  label: string;
  iconSize?: number;
  bgColorClass: string;
  Icon: IconType;
}

export const NavTile: React.FC<NavTile> = ({
  label,
  bgColorClass,
  Icon,
  iconSize,
}) => {
  const classes = `
    flex items-center ${bgColorClass} border-2 border-neutral-800 p-2 shadow-md rounded-lg gap-2 hover:brightness-110
  `;

  return (
    <li>
      <div className={classes}>
        <span>
          <Icon className="text-neutral-800" size={iconSize || 30} />
        </span>{" "}
        <p className="text-[25px]">{label}</p>
      </div>
    </li>
  );
};
