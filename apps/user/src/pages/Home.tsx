import { useState, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import Heading from "../components/Heading";
import BlogCard from "../components/BlogCard";
import type { BlogPost } from "../types";
import { Link } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blog");

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();

        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    getBlogs();
  }, []);

  const blogCards = posts.slice(0, 3).map((blog) => <BlogCard key={blog.id} blog={blog} />);

  return (
    <>
      <section>
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={1} className="heading-b-border">
            Hey there. 👋
          </Heading>
          <Link to="/about" className="flex items-center gap-1 link">
            Read more <MdArrowOutward />
          </Link>
        </hgroup>
        <p className="font-body text-tGray-100 text-2xl font-light">
          I'm Isfaqul. Self-taught full-stack developer focused on JavaScript and React. Learning by building, breaking,
          and improving every day.
        </p>
      </section>
      <section className="max-w-2xl mx-auto mt-12">
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={2} className="heading-b-border">
            Latest Posts
          </Heading>
          <Link to="/blog" className="flex items-center gap-1 link">
            View all <MdArrowOutward />
          </Link>
        </hgroup>
        <div className="space-y-5">{blogCards}</div>
      </section>
    </>
  );
}
