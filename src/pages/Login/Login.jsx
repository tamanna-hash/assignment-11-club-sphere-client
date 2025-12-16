import React, { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { saveOrUpdateUser } from "../../utils";
import loginImage from "../../assets/bg-2.jpeg";
import Logo from "../../components/Shared/Logo";
const Login = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, signInWithGoogle, setLoading } = useAuth();

  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();

  const handleSignin = async (data) => {
    try {
      const { user } = await signIn(data.email, data.password);
      const token = await user.getIdToken(true);
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      navigate(from);
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
    setLoading(false);
  };
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      toast.success("Login Successful");
      navigate(from);
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <title>ClubSphere-Login</title>
      <div
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Logo in top-left */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <Logo />
        </div>

        {/* Main content container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-10 px-4">
          {/* Left Text Section */}
          <div className="text-white space-y-4 flex-1 flex flex-col justify-center gap-4 max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold">
              Discover. Connect. Participate.
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Log in to access events and clubs, explore upcoming events, and
              join communities.
            </p>
          </div>

          {/* Right Login Card */}
          <div className="card bg-white/10  border border-purple-900/20 p-6 w-full max-w-sm shrink-0 shadow-xl">
            <h2 className="font-semibold md:text-2xl text-center mb-4 text-white">
              Log in to your account
            </h2>

            <form onSubmit={handleSubmit(handleSignin)} className="card-body">
              <fieldset className="fieldset">
                {/* Email */}
                <label className="label text-white ">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email required</p>
                )}

                {/* Password */}
                <div className="relative">
                  <label className="label text-white ">Password</label>
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
                    <p className="text-red-500">Password required</p>
                  )}
                  {errors.password && (
                    <p className="text-red-500">
                      Password must contain uppercase, lowercase and be at least
                      6 characters
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
                  <button type="button" className="link link-hover text-white">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn text-xs md:text-base px-4 py-2 font-bold text-white bg-purple-400 hover:bg-linear-to-r hover:from-purple-300 hover:via-purple-500 hover:to-purple-600 mt-4 hover:scale-102 w-full"
                >
                  Login
                </button>

                <Link
                  onClick={handleGoogleSignIn}
                  className="btn text-xs md:text-base bg-white hover:scale-102 text-black border-[#e5e5e5] mt-4 w-full flex items-center justify-center gap-2"
                >
                  {/* Google SVG */}
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff" />
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      />
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      />
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      />
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      />
                    </g>
                  </svg>
                  Login with Google
                </Link>

                <p className="font-semibold text-center text-white pt-5">
                  Don't have an account yet?{" "}
                  <Link className="text-secondary underline" to="/signup">
                    Register
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
