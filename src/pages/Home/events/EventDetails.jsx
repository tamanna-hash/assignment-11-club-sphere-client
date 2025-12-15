import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import PurchaseModal from "../../../components/Modal/PurchaseModal";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EventDetails = () => {
  const [isJoined, setIsJoined] = useState(false);
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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/event-registration`,
        payload
      ),
    onSuccess: (data) => {
      console.log(data);
      setIsJoined(true);
      // show toast
      toast.success("Joined successfully");
      // navigate to my inventory page
      mutationReset();
      // Query key invalidate
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: "info",
          title: "Already Joined",
          text: "You have already joined this event.",
        });
        setIsJoined(true);
      } else {
        toast.error("Something went wrong");
      }
    },
    onSettled: (data, error) => {
      if (error) console.log(error);
    },
    retry: 3,
  });
  const {
    clubId,
   title,
    eventLocation,
    eventDate,
    maxAttendees,
    description,
    bannerImage,
    _id,
    manager,
  } = event || {};
  const handleJoin = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Join in this event.........",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Join!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const eventRegisteredInfo = {
            eventId: _id,
            clubId: clubId,
            userEmail: user?.email,
            manager: {
              name: manager?.name,
              email: manager?.email,
            },
            status: "registered",
          };
          await mutateAsync(eventRegisteredInfo);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  useEffect(() => {
    if (_id && user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/event-registration/status`, {
          params: { eventId: _id, email: user.email },
        })
        .then((res) => setIsJoined(res.data.joined));
    }
  }, [_id, user]);
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <title>ClubSphere-Event Details</title>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Image */}
            <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={bannerImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {title}
                </h1>

                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline badge-primary">
                    On: {eventDate}
                  </span>
                  <span className="badge badge-outline">
                    Max: {maxAttendees} Attendees
                  </span>
                </div>

                <p className="text-base-content/80 leading-relaxed">
                  {description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
                  <div>
                    <p className="text-base-content/60">Location</p>
                    <p className="font-medium">{eventLocation}</p>
                  </div>
                  <div>
                    <p className="text-base-content/60">Event Host</p>
                    <p className="font-medium">{manager?.name}</p>
                    <p className="font-medium">{manager?.email}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-8">
                <button
                  disabled={isJoined}
                  onClick={handleJoin}
                  className={`btn rounded-xl font-semibold text-white
            transition shadow-lg
            ${
              isJoined
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-600 shadow-purple-500/30"
            }`}
                >
                  {isPending ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : isJoined ? (
                    "Joined"
                  ) : (
                    "Join Event"
                  )}
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="btn rounded-xl font-semibold
            border border-base-300 hover:bg-purple-400/20 transition"
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
