import { MdCircle, MdPublish } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";

export default function PublishPostBtn({ onClick, isPublishing }: { onClick: () => void; isPublishing: boolean }) {
  const baseStyle = `font-body flex font-medium items-center gap-2 border bg-tGray-100 border-tGray-300 cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 ease-ease hover:bg-tGray-100/80 active:bg-tGray-100/50`;

  return (
    <button type="button" onClick={onClick} className={`${baseStyle} ${"text-tGray-500"}`}>
      Publish {isPublishing ? <MdCircle /> : <ImSpinner8 className="animate-loading" />}
    </button>
  );
}
