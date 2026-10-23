import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Loading from "../constant/ui/Loading";

const ProtectedRoutes = () => {
  const { user, isLoading } = useSelector((store) => store.auth);

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
