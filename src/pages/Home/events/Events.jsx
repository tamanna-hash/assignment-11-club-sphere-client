import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import EventCard from "../../../components/Home/EventCard";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Events = () => {
  const [searchParams] = useSearchParams();
const clubId = searchParams.get("clubId");
const axiosSecure=useAxiosSecure()
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events",clubId],
    queryFn: async () => {
       const url = clubId ? `/events?clubId=${clubId}` : "/events";
      const res = await axiosSecure.get(url);
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
