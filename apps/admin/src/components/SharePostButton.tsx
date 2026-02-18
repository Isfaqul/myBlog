import { useState } from "react";
import { MdOutlineShare, MdCheck } from "react-icons/md";

export default function SharePostBtn() {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const baseStyle = `font-body flex items-center gap-2 border bg-tGray-400 border-tGray-300 cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 ease-ease hover:bg-tGray-200/10 active:bg-tGray-200/20`;

  function handleOnClick() {
    // Copy to Clipboard
    const url = window.location.href;
    window.navigator.clipboard.writeText(url);

    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  }

  const btnContent = isClicked ? (
    <>
      <MdCheck />
      Copied
    </>
  ) : (
    <>
      <MdOutlineShare />
      Share
    </>
  );

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={`${baseStyle} ${isClicked ? `text-emerald-500` : `text-tGray-100`}`}
    >
      {btnContent}
    </button>
  );
}
