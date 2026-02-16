import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState, type SyntheticEvent } from "react";
import type { BlogPost, Comment } from "../types";
import BlogAuthorRow from "../components/BlogAuthorRow";
import CommentCard from "../components/CommentCard";
import Heading from "../components/Heading";
import { AuthContext } from "../context/AuthContext";
import MarkDown from "../components/MarkDown";

export default function BlogItem() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { blogId } = useParams();
  const [blog, setBlog] = useState<BlogPost>();
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);

  if (!auth) {
    throw new Error("AuthContext not found");
  }

  const { isLoggedIn, accessToken } = auth;

  useEffect(() => {
    const getBlogById = async (id: string) => {
      if (!id) return;

      const response = await fetch(`http://localhost:3000/blog/${id}`);
      const data = await response.json();
      console.log(data);
      setBlog(data);
    };

    getBlogById(blogId!);
  }, [blogId]);

  if (!blog) {
    return <p>Failed to load Blog</p>;
  }

  const commentElements =
    blog.comments && blog.comments.map((comment) => <CommentCard key={comment.id} comment={comment} />);

  async function handleCommentSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isLoggedIn) {
      setCommentError("You must log in to comment");
      navigate("/auth/login");
      return;
    }

    if (!comment) {
      setCommentError("Comment must not be empty");
      return;
    }

    const URL = `http://localhost:3000/blog/${blogId}/comments`;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ comment: comment }),
      });

      const newComment: Comment = await response.json();

      setBlog((prev) =>
        prev
          ? {
              ...prev,
              comments: [...(prev.comments ?? []), newComment],
            }
          : prev,
      );

      if (!response.ok) throw Error("Failed to submit comment");

      // On success
      setComment("");
      setCommentError(null);
    } catch (err) {
      setCommentError("Failed to submit comment. Please try again later.");
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <Heading level={1} className="mb-6 heading-b-border">
          {blog.title}
        </Heading>
        <BlogAuthorRow user={blog.user.name} publishDate={blog.createdAt} />
        <MarkDown>{blog.body}</MarkDown>
        <section className="my-30">
          <Heading level={2} size="text-2xl" className="mb-6 heading-b-border">
            Comments
          </Heading>
          <div>
            <div className="p-4 border border-tGray-300 rounded-md">
              <form className="font-body space-y-2" method="POST" onSubmit={handleCommentSubmit}>
                <div>
                  <label htmlFor="comment" className="text-tGray-100 block mb-2">
                    Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    id="comment"
                    name="comment"
                    className="block text-tGray-100 font-body font-light w-full bg-tGray-400 py-1 px-2 border rounded-sm border-tGray-300 focus:outline-tGray-100 focus:outline"
                    placeholder="Your thoughts here..."
                  ></textarea>
                  {commentError && <p className="font-body text-red-400 text-sm mt-1">* {commentError}</p>}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="cursor-pointer bg-tGray-100 px-2 py-1 rounded-md hover:bg-tGray-100/80"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6 space-y-5">{commentElements}</div>
        </section>
      </div>
    </>
  );
}
