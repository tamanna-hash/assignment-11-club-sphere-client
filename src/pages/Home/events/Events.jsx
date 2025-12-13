import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import EventCard from "../../../components/Home/EventCard";

const Events = () => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div>
        {events.map((event) => (
          <EventCard event={event} key={event._id} />
        ))}
      </div>
    </>
  );
};

export default Events;
