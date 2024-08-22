import { ReactNode } from "react";
import Image from "next/image";
import LandingPanel from "@/components/Home/LandingPanel";

interface Props {
  children?: ReactNode | ReactNode[];
}

export default function Home({ children }: Props) {
  return (
    <main className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-PineShade to-MayanJade">
      <LandingPanel/>

      <Image
        className="absolute left-[-20%] top-[-40%] z-0 w-[840px] animate-peek opacity-0 delay-700"
        width="100"
        height="100"
        src="/svgs/flower.svg"
        alt=""
      />
      <Image
        className="delay-900 absolute bottom-[-40%] right-[-20%] z-0 w-[640px] animate-peek opacity-0"
        width="100"
        height="100"
        src="/svgs/flower.svg"
        alt=""
      />
    </main>
  );
}
