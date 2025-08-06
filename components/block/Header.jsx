import { MobileAside } from "./MobileAside";
import { Logout } from "./Logout";

export const Header = () => {
  return (
    <header
      className="flex justify-between items-center h-[10vh] px-4"
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-rose-500 to-teal-400 bg-clip-text text-transparent">
        Money Mate
      </div>
      <div className="flex gap-4 items-center">
        <Logout />
        <MobileAside />
      </div>
    </header>
  );
};
