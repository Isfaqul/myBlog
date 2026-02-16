import { Link } from "react-router";
import type { BlogCardProps } from "../types";

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link to={`/blog/${blog.id}`} className="block group">
      <article className="bg-tGray-400 border border-tGray-300 rounded-lg p-6 relative duration-200 ease-ease shadow-black/10 group-hover:-translate-y-1 group-hover:shadow-md">
        <h3 className="font-heading text-lg text-tGray-100">{blog.title}</h3>
        <div className="flex gap-3">
          <p className="font-body text-tGray-200">{blog.createdAt}</p>
          <p className="font-body text-tGray-200">·</p>
          <p className="font-body text-tGray-200">Article</p>
        </div>
      </article>
    </Link>
  );
}
