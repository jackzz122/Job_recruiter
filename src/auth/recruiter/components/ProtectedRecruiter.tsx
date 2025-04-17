import { Navigate, Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "../../../redux/feature/user/userApiSlice";

export const ProtectedRecruiter = () => {
  const {
    data: user,
    isSuccess,
    isLoading,
  } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isSuccess &&
    (user?.data?.role === "recruiter" ||
      user?.data?.role === "staffRecruiter") ? (
    <Outlet />
  ) : (
    <Navigate replace to="/recruiter/login" />
  );
};
