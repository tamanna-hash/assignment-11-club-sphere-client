import React from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { useParams } from "react-router";

const AddClubForm = () => {
  const { user, isLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post(`/club-requests`, payload),
    onSuccess: (data) => {
      console.log(data);
      // show toast
      toast.success("club Added successfully");
      // navigate to my inventory page
      mutationReset();
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

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
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
      // console.table(clubData);

      await mutateAsync(clubData);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  if (isPending || isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  return (
    <>
      <title>ClubSphere- Add Club</title>
      <h1 className="text-3xl font-bold mb-6 text-base-content/90">
        Add Club
      </h1>
      <p className="subtitle">Create a new club under your management</p>
      <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center bg-base-100 rounded-xl p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Club Name"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 25,
                      message: "Name cannot be too long",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-md border border-purple-400 focus:outline-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-800"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="location"
                  className="block text-gray-700 font-medium"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Club Location"
                  {...register("clubLocation", {
                    required: "Location is required",
                    maxLength: {
                      value: 30,
                      message: "Location cannot be too long",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-md border border-purple-400 focus:outline-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-800"
                />
                {errors.location && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-medium"
                >
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-4 py-3 rounded-md border border-purple-400 focus:outline-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-800"
                >
                  <option value="">Select category</option>
                  <option value="Tech">Tech</option>
                  <option value="Sports">Sports</option>
                  <option value="Photography">Photography</option>
                  <option value="Hiking">Hiking</option>
                  <option value="Traveling">Traveling</option>
                  <option value="Book">Book</option>
                  <option value="Culinary">Culinary / Cooking</option>
                </select>
                {errors.category && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Write club description here..."
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full h-32 px-4 py-3 rounded-md border border-purple-400 focus:outline-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-800"
                ></textarea>
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Membership Fee */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="fee"
                  className="block text-gray-700 font-medium"
                >
                  Membership Fee
                </label>
                <input
                  id="fee"
                  type="number"
                  placeholder="Fee in $"
                  {...register("fee", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                  className="w-full px-4 py-3 rounded-md border border-purple-400 focus:outline-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-800"
                />
                {errors.fee && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.fee.message}
                  </p>
                )}
              </div>

              {/* Image */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-medium"
                >
                  Club Image
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Image is required" })}
                  className="w-full file-input border-purple-400 text-gray-700"
                />
                {errors.image && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-3 mt-6 font-bold rounded-lg text-white bg-purple-500 hover:bg-purple-400 transition-shadow shadow-md"
              >
                {isPending ? (
                  <TbFidgetSpinner className="animate-spin mx-auto" />
                ) : (
                  "Save & Continue"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddClubForm;
