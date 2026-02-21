import type { BlogAuthorRowProps } from "../types.js";
import DeletePostBtn from "./DeletePostBtn.js";
import PublishPostBtn from "./PublishPostBtn.js";
import SharePostBtn from "./SharePostButton.js";
import UnpublishPostBtn from "./UnpublishPostBtn.js";

export default function BlogAuthorRow({
  user,
  publishDate,
  isPublishing,
  isUnpublishing,
  onDelete,
  onPublish,
  onUnpublish,
  isPublished,
}: BlogAuthorRowProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
      <div className="flex gap-2">
        <div className="w-10">
          <img src="/icon-lg.png" alt="Author display picture" />
        </div>
        <div className="">
          <p className="font-body leading-5.5 text-tGray-100">{user}</p>
          <p className="font-body leading-4 text-tGray-200 text-sm">{publishDate}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <DeletePostBtn onClick={onDelete} />
        {!isPublished && <PublishPostBtn isPublishing={isPublishing} onClick={onPublish} />}
        {isPublished && <UnpublishPostBtn isUnpublishing={isUnpublishing} onClick={onUnpublish} />}
        {isPublished && <SharePostBtn />}
      </div>
    </div>
  );
}
