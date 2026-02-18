import { useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router";

function DropDownList() {
  const listBtn = useRef(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (e.target !== listBtn.current) {
        setShowList(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div
      ref={listBtn}
      onClick={() => setShowList(!showList)}
      className="relative flex items-center bg-tGray-200/50 w-max px-4 py-2 rounded-md cursor-pointer hover:bg-tGray-200"
    >
      List
      <MdArrowDropDown className="text-xl pointer-events-none" />
      {showList && (
        <ul className="absolute top-full left-0 bg-tGray-100 rounded-lg overflow-hidden">
          <li>
            <Link className="block hover:bg-tGray-200 px-4 py-2" to="/One">
              One
            </Link>
          </li>
          <li>
            <Link className="block hover:bg-tGray-200 px-4 py-2" to="/Two">
              Two
            </Link>
          </li>
          <li>
            <Link className="block hover:bg-tGray-200 px-4 py-2" to="/Three">
              Three
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropDownList;
