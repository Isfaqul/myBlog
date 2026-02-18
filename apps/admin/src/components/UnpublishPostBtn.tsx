import { MdUndo } from "react-icons/md";

export default function UnpublishPostBtn({ onClick }: { onClick: () => void }) {
  const baseStyle = `font-body flex font-medium items-center gap-2 border bg-tGray-100 border-tGray-300 cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 ease-ease hover:bg-tGray-100/80 active:bg-tGray-100/50`;

  return (
    <button type="button" onClick={onClick} className={`${baseStyle} ${"text-tGray-500"}`}>
      Un-Publish <MdUndo />
    </button>
  );
}
