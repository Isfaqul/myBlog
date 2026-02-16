import type { CommentCardProps } from "../types";
import { getRandomBg700Color } from "../utils/utils";

export default function CommentCard({ comment }: CommentCardProps) {
  const randomBgColor = getRandomBg700Color();

  return (
    <article className="font-body flex gap-3 items-start bg-tGray-400 p-4 rounded-lg ">
      <div className={`size-8 ${randomBgColor} rounded-full shrink-0`}></div>
      <div>
        <div className="flex gap-2 leading-4">
          <h3 className="text-tGray-100 font-medium">{comment.user.name}</h3>
          <p className="text-tGray-200">·</p>
          <p className="text-tGray-200 font-light">{comment.createdAt}</p>
        </div>
        <p className="text-tGray-100 font-light mt-1">{comment.comment}</p>
      </div>
    </article>
  );
}
