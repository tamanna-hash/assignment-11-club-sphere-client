import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import loginImage from "../../assets/bg-2.jpeg";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import Logo from "../../components/Shared/Logo";
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

      const imageURL = await imageUpload(profileImg);
      await createUser(email, password);

      await saveOrUpdateUser({ name, email, image: imageURL });
      // update user profile
      await updateUserProfile(name, imageURL);
      console.log("after user profile update", imageURL, name);
      navigate(from);
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      // Map Firebase error codes to your custom messages
      const customErrors = {
        "auth/credential-already-in-use":
          "This Google account is already linked to another user.",
        "auth/email-already-in-use":
          "This email is already registered. Try logging in instead.",
        "auth/popup-closed-by-user":
          "The signup popup was closed. Please try again.",
        "auth/popup-blocked":
          "Popup was blocked by your browser. Allow popups and retry.",
        "auth/user-disabled":
          "Your account has been disabled. Contact support.",
        "auth/invalid-credential":
          "Your login session expired. Please try again.",
        "auth/account-exists-with-different-credential":
          "This email is already linked to another sign-in method. Try logging in instead.",
      };

      const friendly =
        customErrors[err?.code] ||
        "Something went wrong during signup. Please try again.";

      toast.error(friendly);
    }
    setLoading(false);
  };
  const handleGoogleSignup = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      navigate(from);
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);

      // Map Firebase error codes to your custom messages
      const customErrors = {
        "auth/credential-already-in-use":
          "This Google account is already linked to another user.",
        "auth/email-already-in-use":
          "This email is already registered. Try logging in instead.",
        "auth/popup-closed-by-user":
          "The signup popup was closed. Please try again.",
        "auth/popup-blocked":
          "Popup was blocked by your browser. Allow popups and retry.",
        "auth/user-disabled":
          "Your account has been disabled. Contact support.",
        "auth/invalid-credential":
          "Your login session expired. Please try again.",
        "auth/account-exists-with-different-credential":
          "This email is already linked to another sign-in method. Try logging in instead.",
      };

      const friendly =
        customErrors[err?.code] ||
        "Something went wrong during signup. Please try again.";
      toast.error(friendly);
    }
  };

  return (
    <>
      <title>ClubSphere-Register</title>
      <div
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Logo in top-left */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <Logo />
        </div>

        {/* Main content container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-10 px-4">
          {/* Left Text Section */}
          <div className="text-white hidden space-y-4 flex-1 md:flex flex-col justify-center gap-4 max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold">
              Discover. Connect. Participate.
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Create your account and start your journey.
            </p>
          </div>

          {/* Right Login Card */}
          <div className="card bg-white/10  mt-16 md:mt-0 hover:shadow-sm transition-shadow duration-300 border border-white/20 p-6 w-full max-w-sm shrink-0 shadow-white">
            <h2 className="font-semibold md:text-2xl text-center mb-4 text-white">
              Sign up for an account
            </h2>

            <form onSubmit={handleSubmit(handleRegister)} className="card-body">
              <fieldset className="fieldset">
                {/* Name  */}
                <label className="label text-white">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="input"
                  placeholder="Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500">Name required</p>
                )}
                {/* email  */}
                <label className="label text-white">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email required</p>
                )}
                {/* Photo URl  */}
                <label className="label text-white">Photo URl </label>
                <input
                  {...register("photo")}
                  type="file"
                  className="file-input"
                />
                {/* password  */}
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
                  {errors.password?.type === "required" && (
                    <p className="text-red-500">Password required</p>
                  )}
                  {errors.password && (
                    <p className="text-red-500 ">
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

                <button
                  type="submit"
                  className="btn text-xs md:text-base px-4 py-2 font-bold text-white bg-purple-400 hover:bg-linear-to-r hover:from-purple-300 hover:via-purple-500 hover:to-purple-600 mt-4 hover:scale-102 w-full"
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
                <p className="font-semibold text-center text-white pt-5">
                  Already Have An Account ?{" "}
                  <Link className="text-secondary underline" to="/login">
                    Login
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

export default SignUp;
