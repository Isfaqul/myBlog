import { MdDeleteForever } from "react-icons/md";

export default function DeletePostBtn({ onClick }: { onClick: () => void }) {
  const baseStyle = `font-body flex font-medium items-center gap-2 border bg-red-700/50 border-red-800/50 cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 ease-ease hover:bg-red-800/45 active:bg-red-800/40`;

  return (
    <button type="button" onClick={onClick} className={`${baseStyle} ${"text-tGray-100"}`}>
      Delete <MdDeleteForever />
    </button>
  );
}
