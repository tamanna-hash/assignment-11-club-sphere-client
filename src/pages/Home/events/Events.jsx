import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import EventCard from "../../../components/Home/cards/EventCard";
import { useDebounce } from "../../../hooks/useDebounce";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Events = () => {
  const [searchParams] = useSearchParams();
  const clubId = searchParams.get("clubId");

  const [searchTerm, setSearchTerm] = useState("");
  const [isPaid, setIsPaid] = useState("all");
  const [sort, setSort] = useState("newest");

  const debouncedSearch = useDebounce(searchTerm, 600);
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", clubId, debouncedSearch, isPaid, sort],
    queryFn: async () => {
      const res = await axiosSecure.get("/events", {
        params: {
          clubId,
          search: debouncedSearch,
          isPaid,
          sort,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="p-6 min-h-screen">
      <div className="my-6 ">
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">
          All Events Are Here
        </h1>
        <p className="text-lg text-center text-gray-500 font-semibold">
          Discover events happening around you
        </p>
      </div>

      {/* 🔍 Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:max-w-sm shadow-md"
        />

        {/* Paid / Free filter */}
        <select
          className="select select-bordered shadow-md"
          value={isPaid}
          onChange={(e) => setIsPaid(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="true">Paid Events</option>
          <option value="false">Free Events</option>
        </select>

        {/* Sort */}
        <select
          className="select select-bordered shadow-md"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="event-soon">Upcoming Soon</option>
          <option value="event-late">Upcoming Later</option>
        </select>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={event._id} event={event} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-16">No events found.</p>
      )}
    </section>
  );
};

export default Events;
