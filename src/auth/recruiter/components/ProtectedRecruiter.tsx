import { Navigate, Outlet } from "react-router-dom";
import { useGetUserInfoQuery } from "../../../redux/feature/user/userApiSlice";

export const ProtectedRecruiter = () => {
  const { data, isSuccess, isLoading } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isSuccess &&
    (data?.user.role === "recruiter" ||
      data?.user.role === "staffRecruiter") ? (
    <Outlet />
  ) : (
    <Navigate replace to="/recruiter/login" />
  );
};
