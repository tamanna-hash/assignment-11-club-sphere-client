import React from "react";
import ErrorPage from "../../pages/ErrorPage";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { imageUpload } from "../../utils";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router";

const UpdateEventForm = ({ id }) => {
    const navigate = useNavigate()
  const eventId = id;
  const { user, isLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: event, isLoading: isPendingLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/events/${id}`);
      return res.data;
    },
    retry: 0, // don't retry if 404
  });

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.patch(`/events/${eventId}`, payload),
    onSuccess: (data) => {
      console.log(data);
      navigate("/dashboard/my-events")
      // show toast
      toast.success("Event Updated successfully");
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

    // title
    //   bannerImage
    // description
    // eventDate
    // location
    // isPaid (boolean)
    // eventFee (if paid)
    // maxAttendees (optional)
    // createdAt
    try {
      const imageUrl = await imageUpload(imageFile);
      const eventData = {
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
  const { title, eventLocation, eventDate, description, maxAttendees } =
    event || {};
  if (isPending || isLoading || isPendingLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;
  return (
    <>
      <title>ClubsSphere-addEvent</title>
      <div className="bg-[#f4f7fd] py-4 flex justify-center min-h-screen items-center">
        <div className="card bg-cyan-900/15 border border-cyan-900/30 p-4 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold md:text-2xl text-center">
            Update Event
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <fieldset className="fieldset">
              {/* Name  */}
              <label className="label">Event Name</label>
              <input
                defaultValue={title}
                className="input"
                id="name"
                type="text"
                placeholder="club Name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 40,
                    message: "Name cannot be too long",
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
                defaultValue={eventDate}
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
                defaultValue={maxAttendees}
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
                defaultValue={eventLocation}
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
                defaultValue={description}
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
                className="btn px-4 py-2 font-bold text-white hover:bg-linear-to-r bg-cyan-700  hover:from-cyan-800 hover:via-cyan-700 hover:to-cyan-500 transition-transform"
              >
                Update Event
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateEventForm;
