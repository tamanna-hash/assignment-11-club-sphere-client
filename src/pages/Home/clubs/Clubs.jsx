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
  const [page, setPage] = useState(1); // current page
  const limit = 9; // clubs per page

  const debouncedSearch = useDebounce(searchTerm, 600);

  const { data, isLoading } = useQuery({
    queryKey: ["clubs", debouncedSearch, category, sort, page],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs`, {
        params: { search: debouncedSearch, category, sort, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

  const { data: clubs = [], totalPages } = data || {};

  return (
    <section className="p-6 min-h-screen">
      {/* Header */}
      <div className="my-6">
        <h1 className="text-3xl text-center font-bold mb-6">
          Your Desired Clubs Are Here
        </h1>
        <p className="text-lg text-center text-gray-500 font-semibold">
          Discover clubs that match your interests
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by club name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered border-purple-400 w-full md:max-w-sm shadow-md"
        />

        <select
          className="select select-bordered border-purple-400 shadow-md"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1); // reset page on filter change
          }}
        >
          <option value="all">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
          <option value="Photography">Photography</option>
          <option value="Hiking">Hiking</option>
          <option value="Traveling">Traveling</option>
          <option value="Book">Book</option>
          <option value="Culinary">Culinary / Cooking</option>
        </select>

        <select
          className="select select-bordered border-purple-400 shadow-md"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1); // reset page on sort change
          }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest-fee">Highest Fee</option>
          <option value="lowest-fee">Lowest Fee</option>
        </select>
      </div>

      {/* Clubs Grid */}
      {clubs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => (
              <ClubCard key={club._id} club={club} index={index} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
            {/* Previous Button */}
            <button
              className="btn bg-transparent border-purple-400"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            {/* Numbered Page Buttons */}
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i}
                className={`btn bg-purple-300  ${
                  page === i + 1 ? "btn-active" : "btn-outline"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              className="btn bg-transparent border-purple-400"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-16">No clubs found.</p>
      )}
    </section>
  );
};

export default Clubs;
