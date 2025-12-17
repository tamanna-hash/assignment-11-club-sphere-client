import React from "react";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils";
import LoadingSpinner from "../Shared/LoadingSpinner";

const UpdateClubForm = ({ id }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: pendingClub, isLoading: isPendingLoading } = useQuery({
    queryKey: ["pendingClub", id],
    queryFn: async () => {
      const res = await axiosSecure(`/clubs-pending/${id}`);
      return res.data;
    },
    retry: 0, // don't retry if 404
  });

  //  Fetch main club if pending not found
  const { data: mainClub, isLoading: isMainLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure(`/clubs/${id}`);
      return res.data;
    },
    enabled: !pendingClub, // only fetch if pending not found
  });

  //  Decide which data to use
  const clubData = pendingClub || mainClub;
  const isLoading = isPendingLoading || isMainLoading;

  // useMutation hook useCase (POST || PUT || PATCH || DELETE)
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async ({ endpoint, data }) =>
      await axiosSecure.patch(endpoint, data),
    onSuccess: (data) => {
      console.log(data);
      // show toast
      toast.success("Club updated successfully");
      // navigate to my inventory page
      mutationReset();
      navigate(-1);
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
        category: category,
        manager: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
        updated_at:new Date()
      };
      const endpoint = pendingClub
        ? `/clubs-pending/${id}` // pending collection
        : `/clubs/${id}`; // main collection

      await mutateAsync({ endpoint, data: clubData });
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(clubData);
  const { clubName, clubLocation, membershipFee, description, category } =
    clubData || {};
  useEffect(() => {
    if (clubData) {
      reset({
        name: clubData.clubName,
        location: clubData.clubLocation,
        fee: clubData.membershipFee,
        description: clubData.description,
        category: clubData.category, // ✅ pre-fill select
      });
    }
  }, [clubData, reset]);
  if (isPending || isLoading) return <LoadingSpinner />;
  if (isError) return <Error />;
  return (
    <>
      <title>ClubSphere- Update Club</title>
      <h1 className="main-title">Update Club</h1>
      <p className="subtitle">Edit details of your existing club</p>
      <div className="bg-[#f4f7fd] py-4 flex justify-center min-h-screen items-center">
        <div className="card bg-purple-900/10 border border-purple-900/20 p-4 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold md:text-2xl text-center">
            Update Your Club
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
                defaultValue={category}
                required
                className="w-full px-4 py-3 rounded-md bg-white"
                {...register("category", { required: "Category is required" })}
              >
                <option value="Photography">Photography</option>
                <option value="Hiking">Hiking</option>
                <option value="Book">Book</option>
                <option value="Tech">Tech</option>
                <option value="Sports">Sports</option>
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
                className="btn px-4 py-2 font-bold text-white hover:bg-linear-to-r bg-purple-700  hover:from-purple-800 hover:via-purple-700 hover:to-purple-500 transition-transform"
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

export default UpdateClubForm;
