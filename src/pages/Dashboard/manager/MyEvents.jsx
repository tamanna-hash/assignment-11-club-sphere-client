import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import EventDataTable from "../../../components/Dashboard/Tables/EventDataTable";

const MyEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/events-secure`);
      return result.data;
    },
  });
  return (
    <>
      <title>ClubSphere- My Events</title>
      <h1 className="main-title">My Events</h1>
      <p className="subtitle">Track, edit, and organize the events you manage</p>
      <div className="overflow-x-auto bg-base-300">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Max Attendees</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <EventDataTable
                key={event._id}
                event={event}
                index={index}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyEvents;
