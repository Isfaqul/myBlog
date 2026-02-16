import { MdOutlineDarkMode } from "react-icons/md";
import { Link, NavLink } from "react-router";
import { type AuthContexType } from "../context/AuthContext";

export default function NavBar({ auth }: { auth: AuthContexType }) {
  return (
    <nav className="flex items-center justify-between p-3">
      <div className="size-8">
        <a href="/">
          <img src="/icon-lg.png" alt="Isfaqul's memoji face on pink background" />
        </a>
      </div>
      <ul className="flex justify-center gap-2">
        <li>
          <NavLink className={({ isActive }) => (isActive ? `activeLink` : "inactiveLink")} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? `activeLink` : "inactiveLink")} to="/blog">
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? `activeLink` : "inactiveLink")} to="/about">
            About
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center gap-2">
        <button className="size-8 rounded-full flex items-center justify-center bg-tGray-300 text-tGray-100 cursor-pointer">
          <MdOutlineDarkMode />
        </button>
        {auth!.isLoggedIn ? (
          <button onClick={auth!.logOut} className="px-3 py-1 rounded-md flex text-tGray-100 underline cursor-pointer">
            Logout
          </button>
        ) : (
          <Link to="/auth/login" className="px-3 py-1 rounded-md flex bg-tGray-300 text-tGray-100 cursor-pointer">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
