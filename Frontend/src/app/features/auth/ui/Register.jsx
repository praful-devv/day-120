import { Link } from "react-router";
import authHook from "../hooks/authHook";

export default function Register() {
  const { register, handleSubmit, OnRegister, errors } = authHook();

  return (
    <main className="h-screen flex justify-center items-center bg-gray-100 flex-col gap-18">
      <p className="text-3xl">Create Account</p>

      <form
        className="flex flex-col justify-center items-center gap-2 bg-white px-10 py-14 rounded-2xl"
        onSubmit={handleSubmit(OnRegister)}
      >
        <div className="flex flex-col">
          <label htmlFor="username" className="text-xl">
            Username
          </label>
          <input
            id="username"
            className="border outline-0 p-2 rounded-xl text-md"
            autoComplete="username"
            placeholder="Enter username "
            {...register("username", {
              required: "username is required",
            })}
          />
          <p className="h-6">
            {" "}
            {errors.username && (
              <p className="text-red-400 md:text-sm">
                {errors.username.message}
              </p>
            )}
          </p>
        </div>

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
        <button className="bg-green-500 px-4 py-2 rounded-xl">Register</button>

        <p>
          Don't have an account?{" "}
          <Link className="text-red-500" to="/">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
