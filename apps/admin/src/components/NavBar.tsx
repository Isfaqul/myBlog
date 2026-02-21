import { MdClose, MdMenu } from "react-icons/md";
import { Link, NavLink } from "react-router";
import { type AuthContextType } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function NavBar({ auth }: { auth: AuthContextType }) {
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = document.documentElement.clientWidth;
      if (width > 640) {
        setShowDropDown(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("reize", handleResize);
  }, []);

  return (
    <nav className="relative flex items-center justify-between p-3">
      <div className="size-8 shrink-0">
        <Link to="/">
          <img src="/icon-lg.png" className="w-8" alt="Isfaqul's memoji face on pink background" />
        </Link>
      </div>
      <ul className="hidden sm:flex justify-center gap-2">
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
      <div className="hidden sm:flex items-center gap-2">
        {/* <button className="size-8 rounded-full flex items-center justify-center bg-tGray-300 text-tGray-100 cursor-pointer transition-all duration-150 hover:bg-tGray-300/50">
          <MdOutlineDarkMode />
        </button> */}
        {auth!.isLoggedIn ? (
          <button onClick={auth!.logOut} className="px-3 py-1 rounded-md flex text-tGray-100 underline cursor-pointer ">
            Logout
          </button>
        ) : (
          <Link
            to="/auth/login"
            className="px-3 py-1 rounded-md flex bg-tGray-300 text-tGray-100 cursor-pointer transition-all duration-150 hover:bg-tGray-300/50"
          >
            Login
          </Link>
        )}
      </div>
      {/* Small Screen Menu */}
      <button
        onClick={() => setShowDropDown(!showDropDown)}
        type="button"
        className="sm:hidden fixed right-4 z-20 cursor-pointer text-tGray-100 transition-all ease-out duration-150 hover:text-tGray-200 active:text-tGray-200/70"
      >
        {showDropDown ? (
          <MdClose className="text-2xl pointer-events-none" />
        ) : (
          <MdMenu className="text-2xl pointer-events-none" />
        )}
      </button>
      {showDropDown && (
        <div className="w-full fixed top-0 left-0 bg-tGray-300 pt-16 pb-8 px-4 z-10 shadow-2xl shadow-black/40">
          <ul className="flex flex-col items-center w-full">
            <li className="w-full text-center">
              <NavLink className={({ isActive }) => (isActive ? `activeLink` : "inactiveLink")} to="/">
                Home
              </NavLink>
            </li>
            <li className="w-full text-center">
              <NavLink className={({ isActive }) => (isActive ? `activeLink` : "inactiveLink")} to="/blog">
                Blog
              </NavLink>
            </li>
            <li className="w-full text-center">
              <NavLink className={({ isActive }) => (isActive ? `activeLink` : "inactiveLink")} to="/about">
                About
              </NavLink>
            </li>
          </ul>
          {/* <hr className="my-3 border-tGray-400/40 border" /> */}
          <div className="flex items-center justify-center border border-tGray-200/50 bg-tGray-400/20 gap-2 p-4 rounded-lg mt-2">
            {/* <button className="flex flex-1 gap-2 items-center group justify-center text-tGray-100 cursor-pointer">
              Theme{" "}
              <MdOutlineDarkMode className="bg-tGray-400 p-1.5 size-8 rounded-full transition-all duration-150 group-hover:bg-tGray-500" />
            </button> */}
            {auth!.isLoggedIn ? (
              <button
                onClick={auth!.logOut}
                className="px-3 flex-1 text-center py-3 w-full rounded-md flex justify-center text-tGray-100 underline cursor-pointer border border-tGray-200 bg-tGray-200/10 hover:bg-tGray-500"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="px-3 flex-1 text-center py-3 border border-tGray-200/80 w-full rounded-md flex justify-center bg-tGray-400 text-tGray-100 cursor-pointer transition-all duration-150 hover:bg-tGray-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
