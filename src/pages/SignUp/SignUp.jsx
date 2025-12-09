import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { imageUpload } from "../../utils";
const SignUp = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, signInWithGoogle, setLoading, updateUserProfile } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const handleRegister = async (data) => {
    const { name, email, password, photo } = data;
    const profileImg = photo[0];
    try {
      // create user
      await createUser(email, password);
      const imageURL = await imageUpload(profileImg);
      // update user profile
      await updateUserProfile(name, imageURL);
      console.log("after user profile update", imageURL, name);
      navigate(from);
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
    setLoading(false);
  };
  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      navigate(from);
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  return (
    <>
      <title>ClubSphere-Register</title>
      <div className="bg-[#f4f7fd] py-4 flex justify-center min-h-screen items-center">
        <div className="card bg-cyan-900/15 border border-cyan-900/30 p-6 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold md:text-2xl text-center">
            Register your account
          </h2>
          <form onSubmit={handleSubmit(handleRegister)} className="card-body">
            <fieldset className="fieldset">
              {/* Name  */}
              <label className="label">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="input"
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-600">Name required</p>
              )}
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
              {/* Photo URl  */}
              <label className="label">Photo URl </label>
              <input
                {...register("photo")}
                type="file"
                className="file-input"
              />
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

              <button
                type="submit"
                className="btn text-xs md:text-base px-4 py-2 font-bold hover:bg-linear-to-r bg-cyan-700  hover:from-cyan-800 hover:via-cyan-700 hover:to-cyan-500 text-white mt-4 hover:scale-102"
              >
                Register
              </button>
              <button
                onClick={handleGoogleSignup}
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
                Signup with Google
              </button>
              <p className="font-semibold text-center pt-5">
                Allready Have An Account ?{" "}
                <Link className="text-secondary underline" to="/login">
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
