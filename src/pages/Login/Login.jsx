import React, { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, signInWithGoogle, setLoading } = useAuth();

  const location = useLocation();
  const from = location.state || "/";

  const navigate = useNavigate();
  const emailRef = useRef(null);

  const handleSignin = async (data) => {
    try {
      await signIn(data.email, data.password);
      console.log(data);
      toast.success("Login Successful");
      navigate(from);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
    setLoading(false);
  };
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Login Successful");
      navigate(from);
    } catch (err) {
      toast.error(err?.message);
    }
  };
  return (
    <>
      <title>ClubSphere-Login</title>
      <div className=" bg-[#f4f7fd] py-4 flex justify-center min-h-screen items-center">
        <div className="card bg-cyan-900/15 border border-cyan-900/30 p-6 w-full max-w-sm shrink-0 shadow-xl">
          <h2 className="font-semibold md:text-2xl text-center">
            Login your account
          </h2>
          <form onSubmit={handleSubmit(handleSignin)} className="card-body">
            <fieldset className="fieldset">
              {/* email  */}
              <label className="label">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600">Email required</p>
              )}
              {/* password  */}
              <div className="relative">
                <label className="label">Password</label>
                <input
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  })}
                  type={show ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password required</p>
                )}
                {errors.password && (
                  <p className="text-red-500 ">
                    Password must contain uppercase, lowercase and be at least 6
                    characters
                  </p>
                )}
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-5 top-9 cursor-pointer z-50"
                >
                  {show ? <IoEyeOff /> : <FaEye />}
                </span>
              </div>
              <div>
                <button type="button" className="link link-hover">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="btn text-xs md:text-base px-4 py-2 font-bold text-white hover:bg-linear-to-r bg-cyan-700  hover:from-cyan-800 hover:via-cyan-700 hover:to-cyan-500 mt-4 hover:scale-102"
              >
                Login
              </button>
              <Link
                onClick={handleGoogleSignIn}
                className="btn text-xs md:text-base bg-white hover:scale-102 text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </Link>
              <p className="font-semibold text-center pt-5">
                Dont’t Have An Account yet ?{" "}
                <Link className="text-secondary underline" to="/signup">
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
