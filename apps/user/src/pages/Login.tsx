import { Link, useNavigate } from "react-router";
import Heading from "../components/Heading";
import { useForm } from "react-hook-form";
import type { FormDataApiError, LogInFormData } from "../types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const URL = "http://localhost:3000/auth";

export default function LogIn() {
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("AuthContext not found");

  const { logIn } = auth;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<LogInFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LogInFormData) => {
    try {
      const apiResponse = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      if (!apiResponse.ok) {
        // get error from response
        const mainApiError = await apiResponse.json();
        if (mainApiError.message === "Invalid data") {
          const formDataErrors: FormDataApiError[] = mainApiError.error;

          formDataErrors.forEach((error) => {
            setError(error.path as keyof LogInFormData, {
              type: "user",
              message: error.message,
            });
          });
        } else if (mainApiError.message === "Bad credentials") {
          setError("password", { type: "user", message: "Incorrect username or password" });
        }

        return;
      }

      const { accessToken } = await apiResponse.json();
      logIn(accessToken);

      // Success
      reset();
      clearErrors();

      navigate("/");
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
        Let's Log in
      </Heading>
      <div className="p-8 border border-tGray-300 rounded-md mt-4 max-w-sm mx-auto">
        <form action="" className="font-body space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="text-tGray-100/80 block mb-1">
              Username
            </label>
            <input
              type="text"
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
              placeholder="johny_bro"
              required
              autoFocus
              className="block text-tGray-100 w-full bg-tGray-400 py-1 px-2 border rounded-sm border-tGray-300 focus:outline-tGray-100 focus:outline placeholder:text-tGray-200/60"
            />
            {errors.username && <p className="formError">{errors.username?.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="text-tGray-100/80 block mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "Please enter your password" },
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              placeholder="*********"
              required
              className="block text-tGray-100 w-full bg-tGray-400 py-1 px-2 border rounded-sm border-tGray-300 focus:outline-tGray-100 focus:outline placeholder:text-tGray-200/60"
            />
            {errors.password && <p className="formError">{errors.password?.message}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-tGray-100 text-tGray-400 px-2 py-1.5 rounded-md transition-all duration-200 ease-ease hover:bg-tGray-100/80 "
            >
              Log In
            </button>
          </div>
          <div>
            <p className="text-tGray-200 text-sm">
              Don't have an account? Sign up{" "}
              <Link to="/auth/signup" className="underline font-semibold">
                here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
