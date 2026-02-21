import type { BlogAuthorRowProps } from "../types.js";
import SharePostBtn from "./SharePostButton.js";

export default function BlogAuthorRow({ user, publishDate }: BlogAuthorRowProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-2">
        <div className="w-10">
          <img src="/icon-lg.png" className="size-10" alt="Author display picture" />
        </div>
        <div className="">
          <p className="font-body leading-5.5 text-tGray-100">{user}</p>
          <p className="font-body leading-4 text-tGray-200 text-sm">{publishDate}</p>
        </div>
      </div>
      <div>
        <SharePostBtn />
      </div>
    </div>
  );
}
