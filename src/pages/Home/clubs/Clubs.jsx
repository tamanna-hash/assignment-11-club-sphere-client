import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ClubCard from "../../../components/Home/cards/ClubCard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useDebounce } from "../../../hooks/useDebounce";

const Clubs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  const debouncedSearch = useDebounce(searchTerm, 600);

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", debouncedSearch, category, sort],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs`, {
        params: {
          search: debouncedSearch,
          category,
          sort,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="p-6 min-h-screen ">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">All Clubs</h1>

      {/* 🔍 Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by club name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:max-w-sm shadow-md"
        />

        {/* Filter */}
        <select
          className="select select-bordered shadow-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Traveling">Traveling</option>
          <option value="Book">Book</option>
          <option value="Photography">Photography</option>
          <option value="Hiking">Hiking</option>
          <option value="Skating">Skating</option>
        </select>

        {/* Sort */}
        <select
          className="select select-bordered shadow-md"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest-fee">Highest Fee</option>
          <option value="lowest-fee">Lowest Fee</option>
        </select>
      </div>

      {clubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubs.map((club, index) => (
            <ClubCard key={club._id} club={club} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-16">No clubs found.</p>
      )}
    </section>
  );
};

export default Clubs;
