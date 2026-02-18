import { useState, useEffect } from "react";
import Heading from "../components/Heading";
import type { BlogPost, NewPostFormData } from "../types";
import { BASE_API_URL } from "../config/env";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postError, setPostError] = useState<string | null>(null);
  const { user, isLoggedIn, accessToken } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setError,
  } = useForm<NewPostFormData>({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/blog`);

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

  const onSubmit = async (data: NewPostFormData) => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }

    const backEndFormData = {
      title: data.title,
      body: data.body,
    };

    try {
      const apiResponse = await fetch(`${BASE_API_URL}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...backEndFormData }),
      });

      if (!apiResponse.ok) {
        // get error from response
        const mainApiError = await apiResponse.json();
        if (mainApiError.message === "Invalid data") {
          // Get the formDataError array
          const formDataErrors = mainApiError.errors;

          // Set these errors into ReactHookForms error Object
          formDataErrors.forEach(
            (error: { type: string; location: string; path: string; value: string; msg: string }) => {
              console.log(error);
              const field = error.path;
              setError(field as keyof NewPostFormData, {
                type: "user",
                message: error.msg,
              });
            },
          );
        }

        return;
      }

      // Success
      reset();
      clearErrors();

      navigate("/blog");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section>
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={1} className="heading-b-border">
            {user ? `Hey ${user.name} 👋 ` : `Hey there. 👋`}
          </Heading>
        </hgroup>
        <p className="font-body text-tGray-100 text-lg sm:text-2xl leading-8 font-light">Write a new blog today?</p>
      </section>
      <section className="max-w-2xl mx-auto mt-12">
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={2} className="heading-b-border">
            Add new blog
          </Heading>
        </hgroup>
        <div className="space-y-5">
          <form action="" className="font-body space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="title" className="text-tGray-100/80 block mb-1">
                Title
              </label>
              <input
                {...register("title", {
                  required: { value: true, message: "Please enter a blog title" },
                  minLength: {
                    value: 10,
                    message: "Title must have at least 10 characters",
                  },
                  maxLength: {
                    value: 200,
                    message: "Title must not exceed 200 characters",
                  },
                })}
                id="title"
                type="text"
                placeholder="Your new title..."
                required
                autoFocus
                className="block text-tGray-100 w-full bg-tGray-400 py-1 px-2 border rounded-sm border-tGray-300 focus:outline-tGray-100 focus:outline placeholder:text-tGray-200/60"
              />
              {errors.title && <p className="formError">{errors.title?.message}</p>}
            </div>
            <div>
              <label htmlFor="body" className="text-tGray-100 block mb-2">
                Body
              </label>
              <textarea
                {...register("body", {
                  required: { value: true, message: "Please type your blog" },
                  minLength: {
                    value: 500,
                    message: "Post body must have at least 500 characters",
                  },
                  maxLength: {
                    value: 5000,
                    message: "Post body must not exceed 5000 characters",
                  },
                })}
                id="body"
                rows={8}
                className="block text-tGray-100 w-full bg-tGray-400 py-1 px-2 border rounded-sm border-tGray-300 focus:outline-tGray-100 focus:outline placeholder:text-tGray-200/60"
                placeholder="Your blog content"
              ></textarea>
              {errors.body && <p className="formError">* {errors.body?.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="w-full uppercase font-bold cursor-pointer bg-tGray-100 text-tGray-400 px-2 py-2 rounded-md transition-all duration-200 ease-ease hover:bg-tGray-100/80 "
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
