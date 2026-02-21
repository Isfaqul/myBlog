import { useState, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import Heading from "../components/Heading";
import BlogCard from "../components/BlogCard";
import type { BlogPost } from "../types";
import { Link } from "react-router";
import { BASE_API_URL } from "../config/env";
import useAuthContext from "../hooks/useAuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}/blog`);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();

        setPosts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  const blogCards = posts.slice(0, 3).map((blog) => <BlogCard key={blog.id} blog={blog} />);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <section>
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={1} className="heading-b-border">
            {user ? `Hey ${user.name} 👋 ` : `Hey there. 👋`}
          </Heading>
          <Link to="/about" className="flex items-center gap-1 link group">
            Read more{" "}
            <MdArrowOutward className="transition-all duration-100 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </hgroup>
        <p className="font-body text-tGray-100 text-xl sm:text-2xl leading-8 font-light">
          I'm Isfaqul. Self-taught full-stack developer focused on JavaScript and React. Learning by building, breaking,
          and improving every day.
        </p>
      </section>
      <section className="max-w-2xl mx-auto mt-12">
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={2} className="heading-b-border">
            Latest Posts
          </Heading>
          <Link to="/blog" className="flex items-center gap-1 link group">
            View all{" "}
            <MdArrowOutward className="transition-all duration-100 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </hgroup>
        <div className="space-y-5">{blogCards}</div>
      </section>
    </>
  );
}
