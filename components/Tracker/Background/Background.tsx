import Image from "next/image";
import backgroundSvg from "@/public/images/background.svg";

const Background = () => {
  return (
    <Image
      src={backgroundSvg}
      className="absolute w-[1600px] object-cover h-screen"
      alt="Habit Tracker page background"
    />
  );
};

export default Background;
