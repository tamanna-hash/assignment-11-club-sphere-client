import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils";
import { useNavigate, useParams } from "react-router";

const UpdateClub = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
const navigate = useNavigate()
  const { data: clubData, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure(`/clubs/${id}`);
      return res.data;
    },
  });
  // useMutation hook useCase (POST || PUT || PATCH || DELETE)
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.patch(`/clubs/${id}`, payload),
    onSuccess: (data) => {
      console.log(data);
      // show toast
      toast.success("Club updated successfully");
      // navigate to my inventory page
      mutationReset();
      navigate(-1)
      // Query key invalidate
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: (data, error) => {
      console.log("I am from onSettled--->", data);
      if (error) console.log(error);
    },
    retry: 3,
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleUpdate = async (data) => {
    const { name, description, fee, category, image, clubLocation } = data;
    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);
      const clubData = {
        coverImage: imageUrl,
        clubName: name,
        clubLocation,
        description,
        membershipFee: Number(fee),
        category,
        manager: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };
      // await axios.post(`${import.meta.env.VITE_API_URL}/plants`, plantData),
      await mutateAsync(clubData);
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  const {
    clubName,
    coverImage,
    clubLocation,
    membershipFee,
    description,
    category,
  } = clubData || {};
  return (
    <>
      <title>ClubsSphere-UpdateClubs</title>
      <div className="bg-[#f4f7fd] py-4 flex justify-center min-h-screen items-center">
        <div className="card bg-cyan-900/15 border border-cyan-900/30 p-4 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold md:text-2xl text-center">
            Update vehicle
          </h2>
          <form onSubmit={handleSubmit(handleUpdate)} className="card-body">
            <fieldset className="fieldset">
              {/* Name  */}
              <label className="label">Club Name</label>
              <input
                className="input"
                defaultValue={clubName}
                id="name"
                type="text"
                placeholder="club Name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name cannot be too long",
                  },
                })}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
              {/* Category  */}
              <label className="label">Category</label>
              <select
                required
                value={category}
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
                {...register("category", { required: "Category is required" })}
              >
                <option value="Photography">Photography</option>
                <option value="Hiking">Hiking</option>
                <option value="Book">Book</option>
                <option value="Tech">Tech</option>
                <option value="Skating">Skating</option>
                <option value="Traveling">Traveling</option>
                <option value="Culinary">Culinary / Cooking</option>
              </select>
              {errors.category && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.category.message}
                </p>
              )}
              {/* membership fee*/}
              <label className="label">Membership Fee</label>
              <input
                className="input"
                defaultValue={membershipFee}
                id="price"
                type="number"
                placeholder="Price per unit"
                {...register("fee", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
              {/*Location  */}
              <label className="label">Location</label>
              <input
                className="input"
                defaultValue={clubLocation}
                type="text"
                placeholder="club Location"
                {...register("clubLocation", {
                  required: "Location is required",
                  maxLength: {
                    value: 30,
                    message: "Location cannot be too long",
                  },
                })}
              />

              {errors.location && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.location.message}
                </p>
              )}
              {/* Photo URl  */}
              <label className="label">Cover Image </label>
              <input
                // defaultValue={coverImage}
                className="file-input"
                type="file"
                id="image"
               
                {...register("image", {
                  required: "Image is required",
                })}
              />
              {errors.image && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.image.message}
                </p>
              )}

              {/* description */}
              <label className="label font-medium">Description</label>
              <textarea
                className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200"
                defaultValue={description}
                rows="3"
                placeholder="Write club description here..."
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}

              <button
                type="submit"
                className="btn px-4 py-2 font-bold text-white hover:bg-linear-to-r bg-cyan-700  hover:from-cyan-800 hover:via-cyan-700 hover:to-cyan-500 transition-transform"
              >
                Update Club
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateClub;
