import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Link } from "react-router";

const MyWishlist = () => {
  // const{user}=useAuth()
  const axiosSecure = useAxiosSecure();
  const { data: wishlists = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const result = await axiosSecure.get("/my-wishlist");
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h1 className="main-title">My Wishlist</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Club</th>
              <th>Added at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlists.map((wishlist, i) => (
              <tr key={wishlist._id}>
                <th>{i + 1}</th>
                <td>{wishlist.clubName}</td>
                <td>{new Date(wishlist.addedAt).toLocaleString()}</td>
                <td>
                  <Link
                    to={`/clubs/${wishlist.clubId}`}
                    className="px-3 py-1 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded transition"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishlist;
