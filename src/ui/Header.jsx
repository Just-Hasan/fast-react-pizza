import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header
      className="font-pizza flex h-max items-center justify-between border-b border-stone-400
      bg-yellow-500 px-4 py-3 uppercase sm:px-6"
    >
      <Link to={"/home"} className="tracking-[5px]">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
