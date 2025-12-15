import React from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import axios from "axios";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../../../components/Home/EventCard";

const SingleClubEvents = () => {
  const { id } = useParams();
  const { data: events, isLoading } = useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/events/${id}`
      );
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      {events.map((event) => (
        <EventCard event={event} key={event._id} />
      ))}
    </div>
  );
};

export default SingleClubEvents;
