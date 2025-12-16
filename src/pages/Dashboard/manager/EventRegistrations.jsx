import axios from "axios";
import SellerOrderDataRow from "../../../components/Dashboard/Tables/ManagerMembershipTable";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import ManagerMembershipTable from "../../../components/Dashboard/Tables/ManagerMembershipTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EventRegistrationsTable from "../../../components/Dashboard/Tables/EventRegistrationsTable";

const EventRegistrations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: eventRegisters = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["eventRegisters"],
    queryFn: async () => {
      const result = await axiosSecure(`/event-registrations`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <title>ClubSphere- Event Registrations</title>
      <h1 className="main-title">
        Event Registrations
      </h1>
      <p className="subtitle">View and manage registrations for your events</p>
      <div className="overflow-x-auto bg-base-300">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Register Status</th>
              <th>Registered At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventRegisters.map((register, index) => (
              <EventRegistrationsTable
                key={register._id}
                register={register}
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

export default EventRegistrations;
