import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ClubCard from "../../../components/Home/ClubCard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Clubs = () => {
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs`);
      console.log(res.data);
      return res.data;
    },
  });
  
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div>
        {clubs.map((club) => (
          <ClubCard club={club} key={club._id} />
        ))}
      </div>
    </>
  );
};

export default Clubs;
