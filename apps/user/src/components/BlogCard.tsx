import { Link } from "react-router";
import type { BlogCardProps } from "../types";
import { formatDate } from "../utils/utils";
import { MdComment } from "react-icons/md";

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link to={`/blog/${blog.id}`} className="block group">
      <article className="bg-tGray-400 border border-tGray-300 rounded-lg p-6 relative duration-200 ease-ease shadow-black/10 group-hover:-translate-y-1 group-hover:shadow-md">
        <h3 className="font-heading text-lg text-tGray-100">{blog.title}</h3>
        <div className="flex gap-3 flex-wrap">
          <p className="font-body text-tGray-200">{formatDate(blog.createdAt)}</p>
          <p className="font-body text-tGray-200">·</p>
          <p className="font-body text-tGray-200">Article</p>
          <p className="font-body text-tGray-200">·</p>
          <p className="font-body text-tGray-200 flex items-center gap-2 relative top-0.5">
            <MdComment /> <span className="text-sm">{blog.comments?.length}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}
