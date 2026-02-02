import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { saveOrUpdateUser } from "../../utils";
import loginImage from "../../assets/bg-2.jpeg";
import Logo from "../../components/Shared/Logo";

const DEMO_USERS = {
  admin: {
    email: "admin@gmail.com",
    password: "1234aA",
  },
  manager: {
    email: "jhankar@gmail.com",
    password: "1234Aa",
  },
  member: {
    email: "bala@gmail.com",
    password: "1234Aa",
  },
};

const Login = () => {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { signIn, signInWithGoogle, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleSignin = async (data) => {
    setLoading(true);
    try {
      const { user } = await signIn(data.email, data.password);

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      toast.success("Login Successful");
      navigate(from);
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-credential":
          toast.error("Invalid credentials");
          break;
        case "auth/user-not-found":
          toast.error("User not found");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Try later");
          break;
        default:
          toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      toast.success("Login Successful");
      navigate(from);
    } catch {
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // Demo role handler
  const handleDemoLogin = (role) => {
    setValue("email", DEMO_USERS[role].email);
    setValue("password", DEMO_USERS[role].password);
    toast(`Demo ${role} credentials filled`, { icon: "✨" });
  };

  return (
    <>
      <title>ClubSphere - Login</title>

      <div
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="absolute top-4 left-4 hidden md:flex">
          <Logo />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-12 px-4">
          {/* Left Section */}
          <div className="hidden md:flex flex-col text-white max-w-md gap-4">
            <h1 className="text-5xl font-bold leading-tight">
              Discover. Connect. Participate.
            </h1>
            <p className="text-white/80 text-lg">
              Log in to explore clubs, manage events, and engage with
              communities.
            </p>
          </div>

          {/* Login Card */}
          <div className="card bg-white/10 backdrop-blur-md border border-white/20 p-6 w-full max-w-sm">
            <div className="flex justify-center mb-4 md:hidden">
              <Logo />
            </div>
            <h2 className="text-2xl font-semibold text-center text-white mb-4">
              Log in to your account
            </h2>

            <form onSubmit={handleSubmit(handleSignin)} className="space-y-3">
              {/* Email */}
              <label className="label text-white">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="input"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}

              {/* Password */}
              <div className="relative">
                <label className="label text-white">Password</label>
                <input
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  })}
                  type={show ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-6 top-10 cursor-pointer"
                >
                  {show ? <IoEyeOff /> : <FaEye />}
                </span>

                {errors.password && (
                  <p className="text-red-500 text-sm">
                    At least 6 characters with upper & lower case
                  </p>
                )}
              </div>

              {/* Forgot */}
              <button
                type="button"
                className="link link-hover text-white text-sm"
              >
                Forgot password?
              </button>

              {/* Login */}
              <button
                type="submit"
                className="btn w-full bg-purple-500 text-white hover:bg-purple-600 font-bold"
              >
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="h-px bg-white/30 flex-1" />
                <span className="text-xs text-white/70">Demo Access</span>
                <div className="h-px bg-white/30 flex-1" />
              </div>

              {/* Demo Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin("admin")}
                  className="btn text-xs bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin("manager")}
                  className="btn text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  Manager
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin("member")}
                  className="btn text-xs bg-green-100 text-green-700 hover:bg-green-200"
                >
                  Member
                </button>
              </div>

              {/* Google */}
              {/* <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn w-full bg-white text-black border mt-2"
              >
                Login with Google
              </button> */}
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="btn w-full bg-white text-black border-[#e5e5e5]"
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
              </button>

              <p className="text-center text-white pt-3">
                Don’t have an account?{" "}
                <Link to="/signup" className="underline text-secondary">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
