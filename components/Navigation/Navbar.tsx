import Link from "next/link";

interface Props {
  activePage: string;
}

const Navbar: React.FC<Props> = ({ activePage }) => {
  const activeLinkClasses = "text-white drop-shadow-md font-semibold";
  const unactiveLinkClasses = "text-white/40 hover:text-white/90 transition";

  return (
    <nav className="absolute top-0 z-20 w-screen  bg-sky-700/30 p-4 px-5 backdrop-blur-xl bg-gradient-to-b from-sky-900/70 flex items-center justify-between">
      <h2 className="font-semibold text-3xl text-sky-100/80">Habit Tracker</h2>
      <ul className="flex gap-4 items-center">
        <Link
          href="/login"
          className={`text-xl cursor-pointer ${
            activePage === "login" ? activeLinkClasses : unactiveLinkClasses
          }`}
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className={`text-xl cursor-pointer ${
            activePage === "signup" ? activeLinkClasses : unactiveLinkClasses
          }`}
        >
          Sign Up
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
