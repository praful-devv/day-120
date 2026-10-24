import { Link } from "react-router";
import authHook from "../hooks/authHook";

export default function Login() {
  const { register, handleSubmit, OnLogin, errors } = authHook();

  return (
    <main className="h-screen flex justify-center items-center bg-gray-100 flex-col gap-18">
      <p className="text-3xl">Login to your account</p>

      <form
        className="flex flex-col justify-center items-center  bg-white px-10 py-14 rounded-2xl"
        onSubmit={handleSubmit(OnLogin)}
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            id="email"
            className="border outline-0 p-2 rounded-xl text-md"
            autoComplete="email"
            placeholder="Enter email "
            {...register("email", {
              required: "Email is required",
            })}
          />
          <p className="h-6">
            {" "}
            {errors.email && (
              <p className="text-red-400 md:text-sm">{errors.email.message}</p>
            )}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-xl">
            Password
          </label>
          <input
            id="password"
            className="border outline-0 p-2 rounded-xl text-md"
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <p className="h-6">
            {errors.password && (
              <p className="text-red-400 md:text-sm">
                {errors.password.message}
              </p>
            )}
          </p>
        </div>
        <button className="bg-green-500 px-4 py-2 rounded-xl">Login</button>

        <p>
          Don't have an account?{" "}
          <Link className="text-red-500" to="/register">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}
