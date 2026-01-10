import React from "react";
import ErrorPage from "../../pages/ErrorPage";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { imageUpload } from "../../utils";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddEventForm = ({ id }) => {
  const clubId = id;
  console.log(clubId);
  const { user, isLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post(`/events`, payload),
    onSuccess: (data) => {
      console.log(data);
      // show toast
      toast.success("Event Added successfully");
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
    const { name, description, image, date, eventLocation, attendees } = data;
    const imageFile = image[0];
    try {
      const imageUrl = await imageUpload(imageFile);
      const eventData = {
        clubId,
        title: name,
        eventDate: new Date(date).toLocaleDateString(),
        eventLocation,
        isPaid: false,
        maxAttendees: attendees,
        description,
        bannerImage: imageUrl,
        manager: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };
      // console.table(clubData);
      console.log(date);
      await mutateAsync(eventData);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  if (isPending || isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  return (
    <>
      <title>ClubSphere- Add Event</title>
      <h1 className="main-title">Add Event</h1>
      <p className="subtitle">Create a new event for your club</p>
      <div className="bg-[#f4f7fd] py-4 flex justify-center min-h-screen items-center">
        <div className="card bg-purple-900/10 border border-purple-900/20 p-4 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold md:text-2xl text-center">Add Event</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <fieldset className="fieldset">
              {/* Name  */}
              <label className="label">Event Name</label>
              <input
                className="input"
                id="name"
                type="text"
                placeholder="Event Name"
                {...register("name", {
                  required: "Event Name is required",
                  maxLength: {
                    value: 40,
                    message: "Event Name cannot be too long",
                  },
                })}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
              {/* date  */}
              <label className="label">Event Date</label>
              <input
                className="input"
                id="date"
                type="date"
                placeholder="Event Date"
                {...register("date", {
                  required: "Event Date is required",
                })}
              />
              {errors.date && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}
              {/* max attendees  */}
              <label className="label">Max Attendees </label>
              <input
                className="input"
                id="name"
                type="number"
                {...register("attendees", {
                  required: "Max attendees is required",
                })}
              />
              {errors.attendees && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.attendees.message}
                </p>
              )}

              {/*Location  */}
              <label className="label">Location</label>
              <input
                className="input"
                type="text"
                placeholder="Event Location"
                {...register("eventLocation", {
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
                rows="3"
                placeholder="Write event description here..."
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
                Add Event
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEventForm;
