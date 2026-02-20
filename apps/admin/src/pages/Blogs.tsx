import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Heading from "../components/Heading";
import type { BlogPost } from "../types";
import { BASE_API_URL } from "../config/env";
import useAuthContext from "../hooks/useAuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function Blogs() {
  const [loading, setLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { accessToken, user } = useAuthContext();

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${BASE_API_URL}/blog`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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

  const blogCards = blogPosts.map((blog) => <BlogCard user={user!} key={blog.id} blog={blog} />);

  if (loading) return <LoadingSpinner />;

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
