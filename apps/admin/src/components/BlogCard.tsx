import { Link } from "react-router";
import type { BlogCardProps } from "../types";
import { formatDate } from "../utils/utils";

export default function BlogCard({ user, blog }: BlogCardProps) {
  return (
    <Link to={`/blog/${blog.id}`} className="block group">
      <article className="relative overflow-hidden bg-tGray-400 border border-tGray-300 rounded-lg p-6 duration-200 ease-ease shadow-black/10 group-hover:-translate-y-1 group-hover:shadow-md">
        {user?.role === "ADMIN" && (
          <p
            className={`text-[10px] font-body uppercase font-semibold border absolute top-1 right-1 px-2 py-0.5 rounded-tr-md rounded-bl-md border-tGray-300 ${blog.published ? "text-teal-600" : "text-red-400/70"}`}
          >
            {blog.published ? "published" : "draft"}
          </p>
        )}

        <h3 className="font-heading text-lg text-tGray-100">{blog.title}</h3>
        <div className="flex gap-3">
          <p className="font-body text-tGray-200">{formatDate(blog.createdAt)}</p>
          <p className="font-body text-tGray-200">·</p>
          <p className="font-body text-tGray-200">Article</p>
        </div>
      </article>
    </Link>
  );
}
