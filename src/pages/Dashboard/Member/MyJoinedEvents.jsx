import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const MyJoinedEvents = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
  const { data: joinedEvents = [], isLoading } = useQuery({
    queryKey: ["joinedEvents", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-joined-events");
      return res.data;
    },
  });
console.log(joinedEvents);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {joinedEvents.map((event) => (
        <div key={event._id} className="card p-4 shadow">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p>{event.eventLocation}</p>
          <p>Date: {event?.eventDate}</p>
          <p>
            Status:{" "}
            <span
              className={
                event.status === "cancelled" ? "text-red-500" : "text-green-500"
              }
            >
              {event.status}
            </span>
          </p>
          <p>Registered At: {new Date(event.registeredAt).toLocaleString()}</p>
          {event.status === "cancelled" && event.cancelledAt && (
            <p className="text-red-500">
              Cancelled At: {new Date(event.cancelledAt).toLocaleString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyJoinedEvents;
