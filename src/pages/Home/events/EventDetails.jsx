import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import PurchaseModal from "../../../components/Modal/PurchaseModal";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/events/${id}`
      );
      return res.data;
    },
  });
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.get(`${import.meta.env.VITE_API_URL}/event-registration`),
    onSuccess: (data) => {
      console.log(data);
      // show toast
      // navigate to my inventory page
      mutationReset();
      // Query key invalidate
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: (data, error) => {
      if (error) console.log(error);
    },
    retry: 3,
  });
  const {
    name,
    eventLocation,
    eventDate,
    maxAttendees,
    description,
    bannerImage,
    _id,

    manager,
  } = event || {};
  const handleJoin = () => {};
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <title>ClubSphere-Club Details</title>
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
            <div className="shrink-0 w-full md:w-1/2">
              <img
                src={bannerImage}
                alt=""
                className="w-full object-cover rounded-xl shadow-md"
              />
            </div>

            <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
              <h2 className="card-title md:text-2xl">{name}</h2>
              <div className="badge badge-outline badge-xl badge-accent font-semibold ">
                On:{eventDate}
              </div>
              <h2 className="card-title">Max Attendees{maxAttendees}</h2>
              <div>
                <span className="font-semibold">Membership Fee:</span>
                Free
              </div>
              <div>
                <span className=" font-semibold">Instructor: </span>{" "}
                {manager?.name}
              </div>

              <p className="flex items-center">
                <span className="font-semibold">Location: </span>
                {eventLocation}
              </p>
              <p className=" ">
                <span className="font-semibold">Description: </span>
                {description}
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleJoin}
                  className={`btn px-4 py-2 font-bold text-white transition bg-cyan-700 hover:bg-cyan-800`}
                >
                  Join Event
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="btn px-4 py-2 font-bold text-white hover:bg-linear-to-r bg-cyan-700  hover:from-cyan-800 hover:via-cyan-700 hover:to-cyan-500 transition-transform"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
