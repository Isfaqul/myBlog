import { Link, useNavigate } from "react-router";
import Heading from "../components/Heading";
import { useForm } from "react-hook-form";
import type { SignUpFormData } from "../types";
import { BASE_API_URL } from "../config/env";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    clearErrors,
    setError,
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    const backEndFormData = {
      name: data.name,
      username: data.username,
      password: data.password,
    };

    try {
      const apiResponse = await fetch(`${BASE_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
              setError(field as keyof SignUpFormData, {
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

      navigate("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <p className="font-heading text-tGray-100 text-xl text-center">Welcome to</p>
      <Heading level={1} className="text-center heading-b-border w-max mx-auto" size="text-4xl">
        Pixelord's Blog
      </Heading>
      <Heading level={2} size="text-xl" className="mt-16 max-w-sm mx-auto">
        Let's get you signed up!
      </Heading>
      <div className="p-8 border border-tGray-300 rounded-md mt-4 max-w-sm mx-auto">
        <form action="" className="font-body space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="text-tGray-100/80 block mb-1">
              Name
            </label>
            <input
              {...register("name", {
                required: { value: true, message: "Please enter your name" },
                minLength: {
                  value: 2,
                  message: "Name must have at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name must not exceed 50 characters",
                },
              })}
              type="text"
              id="name"
              placeholder="John"
              required
              autoFocus
              className="block text-tGray-100 w-full bg-tGray-400 py-1 px-2 border rounded-sm border-tGray-300 focus:outline-tGray-100 focus:outline placeholder:text-tGray-200/60"
            />
            {errors.name && <p className="formError">{errors.name?.message}</p>}
          </div>
          <div>
            <label htmlFor="username" className="text-tGray-100/80 block mb-1">
              Username
            </label>
            <input
              {...register("username", {
                required: { value: true, message: "Please enter a username" },
                minLength: {
                  value: 2,
                  message: "Username must have at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Username must not exceed 50 characters",
                },
              })}
              type="text"
              id="username"
              placeholder="johny_bro"
              required
              className="block text-tGray-100 w-full bg-tGray-400 py-1 px-2 border rounded-sm border-tGray-300 focus:outline-tGray-100 focus:outline placeholder:text-tGray-200/60"
            />
            {errors.username && <p className="formError">{errors.username?.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="text-tGray-100/80 block mb-1">
              Password
            </label>
            <input
              {...register("password", {
                required: { value: true, message: "Please enter your password" },
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              type="password"
              id="password"
              name="password"
              placeholder="*********"
              required
              className="block text-tGray-100 w-full bg-tGray-400 py-1 px-2 border rounded-sm border-tGray-300 focus:outline-tGray-100 focus:outline placeholder:text-tGray-200/60"
            />
            {errors.password && <p className="formError">{errors.password?.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-tGray-100/80 block mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: { value: true, message: "Please confirm your password" },
                validate: (value) => value === getValues("password") || "Passwords do not match",
              })}
              type="password"
              placeholder="*********"
              required
              className="block text-tGray-100 w-full bg-tGray-400 py-1 px-2 border rounded-sm border-tGray-300 focus:outline-tGray-100 focus:outline placeholder:text-tGray-200/60"
            />
            {errors.confirmPassword && <p className="formError">{errors.confirmPassword?.message}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-tGray-100 text-tGray-400 px-2 py-1.5 rounded-md transition-all duration-200 ease-ease hover:bg-tGray-100/80 "
            >
              Sign Up
            </button>
          </div>
          <div>
            <p className="text-tGray-200 text-sm">
              Already have an account? Log in{" "}
              <Link to="/auth/login" className="underline font-semibold">
                here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
