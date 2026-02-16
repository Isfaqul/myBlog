import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Heading from "../components/Heading";
import type { BlogPost } from "../types";

function Blogs() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch(`http://localhost:3000/blog`);
      const data = await response.json();
      setBlogPosts(data);
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
        <div className="space-y-5">{blogCards}</div>
      </section>
    </>
  );
}

export default Blogs;
