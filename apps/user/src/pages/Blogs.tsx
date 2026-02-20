import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Heading from "../components/Heading";
import type { BlogPost } from "../types";
import { BASE_API_URL } from "../config/env";
import LoadingSpinner from "../components/LoadingSpinner";

function Blogs() {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${BASE_API_URL}/blog`, {
          method: "GET",
        });

        const data = await response.json();

        setBlogPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  const blogCards = blogPosts.map((blog) => <BlogCard key={blog.id} blog={blog} />);

  return (
    <>
      <section>
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={1} className="text-center mx-auto heading-b-border">
            Blog
          </Heading>
        </hgroup>
        <p className="font-body text-tGray-200 text-2xl font-light text-center">
          Two cents from my journey of becoming a self taught Full-Stack developer. Hope you find some use!
        </p>
      </section>
      <section className="max-w-2xl mx-auto mt-12">
        {loading ? <LoadingSpinner /> : <div className="space-y-5">{blogCards}</div>}
      </section>
    </>
  );
}

export default Blogs;
