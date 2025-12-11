import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import MemberStatistics from "../../../components/Dashboard/Statistics/MemberStatistics";
import ManagerStatistics from "../../../components/Dashboard/Statistics/ManagerStatistics";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";
const Statistics = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <LoadingSpinner />;
  return (
    <div>
      {role === "member" && <MemberStatistics />}
      {role === "manager" && <ManagerStatistics />}
      {role === "admin" && <AdminStatistics />}
    </div>
  );
};

export default Statistics;
